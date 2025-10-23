const {
  selectArticles,
  selectArticleFromId,
} = require("../models/articles.js");

const getArticles = async (req, res) => {
  const articlesData = await selectArticles();
  res.status(200).send({ articles: articlesData });
};

const getArticleFromId = async (req, res) => {
  const { article_id } = req.params;
  const articleData = await selectArticleFromId(article_id);
  res.status(200).send({ article: articleData });
};

module.exports = { getArticles, getArticleFromId };
