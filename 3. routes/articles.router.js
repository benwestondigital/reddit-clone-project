const express = require('express');
const {
  getArticles,
  getArticleById,
  patchArticleById,
  getArticleCommentsById,
  postArticleCommentById,
} = require('../1. controllers/articles.controller.js');

const articleRouter = express.Router();

articleRouter.get('', getArticles);

articleRouter
  .route('/:article_id')
  .get(getArticleById)
  .patch(patchArticleById);

articleRouter
  .route('/:article_id/comments')
  .get(getArticleCommentsById)
  .post(postArticleCommentById);

module.exports = articleRouter;
