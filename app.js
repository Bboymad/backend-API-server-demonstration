const express = require('express');
const app = express();
const { getTopics } = require('./controllers/controller.topics')
const { getEndpoints } = require('./controllers/controller.endpoints');
const { getArticleId } = require('./controllers/controller.articles')

const {
  invalidEndpoint,
  handleCustomErrors,
  handlePsqlErrors,
  handleServerErrors,
} = require('./errors/errors-controller');

app.use(express.json());

app.get('/api/topics', getTopics);

app.get('/api', getEndpoints)

app.get('/api/articles/:article_id', getArticleId)

// app.get('/api/articles', getAllArticles)

app.all("*", invalidEndpoint)

app.use(handleCustomErrors);
app.use(handlePsqlErrors);
app.use(handleServerErrors);
  
module.exports = app;