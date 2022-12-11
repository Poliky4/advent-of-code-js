const fs = require("fs");
const path = require("path");
const dotenv = require("dotenv");

dotenv.config();

const BASE_URL = "https://adventofcode.com";

const resolvePath = (...parts) => path.resolve(__dirname, ...parts);
(async function () {
  const day = new Date().getDate().toString();

  if (fs.existsSync(resolvePath("src", day))) {
    throw new Error("Error, day already exists, bailing");
  }

  fs.mkdirSync(resolvePath("src", day));

  const solutionFileName = "solution.js";
  const templateSolution = getTemplateSolution(solutionFileName);
  fs.writeFileSync(resolvePath("src", day, solutionFileName), templateSolution);

  const testFileName = "test.test.js";
  const templateTest = getTemplateTest(testFileName, day);
  fs.writeFileSync(resolvePath("src", day, testFileName), templateTest);

  const exampleInput = await getExampleInput(day);
  fs.writeFileSync(resolvePath("src", day, "example"), exampleInput);

  const input = await getInput(day);
  fs.writeFileSync(resolvePath("src", day, "data"), input);

  console.log(`Files for day ${day} created.`);
  console.log("GLHF");
})();

function getTemplateSolution(solutionFileName) {
  return fs.readFileSync(resolvePath("src/template", solutionFileName));
}

function getTemplateTest(testFileName, day) {
  return fs.readFileSync(resolvePath("src/template", testFileName)).toString().replace("Day X", `Day ${day}`);
}

async function getExampleInput(day) {
  let html;

  const htmlFilePath = resolvePath("src", day, "example.html");
  if (!fs.existsSync(htmlFilePath)) {
    const response = await fetch(`${BASE_URL}/2022/day/${day}`);
    html = await response.text();
    fs.writeFileSync(htmlFilePath, html);
  } else {
    html = fs.readFileSync(htmlFilePath).toString();
  }

  const codeReg = new RegExp("<code>([\\s\\S]*?)</code>", "g");
  const matches = html.matchAll(codeReg);
  const example = matches.next().value;
  return example[1];
}

async function getInput(day) {
  let html;

  const htmlFilePath = resolvePath("src", day, "input.html");
  if (!fs.existsSync(htmlFilePath)) {
    if (!process.env.TOKEN) return console.log("No session token found in .env");
    const response = await fetch(`${BASE_URL}/2022/day/${day}/input`, {
      headers: {
        cookie: `session=${process.env.TOKEN}`,
      },
    });
    html = await response.text();
    fs.writeFileSync(htmlFilePath, html);
  } else {
    html = fs.readFileSync(htmlFilePath).toString();
  }

  return html;
}
