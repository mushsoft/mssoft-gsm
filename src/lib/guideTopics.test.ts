import { describe, it, expect } from 'vitest';
import {
  hardwareTopicFor,
  parseHardwareTopic,
  parseShowCount,
  parseTopic,
  searchGuides,
  topicForBrand,
} from './guideTopics';

describe('hardwareTopicFor', () => {
  it('groups hardware tips by the part in the title', () => {
    expect(hardwareTopicFor('Lines on the Screen After a Drop')).toBe('Screens');
    expect(hardwareTopicFor('Signs of a Swollen Battery')).toBe('Batteries');
    expect(hardwareTopicFor('Clean a Charging Port Safely')).toBe('Charging');
    expect(hardwareTopicFor('Phone Fell in Water: First 10 Minutes')).toBe('Water Damage');
    expect(hardwareTopicFor('Fix a Muffled Earpiece Speaker')).toBe('Parts');
    expect(hardwareTopicFor('Find a Short Circuit with a Multimeter')).toBe('Board Repair');
    expect(hardwareTopicFor('Choosing a Good Soldering Iron')).toBe('Board Repair');
    expect(hardwareTopicFor('Set Up a Microscope for Phone Work')).toBe('Tools');
  });

  it('checks topics in order, so the most specific problem wins', () => {
    expect(hardwareTopicFor('Charging Port Corrosion After Rain')).toBe('Water Damage');
    expect(hardwareTopicFor('Battery Not Charging Past 80%')).toBe('Batteries');
    expect(hardwareTopicFor('Stuck Power Button: Flex Cable Fixes')).toBe('Parts');
    expect(hardwareTopicFor('Laptop Battery Swelling: Raised Touchpad')).toBe('Laptops and Tablets');
    expect(hardwareTopicFor('Tablet Not Charging')).toBe('Laptops and Tablets');
    expect(hardwareTopicFor('Wireless Earbuds: One Side Not Working')).toBe('Accessories');
    expect(hardwareTopicFor('Smartwatch Not Charging')).toBe('Accessories');
  });

  it('matches whole words only', () => {
    // "microscope" is not "mic", "simple" is not "sim", "portable" is not "port".
    expect(hardwareTopicFor('Simple Microscope Habits')).toBe('Tools');
    expect(hardwareTopicFor('Portable Kit Ideas')).toBe('General');
  });

  it('parses hardware topic chips from the URL', () => {
    expect(parseHardwareTopic('water damage')).toBe('Water Damage');
    expect(parseHardwareTopic('Screens')).toBe('Screens');
    expect(parseHardwareTopic('iPhone')).toBeNull();
  });
});

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

describe('parseShowCount', () => {
  it('defaults to one page and caps huge values', () => {
    expect(parseShowCount(undefined)).toBe(24);
    expect(parseShowCount('abc')).toBe(24);
    expect(parseShowCount('5')).toBe(24);
    expect(parseShowCount('48')).toBe(48);
    expect(parseShowCount('999999')).toBe(2000);
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
