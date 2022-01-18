const db = require('../db/connection');

exports.selectArticles = async () => {
  const { rows } = await db.query(`
  SELECT articles.*, COUNT(comment_id) AS comment_count
  FROM articles
  JOIN comments
  ON articles.article_id = comments.article_id
  GROUP BY articles.article_id`);
  return rows;
};

exports.selectArticleById = async article_id => {
  const { rows } = await db.query(
    `
  SELECT articles.*, COUNT(comment_id) AS comment_count
  FROM articles
  JOIN comments
  ON articles.article_id = comments.article_id
  WHERE articles.article_id = $1
  GROUP BY articles.article_id;
  `,
    [article_id]
  );
  const article = rows[0];
  if (!article) {
    return Promise.reject({
      status: 404,
      msg: `No article found for article_id: ${article_id}`,
    });
  }
  return article;
};
