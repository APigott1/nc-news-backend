const { selectTopics, selectArticles } = require("../models/topics.js");

const getTopics = async (req, res) => {
  const rows = await selectTopics();
  res.status(200).send({ topics: rows });
};

const getArticles = async (req, res) => {
  const rows = await selectArticles();
  res.status(200).send({ articles: rows });
};

module.exports = { getTopics, getArticles };
