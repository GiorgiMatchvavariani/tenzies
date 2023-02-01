
import './App.css';
import React from 'react';
import Die from './Die.js';
import {nanoid} from 'nanoid';
import Confetti from "react-confetti"

function App() {
const [dice,setDice] = React.useState(allNewDice())
const [Tenzies,setTenzies] = React.useState(false)

const [currentBest, SetCurrentBest] = React.useState(0)

const [allTimeBest,setAllTimeBest] =React.useState(JSON.parse(localStorage.getItem("allTimeBest")|| 0))

React.useEffect(()=>{
      const allHeld = dice.every(die=>die.isHeld)
      const firstValue = dice[0].value
      const allSameNamb = dice.every(die=>die.value === firstValue)
      if(allHeld && allSameNamb){
        setTenzies(true)
        if(allTimeBest===0){
        setAllTimeBest(currentBest)
          localStorage.setItem("allTimeBest",currentBest)
        }
        if(currentBest<allTimeBest){
          localStorage.setItem("allTimeBest",currentBest)
          setAllTimeBest(JSON.parse(localStorage.getItem("allTimeBest")))
        }
      }
},[dice])
//C:\Program Files\Git\bin
//C:\Program Files\Git\cmd
  function allNewDice(){
    const newArry =[]
    for(let i=0;i< 10; i++){
      newArry.push( {
        value: Math.ceil(Math.random()*6),
        id:nanoid(),
        isHeld: false
      })
  }
  return newArry
  }
  function roolDice(){
    SetCurrentBest(oldCurrentBest=>oldCurrentBest+1)
    setDice(oldDice=>oldDice.map(die=>{
      return die.isHeld ? die : {
        value: Math.ceil(Math.random()*6),
        id:nanoid(),
        isHeld: false
      }
    }))
  }
  function hold(id){
      setDice(oldDice=> oldDice.map(die =>{ 
          return die.id === id ? {
            ...die,isHeld: !die.isHeld
          } : die
      }))
  }
  const elementDie = dice.map(die=>{
    return  <Die 
              key={die.id} 
              value={die.value} 
              isHeld={die.isHeld}
              hold ={()=>hold(die.id)}
              />
})
function NewGame(){
  setDice(allNewDice())
  setTenzies(false)
  SetCurrentBest(0)
  
}
  return (
    <div className="main">
      {Tenzies && <Confetti />}
        <div>
          <h1 className="title">Tenzies</h1>
          <p className="instructions">Roll until all dice are the same. 
          Click each die to freeze it at its current value between rolls.</p>
        </div>
          <div className="bastGame">
            <h4>Current: {currentBest}</h4>
            <h4>all time best:{allTimeBest} </h4>
          </div>
        <div className="grid">
              {elementDie}
        </div> 
        {Tenzies ? <button 
          onClick={NewGame}
         className="button-rool">New Game
        </button> :
        <button 
          onClick={roolDice}
         className="button-rool">Rool
        </button>}
    </div>
  );
}

export default App;
