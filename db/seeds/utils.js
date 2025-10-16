const db = require("../../db/connection");

function convertTimestampToDate({ created_at, ...otherProperties }) {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
}

function formatTopics(topicData) {
  return topicData.map((topic) => [
    topic.slug,
    topic.description,
    topic.img_url,
  ]);
}

function formatUsers(userData) {
  return userData.map((user) => [user.username, user.name, user.avatar_url]);
}

function formatArticles(articleData) {
  return articleData.map((article) => {
    const articleWithTimestamp = convertTimestampToDate(article);
    return [
      articleWithTimestamp.title,
      articleWithTimestamp.topic,
      articleWithTimestamp.author,
      articleWithTimestamp.body,
      articleWithTimestamp.created_at,
      articleWithTimestamp.votes,
      articleWithTimestamp.article_img_url,
    ];
  });
}

function formatComments(commentData, articleData) {
  const articleIdLookup = {};
  articleData.forEach((article, index) => {
    articleIdLookup[article.title] = index + 1;
  });

  return commentData.map((comment) => {
    const commentWithTimeStamp = convertTimestampToDate(comment);
    return [
      articleIdLookup[commentWithTimeStamp.article_title],
      commentWithTimeStamp.body,
      commentWithTimeStamp.votes,
      commentWithTimeStamp.author,
      commentWithTimeStamp.created_at,
    ];
  });
}

module.exports = {
  convertTimestampToDate,
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments,
};
