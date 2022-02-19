import words from './words';
import { useEffect, useState } from 'react';

const letterCounts = {
  a: 0,
  b: 0,
  c: 0,
  d: 0,
  e: 0,
  f: 0,
  g: 0,
  h: 0,
  i: 0,
  j: 0,
  k: 0,
  l: 0,
  m: 0,
  n: 0,
  o: 0,
  p: 0,
  q: 0,
  r: 0,
  s: 0,
  t: 0,
  u: 0,
  v: 0,
  w: 0,
  x: 0,
  y: 0,
  z: 0,
}

function Statistics() {
  const [analyzedStats, setAnalyzedStats] = useState(false);
  const [totalLetterCounts, setTotalLetterCounts] = useState(letterCounts);
  const [individualLetterCounts, setindividualLetterCounts] = useState([
    letterCounts,
    letterCounts,
    letterCounts,
    letterCounts,
    letterCounts,
  ]);

  useEffect(() => {
    getLetterStats()
    setAnalyzedStats(true);
  }, []);

  const getLetterStats = () => {
    const totalLetterCountsCopy = JSON.parse(JSON.stringify(totalLetterCounts));
    const individualLetterCountsCopy = JSON.parse(JSON.stringify(individualLetterCounts));
    words.forEach(word => {
      for (let i = 0; i < 5; i++){
        const letter = word[i];
        totalLetterCountsCopy[letter] ++;
        individualLetterCountsCopy[i][letter] ++;
      }
    })
    setTotalLetterCounts(Object.keys(totalLetterCountsCopy).sort((a, b) => totalLetterCountsCopy[b] - totalLetterCountsCopy[a]).map((letter) => {
      return {[letter]: totalLetterCountsCopy[letter]}
    }))
    
    setindividualLetterCounts(individualLetterCountsCopy.map((letterCounts, idx) => {
      return (
        Object.keys(letterCounts).sort((a, b) => letterCounts[b] - letterCounts[a]).map((letter) => {
          return {[letter]: letterCounts[letter]}
        })
      )
    }));
  }

  return (
    <div>
      {analyzedStats && 
      <>
        <h4>Statistics:</h4>
        <table>
          <thead>
            <tr>
              <th>Total Letter Counts</th>
              <th>1st Letter Count</th>
              <th>2nd Letter Count</th>
              <th>3rd Letter Count</th>
              <th>4th Letter Count</th>
              <th>5th Letter Count</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>
                {totalLetterCounts.map((letterCount) => {
                  let letter = "";
                  let count = "";
                  for (const [key, value] of Object.entries(letterCount)) {
                    letter = key;
                    count = value;
                  }
                  return <div key={"totalcount_" + letter}>{letter}: {count}</div>
                })}
              </td>
              {[0,1,2,3,4].map(letterSpot => {
                return (
                  <td key={"letter_" + letterSpot}>
                    {individualLetterCounts[letterSpot].map((letterCount) => {
                      let letter = "";
                      let count = "";
                      for (const [key, value] of Object.entries(letterCount)) {
                        letter = key;
                        count = value;
                      }
                      return <div key={"letter_" + letterSpot + "_" + letter}>{letter}: {count}</div>
                    })}
                  </td>
                )
              })}
            </tr>
          </tbody>
        </table>
      </>
      }
    </div>
  );
}

export default Statistics;
