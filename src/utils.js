const fs = require("fs");

function readFile(path) {
  return fs.readFileSync(path, "utf8").toString();
}

function makeBatches(list, size) {
  const batches = [];
  const batchCount = Math.ceil(list.length / size);
  for (let i = 0; i < batchCount; i++) {
    batches.push(list.slice(i * size, i * size + size));
  }
  return batches;
}

module.exports = {
  readFile,
  makeBatches,
};
