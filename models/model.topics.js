const db = require('../db/connection');

exports.getAllTopics = () => {
  return db.query('SELECT * FROM topics;')
  .then(({ rows }) => {
    console.log(rows)
    return rows
  });
};