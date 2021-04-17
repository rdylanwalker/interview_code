import React, {ChangeEventHandler, useState} from 'react';

function App() {
  const charOrder = ['r', 't', 'b', 'c', 'a'];
  const [examples, setExamples] = useState([
    ['asb', 'cab', 'cat', 'rat'], // false
    ['rat', 'cat', 'cab', 'asb'], // true
  ]);

  const [wordMatchResults, setWordMatchResults] = useState<{[key: string]: boolean[]}>({});

  const updateExample = (idx: number): ChangeEventHandler<HTMLInputElement> => (event) => {
    setExamples(prevState => {
     prevState[idx] = event.target.value.split(',');
     return [...prevState];
    });
  }

  function checkWords (letters: string[],words: string[], idx: number): void {
    setWordMatchResults(prevState => ({...prevState, [idx]: []}));
    let wordsToCheck = [...words];

    letters.forEach((letter) => {
      if (wordsToCheck[0].includes(letter)) {
        setWordMatchResults(prevState => {
          const prevIdx = prevState[idx] || [];
          return ({...prevState, [idx]: [...prevIdx, true]});
        });
        wordsToCheck.shift();
      }
    });
  }

  return (
    <div>
      {
        examples.map((example, idx) => (
          <div key={idx}>
            <span>Example {idx +1 }: </span>
            <input defaultValue={example.join(',')} onChange={updateExample(idx)} />
            <button onClick={() => checkWords(charOrder, example, idx)}>Check Example</button>
            <p>Result: {(wordMatchResults[idx]?.length === example.length).toString()}</p>
          </div>
        ))
      }
    </div>
  );
}

export default App;
