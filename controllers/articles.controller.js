const {
  selectArticles,
  selectArticleById,
  updateArticleVotesById,
  selectArticleCommentsById,
} = require('../models/articles.model');

exports.getArticles = async (req, res, next) => {
  try {
    const articles = await selectArticles();
    res.status(200).send({ articles });
  } catch (err) {
    next(err);
  }
};

exports.getArticleById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const article = await selectArticleById(article_id);
    res.status(200).send({ article });
  } catch (err) {
    next(err);
  }
};

exports.patchArticleById = async (req, res, next) => {
  try {
    const paramKeys = Object.keys(req.body);
    if (paramKeys.some(element => element !== 'inc_votes')) {
      next({ status: 400, msg: 'Bad Request' });
    } else {
      const { article_id } = req.params;
      const { inc_votes } = req.body;
      const article = await updateArticleVotesById(article_id, inc_votes);
      res.status(200).send({ article });
    }
  } catch (err) {
    next(err);
  }
};

exports.getArticleCommentsById = async (req, res, next) => {
  try {
    const { article_id } = req.params;
    const comments = await selectArticleCommentsById(article_id);
    res.status(200).send({ comments });
  } catch (err) {
    next(err);
  }
};
