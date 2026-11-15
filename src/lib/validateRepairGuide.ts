import { replaceLongDashes } from './plainText';

export class RepairGuideValidationError extends Error {}

export type GuideCategory = 'REPAIR' | 'SOFTWARE' | 'HARDWARE';

export const GUIDE_CATEGORIES: readonly GuideCategory[] = ['REPAIR', 'SOFTWARE', 'HARDWARE'];

export interface RepairGuideInput {
  category: GuideCategory;
  title: string;
  brand: string;
  modelName: string;
  videoUrl: string | null;
  thumbnail: string;
  content: string;
  toolsUsed: string[];
}

export function parseRepairGuideInput(body: unknown): RepairGuideInput {
  if (typeof body !== 'object' || body === null) {
    throw new RepairGuideValidationError('Request body must be a JSON object');
  }
  const b = body as Record<string, unknown>;

  // Missing means a repair guide, so older clients keep working.
  const category = b.category === undefined ? 'REPAIR' : b.category;
  if (!GUIDE_CATEGORIES.includes(category as GuideCategory)) {
    throw new RepairGuideValidationError('Type must be a repair guide, a software tip or a hardware tip');
  }
  const title = typeof b.title === 'string' ? b.title.trim() : '';
  const brand = typeof b.brand === 'string' ? b.brand.trim() : '';
  const modelName = typeof b.modelName === 'string' ? b.modelName.trim() : '';
  const videoUrl = typeof b.videoUrl === 'string' && b.videoUrl.trim() ? b.videoUrl.trim() : null;
  const thumbnail = typeof b.thumbnail === 'string' ? b.thumbnail.trim() : '';
  const content = typeof b.content === 'string' ? b.content.trim() : '';
  const toolsUsed = Array.isArray(b.toolsUsed)
    ? b.toolsUsed.filter((t): t is string => typeof t === 'string' && t.trim().length > 0).map((t) => t.trim())
    : [];

  if (!title) throw new RepairGuideValidationError('Title is required');
  // Software and hardware tips can be general (e.g. "Signs of a swollen
  // battery"), so brand and model are only required for repair guides.
  if (category === 'REPAIR' && !brand) throw new RepairGuideValidationError('Brand is required');
  if (category === 'REPAIR' && !modelName) throw new RepairGuideValidationError('Model name is required');
  if (!content) throw new RepairGuideValidationError('Content is required');
  if (videoUrl && !/^https?:\/\//.test(videoUrl)) {
    throw new RepairGuideValidationError('Video URL must be a valid http(s) URL');
  }

  // Visible text is saved without long dashes (site rule, see plainText.ts).
  return {
    category: category as GuideCategory,
    title: replaceLongDashes(title),
    brand: replaceLongDashes(brand),
    modelName: replaceLongDashes(modelName),
    videoUrl,
    thumbnail,
    content: replaceLongDashes(content),
    toolsUsed: toolsUsed.map(replaceLongDashes),
  };
}
