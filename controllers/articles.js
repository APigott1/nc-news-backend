const {
  selectArticles,
  selectArticleFromId,
} = require("../models/articles.js");

const getArticles = async (req, res) => {
  const articlesData = await selectArticles();
  res.status(200).send({ articles: articlesData });
};

const getArticleFromId = async (req, res) => {
  const id = req.params.article_id;
  const articleData = await selectArticleFromId(id);
  res.status(200).send({ article: articleData });
};

module.exports = { getArticles, getArticleFromId };
