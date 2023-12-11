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

  let arrayOfLocations = [];



  for (const seed of seeds) {
    const soil = getConvertionFromMap(
      seed,
      seedToSoil.replace("seed-to-soil map:\r\n", "").split("\r\n")
    );
    const fertilizer = getConvertionFromMap(
      soil,
      soilToFertilizer.replace("soil-to-fertilizer map:\r\n", "").split("\r\n")
    );
    const water = getConvertionFromMap(
      fertilizer,
      fertilizerToWater
        .replace("fertilizer-to-water map:\r\n", "")
        .split("\r\n")
    );
    const light = getConvertionFromMap(
      water,
      waterToLight.replace("water-to-light map:\r\n", "").split("\r\n")
    );
    const temp = getConvertionFromMap(
      light,
      lightToTemp.replace("light-to-temperature map:\r\n", "").split("\r\n")
    );
    const humid = getConvertionFromMap(
      temp,
      tempToHumid.replace("temperature-to-humidity map:\r\n", "").split("\r\n")
    );
    const location = getConvertionFromMap(
      humid,
      humidToLocation.replace("humidity-to-location map:\r\n", "").split("\r\n")
    );
    arrayOfLocations.push(parseInt(location, 10));
  }

  return `Part 1: ${Math.min(...arrayOfLocations)}`;

  function getConvertionFromMap(input, maps) {
    for (const map of maps) {
      const [destination, source, range] = map.split(" ");
      const destinationAsInt = parseInt(destination, 10);
      const sourceAsInt = parseInt(source, 10);
      const rangeAsInt = parseInt(range, 10);
      const inputAsInt = parseInt(input, 10);
      if (inputAsInt >= source && inputAsInt <= sourceAsInt + rangeAsInt) {
        return (destinationAsInt + (inputAsInt - sourceAsInt)).toString();
      }
    }
    return input;
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

performanceTest(100);
