
const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const lines = input.split(/\r?\n/);

function evaluate(line) {
  const tokens = line.match(/\d+(?:\.\d+)?|[()+\-*/]|\S/g) || [];

  if (!tokens.length) return "Invalid Expression";

  if (tokens.length % 2 === 0) return "Invalid Expression";

  let value = Number(tokens[0]);

  if (!Number.isFinite(value)) return "Invalid Expression";

  for (let i = 1; i < tokens.length; i += 2) {
    const op = tokens[i];
    const num = Number(tokens[i + 1]);

    if (!["+", "-"].includes(op) || !Number.isFinite(num)) {
      return "Invalid Expression";
    }

    if (op === "+") value += num;
    else value -= num;
  }

  return Number.isFinite(value) ? value : "Invalid Expression";
}

const results = lines
  .filter((line) => line.trim() !== "")
  .map((line) => ({ key: [evaluate(line)] }));

console.log(JSON.stringify(results));
