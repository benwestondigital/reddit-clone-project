const express = require('express');
const {
  getArticles,
  getArticleById,
  patchArticleById
} = require('../controllers/articles.controller.js');

const articleRouter = express.Router();

articleRouter.get('/', getArticles);
articleRouter.get('/:article_id', getArticleById);
articleRouter.patch('/:article_id', patchArticleById);

/* 
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments */

module.exports = articleRouter;
