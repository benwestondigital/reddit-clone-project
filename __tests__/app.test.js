const db = require('../db/connection.js');
const testData = require('../db/data/test-data/index.js');
const seed = require('../db/seeds/seed.js');
const request = require('supertest');
const app = require('../app');

beforeEach(() => seed(testData));
afterAll(() => db.end());

describe('/invalid_url endpoint', () => {
  test('ERROR - 404 and message', async () => {
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
      expect(topics).toHaveLength(3);
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
      expect(articles).toHaveLength(12);
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
    test('200 - sorts the data by default of date in desc order', async () => {
      const test = await request(app).get('/api/articles').expect(200);
      const articles = test.body.articles;
      expect(articles).toBeSortedBy('created_at', { descending: true });
    });
    test('200 - sorts by any single valid column passed in as query', async () => {
      const test = await request(app)
        .get('/api/articles?sort_by=author')
        .expect(200);
      const articles = test.body.articles;
      expect(articles).toBeSortedBy('author', { descending: true });
    });
    test('ERROR: 400 - returns error when passed invalid sort_by query', async () => {
      const test = await request(app)
        .get('/api/articles?sort_by=invalidquery')
        .expect(400);
      const errorMsg = test.body.msg;
      expect(errorMsg).toBe('Invalid sort query');
    });
    test('200 - changes sort_by order when passed valid order query', async () => {
      const test = await request(app)
        .get('/api/articles?order=asc')
        .expect(200);
      const articles = test.body.articles;
      expect(articles).toBeSortedBy('created_at', { ascending: true });
    });
    test('ERROR: 400 - returns error when passed invalid order query', async () => {
      const test = await request(app)
        .get('/api/articles?order=invalidquery')
        .expect(400);
      const errorMsg = test.body.msg;
      expect(errorMsg).toBe('Invalid order query');
    });
    test('200 - filters articles when passed valid topic query', async () => {
      const test = await request(app)
        .get('/api/articles?topic=mitch')
        .expect(200);
      const articles = test.body.articles;
      expect(articles).toHaveLength(11);
      articles.forEach(article => {
        expect(article.topic).toBe('mitch');
      });
    });
    test('200 - returns empty array when topic exists but no articles associated with it', async () => {
      const test = await request(app)
        .get('/api/articles?topic=paper')
        .expect(200);
      const emptyArticles = test.body.articles;
      expect(emptyArticles).toEqual([]);
    });
    test('ERROR: 404 - returns error when passed invalid topic query', async () => {
      const test = await request(app)
        .get('/api/articles?topic=invalidtopic')
        .expect(404);
      const errorMsg = test.body.msg;
      expect(errorMsg).toBe('Resource not found');
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
    test('ERROR - 400 Bad Request - malformed body / missing required fields', async () => {
      const invalidVotes = {};
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('ERROR - 400 Bad Request - malformed body - other properties included on request body', async () => {
      const invalidVotes = { inc_votes: 1, name: 'Mitch' };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('ERROR - 400 Bad Request - incorrect value type / failing schema validation', async () => {
      const invalidVotes = { inc_votes: 'cat' };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('ERROR - 400 Bad Request - incorrect key / failing schema validation', async () => {
      const invalidVotes = { invalid_key: 1 };
      const test = await request(app)
        .patch('/api/articles/1')
        .send(invalidVotes)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('ERROR - 404 Not Found - invalid article id', async () => {
      const invalidVotes = { inc_votes: 1 };
      const test = await request(app)
        .patch('/api/articles/999')
        .send(invalidVotes)
        .expect(404);
      expect(test.body.msg).toBe('Resource not found');
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
      expect(comments).toHaveLength(11);
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
    test('200: returns empty array for valid article_id with no comments', async () => {
      const test = await request(app)
        .get('/api/articles/2/comments')
        .expect(200);
      const comments = test.body.comments;
      expect(comments).toEqual([]);
    });
    test('ERROR - 404: Resource Not Found - article_id does not exist', async () => {
      const test = await request(app)
        .get('/api/articles/999/comments')
        .expect(404);
      expect(test.body.msg).toBe('Resource not found');
    });
    test('ERROR - 400: Bad Request - invalid article_id type', async () => {
      const test = await request(app)
        .get('/api/articles/not-an-id/comments')
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
  });
  describe('POST', () => {
    test('201: adds comment with username and body and returns posted comment', async () => {
      const newComment = {
        username: 'butter_bridge',
        body: 'this is a great comment',
      };
      const addedComment = {
        comment_id: 19,
        author: 'butter_bridge',
        article_id: 1,
        votes: 0,
        created_at: expect.any(String),
        body: 'this is a great comment',
      };
      const test = await request(app)
        .post('/api/articles/1/comments')
        .send(newComment)
        .expect(201);
      expect(test.body.comment).toEqual(addedComment);
    });
    test('ERROR 400 Bad Request - malformed body / missing required fields', async () => {
      const invalidComment = {};
      const test = await request(app)
        .post('/api/articles/1/comments')
        .send(invalidComment)
        .expect(400);
      expect(test.body.msg).toBe('Bad Request');
    });
    test('ERROR - 404 Bad Request - username not found', async () => {
      const invalidComment = { username: 'Ben', body: 'Hello' };
      const test = await request(app)
        .post('/api/articles/1/comments')
        .send(invalidComment)
        .expect(404);
      expect(test.body.msg).toBe('Resource not found');
    });
  });
});

describe('/api/comments/:comment_id', () => {
  describe('DELETE', () => {
    test('204: delete comment by corresponding comment_id ', async () => {
      await request(app).delete('/api/comments/1').expect(204);
    });
    test("ERROR: 404: comment_id doesn't exist", async () => {
      await request(app).delete('/api/comments/999').expect(404);
    });
  });
});

describe('/api', () => {
  describe('GET', () => {
    test('responds with JSON describing all the endpoints', async () => {
      const test = await request(app).get('/api').expect(200);
      const endpoints = test.body.endpoints;
    });
  });
});
