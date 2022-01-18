const { selectArticles, selectArticleById } = require('../models/articles.model');

exports.getArticles = async (req, res, next) => {
  const articles = await selectArticles();
  res.status(200).send({ articles });
};

exports.getArticleById = async (req, res, next) => {
  const { article_id } = req.params;
  const article = await selectArticleById(article_id);
  res.status(200).send({ article });
};
