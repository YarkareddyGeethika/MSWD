
import './App.css';

function App() {
  const course ={
    name: 'Half Stack application development',
    parts:[
      {
      name:'Fundamentals of React',
      exercises:10
      },
      {
        name:'Using props to pass data',
        exercises:7
      },
      {
        name:'State of a component',
        exercises:14
      },
    ]
  };
  
  return (
    <div>
      <Header course={course.name} />
      <Content parts={course.parts}/>
      <Total parts={course.parts}/>
    </div>
    
  )
}
const Header=(props)=>{
  console.log(props)
 return <h1>{props.course}</h1>
};
const Part=({part})=> {
  return <p>{part.name} : {part.exercises}</p>
};
const Content=({parts})=>{
  return <h2>
    <Part part={parts[0]}/>
    <Part part={parts[1]}/>
    <Part part={parts[2]}/>
  </h2>
};
const Total=({parts})=>{
  console.log(parts)
  return (
    <h3>Number of exercises = {parts[0].exercises + parts[1].exercises + parts[2].exercises}</h3>
  );
};

export default App;
