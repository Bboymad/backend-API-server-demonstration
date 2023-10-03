const db = require('../db/connection');

exports.getAllTopics = () => {
  return db.query('SELECT * FROM topics;')
  .then(({ rows }) => {
    if (rows.length > 0) {
    return rows
    }
  });
};