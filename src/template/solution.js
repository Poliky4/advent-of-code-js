const path = require("path");
const Utils = require("../utils");

const input = Utils.readFile(path.resolve(__dirname, "data"));

// uncomment to run with full input
// console.log("one: ", one(input));
function one(input) {}

// uncomment to run with full input
// console.log('two: ', two(input));
function two(input) {}

module.exports = {
  one,
  two,
};
