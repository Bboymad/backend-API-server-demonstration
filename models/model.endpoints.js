const endpoints = require('../endpoints.json')

exports.getAllEndpoints = () => {
  return new Promise((resolve, reject) => {
    try {
      resolve(endpoints);
    } catch (err) {
      reject(err);
    }
  });
};