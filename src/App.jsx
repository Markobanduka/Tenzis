import "./style.css";
import Die from "./Die";
import { useEffect, useState } from "react";
import {nanoid} from "nanoid"
import Confetti from "react-confetti"

export default function App() {
  const [dice, setDice] = useState(allNewDice()); //  Creating state
  const[tenzis, setTenzis] =useState(false) //  Adding state Tenzis

  //  Use effect 
  useEffect(()=>{
    const AllHeld = dice.every(die => die.isHeld)
    const firstValue = dice[0].value
    const allSameValue = dice.every(die => die.value === firstValue)
    if (AllHeld && allSameValue) {
      setTenzis(true)
      
    }
   
  },[dice])
   
   
  function generateNewDie(){
    return {
      value: Math.ceil(Math.random() * 6),
      isHeld: false,
      id: nanoid()
    }
  }

    //  Generate 10 random numbers

  function allNewDice() {
    const newDice = [];
    for (let i = 0; i < 10; i++) {
      newDice.push(generateNewDie());
    }
    return newDice;
  }
 
  //  Roll dice button 
  function rollDice(){
    if (!tenzis){       // Setting tenzis
      setDice(oldDice => oldDice.map(die => { //  Updating rollDice to hold die
        return die.isHeld ? 
        die :
        generateNewDie()
      }))
    } else { 
      setTenzis(false) 
      setDice(allNewDice) 
    }
  }

  // Holding die
  function holdDice(id){
    setDice(oldDice => oldDice.map(die => {
      return die.id === id ? 
      {...die, isHeld: !die.isHeld} :
      die
    }))
  }


   // Mapping to create boxes
  const diceElements = dice.map(die=> 
    //  Adding die value and key
  <Die value={die.value} key={die.id} isHeld={die.isHeld} holdDice={()=>holdDice(die.id)}/>) // Adding hold

  return (
    <main>
      
      {tenzis && <Confetti width={"600px"}/>}
      <h1 className="title">Tenzis</h1>
      <p className="instructions">Roll until all dice are the same. Click each die to freeze it at  its current value between rolls</p>
      <div className="dice-container">{diceElements}</div>
      <button 
      className="roll-dice" 
      onClick={rollDice}
      > 
         
        {tenzis ? "New Game" : "Roll"} 
        </button>
    </main>
  );
}

