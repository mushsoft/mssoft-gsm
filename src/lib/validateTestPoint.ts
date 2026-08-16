import { TESTPOINT_TYPES } from './testPointTypes';

export class TestPointValidationError extends Error {}

export interface TestPointInput {
  brand: string;
  modelName: string;
  chipset: string;
  pointType: string;
  title: string;
  diagramUrl: string;
  notes: string | null;
}

export function parseTestPointInput(body: unknown): TestPointInput {
  if (typeof body !== 'object' || body === null) {
    throw new TestPointValidationError('Request body must be a JSON object');
  }
  const b = body as Record<string, unknown>;

  const brand = typeof b.brand === 'string' ? b.brand.trim() : '';
  const modelName = typeof b.modelName === 'string' ? b.modelName.trim() : '';
  const chipset = typeof b.chipset === 'string' ? b.chipset.trim() : '';
  const pointType = typeof b.pointType === 'string' ? b.pointType.trim() : '';
  const title = typeof b.title === 'string' ? b.title.trim() : '';
  const diagramUrl = typeof b.diagramUrl === 'string' ? b.diagramUrl.trim() : '';
  const notes = typeof b.notes === 'string' && b.notes.trim() ? b.notes.trim() : null;

  if (!brand) throw new TestPointValidationError('Brand is required');
  if (!modelName) throw new TestPointValidationError('Model name is required');
  if (!chipset) throw new TestPointValidationError('Chipset is required');
  if (!TESTPOINT_TYPES.some((t) => t.value === pointType)) {
    throw new TestPointValidationError(`Point type must be one of: ${TESTPOINT_TYPES.map((t) => t.value).join(', ')}`);
  }
  if (!title) throw new TestPointValidationError('Title is required');

  return { brand, modelName, chipset, pointType, title, diagramUrl, notes };
}
