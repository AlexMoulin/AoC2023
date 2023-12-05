const fs = require('fs');

const fileReader = (file) => {
    return fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
}

function calibrationDecrytion(data){
    let lines = data.split('\r\n');
    let digits = [];
    let filteredLines = [];

    for(const line of lines){
        filteredLines.push(extractNumbers(line));
    }

    for(const line of filteredLines){
        if(line.length === 1){
            digits.push(line.toString() + line.toString());
        }
        else if(line.length > 2){
            let numberLength = line.length;
            digits.push(line[0].toString() + line[numberLength - 1].toString())
        } else {
            digits.push(line[0].toString() + line[1].toString())
        }
    }
    return digits;
}

function extractNumbers(string){
    const numbersArray = ['one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine'];
    const regex = /\d/gm;
    let arrayOfNumbers = [];
    let stringToAnalyze = '';
    for(const character in string){
        if(!string[character].match(regex)){
            stringToAnalyze += string[character];
            let otherString = stringToAnalyze;
            if(arrayContains(stringToAnalyze, numbersArray)){
                arrayOfNumbers.push(numbersArray.indexOf(stringToAnalyze) + 1);
                stringToAnalyze = stringToAnalyze.slice(-1);
            }
            while(otherString.length > 0){
                otherString = otherString.slice(1);
                if(arrayContains(otherString, numbersArray)){
                    arrayOfNumbers.push(numbersArray.indexOf(otherString) + 1);
                    stringToAnalyze = stringToAnalyze.slice(-1);
                }
            }
        } else {
            arrayOfNumbers.push(parseInt(string[character], 10));
            stringToAnalyze = '';
        }
    }
    return arrayOfNumbers;
}

function arrayContains(stringToFind, array){
    return (array.indexOf(stringToFind) > -1);
}

function addAllCalibration(calibrations){
    let sumTotal = 0;
    for(const calibration of calibrations){
        sumTotal += parseInt(calibration, 10);
    }
    return sumTotal
}

function performanceTest(runs){
    let startTime;
    let endTime;
    let timeTotal = 0;
    let minTime = 9999999;
    let maxTime = 0;
    for(let i = 0; i <= runs; i++){
        startTime = performance.now();
        console.log(addAllCalibration(calibrationDecrytion(fileReader('./input.txt'))));
        endTime = performance.now();
        let timeTaken = (endTime - startTime)
        minTime = minTime > timeTaken ? timeTaken : minTime;
        maxTime = maxTime < timeTaken ? timeTaken : maxTime;
        timeTotal += timeTaken;
    }

console.log(`It took an average ${Math.ceil(timeTotal / runs)}ms. Min was ${Math.ceil(minTime)}ms. Max was ${Math.ceil(maxTime)}ms`);
}

performanceTest(1000);