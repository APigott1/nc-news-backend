const db = require("../db/connection.js");
const { format } = require("node-pg-format");

async function checkExists(table, column, value) {
  const queryStr = format(
    `
    SELECT * FROM %I
      WHERE %I = $1;
    `,
    table,
    column
  );
  const { rows } = await db.query(queryStr, [value]);
  if (rows.length === 0) {
    throw {
      status: 404,
      msg: `No ${table.slice(0, -1)} found for ${column}: ${value}`,
    };
  }
}

module.exports = { checkExists };
