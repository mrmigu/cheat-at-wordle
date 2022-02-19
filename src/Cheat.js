import cheat from './words';
import { useMemo, useState } from 'react';

function Cheat() {
  const [letter1, setLetter1] = useState("");
  const [letter2, setLetter2] = useState("");
  const [letter3, setLetter3] = useState("");
  const [letter4, setLetter4] = useState("");
  const [letter5, setLetter5] = useState("");
  const [yellowLetters, setYellowLetters] = useState("");
  const [greyLetters, setGreyLetters] = useState("");

  

  const filteredWords = useMemo(() => {
    const exactMatch = (word) => {
      return (!letter1 || word[0] === letter1)
      && (!letter2 || word[1] === letter2) 
      && (!letter3 || word[2] === letter3) 
      && (!letter4 || word[3] === letter4)
      && (!letter5 || word[4] === letter5);
    }
  
    const yellowMatch = (word) => {
      return yellowLetters.trim() === "" || yellowLetters.split("").every(letter => word.includes(letter));
    }
  
    const notGreyMatch = (word) => {
      return greyLetters.trim() === "" || !greyLetters.split("").some(letter => word.includes(letter));
    }

    if ((letter1 + letter2 + letter3 + letter4 + letter5).trim() === "" && yellowLetters.trim() === "" && greyLetters.trim() === ""){
      return cheat;
    }
    return cheat.filter(word => {
      return exactMatch(word) && yellowMatch(word) && notGreyMatch(word);
    })
  }, [letter1, letter2, letter3, letter4, letter5, yellowLetters, greyLetters]);

  const nextField = (target) => {
    target.nextElementSibling.focus();
  }

  return (
    <div className="App">
      <div>
        <input className="letter" type="string" maxLength={1} value={letter1} onChange={(e) => {
          setLetter1(e.target.value);
          nextField(e.target);
       }}/>
        <input className="letter" type="string" maxLength={1} value={letter2} onChange={(e) => {
          setLetter2(e.target.value)
          nextField(e.target);
        }}/>
        <input className="letter" type="string" maxLength={1} value={letter3} onChange={(e) => {
          setLetter3(e.target.value)
          nextField(e.target);
        }}/>
        <input className="letter" type="string" maxLength={1} value={letter4} onChange={(e) => {
          setLetter4(e.target.value)
          nextField(e.target);
        }}/>
        <input className="letter" type="string" maxLength={1} value={letter5} onChange={(e) => {
          setLetter5(e.target.value)
          nextField(e.target);
        }}/>
      </div>
      <div className='letters_list'>
        Yellow Letters: <input type="string" value={yellowLetters} onChange={(e) => setYellowLetters(e.target.value)} />
      </div>
      <div className='letters_list'>
        Grey Letters: <input type="string" value={greyLetters} onChange={(e) => setGreyLetters(e.target.value)} />
      </div>
      <h4>Words:({filteredWords.length})</h4>
      <ul>
        {filteredWords.map(word => {
          return <li key={word}>{word}</li>
        })}
      </ul>
    </div>
  );
}

export default Cheat;
