const { selectArticles } = require("../models/articles.js");

const getArticles = async (req, res) => {
  const rows = await selectArticles();
  res.status(200).send({ articles: rows });
};

module.exports = { getArticles };
