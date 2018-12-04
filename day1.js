// https://adventofcode.com/2018/day/1

// After feeling like you've been falling for a few minutes, you look at the device's tiny screen. "Error: Device must be calibrated before first use. Frequency drift detected. Cannot maintain destination lock." Below the message, the device shows a sequence of changes in frequency (your puzzle input). A value like +6 means the current frequency increases by 6; a value like -3 means the current frequency decreases by 3.

// For example, if the device displays frequency changes of +1, -2, +3, +1, then starting from a frequency of zero, the following changes would occur:

// Current frequency  0, change of +1; resulting frequency  1.
// Current frequency  1, change of -2; resulting frequency -1.
// Current frequency -1, change of +3; resulting frequency  2.
// Current frequency  2, change of +1; resulting frequency  3.
// In this example, the resulting frequency is 3.

// Here are other example situations:

// +1, +1, +1 results in  3
// +1, +1, -2 results in  0
// -1, -2, -3 results in -6
// Starting with a frequency of zero, what is the resulting frequency after all of the changes in frequency have been applied?

// https://adventofcode.com/2018/day/1/input

const { promisify } = require('util');
const https = require('https');

const getAsync = (url) => new Promise((resolve, reject) => {
  https.get(url, {
    headers: {
      'Cookie': `session=${process.env.session}`,
    },
  }, (res) => {
    let rawData = '';
    res.on('data', (chunk) => { rawData += chunk; });
    res.on('end', () => {
      try {
        // console.log(rawData);
        const parsedData = rawData.split('\n');
        resolve(parsedData);
      } catch (e) {
        reject(e.message);
      }
    });
  });
});

async function solveIt() {
  console.log('Retrieving');
  const inputUrl = 'https://adventofcode.com/2018/day/1/input';
  const inputBlob = await getAsync(inputUrl);
  
  console.log('Retrieved');

  const answer = inputBlob.reduce((prev, curr) => {
    return prev + Number(curr);
  }, 0);

  console.log(answer);
}

try {
  solveIt();
} catch (e) {
  console.error('Error occured');
  console.error(e);
}