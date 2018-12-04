// https://adventofcode.com/2018/day/2#part2

/*
--- Part Two ---
Confident that your list of box IDs is complete, you're ready to find the boxes full of prototype fabric.

The boxes will have IDs which differ by exactly one character at the same position in both strings. For example, given the following box IDs:

abcde
fghij
klmno
pqrst
fguij
axcye
wvxyz
The IDs abcde and axcye are close, but they differ by two characters (the second and fourth). However, the IDs fghij and fguij differ by exactly one character, the third (h and u). Those must be the correct boxes.

What letters are common between the two correct box IDs? (In the example above, this is found by removing the differing character from either ID, producing fgij.)
*/

// https://adventofcode.com/2018/day/2/input

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

const numberOfDiffs = (wordA, wordB) => {
  const splitA = wordA.split('');
  const splitB = wordB.split('');
  let numDiffs = 0;
  for (let i in splitA) {
    if (splitA[i] !== splitB[i]) {
      numDiffs++;
    }
  }
  return numDiffs;
}
const removeDiffs = (wordA, wordB) => {
  const splitA = wordA.split('');
  const splitB = wordB.split('');
  const withoutDiffs = [];
  for (let i in splitA) {
    if (splitA[i] === splitB[i]) {
      withoutDiffs.push(splitA[i]);
    }
  }
  return withoutDiffs.join('');
}

const offByOne = (word) => (otherWord) => {
  // console.log(word);
  // console.log(otherWord);
  return numberOfDiffs(word, otherWord) === 1 ? otherWord : null;
}

async function solveIt() {
  console.log('Retrieving');
  const inputUrl = 'https://adventofcode.com/2018/day/2/input';
  const inputBlob = await getAsync(inputUrl);
  
  console.log('Retrieved');

  for (let word in inputBlob) {
    const match = inputBlob.find(offByOne(inputBlob[word]));
    if (match) {
      console.log(removeDiffs(match, inputBlob[word]));
      break;
    }
  }
}

try {
  solveIt();
} catch (e) {
  console.error('Error occured');
  console.error(e);
}