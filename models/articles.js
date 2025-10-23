const db = require("../db/connection.js");

async function selectArticles() {
  const { rows } = await db.query(
    `
    SELECT articles.author,
           title, 
           articles.article_id,
           topic,
           articles.created_at,
           articles.votes,
           article_img_url,
           COUNT(comment_id) AS comment_count
    FROM articles
      LEFT JOIN comments
        ON articles.article_id = comments.article_id
    GROUP BY articles.article_id
    ORDER BY articles.created_at DESC;
    `
  );
  rows.forEach((article) => {
    article.comment_count = Number(article.comment_count);
  });
  return rows;
}

async function selectArticleFromId(id) {
  const { rows } = await db.query(
    `
    SELECT articles.*,
           COUNT(comments.comment_id) AS comment_count
    FROM articles
      LEFT JOIN comments
        ON articles.article_id = comments.article_id
      WHERE articles.article_id = $1
    GROUP BY articles.article_id;
    `,
    [id]
  );
  const article = rows[0];
  if (rows.length === 0) {
    throw { status: 404, msg: `No article found for article_id: ${id}` };
  }
  article.comment_count = Number(article.comment_count);
  return article;
}

async function updateArticleWithVotesFromId(id, votes) {
  const { rows } = await db.query(
    `
    UPDATE articles
      SET votes = votes + $1
        WHERE article_id = $2
    RETURNING *;
    `,
    [votes, id]
  );
  if (rows.length === 0) {
    throw { status: 404, msg: `No article found for article_id: ${id}` };
  }
  return rows[0];
}

module.exports = {
  selectArticles,
  selectArticleFromId,
  updateArticleWithVotesFromId,
};
