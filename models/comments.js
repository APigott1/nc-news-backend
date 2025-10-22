const db = require("../db/connection.js");

async function selectCommentFromArticleId(article_id) {
  const { rows } = await db.query(
    `
    SELECT * FROM comments
      WHERE article_id = $1
    ORDER BY created_at DESC
    `,
    [article_id]
  );
  return rows;
}

module.exports = { selectCommentFromArticleId };
