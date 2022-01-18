const express = require('express');
const { getArticles } = require('../controllers/articles.controller.js');

const articleRouter = express.Router();

articleRouter.get('/', getArticles);

/* 
GET /api/articles
GET /api/articles/:article_id
PATCH /api/articles/:article_id
GET /api/articles/:article_id/comments
POST /api/articles/:article_id/comments */

module.exports = articleRouter;
