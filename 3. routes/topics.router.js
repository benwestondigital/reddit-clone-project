const express = require('express');
const { getTopics } = require('../1. controllers/topics.controller');

const topicRouter = express.Router();

topicRouter.route('/').get(getTopics);

module.exports = topicRouter;
