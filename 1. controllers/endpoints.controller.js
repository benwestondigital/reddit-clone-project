const endpoints = require('../endpoints.json');
// change to fs.readFile?


exports.getEndpoints = async (req, res, next) => {
  try {
    res.status(200).send({ endpoints });
  } catch (err) {
    next(err);
  }
};
