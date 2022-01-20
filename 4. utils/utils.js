const db = require('../db/connection');
const format = require('pg-format');

exports.formattedTopics = topicData => {
  return topicData.map(topic => {
    return [topic.slug, topic.description];
  });
};

exports.formattedUsers = userData => {
  return userData.map(user => {
    return [user.username, user.avatar_url, user.name];
  });
};

exports.formattedArticles = articleData => {
  return articleData.map(article => {
    return [
      article.title,
      article.body,
      article.votes,
      article.topic,
      article.author,
      article.created_at,
    ];
  });
};

exports.formattedComments = commentData => {
  return commentData.map(comment => {
    return [
      comment.author,
      comment.article_id,
      comment.votes,
      comment.created_at,
      comment.body,
    ];
  });
};

exports.checkExists = async (table, column, value) => {
  const queryStr = format(`SELECT * FROM %I WHERE %I = $1`, table, column);
  const dbOutput = await db.query(queryStr, [value]);

  if (!dbOutput.rows.length) {
    return Promise.reject({ status: 404, msg: 'Resource not found' });
  }
};
