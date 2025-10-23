const db = require("../db/connection.js");

async function selectCommentsFromArticle(article_id) {
  const { rows } = await db.query(
    `
    SELECT * FROM comments
      WHERE article_id = $1
    ORDER BY created_at DESC;
    `,
    [article_id]
  );
  return rows;
}

async function insertCommentOnArticle(article_id, username, body) {
  const { rows } = await db.query(
    `
    INSERT INTO comments (article_id, body, votes, author, created_at)
    VALUES
    ($1, $2, DEFAULT, $3, DEFAULT)
    RETURNING *;
    `,
    [article_id, body, username]
  );
  return rows[0];
}

module.exports = { selectCommentsFromArticle, insertCommentOnArticle };
