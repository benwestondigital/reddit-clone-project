const express = require('express');
const {
  getArticles,
  getArticleById,
  patchArticleById,
  getArticleCommentsById,
  postArticleCommentById
} = require('../1. controllers/articles.controller.js');

const articleRouter = express.Router();

articleRouter.get('', getArticles);
articleRouter.get('/:article_id', getArticleById);
articleRouter.patch('/:article_id', patchArticleById);
articleRouter.get('/:article_id/comments', getArticleCommentsById);
articleRouter.post('/:article_id/comments', postArticleCommentById)

module.exports = articleRouter;
