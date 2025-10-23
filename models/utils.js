const db = require("../db/connection.js");

async function checkArticleExists(article_id) {
  const { rows } = await db.query(
    `
    SELECT * FROM articles
      WHERE article_id = $1
    `,
    [article_id]
  );
  if (rows.length === 0) {
    throw {
      status: 404,
      msg: `No article found for article_id: ${article_id}`,
    };
  }
}

module.exports = { checkArticleExists };
