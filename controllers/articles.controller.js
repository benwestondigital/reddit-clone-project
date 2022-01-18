const { selectArticles } = require('../models/articles.model');

exports.getArticles = async (req, res, next) => {
  const articles = await selectArticles();
  res.status(200).send({ articles });
};
