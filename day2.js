// https://adventofcode.com/2018/day/1#part2

/*
--- Part Two ---
You notice that the device repeats the same frequency change list over and over. To calibrate the device, you need to find the first frequency it reaches twice.

For example, using the same list of changes above, the device would loop as follows:

Current frequency  0, change of +1; resulting frequency  1.
Current frequency  1, change of -2; resulting frequency -1.
Current frequency -1, change of +3; resulting frequency  2.
Current frequency  2, change of +1; resulting frequency  3.
(At this point, the device continues from the start of the list.)
Current frequency  3, change of +1; resulting frequency  4.
Current frequency  4, change of -2; resulting frequency  2, which has already been seen.
In this example, the first frequency reached twice is 2. Note that your device might need to repeat its list of frequency changes many times before a duplicate frequency is found, and that duplicates might be found while in the middle of processing the list.

Here are other examples:

+1, -1 first reaches 0 twice.
+3, +3, +4, -2, -4 first reaches 10 twice.
-6, +3, +8, +5, -6 first reaches 5 twice.
+7, +7, -2, -7, -4 first reaches 14 twice.
What is the first frequency your device reaches twice?
*/

// https://adventofcode.com/2018/day/1/input

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
        const parsedData = rawData.split('\n').slice(0,-1);
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
  let firstFoundValue;
  let incrementalValues = [ 0 ];
  let i = 0;
  while (!firstFoundValue) {
    console.log(`Round ${i++}`);
    inputBlob.map(Number).forEach(newVal => {
      const addedValue = incrementalValues[incrementalValues.length - 1] + newVal;
      if (!firstFoundValue && incrementalValues.some(v => v === addedValue)) {
        console.log('setting val1', addedValue);
        firstFoundValue = addedValue;
      }
      incrementalValues.push(addedValue);
    });
  }

  console.log(firstFoundValue);
}

try {
  solveIt();
} catch (e) {
  console.error('Error occured');
  console.error(e);
}