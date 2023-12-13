const fs = require("fs");

const fileReader = (file) => {
  return fs.readFileSync(file, { encoding: "utf8", flag: "r" });
};

function part1(file) {
  const hands = fileReader(file)
    .split("\r\n")
    .map((value) => value.split(" "));
  let fiveOfAKind = [];
  let fourOfAKind = [];
  let fullHouse = [];
  let threeOfAKind = [];
  let twoPairs = [];
  let onePair = [];
  let highCard = [];
  let sortedHands = [];
  let totalWinnings = 0;

  for (const hand of hands) {
    let labels = {};
    for (let x = 0; x < hand[0].length; x++) {
      const l = hand[0].charAt(x);
      labels[l] = isNaN(labels[l]) ? 1 : labels[l] + 1;
    }

    if (Object.keys(labels).length === 5) {
      highCard.push(hand);
    } else if (Object.keys(labels).length === 4) {
      onePair.push(hand);
    } else if (Object.keys(labels).length === 1) {
      fiveOfAKind.push(hand);
    } else {
      let maxNumberOfCards = Math.max(...Object.values(labels));

      if (Object.keys(labels).length === 2) {
        if (maxNumberOfCards === 4) {
          fourOfAKind.push(hand);
        } else {
          fullHouse.push(hand);
        }
      }
      if (Object.keys(labels).length === 3) {
        if (maxNumberOfCards === 3) {
          threeOfAKind.push(hand);
        } else {
          twoPairs.push(hand);
        }
      }
    }
  }

//   console.log(`fiveOfAKind ${fiveOfAKind}`)
//   console.log(`fourOfAKind ${fourOfAKind}`)
//   console.log(`fullHouse ${fullHouse}`)
//   console.log(`threeOfAKind ${threeOfAKind}`)
//   console.log(`twoPairs ${twoPairs}`)
//   console.log(`onePair ${onePair}`)
//   console.log(`highCard ${highCard}`)

  sortedHands.push(mergeSort(highCard));
  sortedHands.push(mergeSort(onePair));
  sortedHands.push(mergeSort(twoPairs));
  sortedHands.push(mergeSort(threeOfAKind));
  sortedHands.push(mergeSort(fullHouse));
  sortedHands.push(mergeSort(fourOfAKind));
  sortedHands.push(mergeSort(fiveOfAKind));
  sortedHands = sortedHands.flat();
  console.log(sortedHands);
  for (const hand in sortedHands) {
    totalWinnings +=
      parseInt(sortedHands[hand][1], 10) * (parseInt(hand, 10) + 1);
  }
  return totalWinnings;
}
function part2(file) {
  const hands = fileReader(file)
    .split("\r\n")
    .map((value) => value.split(" "));
  let fiveOfAKind = [];
  let fourOfAKind = [];
  let fullHouse = [];
  let threeOfAKind = [];
  let twoPairs = [];
  let onePair = [];
  let highCard = [];
  let sortedHands = [];
  let totalWinnings = 0;

  for (const hand of hands) {
    let labels = {};
    for (let x = 0; x < hand[0].length; x++) {
      const l = hand[0].charAt(x);

      labels[l] = isNaN(labels[l]) ? 1 : labels[l] + 1;
    }

    if (labels["J"] && labels["J"] < 5) {
      let value = 0;
      let key;
      for (const label in labels) {
        if(label !== "J" && parseInt(labels[label], 10) > value){
            key = label;
            value = parseInt(labels[label], 10);
        }
      }
      labels[key] += parseInt(labels["J"], 10);
      delete labels["J"];
    }

    if (Object.keys(labels).length === 5) {
      highCard.push(hand);
    } else if (Object.keys(labels).length === 4) {
      onePair.push(hand);
    } else if (Object.keys(labels).length === 1) {
      fiveOfAKind.push(hand);
    } else {
      let maxNumberOfCards = Math.max(...Object.values(labels));

      if (Object.keys(labels).length === 2) {
        if (maxNumberOfCards === 4) {
          fourOfAKind.push(hand);
        } else {
          fullHouse.push(hand);
        }
      }
      if (Object.keys(labels).length === 3) {
        if (maxNumberOfCards === 3) {
          threeOfAKind.push(hand);
        } else {
          twoPairs.push(hand);
        }
      }
    }
  }

  console.log(`fiveOfAKind ${fiveOfAKind}`)
  console.log(`fourOfAKind ${fourOfAKind}`)
  console.log(`fullHouse ${fullHouse}`)
  console.log(`threeOfAKind ${threeOfAKind}`)
  console.log(`twoPairs ${twoPairs}`)
  console.log(`onePair ${onePair}`)
  console.log(`highCard ${highCard}`)

  sortedHands.push(mergeSort(highCard));
  sortedHands.push(mergeSort(onePair));
  sortedHands.push(mergeSort(twoPairs));
  sortedHands.push(mergeSort(threeOfAKind));
  sortedHands.push(mergeSort(fullHouse));
  sortedHands.push(mergeSort(fourOfAKind));
  sortedHands.push(mergeSort(fiveOfAKind));
  sortedHands = sortedHands.flat();
  console.log(sortedHands);
  for (const hand in sortedHands) {
    //console.log(totalWinnings);
    totalWinnings +=
      parseInt(sortedHands[hand][1], 10) * (parseInt(hand, 10) + 1);
  }
  return totalWinnings;
}

function merge(left, right) {
  const labelStrengths = [
    "J",
    "2",
    "3",
    "4",
    "5",
    "6",
    "7",
    "8",
    "9",
    "T",
    "Q",
    "K",
    "A",
  ];
  let newArray = [];
  while (left.length && right.length) {
    for (let i = 0; i < 5; i++) {
      if (
        labelStrengths.indexOf(left[0][0][i]) <
        labelStrengths.indexOf(right[0][0][i])
      ) {
        newArray.push(left.shift());
        break;
      } else if (
        labelStrengths.indexOf(left[0][0][i]) >
        labelStrengths.indexOf(right[0][0][i])
      ) {
        newArray.push(right.shift());
        break;
      }
    }
  }
  return [...newArray, ...left, ...right];
}

function mergeSort(array) {
  const half = array.length / 2;

  if (array.length < 2) {
    return array;
  }

  const left = array.splice(0, half);
  return merge(mergeSort(left), mergeSort(array));
}

function performanceTest(runs) {
  let startTime;
  let endTime;
  let timeTotal = 0;
  let minTime = 9999999;
  let maxTime = 0;
  for (let i = 0; i < runs; i++) {
    startTime = performance.now();
    console.log(part2("./input.txt"));
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

performanceTest(1);
