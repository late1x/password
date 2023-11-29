import React, { useState } from 'react';
import './App.css';

const generateCombinations = (text, totalCombinations) => {
  const characters = 'abcdefghijklmnopqrstuvwxyz0123456789#$@';
  const combinations = new Set();

  while (combinations.size < totalCombinations) {
    let combination = '';
    for (let j = 0; j < text.length; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      combination += characters[randomIndex];
    }
    combinations.add(combination);
  }

  return Array.from(combinations);
};

const organizeInRows = (combinations, columns) => {
  const organizedCombinations = [];
  const rows = Math.ceil(combinations.length / columns);

  for (let i = 0; i < rows; i++) {
    const row = combinations.slice(i * columns, (i + 1) * columns);
    organizedCombinations.push(row);
  }

  return organizedCombinations;
};

const App = () => {
  const [inputText, setInputText] = useState('');
  const [totalCombinations, setTotalCombinations] = useState(0);
  const [generatedCombinations, setGeneratedCombinations] = useState([]);
  const [matchResult, setMatchResult] = useState('');

  const handleGenerateCombinations = () => {
    const combinations = generateCombinations(inputText, totalCombinations);
    setGeneratedCombinations(combinations);

    const matchIndex = combinations.indexOf(inputText);
    if (matchIndex !== -1) {
      const row = Math.floor(matchIndex / 2) + 1;
      const column = (matchIndex % 2) + 1;
      setMatchResult(`Se encontró una coincidencia en la fila ${row}, columna ${column}`);
    } else {
      setMatchResult('No se encontraron coincidencias');
    }
  };

  return (
    <div className="App">
      <div>
        <label>
          Ingrese una contraseña:
          <input
            type="text"
            maxLength="4"
            value={inputText}
            onChange={(e) => setInputText(e.target.value)}
          />
        </label>
      </div>
      <div>
        <label>
          Total de combinaciones a generar:
          <input
            type="number"
            value={totalCombinations}
            onChange={(e) => setTotalCombinations(parseInt(e.target.value))}
          />
        </label>
      </div>
      <button onClick={handleGenerateCombinations}>Generar Combinaciones</button>
      <div>{matchResult}</div>
      <div>
        <table>
          <thead></thead>
          <tbody>
            {organizeInRows(generatedCombinations, 20).map((row, rowIndex) => (
              <tr key={rowIndex}>
                {row.map((combination, columnIndex) => (
                  <td key={columnIndex}>{combination}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default App;
