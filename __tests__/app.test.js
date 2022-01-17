const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('GET /api/topics', () => {
  test('200 - responds with an array of topics', async () => {
    const test = await request(app)
    .get('/api/topics')
    .expect(200);
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