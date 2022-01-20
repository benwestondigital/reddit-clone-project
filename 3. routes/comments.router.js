const express = require('express');
const { deleteCommentById } = require('../1. controllers/comments.controller');

const commentRouter = express.Router();

commentRouter.route('/:comment_id')
.delete(deleteCommentById)

module.exports = commentRouter;
