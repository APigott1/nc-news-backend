const {
  selectArticles,
  selectArticleFromId,
} = require("../models/articles.js");

const getArticles = async (req, res) => {
  const rows = await selectArticles();
  res.status(200).send({ articles: rows });
};

const getArticleFromId = async (req, res) => {
  const id = req.params.article_id;
  const rows = await selectArticleFromId(id);
  res.status(200).send({ article: rows[0] });
};

module.exports = { getArticles, getArticleFromId };
