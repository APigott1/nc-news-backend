const {
  convertTimestampToDate,
  createLookup,
  formatTopics,
  formatUsers,
  formatArticles,
  formatComments,
} = require("../db/seeds/utils");

const {
  topicData,
  userData,
  articleData,
  commentData,
} = require("../db/data/test-data/index.js");

describe("convertTimestampToDate", () => {
  test("returns a new object", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result).not.toBe(input);
    expect(result).toBeObject();
  });
  test("converts a created_at property to a date", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    const result = convertTimestampToDate(input);
    expect(result.created_at).toBeDate();
    expect(result.created_at).toEqual(new Date(timestamp));
  });
  test("does not mutate the input", () => {
    const timestamp = 1557572706232;
    const input = { created_at: timestamp };
    convertTimestampToDate(input);
    const control = { created_at: timestamp };
    expect(input).toEqual(control);
  });
  test("ignores includes any other key-value-pairs in returned object", () => {
    const input = { created_at: 0, key1: true, key2: 1 };
    const result = convertTimestampToDate(input);
    expect(result.key1).toBe(true);
    expect(result.key2).toBe(1);
  });
  test("returns unchanged object if no created_at property", () => {
    const input = { key: "value" };
    const result = convertTimestampToDate(input);
    const expected = { key: "value" };
    expect(result).toEqual(expected);
  });
});

describe("createLookup()", () => {
  test("returns an empty object when input is empty", () => {
    expect(createLookup([])).toEqual({});
  });
  test("returns an object with key-value pair when input is an array of 1 object", () => {
    expect(
      createLookup(
        [{ name: "Alex", age: 18, nickname: "Pidge" }],
        "name",
        "age"
      )
    ).toEqual({ Alex: 18 });
  });
  test("returns an object with key-value pairs when input is an array of multiple objects", () => {
    const input = [
      { foodName: "bacon", category: "meat", rating: 7 },
      { foodName: "bread", category: "carbs", rating: 9 },
      { foodName: "gummy bears", category: "sweets", rating: 6 },
    ];
    const expectedOutput = { bacon: 7, bread: 9, "gummy bears": 6 };

    const output = createLookup(input, "foodName", "rating");

    expect(output).toEqual(expectedOutput);
  });
  test("doesn't mutate input array", () => {
    const input = [
      { foodName: "bacon", category: "meat", rating: 7 },
      { foodName: "bread", category: "carbs", rating: 9 },
      { foodName: "gummy bears", category: "sweets", rating: 6 },
    ];

    const inputCpy = input.map((item) => {
      return { ...item };
    });

    createLookup(input, "foodName", "rating");

    expect(inputCpy).toEqual(input);
  });
});

describe("formatTopics()", () => {
  test("returns an array", () => {
    expect(formatTopics(topicData)).toBeInstanceOf(Array);
  });
  test("returns a nested array", () => {
    formatTopics(topicData).forEach((topic) => {
      expect(topic).toBeInstanceOf(Array);
    });
    expect(formatTopics(topicData).length).toBeGreaterThan(0);
  });
  test("each item contains the slug, description and img_url in order", () => {
    expect(formatTopics(topicData)).toEqual([
      ["mitch", "The man, the Mitch, the legend", ""],
      ["cats", "Not dogs", ""],
      ["paper", "what books are made of", ""],
    ]);
  });
  test("returns a new array", () => {
    expect(formatTopics(topicData)).not.toBe(topicData);
  });
  test("does not mutate the input", () => {
    const topicDataCpy = topicData.map((topic) => {
      return { ...topic };
    });

    formatTopics(topicData);

    expect(topicDataCpy).toEqual(topicData);
  });
});

describe("formatUsers()", () => {
  test("returns an array", () => {
    expect(formatUsers(userData)).toBeInstanceOf(Array);
  });
  test("returns a nested array", () => {
    formatUsers(userData).forEach((user) => {
      expect(user).toBeInstanceOf(Array);
    });
    expect(formatUsers(userData).length).toBeGreaterThan(0);
  });
  test("each item contains the username, name and avatar_url in order", () => {
    expect(formatUsers(userData)).toEqual([
      [
        "butter_bridge",
        "jonny",
        "https://www.healthytherapies.com/wp-content/uploads/2016/06/Lime3.jpg",
      ],
      [
        "icellusedkars",
        "sam",
        "https://avatars2.githubusercontent.com/u/24604688?s=460&v=4",
      ],
      [
        "rogersop",
        "paul",
        "https://avatars2.githubusercontent.com/u/24394918?s=400&v=4",
      ],
      [
        "lurker",
        "do_nothing",
        "https://www.golenbock.com/wp-content/uploads/2015/01/placeholder-user.png",
      ],
    ]);
  });
  test("returns a new array", () => {
    expect(formatUsers(userData)).not.toBe(userData);
  });
  test("does not mutate the input", () => {
    const userDataCpy = userData.map((user) => {
      return { ...user };
    });

    formatUsers(userData);

    expect(userDataCpy).toEqual(userData);
  });
});

describe("formatArticles()", () => {
  test("returns an array", () => {
    expect(formatArticles(articleData)).toBeInstanceOf(Array);
  });
  test("returns a nested array", () => {
    formatArticles(articleData).forEach((article) => {
      expect(article).toBeInstanceOf(Array);
      expect(formatArticles(articleData).length).toBeGreaterThan(0);
    });
  });
  test("each item contains the title, topic, author, body, created_at, votes and article_img_url in order", () => {
    const formattedArticles = formatArticles(articleData);

    formattedArticles.forEach((formattedArticle, index) => {
      const articleWithTimestamp = convertTimestampToDate(articleData[index]);
      expect(formattedArticle[0]).toBe(articleWithTimestamp.title);
      expect(formattedArticle[1]).toBe(articleWithTimestamp.topic);
      expect(formattedArticle[2]).toBe(articleWithTimestamp.author);
      expect(formattedArticle[3]).toBe(articleWithTimestamp.body);
      expect(formattedArticle[4]).toEqual(articleWithTimestamp.created_at);
      expect(formattedArticle[5]).toBe(articleWithTimestamp.votes);
      expect(formattedArticle[6]).toBe(articleWithTimestamp.article_img_url);
    });
  });
  test("returns a new array", () => {
    expect(formatArticles(articleData)).not.toBe(articleData);
  });
  test("does not mutate the input", () => {
    const articleDataCpy = articleData.map((article) => {
      return { ...article };
    });

    formatArticles(articleData);

    expect(articleDataCpy).toEqual(articleData);
  });
});

describe("formatComments()", () => {
  test("returns an array", () => {
    const articleLookup = {};
    articleData.forEach((article, index) => {
      articleLookup[article.title] = index + 1;
    });

    const formattedComments = formatComments(commentData, articleLookup);
    expect(formattedComments).toBeInstanceOf(Array);
  });
  test("returns a nested array", () => {
    const articleLookup = {};
    articleData.forEach((article, index) => {
      articleLookup[article.title] = index + 1;
    });

    const formattedComments = formatComments(commentData, articleLookup);
    formattedComments.forEach((comment) => {
      expect(formattedComments).toBeInstanceOf(Array);
    });
    expect(formattedComments.length).toBeGreaterThan(0);
  });
  test("each item contains the article_id, body, votes, author and created_at in order", () => {
    const articleLookup = {};
    articleData.forEach((article, index) => {
      articleLookup[article.title] = index + 1;
    });

    const expectedArticleLookup = {
      1: 9,
      2: 1,
      3: 1,
      4: 1,
      5: 1,
      6: 1,
      7: 1,
      8: 1,
      9: 1,
      10: 3,
      11: 3,
      12: 1,
      13: 1,
      14: 5,
      15: 5,
      16: 6,
      17: 9,
      18: 1,
    };

    const formattedComments = formatComments(commentData, articleLookup);

    formattedComments.forEach((formattedComment, index) => {
      const commentWithTimestamp = convertTimestampToDate(commentData[index]);
      expect(formattedComment[0]).toBe(expectedArticleLookup[index + 1]);
      expect(formattedComment[1]).toBe(commentWithTimestamp.body);
      expect(formattedComment[2]).toBe(commentWithTimestamp.votes);
      expect(formattedComment[3]).toBe(commentWithTimestamp.author);
      expect(formattedComment[4]).toEqual(commentWithTimestamp.created_at);
    });
  });
  test("returns a new array", () => {
    const articleLookup = {};
    articleData.forEach((article, index) => {
      articleLookup[article.title] = index + 1;
    });
    expect(formatComments(commentData, articleLookup)).not.toBe(commentData);
    expect(formatComments(commentData, articleLookup)).not.toBe(articleLookup);
  });
  test("does not mutate the input", () => {
    const articleLookup = {};
    articleData.forEach((article, index) => {
      articleLookup[article.title] = index + 1;
    });
    const articleLookupCpy = { ...articleLookup };
    const commentDataCpy = commentData.map((comment) => {
      return { ...comment };
    });

    formatArticles(commentData, articleLookup);

    expect(commentDataCpy).toEqual(commentData);
    expect(articleLookupCpy).toEqual(articleLookup);
  });
});
