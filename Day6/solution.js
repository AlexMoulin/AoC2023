const fs = require("fs");

const fileReader = (file) => {
  return fs.readFileSync(file, { encoding: "utf8", flag: "r" });
};

function part1(file) {
  const data = fileReader(file);
  const [time, distance] = data.split("\r\n");
  const timesFiltered = time.split(" ").filter((string) => string.match(/\d+/));
  const distanceFiltered = distance
    .split(" ")
    .filter((string) => string.match(/\d+/));
  let totalOfWays = 1;

  for (const timeIndex in timesFiltered) {
    let totalTime = parseInt(timesFiltered[timeIndex], 10);
    let distanceToBeat = parseInt(distanceFiltered[timeIndex], 10) + 1;
    // Using quatratric equations:
    // (totalTime - Math.sqrt((Math.pow(totalTime, 2) - (4 * distanceToBeat))))/2 <= Presstime <= (totalTime + Math.sqrt((Math.pow(totalTime, 2) - (4 * distanceToBeat))))/2
    let sqrt = Math.sqrt(Math.pow(totalTime * -1, 2) - 4 * distanceToBeat);
    let lower = Math.ceil((totalTime - sqrt) / 2);
    let higher = Math.floor((totalTime + sqrt) / 2);
    totalOfWays = (higher - lower + 1) * totalOfWays;
  }
  return totalOfWays;
}

function part2(file) {
  const data = fileReader(file);
  const [time, distance] = data.split("\r\n");
  const timesFiltered = time
    .split(" ")
    .filter((string) => string.match(/\d+/))
    .join("");
  const distanceFiltered = distance
    .split(" ")
    .filter((string) => string.match(/\d+/))
    .join("");
  let totalOfWays = 1;

  let totalTime = parseInt(timesFiltered, 10);
  let distanceToBeat = parseInt(distanceFiltered, 10) + 1;
  // Using quatratric equations:
  // (totalTime - Math.sqrt((Math.pow(totalTime, 2) - (4 * distanceToBeat))))/2 <= Presstime <= (totalTime + Math.sqrt((Math.pow(totalTime, 2) - (4 * distanceToBeat))))/2
  let sqrt = Math.sqrt(Math.pow(totalTime * -1, 2) - 4 * distanceToBeat);
  let lower = Math.ceil((totalTime - sqrt) / 2);
  let higher = Math.floor((totalTime + sqrt) / 2);
  totalOfWays = (higher - lower + 1) * totalOfWays;
  return totalOfWays;
}

function performanceTest(runs) {
  let startTime;
  let endTime;
  let timeTotal = 0;
  let minTime = 9999999;
  let maxTime = 0;
  for (let i = 0; i <= runs; i++) {
    startTime = performance.now();
    console.log(part1("./input.txt"));
    endTime = performance.now();
    let timeTaken = endTime - startTime;
    minTime = minTime > timeTaken ? timeTaken : minTime;
    maxTime = maxTime < timeTaken ? timeTaken : maxTime;
    timeTotal += timeTaken;
  }

  console.log(
    `It took an average ${Math.ceil(timeTotal / runs)}ms. Min was ${Math.ceil(
      minTime
    )}ms. Max was ${Math.ceil(maxTime)}ms`
  );
}
performanceTest(100);
