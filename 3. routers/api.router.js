const express = require('express');
const topicRouter = require('./topics.router');
const articleRouter = require('./articles.router');
const commentRouter = require('./comments.router');
const { getEndpoints } = require('../1. controllers/endpoints.controller');

const apiRouter = express.Router();

apiRouter.use('/topics', topicRouter);
apiRouter.use('/articles', articleRouter);
apiRouter.use('/comments', commentRouter);

apiRouter.get('/', getEndpoints);


module.exports = apiRouter;
