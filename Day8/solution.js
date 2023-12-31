const fs = require("fs");

const fileReader = (file) => {
  return fs.readFileSync(file, { encoding: "utf8", flag: "r" });
};

function part1(file) {
  const data = fileReader(file).split("\r\n");
  const steps = data[0].split("");
  const nodes = data
    .slice(2)
    .map((item) => item.split(/[^A-Z]/).filter((item) => item !== ""));
  const formattedNodes = [];

  for (const node of nodes) {
    const key = node[0];
    formattedNodes[key] = {
      L: node[1],
      R: node[2],
    };
  }
  let startingPosition = formattedNodes.AAA;
  let nextPosition;
  let counter = 0;
  let found = false;
  while (!found) {
    for (const step of steps) {
      nextPosition = startingPosition[step];
      counter += 1;
      if (nextPosition === "ZZZ") {
        found = true;
      } else {
        startingPosition = formattedNodes[nextPosition];
      }
    }
  }
  console.log(counter);
}

function part2(file) {
  const data = fileReader(file).split("\r\n");
  const steps = data[0].split("");
  const nodes = data
    .slice(2)
    .map((item) => item.split(/[^A-Z]/).filter((item) => item !== ""));
  const formattedNodes = [];
  console.log("Getting numbers")

  for (const node of nodes) {
    const key = node[0];
    formattedNodes[key] = {
      L: node[1],
      R: node[2],
    };
  }

  let startingPositions = Object.keys(formattedNodes).filter((item) =>
    item.match(/[A-Z]{2}A/)
  );

  let allCounts = [];
  // Go through each path
  for (const position of startingPositions) {
    let startingPosition = position;
    let nextPosition;
    let counter = 0;
    let found = false;
    while (!found) {
      for (const step of steps) {
        nextPosition = formattedNodes[startingPosition][step];
        counter++;
        if (nextPosition.match(/[A-Z]{2}Z/)) {
          allCounts.push(counter);
          found = true;
          break;
        } else {
          startingPosition = nextPosition;
        }
      }
    }
  }
  allCounts.sort(function (a, b) {
    return a - b;
  });
  console.log(`Numbers found ${allCounts}, getting lowest common multiplier`)
  return smallestCommons(allCounts);
}

function smallestCommons(arr) {
  console.log(`Getting lcm for: ${arr[0]} and ${arr[1]}`)
    while(arr.length > 1){
      console.log(`Getting lcm for: ${arr[0]} and ${arr[1]}`)
        let SCM = (arr[0] * arr[1]) / greatestCommonDivisor(arr[0], arr[1]);
    arr[1] = SCM;
    arr.shift()
    }
    return arr[0]
}

const greatestCommonDivisor = (a, b) => {
  let remainder = b % a;
  let lastB = b;
  while(remainder > 0){
    console.log(`Getting gcd for : ${a} and ${b}. Remains: ${remainder}`)
    lastB = remainder;
    remainder = a % lastB;
  }
  return lastB;
};

//console.log(part2("./input.txt"));

console.log(part2("./input.txt"));
