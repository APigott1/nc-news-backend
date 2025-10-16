const db = require("./db/connection.js");

const quieries = async () => {
  let response = await db.query("SELECT * FROM users;");
  console.log(response.rows);

  response = await db.query(`
    SELECT * FROM articles
      WHERE topic = 'coding';`);
  console.log(response.rows);

  response = await db.query(`
    SELECT * FROM comments
      WHERE votes < 0;`);
  console.log(response.rows);

  response = await db.query("SELECT * FROM topics;");
  console.log(response.rows);

  response = await db.query(`
    SELECT * FROM comments
      WHERE author = 'grumpy19'`);
  console.log(response.rows);

  response = await db.query(`
    SELECT * FROM comments
      WHERE votes > 10`);
  console.log(response.rows);

  db.end();
};

quieries();
