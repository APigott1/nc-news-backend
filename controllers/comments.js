const {
  selectCommentsFromArticle,
  insertCommentOnArticle,
  removeComment,
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

const deleteComment = async (req, res) => {
  const { comment_id } = req.params;
  await removeComment(comment_id);
  res.status(204).send();
};

module.exports = {
  getCommentsFromArticle,
  postCommentOnArticle,
  deleteComment,
};
