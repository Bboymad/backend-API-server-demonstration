const { getAllTopics } = require('../models/model.topics');

exports.getTopics = (req, res, next) => {
  const { topics } = req.params;
  getAllTopics(topics).then((topics) => {
    if (topics.length === 0) {
    res.status(400).send({ msg: "No topics found." })
    }
    else {res.status(200).send({ topics })}
  })
  .catch((err) => 
  next(err))
};
