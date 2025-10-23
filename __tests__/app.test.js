const request = require("supertest");
const app = require("../app.js");
const seed = require("../db/seeds/seed.js");
const data = require("../db/data/test-data/index.js");
const db = require("../db/connection.js");

beforeEach(async () => {
  await seed(data);
});

afterAll(async () => {
  await db.end();
});

describe("All: *", () => {
  test("404: responds with an error message when a request is made to an undefined endpoint", async () => {
    const { body } = await request(app).get("/not-an-endpoint").expect(404);
    const { msg } = body;

    expect(msg).toBe("Path Not Found");
  });
});

describe("GET /api/topics", () => {
  test("200: returns an object with an array of topics assigned to a key topics", async () => {
    const { body } = await request(app).get("/api/topics").expect(200);
    const { topics } = body;

    topics.forEach((topic) => {
      expect(typeof topic.slug).toBe("string");
      expect(typeof topic.description).toBe("string");
      expect(typeof topic.img_url).toBe("string");
    });
  });
});

describe("GET /api/users", () => {
  test("200: returns an object with an array of users assigned to a key users", async () => {
    const { body } = await request(app).get("/api/users").expect(200);
    const { users } = body;

    users.forEach((user) => {
      expect(typeof user.username).toBe("string");
      expect(typeof user.name).toBe("string");
      expect(typeof user.avatar_url).toBe("string");
    });
  });
});

describe("GET /api/articles", () => {
  test("200: returns an object with an array of articles assigned to a key articles", async () => {
    const { body } = await request(app).get("/api/articles").expect(200);
    const { articles } = body;

    articles.forEach((article) => {
      expect(Object.keys(article).length).toBe(8);
      expect(typeof article.author).toBe("string");
      expect(typeof article.title).toBe("string");
      expect(typeof article.article_id).toBe("number");
      expect(typeof article.topic).toBe("string");
      expect(typeof article.created_at).toBe("string");
      expect(typeof article.votes).toBe("number");
      expect(typeof article.article_img_url).toBe("string");
      expect(typeof article.comment_count).toBe("number");
    });
  });
});

describe("GET /api/articles/:article_id", () => {
  test("200: returns an object with an article assigned to a key article", async () => {
    const { body } = await request(app).get("/api/articles/2").expect(200);
    const { article } = body;

    expect(Object.keys(article).length).toBe(8);
    expect(typeof article.author).toBe("string");
    expect(typeof article.title).toBe("string");
    expect(article.article_id).toBe(2);
    expect(typeof article.body).toBe("string");
    expect(typeof article.topic).toBe("string");
    expect(typeof article.created_at).toBe("string");
    expect(typeof article.votes).toBe("number");
    expect(typeof article.article_img_url).toBe("string");
  });
  test("400: responds with an error message when a request is made with an invalid article_id", async () => {
    const { body } = await request(app)
      .get("/api/articles/not-an-id")
      .expect(400);
    const { msg } = body;

    expect(msg).toBe("Invalid input");
  });
  test("404: responds with an error message when no article is found", async () => {
    const { body } = await request(app).get("/api/articles/9999").expect(404);
    const { msg } = body;

    expect(msg).toBe("Resource Not Found");
  });
});

describe("GET /api/articles/:article_id/comments", () => {
  test("200: returns an object with an array of comments assigned to a key comments", async () => {
    const { body } = await request(app)
      .get("/api/articles/2/comments")
      .expect(200);
    const { comments } = body;

    comments.forEach((comment) => {
      expect(Object.keys(comment).length).toBe(6);
      expect(typeof comment.comment_id).toBe("number");
      expect(typeof comment.votes).toBe("number");
      expect(typeof comment.created_at).toBe("string");
      expect(typeof comment.author).toBe("string");
      expect(typeof comment.body).toBe("string");
      expect(comment.article_id).toBe(2);
    });
  });
});

describe("POST /api/articles/:article_id/comments", () => {
  test("201: returns an object with the added comment assigned to a key comment", async () => {
    const newComment = {
      username: "lurker",
      body: "just lurking dw:)",
    };

    const { body } = await request(app)
      .post("/api/articles/2/comments")
      .send(newComment)
      .expect(201);
    const { comment } = body;

    expect(typeof comment.comment_id).toBe("number");
    expect(comment.article_id).toBe(2);
    expect(comment.body).toBe("just lurking dw:)");
    expect(comment.votes).toBe(0);
    expect(comment.author).toBe("lurker");
    expect(typeof comment.created_at).toBe("string");
  });
});
