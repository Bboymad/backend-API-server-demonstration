const express = require('express');
const app = express();
const { getTopics } = require('./controllers/controller.topics')
const {
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require('./errors/errors-controller')

app.get('/api/topics', getTopics);


app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
  
module.exports = app;