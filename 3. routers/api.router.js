const express = require('express');
const topicRouter = require('./topics.router');
const articleRouter = require('./articles.router');
const commentRouter = require('./comments.router');

const apiRouter = express.Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);

//GET /api

module.exports = apiRouter;
