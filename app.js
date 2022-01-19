const express = require('express');
const apiRouter = require('./3. routers/api.router');

const app = express();

app.use(express.json());

app.use('/api', apiRouter);

app.all('*', (req, res) => {
  res.status(404).send({ msg: 'Invalid URL' });
});

app.use((err, req, res, next) => {
  const psqlErrorCodes = ['22P02', '23502', '23503'];
  if (psqlErrorCodes.includes(err.code)) {
    res.status(400).send({ msg: 'Bad Request' });
  } else next(err);
});

app.use((err, req, res, next) => {
  if (err.status && err.msg) {
    res.status(err.status).send({ msg: err.msg });
  } else next(err);
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(500).send({ msg: 'internal server error' });
});

module.exports = app;
