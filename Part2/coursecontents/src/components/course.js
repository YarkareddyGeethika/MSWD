import React from 'react'

const Course = ({ course }) => {
    return (
        <div>
      <Header name={course.name}/>
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
      </div>
    )
  }
  
const Header=({name}) =>{
    return(
        <h2>{name}</h2>
    )
}
const Content=({parts})=>{
    return(
        <div>
      {parts.map((parts,i)=>
       <p key={i}>{ parts.name } : {parts.exercises}</p>
        )}
        </div>
    )
}

const Total=({parts})=>{
    const total = parts.reduce((sum, newlyadded) => sum+newlyadded.exercises,0)
    return (
        <div>
            <p><strong>Total of {total} exercises</strong></p>
        </div>
    )
}
  export default Course
