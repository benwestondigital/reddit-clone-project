const { selectTopics } = require('../models/news.model');

exports.getTopics = async (req, res, next) => {
  const topics = await selectTopics();
  res.status(200).send({ topics });
};
