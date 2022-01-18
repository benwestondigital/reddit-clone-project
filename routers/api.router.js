const express = require('express');
const topicRouter = require('./topics.router');

const apiRouter = express.Router();

apiRouter.use('/topics', topicRouter);



//GET /api 

module.exports = apiRouter;
