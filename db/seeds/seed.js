const db = require('../connection');
const format = require('pg-format');
const {
  formattedTopics,
  formattedUsers,
  formattedArticles,
  formattedComments,
} = require('../../utils/utils');

const seed = async data => {
  const { articleData, commentData, topicData, userData } = data;

  try {
    await db.query(`DROP TABLE IF EXISTS comments, articles, users, topics`);

    await db.query(`CREATE TABLE topics (
    slug VARCHAR(50) PRIMARY KEY,
    description VARCHAR(500) NOT NULL
  );`);

    await db.query(`CREATE TABLE users (
    username VARCHAR(50) PRIMARY KEY,
    avatar_url VARCHAR(500) NOT NULL,
    name VARCHAR(500) NOT NULL
    );`);

    await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    body TEXT NOT NULL,
    votes INT DEFAULT 0,
    topic VARCHAR(500) REFERENCES topics(slug),
    author VARCHAR(500) REFERENCES users(username),
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

    await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(500) REFERENCES users(username),
    article_id INT REFERENCES articles(article_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    body VARCHAR(500) NOT NULL
  );`);

    await insertTopics();
    await insertUsers();
    await InsertArticles();
    await InsertComments();

  } catch (error) {
    console.log(error);
  }

  async function insertTopics() {
    const formatTopic = formattedTopics(topicData);
    const sql = format(
      `INSERT INTO topics
      (slug, description)
      VALUES %L
      RETURNING *;`,
      formatTopic
    );
    await db.query(sql);
  }

  async function insertUsers() {
    const formatUser = formattedUsers(userData);
    const sql = format(
      `INSERT INTO users
      (username, avatar_url, name)
      VALUES %L
      RETURNING *;`,
      formatUser
    );
    await db.query(sql);
  }

  async function InsertArticles() {
    const formatArticles = formattedArticles(articleData);
    const sql = format(
      `INSERT INTO articles
      (title, body, votes, topic, author, created_at)
      VALUES %L
      RETURNING *;`,
      formatArticles
    );
    await db.query(sql);
  }

  async function InsertComments() {
    const formatComments = formattedComments(commentData);
    const sql = format(
      `INSERT INTO comments
      (author, article_id, votes, created_at, body)
      VALUES %L
      RETURNING *;`,
      formatComments
    );
    await db.query(sql);
  }
};

module.exports = seed;
