const db = require('../db/connection');
const EndpointJSON = require('../endpoints.json')

exports.getAllEndpoints = (EndpointJSON) => {
  
    return db.query(
      `SELECT * FROM TABLES`, values
    ).then(({ rows }) => {
      console.log("All endpoints >>>", rows)
      if (rows.length === 0) {
        return Promise.reject({ status: 404, msg: 'topics not found.' });
      } else {
        return rows;
      }
    });
  };