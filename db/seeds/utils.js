const db = require("../../db/connection");

function convertTimestampToDate({ created_at, ...otherProperties }) {
  if (!created_at) return { ...otherProperties };
  return { created_at: new Date(created_at), ...otherProperties };
}

function createLookup(arr, key, value) {
  const lookup = {};
  arr.forEach((item) => (lookup[item[key]] = item[value]));
  return lookup;
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

function formatComments(commentData, articleLookup) {
  return commentData.map((comment) => {
    const commentWithTimeStamp = convertTimestampToDate(comment);
    return [
      articleLookup[commentWithTimeStamp.article_title],
      commentWithTimeStamp.body,
      commentWithTimeStamp.votes,
      commentWithTimeStamp.author,
      commentWithTimeStamp.created_at,
    ];
  });
}

module.exports = {
  convertTimestampToDate,
  createLookup,
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments,
};
