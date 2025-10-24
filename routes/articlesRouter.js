const articlesRouter = require("express").Router();
const {
  getArticles,
  getArticleFromId,
  patchArticleWithVotesFromId,
} = require("../controllers/articles.js");
const {
  getCommentsFromArticle,
  postCommentOnArticle,
} = require("../controllers/comments.js");

articlesRouter.get("/", getArticles);

articlesRouter
  .route("/:article_id")
  .get(getArticleFromId)
  .patch(patchArticleWithVotesFromId);

articlesRouter
  .route("/:article_id/comments")
  .get(getCommentsFromArticle)
  .post(postCommentOnArticle);

module.exports = articlesRouter;
