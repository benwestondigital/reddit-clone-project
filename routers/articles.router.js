const express = require('express');
const { getArticles, getArticleById } = require('../controllers/articles.controller.js');

const articleRouter = express.Router();

articleRouter.get('/', getArticles);
articleRouter.get('/:article_id', getArticleById);

/* 
PATCH /api/articles/:article_id
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments */

module.exports = articleRouter;
