const express = require("express");
const { getTopics } = require("./controllers/topics.js");
const { getArticles, getArticleFromId } = require("./controllers/articles.js");
const {
  getCommentsFromArticleId,
  postCommentOnArticle,
} = require("./controllers/comments.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/articles/:article_id", getArticleFromId);

app.get("/api/articles/:article_id/comments", getCommentsFromArticleId);

app.post("/api/articles/:article_id/comments", postCommentOnArticle);

module.exports = app;
