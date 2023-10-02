const { getAllTopics } = require('../model/model');

exports.getTopics = (req, res, next) => {
  const params = req.params
    getAllTopics(req.params)
      .then((allTopics) => {
        console.log(allTopics)
        res.status(200).send({ allTopics });
      })
      .catch(next);
  };