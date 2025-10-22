const { selectTopics } = require("../models/topics.js");

const getTopics = async (req, res) => {
  const rows = await selectTopics();
  res.status(200).send({ topics: rows });
};

module.exports = { getTopics };
