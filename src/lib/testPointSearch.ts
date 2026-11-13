import type { TestPoint } from '@prisma/client';

// Shared by /shop/testpoints and the header's typeahead so both find the same
// diagrams for the same query. pointType is included so "edl" / "brom" / "isp"
// work as search words, not only via the type chips.
export const TESTPOINT_SEARCH_FIELDS = ['title', 'brand', 'modelName', 'chipset', 'pointType', 'notes'] as const;

// Words that describe every row on this page ("redmi note 9 testpoint") —
// requiring them to match a column would hide every result.
export const TESTPOINT_SEARCH_IGNORE = ['testpoint', 'testpoints', 'test', 'point', 'points', 'tp', 'diagram', 'pinout'] as const;

export function testpointRankFields(t: Pick<TestPoint, 'title' | 'brand' | 'modelName' | 'chipset' | 'pointType' | 'notes'>) {
  return [
    { value: t.modelName, weight: 4 },
    { value: t.brand, weight: 3 },
    { value: t.title, weight: 3 },
    { value: t.chipset, weight: 2 },
    { value: t.pointType, weight: 2 },
    { value: t.notes, weight: 1 },
  ];
}
