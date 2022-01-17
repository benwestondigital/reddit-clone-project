const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const { formattedTopics } = require('../utils/utils');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('formattedTopics()', () => {
  test('input is not output', () => {
    const topic = [{ description: 'FOOTIE!', slug: 'football' }];
    const testInput = formattedTopics(topic);
    expect(testInput).not.toBe(topic);
  });
  test('input is not mutated', () => {
    const topic = [{ description: 'FOOTIE!', slug: 'football' }];
    formattedTopics(topic);
    expect(topic).toEqual([{ description: 'FOOTIE!', slug: 'football' }]);
  });
  test('returns an array', () => {
    const topic = [{ description: 'FOOTIE!', slug: 'football' }];
    const testInput = formattedTopics(topic);
    expect(Array.isArray(testInput)).toBe(true);
  });
  test('returns a nested array', () => {
    const topic = [{ description: 'FOOTIE!', slug: 'football' }];
    const testInput = formattedTopics(topic);
    expect(testInput).toEqual([['football', 'FOOTIE!']]);
  });
  test('returns a nested array for multiple items', () => {
    const topic = [
      { description: 'The man, the Mitch, the legend', slug: 'mitch' },
      { description: 'Not dogs', slug: 'cats' },
      { description: 'what books are made of', slug: 'paper' },
    ];
    const testInput = formattedTopics(topic);
    expect(testInput).toEqual([
      ['mitch', 'The man, the Mitch, the legend'],
      ['cats', 'Not dogs'],
      ['paper', 'what books are made of'],
    ]);
  });
});