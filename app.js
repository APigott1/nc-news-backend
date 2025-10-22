const express = require("express");
const { getTopics } = require("./controllers/topics.js");
const { getArticles, getArticleFromId } = require("./controllers/articles.js");
const { getCommentsFromArticleId } = require("./controllers/comments.js");

const app = express();

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleFromId);

app.get("/api/articles/:article_id/comments", getCommentsFromArticleId);

module.exports = app;
