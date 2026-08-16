export class RepairGuideValidationError extends Error {}

export interface RepairGuideInput {
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
  if (!brand) throw new RepairGuideValidationError('Brand is required');
  if (!modelName) throw new RepairGuideValidationError('Model name is required');
  if (!content) throw new RepairGuideValidationError('Content is required');
  if (videoUrl && !/^https?:\/\//.test(videoUrl)) {
    throw new RepairGuideValidationError('Video URL must be a valid http(s) URL');
  }

  return { title, brand, modelName, videoUrl, thumbnail, content, toolsUsed };
}
