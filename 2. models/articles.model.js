const db = require('../db/connection');
const { checkExists } = require('../4. utils/utils');

exports.selectArticles = async (
  sort_by = 'created_at',
  order = 'desc',
  topic
) => {
  // prettier-ignore
  const allowedSortColumns = ['article_id','title','body','votes','topic','author','created_at','comment_count'];

  const allowedSortOrder = ['asc', 'desc'];

  if (!allowedSortColumns.includes(sort_by)) {
    return Promise.reject({ status: 400, msg: 'Invalid sort query' });
  }

  if (!allowedSortOrder.includes(order)) {
    return Promise.reject({ status: 400, msg: 'Invalid order query' });
  }

  let queryStr1 = `
  SELECT articles.*, COUNT(comment_id) AS comment_count
  FROM articles
  JOIN comments
  ON articles.article_id = comments.article_id`;

  const queryStr2 = ` 
  GROUP BY articles.article_id
  ORDER BY ${sort_by} ${order};`;

  const queryValues = [];

  if (topic) {
    queryValues.push(topic);
    queryStr1 += ` WHERE topic = $1`;
  }

  const queryStr = queryStr1 + queryStr2;

  const { rows } = await db.query(queryStr, queryValues);
  const articles = rows;

  if (!articles.length) {
    await checkExists('topics', 'slug', topic);
  }

  return articles;
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

exports.updateArticleVotesById = async (article_id, inc_votes) => {
  const { rows } = await db.query(
    `UPDATE articles
    SET votes = votes + $2
    WHERE article_id = $1
    RETURNING *
    ;`,
    [article_id, inc_votes]
  );
  const article = rows[0];
  return article;
};

exports.selectArticleCommentsById = async article_id => {
  const { rows } = await db.query(
    `
    SELECT * FROM comments
    WHERE article_id = $1
  ;`,
    [article_id]
  );
  const comments = rows;
  if (comments.length === 0) {
    return Promise.reject({
      status: 404,
      msg: `No comments found for article_id: ${article_id}`,
    });
  }
  return comments;
};

exports.insertCommentByArticleId = async (article_id, username, body) => {
  const { rows } = await db.query(
    `
  INSERT INTO comments
  (article_id, author, body)
  VALUES ($1, $2, $3)
  RETURNING *;`,
    [article_id, username, body]
  );
  const comment = rows[0];
  return comment;
};
