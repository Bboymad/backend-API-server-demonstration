const { getAllTopics } = require('../models/model.topics');

exports.getTopics = (req, res, next) => {
  const { topics } = req.params;
  getAllTopics(topics).then((topics) => {
    res.status(200).send({ topics });
  })
  .catch((err) => 
  next(err))
};
