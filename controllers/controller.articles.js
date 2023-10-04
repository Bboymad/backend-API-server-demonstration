const { getArticle } = require('../models/model.articles');

exports.getArticleId = (req, res, next) => {
  const { article_id } = req.params
    getArticle(article_id)
    .then((article) => {
      if (!article) {
        res.status(404).send({ msg: 'Article not found' })
      } else {
        res.status(200).send({ article })
      }
    })
    .catch((err) => 
    next(err))
  };