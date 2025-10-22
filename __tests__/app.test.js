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
  test("200: returns an object with an array of topic assigned to a key topics", async () => {
    const { body } = await request(app).get("/api/topics").expect(200);

    body.topics.forEach((topic) => {
      expect(typeof topic.slug).toBe("string");
      expect(typeof topic.description).toBe("string");
      expect(typeof topic.img_url).toBe("string");
    });
  });
});
