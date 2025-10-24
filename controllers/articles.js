const {
  selectArticles,
  selectArticleFromId,
  updateArticleWithVotesFromId,
} = require("../models/articles.js");

const getArticles = async (req, res) => {
  const { sort_by, order } = req.query;
  const articlesData = await selectArticles(sort_by, order);
  res.status(200).send({ articles: articlesData });
};

const getArticleFromId = async (req, res) => {
  const { article_id } = req.params;
  const articleData = await selectArticleFromId(article_id);
  res.status(200).send({ article: articleData });
};

const patchArticleWithVotesFromId = async (req, res) => {
  const { article_id } = req.params;
  const { inc_votes } = req.body;
  const articleData = await updateArticleWithVotesFromId(article_id, inc_votes);
  res.status(200).send({ article: articleData });
};

module.exports = { getArticles, getArticleFromId, patchArticleWithVotesFromId };
