const { removeCommentById } = require('../2. models/comments.model');

exports.deleteCommentById = async (req, res, next) => {
  try {
    const { comment_id } = req.params;
    const deleteComment = await removeCommentById(comment_id);
    if (!deleteComment) {
      next({ status: 404, msg: 'Not found' });
    } else {
      res.sendStatus(204);
    }
  } catch (err) {
    next(err);
  }
};
