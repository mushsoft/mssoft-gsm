import { describe, it, expect } from 'vitest';
import { parseTopic, searchGuides, topicForBrand } from './guideTopics';

const guide = (title: string, brand = '', content = '', toolsUsed: string[] = [], modelName = '') => ({
  title,
  brand,
  modelName,
  toolsUsed,
  content,
});

describe('topicForBrand', () => {
  it('groups brands into the five software topics', () => {
    expect(topicForBrand('Apple')).toBe('iPhone');
    expect(topicForBrand('Samsung')).toBe('Android');
    expect(topicForBrand('Tecno')).toBe('Android');
    expect(topicForBrand('Microsoft')).toBe('Windows');
    expect(topicForBrand('windows')).toBe('Windows');
    expect(topicForBrand(' Linux ')).toBe('Linux');
  });

  it('puts blank, "All brands" and unknown brands under General', () => {
    expect(topicForBrand('')).toBe('General');
    expect(topicForBrand('All brands')).toBe('General');
    expect(topicForBrand('Nintendo')).toBe('General');
  });
});

describe('parseTopic', () => {
  it('accepts topic names in any case and rejects anything else', () => {
    expect(parseTopic('iphone')).toBe('iPhone');
    expect(parseTopic('Linux')).toBe('Linux');
    expect(parseTopic('All')).toBeNull();
    expect(parseTopic('nonsense')).toBeNull();
    expect(parseTopic(undefined)).toBeNull();
  });
});

describe('searchGuides', () => {
  const guides = [
    guide('Turn On Dark Mode on Android', 'Android', 'Settings, Display, Dark mode.'),
    guide('Fix Wi-Fi on Windows', 'Windows', 'Forget the network and reconnect.', ['netsh']),
    guide('Share Wi-Fi from iPhone', 'Apple', 'Bring the phones close together.'),
  ];

  it('returns everything for an empty query', () => {
    expect(searchGuides(guides, '  ')).toHaveLength(3);
  });

  it('needs every word to match, in any field and any order', () => {
    expect(searchGuides(guides, 'iphone wifi').map((g) => g.title)).toEqual(['Share Wi-Fi from iPhone']);
    expect(searchGuides(guides, 'reconnect windows').map((g) => g.title)).toEqual(['Fix Wi-Fi on Windows']);
  });

  it('searches the tip text and tools, ranking title hits first', () => {
    const results = searchGuides(
      [guide('Network basics', '', 'Use netsh to check'), guide('netsh commands')],
      'netsh'
    );
    expect(results.map((g) => g.title)).toEqual(['netsh commands', 'Network basics']);
  });
});
