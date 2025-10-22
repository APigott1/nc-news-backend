const db = require("../db/connection.js");

async function selectTopics() {
  const { rows } = await db.query(
    `
    SELECT * FROM topics
    `
  );
  return rows;
}

module.exports = { selectTopics };
