import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const goodClick = () => {
    const newValue = good + 1
    setGood(newValue)
  }
  const neutralClick = () => {
    const newValue = neutral + 1
    setNeutral(newValue)
  }
  const badClick = () => {
    const newValue = bad + 1
    setBad(newValue)
  }

  return (
    <div>
      <Header title="Give feedback"/>
      <Button onClick={goodClick} text="good"/>
      <Button onClick={neutralClick} text="neutral"/>
      <Button onClick={badClick} text="bad"/>
      <Header title="Statistics"/>
      <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/>
    </div>
  )
}

const Header = ({title}) => {
  return (
    <h1>{title}</h1>
  )
}

const Button = ({onClick, text}) => {
  return (
    <button onClick={onClick}>{text}</button>
  )
}

const Display = ({text, value}) => {
  return (
    <p>{text} {value}</p>
  )
}

export default App
