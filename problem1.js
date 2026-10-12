
const fs = require("fs");

const input = fs.readFileSync(0, "utf8");
const lines = input.split(/\r?\n/);

const results = lines
  .filter((line) => line.trim() !== "")
  .map((line) => {
    const tokens = line.match(/\d+(?:\.\d+)?|[()+\-*/]|\S/g) || [];
    return { key: tokens };
  });

console.log(JSON.stringify(results));
