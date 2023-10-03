const { getAllEndpoints } = require('../models/model.endpoints')

exports.getEndpoints = (req, res, next) => {
      getAllEndpoints()
        .then((allEndpoints) => {
          res.json(allEndpoints);
        })
        .catch((err) => 
        next(err))
    };