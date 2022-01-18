const express = require('express');
const topicRouter = require('./topics.router');
const articleRouter = require('./articles.router');

const apiRouter = express.Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);

//GET /api

module.exports = apiRouter;
