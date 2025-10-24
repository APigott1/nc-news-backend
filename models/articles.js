const db = require("../db/connection.js");
const { format } = require("node-pg-format");

async function selectArticles(sort_by = "created_at", order = "DESC", topic) {
  const queryValues = [];
  const allowedOrder = ["DESC", "ASC"];
  const orderInUpper = order.toUpperCase();

  if (!allowedOrder.includes(orderInUpper)) {
    throw { status: 400, msg: `Invalid order ${order}` };
  }

  let queryStr = `
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
    `;

  if (topic) {
    queryStr += ` WHERE topic = $1`;
    queryValues.push(topic);
  }

  queryStr += format(
    `
    GROUP BY articles.article_id
    ORDER BY %I %s;
    `,
    sort_by,
    orderInUpper
  );

  const { rows } = await db.query(queryStr, queryValues);
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
  const [article] = rows;
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
  const [article] = rows;
  if (rows.length === 0) {
    throw { status: 404, msg: `No article found for article_id: ${id}` };
  }
  return article;
}

module.exports = {
  selectArticles,
  selectArticleFromId,
  updateArticleWithVotesFromId,
};
