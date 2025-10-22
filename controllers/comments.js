const {
  selectCommentFromArticleId,
  insertCommentOnArticle,
} = require("../models/comments.js");

const getCommentsFromArticleId = async (req, res) => {
  const { article_id } = req.params;
  const rows = await selectCommentFromArticleId(article_id);
  res.status(200).send({ comments: rows });
};

const postCommentOnArticle = async (req, res) => {
  const { article_id } = req.params;
  const { username, comment_body } = req.body;
  const rows = await insertCommentOnArticle(article_id, username, comment_body);
  res.status(201).send({ comment: rows[0] });
};

module.exports = { getCommentsFromArticleId, postCommentOnArticle };
