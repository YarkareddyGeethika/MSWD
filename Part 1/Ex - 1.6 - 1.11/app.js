import React, { useState } from 'react'

const App = () => {
  const [good,setGood]=useState(0)
  const [neutral,setNeutral]=useState(0)
  const[bad,setBad]=useState(0)
  const Statistics= (props) =>{
     const  good = props.good
      const  neutral=props.neutral
        const bad =props.bad
        const all=props.good+props.neutral+props.bad
        const average = (props.good + (props.bad*-1))/all
        const positive=props.good/all*100
        if (all===0){
          return (
            <div>
              <p>No Feedbacks given</p>
            </div>
          )
        }
        return(
         <table>
           <div>
           <Statistic text="Good" value={good} />
           <Statistic text="Neutral" value={neutral} />
           <Statistic text="Bad" value={bad} />
           <Statistic text="All" value={all} />
           <Statistic text="Average" value={average} />
           <Statistic text="Positive" value={positive} />
           </div>
         </table>
        )
  
  }
  return(
    <div>
      <h1>Give Your Valuable Feedback</h1>
      <Button click={()=>setGood(good+1)} text="Good"></Button>
      <Button click={()=>setNeutral(neutral+1)} text="Neutral"></Button>
      <Button click={()=>setBad(bad+1)} text="Bad"></Button>
      <h2>MERN STACK WEB DEVELOPMENT</h2>
      <Statistics good={good} bad ={bad} neutral={neutral} />
    </div>
  )
}
const Statistic= (props)=>{
  return (
   <p> {props.text} {props.value}</p> )
}
const Button =(props)=>{
  return(
    <button onClick={props.click}>{props.text}</button>
  )
}
export default App;
