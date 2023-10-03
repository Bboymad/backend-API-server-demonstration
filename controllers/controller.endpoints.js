const {getAllEndpoints } = require('../models/model.topics');

exports.getEndpoints = (req, res, next) => {
    const params = req.params
      getAllEndpoints(req.params)
        .then((allEndpoints) => {
          console.log(allEndpoints)
          res.status(200).send({ allEndpoints });
        })
        .catch(next);
    };