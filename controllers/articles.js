const {
  selectArticles,
  selectArticleFromId,
  updateArticleWithVotesFromId,
} = require("../models/articles.js");
const { checkExists } = require("../models/utils.js");

const getArticles = async (req, res) => {
  const queries = req.query;
  const promises = [selectArticles(queries)];
  if (topic) {
    promises.push(checkExists("topics", "slug", topic));
  }
  const [articlesData] = await Promise.all(promises);
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
