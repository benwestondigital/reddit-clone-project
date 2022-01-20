const { selectEndpoints } = require('../2. models/endpoints.model');

exports.getEndpoints = async (req, res, next) => {
  try {
    const endpoints = await selectEndpoints();
    res.status(200).send({ endpoints });
  } catch (err) {
    next(err);
  }
};
