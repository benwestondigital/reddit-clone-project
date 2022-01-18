const db = require('../db/connection');

exports.selectArticles = async () => {
  const { rows } = await db.query(`
  SELECT articles.*, COUNT(comment_id) AS comment_count
  FROM articles
  JOIN comments
  on articles.article_id = comments.article_id
  GROUP BY articles.article_id`);
  return rows;
};


