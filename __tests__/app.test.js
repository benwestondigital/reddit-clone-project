const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('ERROR /invalid_url endpoint', () => {
  test('404 and message', async () => {
    const test = await request(app).get('/invalid_url').expect(404);
    expect(test.body.msg).toBe('Invalid URL');
  });
});

describe('/api/topics', () => {
  describe('GET', () => {
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
});

describe('/api/articles', () => {
  describe('GET', () => {
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
});

describe('/api/articles/:article_id', () => {
  describe('GET', () => {
    test('200 - responds with article object with article_id corresponding to the parameter', async () => {
      const test = await request(app).get('/api/articles/3').expect(200);
      const article = test.body.article;
      expect(article).toBeInstanceOf(Object);
      expect(article).toEqual({
        article_id: 3,
        title: 'Eight pug gifs that remind me of mitch',
        body: 'some gifs',
        votes: 0,
        topic: 'mitch',
        author: 'icellusedkars',
        created_at: '2020-11-03T09:12:00.000Z',
        comment_count: '2',
      });
    });
    test('ERROR: 404 - resource not found', async () => {
      const test = await request(app).get('/api/articles/999').expect(404);
      expect(test.body.msg).toBe('No article found for article_id: 999');
    });
    test('ERROR: 400 - bad request', async () => {
      const test = await request(app).get('/api/articles/notAnId').expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
  });
  describe('PATCH', () => {
    const article = {
      article_id: 1,
      title: 'Living in the shadow of a great man',
      body: 'I find this existence challenging',
      votes: 100,
      topic: 'mitch',
      author: 'butter_bridge',
      created_at: '2020-07-09T20:11:00.000Z',
      comment_count: '11',
    };
    test('200 - positively increments the article votes and responds with the updated article ', async () => {
      const votes = { inc_votes: 1 };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(votes)
        .expect(200);
      expect(test.body.article).toEqual({
        article_id: 1,
        title: 'Living in the shadow of a great man',
        body: 'I find this existence challenging',
        votes: 101,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: '2020-07-09T20:11:00.000Z',
      });
    });
    test('200 - decrements the article votes below 0 and responds with the updated article ', async () => {
      const votes = { inc_votes: -500 };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(votes)
        .expect(200);
      expect(test.body.article).toEqual({
        article_id: 1,
        title: 'Living in the shadow of a great man',
        body: 'I find this existence challenging',
        votes: -400,
        topic: 'mitch',
        author: 'butter_bridge',
        created_at: '2020-07-09T20:11:00.000Z',
      });
    });
    test('400 Bad Request - malformed body / missing required fields', async () => {
      const invalidVotes = {};
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('400 Bad Request - malformed body - other properties included on request body', async () => {
      const invalidVotes = { inc_votes: 1, name: 'Mitch' };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('400 Bad Request - incorrect type / failing schema validation', async () => {
      const invalidVotes = { inc_votes: 'cat' };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
  });
});

describe('/api/articles/:article_id/comments', () => {
  describe('GET', () => {
    test('200: returns array of comments for corresponding article_id', async () => {
      const test = await request(app)
        .get('/api/articles/1/comments')
        .expect(200);
      const comments = test.body.comments;
      expect(comments).toBeInstanceOf(Array);
      comments.forEach(comment => {
        expect(comment).toMatchObject({
          comment_id: expect.any(Number),
          votes: expect.any(Number),
          created_at: expect.any(String),
          author: expect.any(String),
          body: expect.any(String),
        });
      });
    });
    test('ERROR - 404: Resource Not Found', async () => {
      const test = await request(app).get('/api/articles/999/comments').expect(404);
      expect(test.body.msg).toBe('No comments found for article_id: 999');
    });
  });
});
