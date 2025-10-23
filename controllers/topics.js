const { selectTopics } = require("../models/topics.js");

const getTopics = async (req, res) => {
  const topicsData = await selectTopics();
  res.status(200).send({ topics: topicsData });
};

module.exports = { getTopics };
