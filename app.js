const express = require('express');
const logger = require('morgan');
const loggerConfig = require('./configs/morgan.config');
const bodyParser = require('body-parser');
const app = express();

const errorsRoutes = require('./routes/errors.route');

loggerConfig.setup(logger);
app.use(logger(loggerConfig.log));
app.use(logger(loggerConfig.streamLog, { stream: loggerConfig.stream }));

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.raw());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/errors', errorsRoutes);

app.use(function (req, res, next) {
  res.status(200).send();
});

app.use(function(err, req, res, next) {
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  res.status(err.status || 500);
  res.json(err);
});

module.exports = app;
