const db = require('../db/connection');

exports.getArticle = (id) => {
  return db.query('SELECT * FROM articles WHERE article_id = $1;', [id])
  .then(({ rows }) => {
    const article = rows[0]
    if (!article) {
      return Promise.reject({
        status: 404,
        msg: 'Article not found'
      });
    }
    return article
  });
};

exports.formatArticles = () => {
  return db.query(
    `SELECT 
      a.author,
      a.title,
      a.article_id,
      a.topic,
      a.created_at,
      a.votes,
      a.article_img_url, 
      COUNT(c.comment_id) AS comment_count 
    FROM 
      articles AS a 
    LEFT JOIN
      comments AS c
    ON
      a.article_id = c.article_id
    GROUP BY
      a.article_id
    ORDER BY
      a.created_at DESC;`)
      .then(({ rows }) => {
        return rows
      })
}