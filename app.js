const express = require("express");
const { getTopics } = require("./controllers/topics.js");
const {
  getArticles,
  getArticleFromId,
  patchArticleWithVotesFromId,
} = require("./controllers/articles.js");
const {
  getCommentsFromArticle,
  postCommentOnArticle,
  deleteComment,
} = require("./controllers/comments.js");
const { getUsers } = require("./controllers/users.js");
const {
  handleMissingEndpointError,
  handleDatabaseErrors,
  handleCustomErrors,
  handleServerErrors,
} = require("./controllers/errors.js");

const app = express();

app.use(express.json());

app.get("/api/topics", getTopics);

app.get("/api/articles", getArticles);

app.get("/api/users", getUsers);

app.get("/api/articles/:article_id", getArticleFromId);

app.get("/api/articles/:article_id/comments", getCommentsFromArticle);

app.post("/api/articles/:article_id/comments", postCommentOnArticle);

app.patch("/api/articles/:article_id", patchArticleWithVotesFromId);

app.delete("/api/comments/:comment_id", deleteComment);

app.use(handleMissingEndpointError);

app.use(handleDatabaseErrors);

app.use(handleCustomErrors);

app.use(handleServerErrors);

module.exports = app;
