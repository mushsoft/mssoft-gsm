import { describe, it, expect } from 'vitest';
import { rankByRelevance, tokenizeQuery, tokenWhereConditions } from './searchQuery';

const words = (q: string, ignore?: string[]) => tokenizeQuery(q, { ignore }).map((t) => t.variants[0]);

describe('tokenizeQuery', () => {
  it('splits on spaces and punctuation and lowercases', () => {
    expect(words('Tecno  Spark-8 Pro')).toEqual(['tecno', 'spark', '8', 'pro']);
  });

  it('splits glued words from numbers like note9 / 9pro', () => {
    expect(words('redmi note9')).toEqual(['redmi', 'note', '9']);
    expect(words('note 9pro')).toEqual(['note', '9', 'pro']);
  });

  it('keeps short model codes whole', () => {
    expect(words('samsung a13 mt6769 x6710')).toEqual(['samsung', 'a13', 'mt6769', 'x6710']);
  });

  it('drops stopwords, ignored words and duplicates', () => {
    expect(words('the testpoint for redmi redmi', ['testpoint'])).toEqual(['redmi']);
  });

  it('adds aliases as variants', () => {
    expect(tokenizeQuery('mtk')[0].variants).toEqual(['mtk', 'mediatek']);
  });

  it('caps the number of words', () => {
    expect(tokenizeQuery('a1 b2 c3 d4 e5 f6 g7 h8 i9 j10')).toHaveLength(8);
  });
});

describe('tokenWhereConditions', () => {
  it('builds one AND entry per word, ORed across fields and variants', () => {
    const [cond] = tokenWhereConditions(tokenizeQuery('mtk'), ['brand', 'chipset']);
    expect(cond.OR).toEqual([
      { brand: { contains: 'mtk', mode: 'insensitive' } },
      { chipset: { contains: 'mtk', mode: 'insensitive' } },
      { brand: { contains: 'mediatek', mode: 'insensitive' } },
      { chipset: { contains: 'mediatek', mode: 'insensitive' } },
    ]);
  });
});

describe('rankByRelevance', () => {
  const fields = (p: { brand: string; model: string }) => [
    { value: p.model, weight: 3 },
    { value: p.brand, weight: 2 },
  ];

  it('puts whole-word model matches above substring matches', () => {
    const items = [
      { brand: 'Xiaomi', model: 'Redmi Note 9 Pro' },
      { brand: 'Xiaomi', model: 'Redmi 9' },
    ];
    const ranked = rankByRelevance(items, tokenizeQuery('redmi 9'), 'redmi 9', fields);
    expect(ranked[0].model).toBe('Redmi 9');
  });

  it('keeps original order for ties', () => {
    const items = [
      { brand: 'Tecno', model: 'Spark 8' },
      { brand: 'Tecno', model: 'Spark 7' },
    ];
    expect(rankByRelevance(items, tokenizeQuery('tecno'), 'tecno', fields)).toEqual(items);
  });
});
