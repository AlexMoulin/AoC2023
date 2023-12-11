const fs = require('fs');

const fileReader = (file) => {
    return fs.readFileSync(file, { encoding: 'utf8', flag: 'r' });
}

function run(redsAllowed, greensAllowed, bluesAllowed, file){
    const fileData = fileReader(file);
    const games = fileData.split('\r\n').map(game => game.replace(/Game \d: /g, '').split(';'));
    const greenRegex = /\d* green/g;
    const blueRegex =  /\d* blue/g;
    const redRegex = /\d* red/g;
    let indexTotals = 0;
    let power = 0;
    
    for(const game in games){
        let highestGreenAmount = 0;
        let highestBlueAmount = 0;
        let highestRedAmount = 0;
        for(const hand in games[game]){
            let greensInHand = games[game][hand].match(greenRegex);
            let bluesInHand = games[game][hand].match(blueRegex);
            let redsInHand = games[game][hand].match(redRegex);

            if(greensInHand !== undefined && greensInHand !== null){
                highestGreenAmount = highestGreenAmount < parseInt(greensInHand.toString().split(' ')[0], 10) ? parseInt(greensInHand.toString().split(' ')[0], 10) : highestGreenAmount;
            }
            if(bluesInHand !== undefined && bluesInHand !== null){
                highestBlueAmount = highestBlueAmount < parseInt(bluesInHand.toString().split(' ')[0], 10) ? parseInt(bluesInHand.toString().split(' ')[0], 10) : highestBlueAmount;
            }
            if(redsInHand !== undefined && redsInHand !== null){
                highestRedAmount = highestRedAmount < parseInt(redsInHand.toString().split(' ')[0], 10) ? parseInt(redsInHand.toString().split(' ')[0], 10) : highestRedAmount;
            }
        }

        if(highestGreenAmount <=  greensAllowed && highestBlueAmount <= bluesAllowed && highestRedAmount <= redsAllowed ){
            indexTotals += (parseInt(game, 10) + 1)
        }
        power += (highestRedAmount * highestGreenAmount * highestBlueAmount)
    }
    return `TotalIndexes are ${indexTotals}. Total power is ${power}`;

}

function performanceTest(runs){
    let startTime;
    let endTime;
    let timeTotal = 0;
    let minTime = 9999999;
    let maxTime = 0;
    for(let i = 0; i <= runs; i++){
        startTime = performance.now();
        console.log(run(12, 13, 14, './input.txt'));
        endTime = performance.now();
        let timeTaken = (endTime - startTime)
        minTime = minTime > timeTaken ? timeTaken : minTime;
        maxTime = maxTime < timeTaken ? timeTaken : maxTime;
        timeTotal += timeTaken;
    }

    console.log(`It took an average ${Math.ceil(timeTotal / runs)}ms. Min was ${Math.ceil(minTime)}ms. Max was ${Math.ceil(maxTime)}ms`);
}

performanceTest(100);