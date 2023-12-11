const { subscribe } = require("diagnostics_channel");
const fs = require("fs");

const fileReader = (file) => {
  return fs.readFileSync(file, { encoding: "utf8", flag: "r" });
};

function run(file) {
  const data = fileReader(file);
  const [
    listOfSeeds,
    seedToSoil,
    soilToFertilizer,
    fertilizerToWater,
    waterToLight,
    lightToTemp,
    tempToHumid,
    humidToLocation,
  ] = data.split("\r\n\r\n");

  const seeds = listOfSeeds.replace("seeds: ", "").split(" ");

  let seedRanges = getSeedRanges(seeds);
  let seedToSoilRanges = getAlmanacRanges(seedToSoil.split("\r\n"));
  let soilToFertilizerRange = getAlmanacRanges(soilToFertilizer.split('\r\n'));
  let fertilizerToWaterRange = getAlmanacRanges(fertilizerToWater.split('\r\n'));
  let waterToLightRange = getAlmanacRanges(waterToLight.split('\r\n'));
  let lightToTempRange = getAlmanacRanges(lightToTemp.split('\r\n'));
  let tempToHumidRange = getAlmanacRanges(tempToHumid.split('\r\n'));
  let humidToLocationRange = getAlmanacRanges(humidToLocation.split('\r\n'));
  let mapRanges = seedRanges;
  let allConversions = [];

  initRanges();

  for(const conversion of allConversions){
    cutForMapping(conversion);
    mapStep(conversion)
  }
  mapRanges.sort(sortFunction)
  return `The smallest distance is ${mapRanges[0][0]}`;

  function getSeedRanges(seeds) {
    let ranges = [];
    for (let i = 0; i <= seeds.length - 2; i += 2) {
      ranges.push([
        parseInt(seeds[i], 10),
        parseInt(seeds[i], 10) + parseInt(seeds[i + 1], 10) - 1,
      ]);
    }
    ranges.sort(sortFunction);
    return ranges;
  }

  function getAlmanacRanges(input) {
    let ranges = [];
    for (let i = 1; i <= input.length - 1; i++) {
      const [destination, source, range] = input[i].split(" ");
      const destinationAsInt = parseInt(destination, 10);
      const sourceAsInt = parseInt(source, 10);
      const rangeAsInt = parseInt(range, 10);
      ranges.push([
        sourceAsInt,
        sourceAsInt + rangeAsInt - 1,
        destinationAsInt,
        destinationAsInt + rangeAsInt - 1,
      ]);
    }
    ranges.sort(sortFunction);
    return ranges;
  }

  function initRanges(){
    allConversions.push(seedToSoilRanges);
    allConversions.push(soilToFertilizerRange);
    allConversions.push(fertilizerToWaterRange);
    allConversions.push(waterToLightRange);
    allConversions.push(lightToTempRange);
    allConversions.push(tempToHumidRange);
    allConversions.push(humidToLocationRange);
  }

  function mapStep(nextMapRangeConversions){
    for(const mapRange of mapRanges){
        let start = mapRange[0];
        let end = mapRange[1];
        for(const nextMapRangeConversion of nextMapRangeConversions){
            if(start >= nextMapRangeConversion[0] && start <= nextMapRangeConversion[1] && end >= nextMapRangeConversion[0] && end <= nextMapRangeConversion[1]){
                mapRange[0] += (nextMapRangeConversion[2] - nextMapRangeConversion[0])
                mapRange[1] += (nextMapRangeConversion[2] - nextMapRangeConversion[0])
            }
        }
        
    }

  }
  
  function cutForMapping(nextMapRangeConversions){
    for(const mapRange of mapRanges){
        const start = mapRange[0];
        const end = mapRange[1];
        for(const nextMapRangeConversion of nextMapRangeConversions){
            //If range is split, create new range (splitpoint, rangeEnd) and change range end to splitpoint
            if(start >= nextMapRangeConversion[0] && start <= nextMapRangeConversion[1] && end > nextMapRangeConversion[1]){
                mapRanges.push([nextMapRangeConversion[1] + 1, mapRange[1]]);
                mapRange[1] = nextMapRangeConversion[1];
            }
            if(mapRange[0] < nextMapRangeConversion[0] && mapRange[1] >= nextMapRangeConversion[0] && mapRange[1] <= nextMapRangeConversion[1]){
                mapRanges.push([mapRange[0], nextMapRangeConversion[0] - 1]);
                mapRange[0] = nextMapRangeConversion[0]
            }
        }
        
    }
  }

  function sortFunction(a, b) {
    if (a[0] === b[0]) {
      return 0;
    } else {
      return a[0] < b[0] ? -1 : 1;
    }
  }

  
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

performanceTest(1);
