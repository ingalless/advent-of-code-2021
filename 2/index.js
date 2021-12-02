const fs = require("fs").promises;

async function readInput() {
  const input = await fs.readFile("input.txt");
  return input
    .toString()
    .split("\n")
    .filter(Boolean)
    .map((i) => {
      const [command, number] = i.split(" ");
      return {
        command,
        by: Number(number),
      };
    });
}

const handleInstruction = (instruction, current) => {
  switch (instruction.command) {
    case "up":
      return {
        ...current,
        aim: current.aim - instruction.by,
      };
    case "down":
      return {
        ...current,
        aim: current.aim + instruction.by,
      };
    case "forward":
      const aimFactor = current.aim * instruction.by;
      return {
        ...current,
        horizontal: current.horizontal + instruction.by,
        depth: current.depth + aimFactor,
      };
    default:
      throw Error("Something bad happened!");
  }
};

async function main() {
  const instructions = await readInput();
  let pos = {
    depth: 0,
    horizontal: 0,
    aim: 0,
  };

  for (const instruction of instructions) {
    console.log(instruction);
    pos = handleInstruction(instruction, pos);
  }
  console.log(pos);
  console.log(pos.depth * pos.horizontal);
}

main().catch(console.error);
