const db = require('../db/connection');

exports.getAllTopics = () => {
  const values = []
  return db.query(
    `SELECT slug, description FROM topics`, values
  ).then(({ rows }) => {
    if (rows.length === 0) {
      return Promise.reject({ status: 404, msg: 'topics not found.' });
    } else {
      return rows;
    }
  });
};