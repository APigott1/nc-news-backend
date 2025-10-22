const { selectCommentFromArticleId } = require("../models/comments.js");

const getCommentsFromArticleId = async (req, res) => {
  const { article_id } = req.params;
  const rows = await selectCommentFromArticleId(article_id);
  res.status(200).send({ comments: rows });
};

module.exports = { getCommentsFromArticleId };
