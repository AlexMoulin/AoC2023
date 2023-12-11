const fs = require("fs");

const fileReader = (file) => {
  return fs.readFileSync(file, { encoding: "utf8", flag: "r" });
};

function run(file) {
  const directions = [
    [-1, 0], //left
    [-1, -1], //upper-left
    [0, -1], // up
    [1, -1], // upper-right
    [1, 0], // right
    [1, 1], // lower-right
    [0, 1], // under
    [-1, 1], // lower-left
  ];

  const dataRows = fileReader(file).split("\r\n");

  const isDigit = (char) => /[0-9]/.test(char);
  const isSymbol = (char) => char !== "." && !isDigit(char);
  const isStar = (char) => char === '*';

  let dataCopy = [];

  let sumTotal = 0;
  let gearRatio = 0;


  findSymbols();

  

  function findSymbols() {
    for (const row in dataRows) {
      for (const col in dataRows[row]) {
        const rowAsNumber = parseInt(row, 10);
        const colAsNumber = parseInt(col, 10);

        if (isSymbol(dataRows[rowAsNumber][colAsNumber])) {
          dataCopy = []
          create2DArrayFromStringArray(dataRows);
          let numbersToAdd = [];

          for (const direction in directions) {
            const newRow = rowAsNumber + parseInt(directions[direction][0], 10);
            const newCol = colAsNumber + parseInt(directions[direction][1], 10);
            
            // If neighbour is in array bounds
            if (
              newRow >= 0 &&
              newRow < dataRows.length &&
              newCol >= 0 &&
              newCol < dataRows[row].length
            ) {
                let numberFound = checkNeighbourForNumber(newRow, newCol);
                if(numberFound){
                    numbersToAdd.push(numberFound);
                }

            }
          }

          numbersToAdd.forEach(number => sumTotal += number);
          if(numbersToAdd.length === 2 && isStar(dataRows[rowAsNumber][colAsNumber])) {
            let gearFactor = 1;
            numbersToAdd.forEach(number => gearFactor *= number);
            gearRatio += gearFactor;
          }
        }
      }

    }

  }

  function create2DArrayFromStringArray(dataRows){
    for (const row in dataRows) {
       dataCopy[row] = dataRows[row].split(''); 
    }
  }

  function checkNeighbourForNumber(row, col) {
    if (isDigit(dataCopy[row][col])) {
      let numbersFound = [];
  
      //move to the most right number
      let moveRight = col + 1;
      while (
        moveRight <= dataCopy[row].length &&
        isDigit(dataCopy[row][moveRight])
      ) {
        moveRight += 1;
      }
  
      let leftSearch = moveRight - 1;

      while (leftSearch >= 0 && isDigit(dataCopy[row][leftSearch])) {
        numbersFound.push(dataCopy[row][leftSearch]);
        dataCopy[row][leftSearch] = '.'
        leftSearch -= 1;
      }
      numbersFound.reverse();
      let finalNumber = parseInt(numbersFound.join(""), 10);
      return finalNumber;
    }
    return null;
  }

  return `Part1: ${sumTotal}, part 2: ${gearRatio}`;

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