const assert = require("assert");
const path = require("path");
const Utils = require("../utils");

const { one, two } = require("./solution");

describe("Day X", () => {
  const input = Utils.readFile(path.resolve(__dirname, "example"));

  xit("one", () => {
    const answer = one(input);
    assert.strictEqual(answer, 42);
  });

  xit("two", () => {
    const answer = two(input);
    assert.strictEqual(answer, 42);
  });
});
