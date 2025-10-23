const {
  selectCommentsFromArticle,
  insertCommentOnArticle,
} = require("../models/comments.js");

const getCommentsFromArticle = async (req, res) => {
  const { article_id } = req.params;
  const commentsData = await selectCommentsFromArticle(article_id);
  res.status(200).send({ comments: commentsData });
};

const postCommentOnArticle = async (req, res) => {
  const { article_id } = req.params;
  const { username, body } = req.body;
  const commentData = await insertCommentOnArticle(article_id, username, body);
  res.status(201).send({ comment: commentData });
};

module.exports = { getCommentsFromArticle, postCommentOnArticle };
