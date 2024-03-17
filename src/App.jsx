import { useState, useEffect } from 'react'
import './App.css'
import Dice from './components/Dice'
import { nanoid } from 'nanoid'
import Confetti from 'react-confetti'

function App() {

  const [numArray, setNumArray] = useState(allNewDice());
  const [tenzies, setTenzies] = useState(false)

  useEffect(() => {
    const allHeld = numArray.every(die => die.isHeld)
    const firstValue = numArray[0].value
    const allSameValue = numArray.every(die => die.value === firstValue)
    if (allHeld && allSameValue) {
        setTenzies(true)
    }
  }, [numArray]);

  const allDice = numArray.map(dice => (
    <Dice 
      key={dice.id} 
      number={dice.value} 
      isHeld={dice.isHeld} 
      holding={() => holdDice(dice.id)}
    />
  ));

  function generateNewDie(){
    return {
      value: (Math.floor(Math.random() * 6) + 1),
      isHeld: false,
      id: nanoid()
    }
  }

  function allNewDice(){
    const diceArr = [];
    for(let i = 0; i < 10; i++){
      diceArr.push(generateNewDie())
    }
    return diceArr;
  }

  function rollDice(){
    if(!tenzies){
      setNumArray(oldNumArray => oldNumArray.map(die => {
        return die.isHeld === false ? 
          generateNewDie()
          : die
      }))
    } else {
      setNumArray(oldDice => {
        for(let i = 0; i < oldDice.length; i++){
          return allNewDice();
        }
      })
      setTenzies(false)
    }
  }

  function holdDice(diceId){
    setNumArray(oldNumArray => oldNumArray.map(die => {
      return die.id === diceId ? 
        {...die, isHeld: !die.isHeld} 
        : die
    }))
  }


  return (
    <main className='app'>
      {tenzies && <Confetti />}
      <h1 className='app__title'>Tenzies</h1>
      <p className='app__description'>Roll until all dice are the same. Click each die to freeze it at its current value between rolls.</p>
      <div className="app__container">
        {allDice}
      </div>
      <button onClick={rollDice} className='app__button'>{tenzies ? 'New game' : 'Roll'}</button>
    </main>
  )
}

export default App
