
const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const lines = input.split(/\r?\n/);

function evaluate(line) {
  const tokens = line.match(/\d+(?:\.\d+)?|[()+\-*/]|\S/g) || [];

  if (!tokens.length || tokens.length % 2 === 0) {
    return "Invalid Expression";
  }

  let term = Number(tokens[0]);
  let result = 0;

  if (!Number.isFinite(term)) return "Invalid Expression";

  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const num = Number(tokens[i + 1]);

    if (!Number.isFinite(num)) return "Invalid Expression";

    if (op === "*") {
      term *= num;
    } else if (op === "/") {
      if (num === 0) return "Invalid Expression";
      term /= num;
    } else if (op === "+" || op === "-") {
      result += term;
      term = op === "+" ? num : -num;
    } else {
      return "Invalid Expression";
    }
  }

  result += term;

  return Number.isFinite(result) ? result : "Invalid Expression";
}

const results = lines
  .filter((line) => line.trim() !== "")
  .map((line) => ({ key: [evaluate(line)] }));

console.log(JSON.stringify(results));
