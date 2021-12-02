const fs = require("fs").promises;

async function readInput() {
  const input = await fs.readFile("input.txt");
  return input.toString().split("\n").map(Number).filter(Boolean);
}

async function part1() {
  const levels = await readInput();
  let numOfIncrease = 0;
  let lastVal = 9999;
  for (const level of levels) {
    if (lastVal < level) {
      numOfIncrease++;
    }
    lastVal = level;
  }
  console.log(numOfIncrease);
}

async function part2() {
  const levels = await readInput();
  let lastVal = null;
  let numOfIncrease = 0;
  for (let i = 0; i < levels.length; i++) {
    if (!levels[i] || !levels[i + 1] || !levels[i + 2]) {
      return;
    }
    const normalisedDepth = levels[i] + levels[i + 1] + levels[i + 2];
    if (lastVal && lastVal < normalisedDepth) {
      numOfIncrease++;
    }
    lastVal = normalisedDepth;
    console.log(numOfIncrease);
  }
}

part1().catch(console.error);
part2().catch(console.error);
