import React, { useState } from 'react'

const App = (props) => {
  const anecdotes = [
    'If it hurts, do it more often',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
  ]
   
  const [selected, setSelected] = useState(0)
  const[vote,setVote]=useState([0, 0, 0, 0, 0, 0])
  const addVote = () => {
    const votesCopy = [...vote];
    votesCopy[selected] += 1;
    setVote(votesCopy);
  };
 const MaximumVotes =()=> vote.indexOf(Math.max(...vote));
  return (
    <div>
      <h1>Ancedote of the Day</h1>
      {anecdotes[selected]}<br></br> 
      <p>has {vote[selected]} votes</p>
      <button onClick={addVote}>Vote</button>
      <button onClick={()=>setSelected(selected+1)}>Next anecdote</button>
      <h2>Ancedote with most votes</h2>
      <p>{anecdotes[MaximumVotes()]}</p>
      <p>has {vote[MaximumVotes()]} votes</p>
    </div>
  )
}


export default App
