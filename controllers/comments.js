const {
  selectCommentsFromArticle,
  insertCommentOnArticle,
  removeComment,
} = require("../models/comments.js");
const { checkExists } = require("../models/utils.js");

const getCommentsFromArticle = async (req, res) => {
  const { article_id } = req.params;
  const promises = [selectCommentsFromArticle(article_id)];
  if (article_id) {
    promises.push(checkExists("articles", "article_id", article_id));
  }
  const [commentsData] = await Promise.all(promises);
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
