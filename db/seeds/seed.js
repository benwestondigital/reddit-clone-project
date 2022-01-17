const db = require('../connection');
const format = require('pg-format');
const {
  formattedTopics,
  formattedUsers,
  formattedArticles,
} = require('../../utils/utils');

const seed = async data => {
  const { articleData, commentData, topicData, userData } = data;

  try {
    await db.query(`DROP TABLE IF EXISTS comments, articles, users, topics`);

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

    // 2. insert data

    //topics
    const formatTopic = formattedTopics(topicData);
    const topicSql = format(
      `INSERT INTO topics
      (slug, description)
      VALUES %L
      RETURNING *;`,
      formatTopic
    );
    const topics = await db.query(topicSql);
    const topicRows = topics.rows;

    //users
    const formatUser = formattedUsers(userData);
    const userSql = format(
      `INSERT INTO users
      (username, avatar_url, name)
      VALUES %L
      RETURNING *;`,
      formatUser
    );
    const users = await db.query(userSql);
    const userRows = users.rows;

    //articles
    const formatArticles = formattedArticles(articleData);
    const articleSql = format(
      `INSERT INTO articles
      (title, body, votes, topic, author, created_at)
      VALUES %L
      RETURNING *;`,
      formatArticles
    );
    const articles = await db.query(articleSql);
    const articleRows = articles.rows;

    //comments
  } catch (error) {
    console.log(error);
  }
};

module.exports = seed;
