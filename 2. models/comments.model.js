const db = require('../db/connection');

exports.selectCommentsByArticle = async () => {
    const { rows } = await db.query(
        `SELECT * FROM comments
         WHERE `);
  };