const express = require('express');
const app = express();
const { getTopics } = require('./controllers/controller.topics')
const { getEndpoints } = require('./controllers/controller.endpoints');
const {
  invalidEndpoint,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require('./errors/errors-controller');

app.get('/api/topics', getTopics);

app.get('/api', getEndpoints)

app.all("*", invalidEndpoint)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
  
module.exports = app;