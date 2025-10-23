const {
  selectCommentsFromArticle,
  insertCommentOnArticle,
} = require("../models/comments.js");

const getCommentsFromArticle = async (req, res) => {
  const { article_id } = req.params;
  const rows = await selectCommentsFromArticle(article_id);
  res.status(200).send({ comments: rows });
};

const postCommentOnArticle = async (req, res) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const rows = await insertCommentOnArticle(article_id, username, body);
  res.status(201).send({ comment: rows[0] });
};

module.exports = { getCommentsFromArticle, postCommentOnArticle };
