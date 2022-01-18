const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('200 - responds with an array of topic objects', async () => {
    const test = await request(app).get('/api/topics').expect(200);
    const topics = test.body.topics;
    expect(topics).toBeInstanceOf(Array);
    topics.forEach(topic => {
      expect(topic).toMatchObject({
        slug: expect.any(String),
        description: expect.any(String),
      });
    });
  });
});

describe('GET /api/articles', () => {
  test('200 - responds with array of article objects', async () => {
    const test = await request(app).get('/api/articles').expect(200);
    const articles = test.body.articles;
    expect(articles).toBeInstanceOf(Array);
    articles.forEach(article => {
      expect(article).toMatchObject({
        author: expect.any(String),
        title: expect.any(String),
        article_id: expect.any(Number),
        topic: expect.any(String),
        created_at: expect.any(String),
        votes: expect.any(Number),
        comment_count: expect.any(String),
      });
    });
  });
});
