const db = require("../db/connection.js");

async function selectUsers() {
  const { rows } = await db.query(
    `
    SELECT * FROM users;
    `
  );
  return rows;
}

module.exports = { selectUsers };
