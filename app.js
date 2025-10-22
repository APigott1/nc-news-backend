const express = require("express");
const {
  getTopics,
  getArticles,
  getArticleFromId,
} = require("./controllers/index.js");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleFromId);

module.exports = app;
