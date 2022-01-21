const express = require('express');
const apiRouter = require('./3. routes/api.router');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Invalid URL' });
});

app.use((err, req, res, next) => {
  const psqlErrorCodes = ['22P02', '23502'];
  if (psqlErrorCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
  } else if (['23503'].includes(err.code)) {
    res.status(404).send({ msg: 'Resource not found' });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
