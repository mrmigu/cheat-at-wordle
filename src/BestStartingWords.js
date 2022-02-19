import words from './words';
import { useEffect, useState } from 'react';

const WORD_LIMIT = 25;

function BestStartingWords() {
  const [bestStartingWords, setBestStartingWords] = useState(null);

  useEffect(() => {
    setTimeout(getBestStartingWords, 0);    
  }, []);

  const getBestStartingWords = () => {
    const bestWords = words.map(word => {
      let greenLetters = 0;
      let yellowLetters = 0;
      words.forEach(compareWord => {
        for (let i = 0; i < 5; i++){
          for (let j = i; j < 5; j++){
            if (word[i] === compareWord[j] && i === j) {
              greenLetters ++;
            } else if (word[i] === compareWord[j]){
              yellowLetters++;
            }
          }
        }
      })
      return {word: word, greenLetters, yellowLetters};
    })
    .sort((a,b) => b.greenLetters  === a.greenLetters ? b.yellowLetters - a.yellowLetters : b.greenLetters - a.greenLetters)
    .slice(0, WORD_LIMIT)
    setBestStartingWords(bestWords);
  }

  return (
    <div>
      {!bestStartingWords && (
        <div>
          Thinking...
        </div>
      )}
      {bestStartingWords && 
      <>
        <h4>Top {WORD_LIMIT} Starting Words:</h4>
        <table>
          <thead>
            <tr>
              <th>Word</th>
              <th>Green Letters</th>
              <th>Yellow Letters</th>
            </tr>
          </thead>
          <tbody>
            {bestStartingWords.map(bestWord => {
              return (<tr key={"word_" + bestWord.word}>
                  <td>{bestWord.word}</td>
                  <td>{Math.round(1000 * bestWord.greenLetters / words.length) / 10}%</td>
                  <td>{Math.round(1000 * bestWord.yellowLetters / words.length) / 10}%</td>
              </tr>)
            })}
          </tbody>
        </table>
      </>
      }
    </div>
  );
}

export default BestStartingWords;
