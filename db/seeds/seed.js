const db = require('../connection');
const format = require('pg-format');
const topics = require('../data/development-data/topics');

const seed = async data => {
  const { articleData, commentData, topicData, userData } = data;

  try {
    await db.query(`DROP TABLE IF EXISTS comments`);
    await db.query(`DROP TABLE IF EXISTS articles`);
    await db.query(`DROP TABLE IF EXISTS users`);
    await db.query(`DROP TABLE IF EXISTS topics`);

    // 1. create tables
    await db.query(`CREATE TABLE topics (
    slug VARCHAR(500) PRIMARY KEY,
    description VARCHAR(500) NOT NULL
  );`);

    await db.query(`CREATE TABLE users (
    username VARCHAR(500) PRIMARY KEY,
    avatar_url VARCHAR(500) NOT NULL,
    name VARCHAR(500) NOT NULL
    );`);

    await db.query(`CREATE TABLE articles (
    article_id SERIAL PRIMARY KEY,
    title VARCHAR(500) NOT NULL,
    BODY VARCHAR(500) NOT NULL,
    VOTES INT DEFAULT 0,
    TOPIC VARCHAR(500) REFERENCES topics(slug),
    AUTHOR VARCHAR(500) REFERENCES users(username),
    CREATED_AT TIMESTAMP DEFAULT CURRENT_TIMESTAMP
  );`);

    await db.query(`CREATE TABLE comments (
    comment_id SERIAL PRIMARY KEY,
    author VARCHAR(500) REFERENCES users(username),
    article_id INT REFERENCES articles(article_id),
    votes INT DEFAULT 0,
    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    BODY VARCHAR(500) NOT NULL
  );`);
  } catch (error) {
    console.log(error);
  }

  // 2. insert data
};

module.exports = seed;
