const { format } = require("node-pg-format");
const db = require("../connection.js");
const {
  createLookup,
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments,
} = require("./utils.js");

async function seed({ topicData, userData, articleData, commentData }) {
  await db.query(
    `
    DROP TABLE IF EXISTS comments;
    `
  );
  await db.query(
    `
    DROP TABLE IF EXISTS articles;
    `
  );
  await Promise.all([
    db.query(
      `
      DROP TABLE IF EXISTS users;
      `
    ),
    db.query(
      `
      DROP TABLE IF EXISTS topics;
      `
    ),
  ]);

  await Promise.all([
    db.query(
      `
      CREATE TABLE topics (
        slug VARCHAR PRIMARY KEY,
        description VARCHAR NOT NULL,
        img_url VARCHAR(1000)
      );
      `
    ),
    db.query(
      `
      CREATE TABLE users (
        username VARCHAR PRIMARY KEY,
        name VARCHAR,
        avatar_url VARCHAR(1000)
      );
      `
    ),
  ]);
  await db.query(
    `
    CREATE TABLE articles (
      article_id SERIAL PRIMARY KEY,
      title VARCHAR NOT NULL,
      topic VARCHAR REFERENCES topics(slug),
      author VARCHAR REFERENCES users(username) ON DELETE SET NULL,
      body TEXT NOT NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP,
      votes INT NOT NULL DEFAULT 0,
      article_img_url VARCHAR(1000)
    );
    `
  );
  await db.query(
    `
    CREATE TABLE comments (
      comment_id SERIAL PRIMARY KEY,
      article_id INT NOT NULL REFERENCES articles(article_id) ON DELETE CASCADE,
      body TEXT NOT NULL,
      votes INT NOT NULL DEFAULT 0,
      author VARCHAR REFERENCES users(username) ON DELETE SET NULL,
      created_at TIMESTAMP NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    `
  );

  const formattedTopics = formatTopics(topicData);
  const topicsSeedQuery = format(
    `
    INSERT INTO topics (slug, description, img_url)
    VALUES %L;
    `,
    formattedTopics
  );

  const formattedUsers = formatUsers(userData);
  const usersSeedQuery = format(
    `
    INSERT INTO users (username, name, avatar_url)
    VALUES %L;
    `,
    formattedUsers
  );

  await Promise.all([db.query(topicsSeedQuery), db.query(usersSeedQuery)]);

  const formattedArticles = formatArticles(articleData);
  const articlesSeedQuery = format(
    `
    INSERT INTO articles (title, topic, author, body, created_at, votes, article_img_url)
    VALUES %L
    RETURNING *;
    `,
    formattedArticles
  );

  const { rows } = await db.query(articlesSeedQuery);

  const articleLookup = createLookup(rows, "title", "article_id");

  const formattedComments = formatComments(commentData, articleLookup);
  const commentsSeedQuery = format(
    `
    INSERT INTO comments (article_id, body, votes, author, created_at)
    VALUES %L;
    `,
    formattedComments
  );

  await db.query(commentsSeedQuery);
}

module.exports = seed;
