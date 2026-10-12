
const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const lines = input.split(/\r?\n/);

function evaluate(line) {
  const tokens = line.match(/\d+(?:\.\d+)?|[()+\-*/]|\S/g) || [];
  let pos = 0;

  function factor() {
    const token = tokens[pos++];

    if (token === "(") {
      const value = expression();

      if (tokens[pos++] !== ")") {
        throw new Error("Mismatched parentheses");
      }

      return value;
    }

    if (token === undefined || !/^\d+(?:\.\d+)?$/.test(token)) {
      throw new Error("Invalid number");
    }

    return Number(token);
  }

  function term() {
    let value = factor();

    while (tokens[pos] === "*" || tokens[pos] === "/") {
      const op = tokens[pos++];
      const right = factor();

      if (op === "/" && right === 0) {
        throw new Error("Division by zero");
      }

      value = op === "*" ? value * right : value / right;
    }

    return value;
  }

  function expression() {
    let value = term();

    while (tokens[pos] === "+" || tokens[pos] === "-") {
      const op = tokens[pos++];
      const right = term();

      value = op === "+" ? value + right : value - right;
    }

    return value;
  }

  try {
    if (!tokens.length) return "Invalid Expression";

    const result = expression();

    if (pos !== tokens.length || !Number.isFinite(result)) {
      return "Invalid Expression";
    }

    return result;
  } catch {
    return "Invalid Expression";
  }
}

const results = lines
  .filter((line) => line.trim() !== "")
  .map((line) => ({ key: [evaluate(line)] }));

console.log(JSON.stringify(results));