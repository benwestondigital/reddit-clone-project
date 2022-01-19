const express = require('express');
const { deleteCommentById } = require('../1. controllers/comments.controller');

const commentRouter = express.Router();

commentRouter.delete('/:comment_id', deleteCommentById);

module.exports = commentRouter;
