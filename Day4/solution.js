const { subscribe } = require("diagnostics_channel");
const fs = require("fs");

const fileReader = (file) => {
  return fs.readFileSync(file, { encoding: "utf8", flag: "r" });
};

function run(file) {
  const data = fileReader(file);

  const arrayOfCards = data
    .split("\r\n")
    .map((card) => card.replace(/Card *\d*: /g, ""));

  const regex = / (\d)([^\d]|$)/gm;
  const substitute = `0$1 `;
  const formattedArrayOfCards = arrayOfCards.map((str) =>
    str.replace(regex, substitute)
  );
  let totalPoints = 0;
  let totalCards = 0;
  let forwardLook = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

  for (const card of formattedArrayOfCards) {
    const [winningCard, myCard] = card.split(" | ");
    const winningCardArray = winningCard.split(" ");
    const myCardArray = myCard.split(" ");
    let numberOfMatches = 0;
    let numberOfExtraCards = forwardLook[0];
    totalCards += 1 + (1 * numberOfExtraCards);
    forwardLook.shift();
    forwardLook.push(0);

    for (const myCard of myCardArray) {
      if (winningCardArray.includes(myCard)) {
        numberOfMatches += 1;
      }
    }

    if (numberOfMatches > 0) {
      totalPoints += Math.pow(2, numberOfMatches - 1);

      for (let i = 0; i < numberOfMatches; i++) {
        forwardLook[i] += 1 + (1 * numberOfExtraCards);
      }
    }
  }
  return `Total points: ${totalPoints}, total cards: ${totalCards}`;
}

function performanceTest(runs){
  let startTime;
  let endTime;
  let timeTotal = 0;
  let minTime = 9999999;
  let maxTime = 0;
  for(let i = 0; i <= runs; i++){
      startTime = performance.now();
      console.log(run("./input.txt"));
      endTime = performance.now();
      let timeTaken = (endTime - startTime)
      minTime = minTime > timeTaken ? timeTaken : minTime;
      maxTime = maxTime < timeTaken ? timeTaken : maxTime;
      timeTotal += timeTaken;
  }

console.log(`It took an average ${Math.ceil(timeTotal / runs)}ms. Min was ${Math.ceil(minTime)}ms. Max was ${Math.ceil(maxTime)}ms`);
}

performanceTest(100);
