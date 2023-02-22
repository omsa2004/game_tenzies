import React from "react";
import Die from "./components/Die";
import { nanoid } from "nanoid";
import Confetti from 'react-confetti'

function App() {
  const [dice, setDice] = React.useState(allNewDice());
  const [tenzies, setTenzies] = React.useState(false);
  React.useEffect(() => {
    if (dice.every((die) => die.isHeld && die.value === dice[0].value)) {
      setTenzies(true);
    }
  }, [dice]);

  function generateNewDie() {
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid(),
    };
  }

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }

  function holdDice(id) {
    setDice((prev) =>
      prev.map((die) => (die.id === id ? { ...die, isHeld: !die.isHeld } : die))
    );
  }
  const diceElements = dice.map((die) => (
    <Die
      value={die.value}
      isHeld={die.isHeld}
      key={die.id}
      holdDice={() => holdDice(die.id)}
    />
  ));

  function Roll() {
    if(!tenzies){
      setDice((oldDice) =>
      oldDice.map((die, i) => (die.isHeld ? die : generateNewDie()))
      );
    } else{
      setDice(allNewDice())
      setTenzies(false)
    }
  }

  return (
    <main>
      {tenzies && <Confetti />}
      <h1 className="mainHeader">Tenzies</h1>
      <p className="mainParg">
        Roll untill all dice are the same. Click each die to freeze it at its
        current value between rolls
      </p>
      <div className="diceContainer">{diceElements}</div>
      <button onClick={Roll} className="roleDice">
        {tenzies ? "New Game" : "Roll"}
      </button>
    </main>
  );
}

export default App;
