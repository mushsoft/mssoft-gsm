import { describe, it, expect } from 'vitest';
import { parseRepairGuideInput, RepairGuideValidationError } from './validateRepairGuide';

const base = { title: 'Guide', brand: 'Tecno', modelName: 'Spark 8', content: 'Steps' };

describe('parseRepairGuideInput category', () => {
  it('defaults to a repair guide when no type is sent', () => {
    expect(parseRepairGuideInput(base).category).toBe('REPAIR');
  });

  it('accepts a software tip without brand or model', () => {
    const input = parseRepairGuideInput({ category: 'SOFTWARE', title: 'FRP bypass on Android 14', content: 'Steps' });
    expect(input).toMatchObject({ category: 'SOFTWARE', brand: '', modelName: '' });
  });

  it('still requires brand and model for repair guides', () => {
    expect(() => parseRepairGuideInput({ ...base, brand: '' })).toThrow(RepairGuideValidationError);
    expect(() => parseRepairGuideInput({ ...base, modelName: '' })).toThrow(RepairGuideValidationError);
  });

  it('rejects an unknown type', () => {
    expect(() => parseRepairGuideInput({ ...base, category: 'OTHER' })).toThrow(RepairGuideValidationError);
  });
});
