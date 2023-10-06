const { getArticle } = require('../models/model.articles');

exports.getArticleId = (req, res, next) => {
  const { article_id } = req.params
    getArticle(article_id)
    .then((article) => {
      res.status(200).send({ article })
    })
    .catch((err) => 
    next(err))
  };