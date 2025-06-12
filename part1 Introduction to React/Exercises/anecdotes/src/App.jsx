import { useState } from 'react'

const App = () => {
  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]

  //const anecdoteVotes = new Uint8Array(8)
   
  const [selected, setSelected] = useState(0)
  const [vote, setVote] = useState(new Uint8Array(8))

  const quoteButtonClick = () => {
    const index = Math.floor(Math.random() * anecdotes.length);
    setSelected(index)
  }

  const voteButtonClick = () => {
    const copy = [...vote]
    copy[selected] += 1
    setVote(copy)
    console.log(anecdotes[vote.indexOf(Math.max(...vote))])
  }

  return (
    <div>
      <Header text="Anecdote of the day"/>
      <Anecdote anecdote={anecdotes[selected]}/>
      <DisplayVote vote={vote[selected]}/>
      <Button onClick={voteButtonClick} text="vote"/>
      <Button onClick={quoteButtonClick} text="next anecdote"/>
      <Header text="Anecdote with the most votes"/>
      <AnecdoteMostVotes anecdotes={anecdotes} votes={vote}/>
    </div>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const DisplayVote = ({vote}) => {
  return (
    <p>has {vote} votes</p>
  )
}

const Header = ({text}) => {
  return (
    <h1>{text}</h1>
  )
}

const Anecdote = ({anecdote}) => {
  return(
    <p>{anecdote}</p>
  )
}

const AnecdoteMostVotes = ({anecdotes, votes}) => {
  const mostVotesIndex = votes.indexOf(Math.max(...votes))
  const mostVotes = votes[mostVotesIndex]
  const anecdote = anecdotes[mostVotesIndex]

  return(
    <div>
      <p>{anecdote}</p>
      <DisplayVote vote={mostVotes}/>
    </div>
  )
}

export default App