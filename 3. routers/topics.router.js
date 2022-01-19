const express = require('express');
const { getTopics } = require('../1. controllers/topics.controller');

const topicRouter = express.Router();

// GET /api/topics

topicRouter.get('/', getTopics);

module.exports = topicRouter;
