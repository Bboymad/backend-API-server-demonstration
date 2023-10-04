const db = require('../db/connection');

exports.getArticle = (article_id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1;',[article_id])
  .then(({ rows }) => {
    console.log(rows)
    return rows
  });
};