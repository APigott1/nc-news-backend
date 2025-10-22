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
});
