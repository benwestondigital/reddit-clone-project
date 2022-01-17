const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const {
  formattedTopics,
  formattedUsers,
  formattedArticles,
} = require('../utils/utils');

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
describe('formattedUsers()', () => {
  test('input is not output', () => {
    const user = [
      {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url: 'https://www.healthytherapies.com/',
      },
    ];
    const testInput = formattedUsers(user);
    expect(testInput).not.toBe(user);
  });
  test('input is not mutated', () => {
    const user = [
      {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url: 'https://www.healthytherapies.com/',
      },
    ];
    formattedUsers(user);
    expect(user).toEqual([
      {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url: 'https://www.healthytherapies.com/',
      },
    ]);
  });
  test('returns an array', () => {
    const user = [
      {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url: 'https://www.healthytherapies.com/',
      },
    ];
    const testInput = formattedUsers(user);
    expect(Array.isArray(testInput)).toBe(true);
  });
  test('returns a nested array', () => {
    const user = [
      {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url: 'https://www.healthytherapies.com/',
      },
    ];
    const testInput = formattedUsers(user);
    expect(testInput).toEqual([
      ['butter_bridge', 'https://www.healthytherapies.com/', 'jonny'],
    ]);
  });
  test('returns a nested array for multiple items', () => {
    const user = [
      {
        username: 'butter_bridge',
        name: 'jonny',
        avatar_url:
          'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
      },
      {
        username: 'icellusedkars',
        name: 'sam',
        avatar_url:
          'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
      },
      {
        username: 'rogersop',
        name: 'paul',
        avatar_url:
          'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
      },
      {
        username: 'lurker',
        name: 'do_nothing',
        avatar_url:
          'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
      },
    ];
    const testInput = formattedUsers(user);
    expect(testInput).toEqual([
      [
        'butter_bridge',
        'https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg',
        'jonny',
      ],
      [
        'icellusedkars',
        'https://avatars2.githubusercontent.com/u/24604688?s=460&v=4',
        'sam',
      ],
      [
        'rogersop',
        'https://avatars2.githubusercontent.com/u/24394918?s=400&v=4',
        'paul',
      ],
      [
        'lurker',
        'https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png',
        'do_nothing',
      ],
    ]);
  });

  describe.only('formattedArticles()', () => {
    test('input is not output', () => {
      const input = [
        {
          title: 'Am I a cat?',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          created_at: new Date(1579126860000),
          votes: 0,
        },
      ];
      const test = formattedArticles(input);
      expect(test).not.toBe(input);
    });
    test('input is not mutated', () => {
      const input = [
        {
          title: 'Am I a cat?',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          created_at: new Date(1579126860000),
          votes: 0,
        },
      ];
      formattedArticles(input);
      expect(input).toEqual([
        {
          title: 'Am I a cat?',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          created_at: new Date(1579126860000),
          votes: 0,
        },
      ]);
    });
    test('returns an array', () => {
      const input = [
        {
          title: 'Am I a cat?',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          created_at: new Date(1579126860000),
          votes: 0,
        },
      ];
      const test = formattedArticles(input);
      expect(Array.isArray(test)).toBe(true);
    });
    test('returns a nested array', () => {
      const input = [
        {
          title: 'Am I a cat?',
          topic: 'mitch',
          author: 'icellusedkars',
          body: 'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          created_at: new Date(1579126860000),
          votes: 0,
        },
      ];
      const test = formattedArticles(input);
      expect(test).toEqual([
        [
          'Am I a cat?',
          'Having run out of ideas for articles, I am staring at the wall blankly, like a cat. Does this make me a cat?',
          0,
          'mitch',
          'icellusedkars',
          new Date(1579126860000),
        ],
      ]);
    });
  });
});


