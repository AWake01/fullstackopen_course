import { useState } from 'react'

function App() {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)
  const [total, setTotal] = useState(0)
  const [average, setAverage] = useState(0)
  const [positive, setPositive] = useState(0)

  const goodClick = () => {
    const newGood = good + 1
    const newTotal = total + 1
    setGood(newGood)
    setTotal(newTotal)
    calcStats(newGood, bad, newTotal)
  }
  const neutralClick = () => {
    const newNeutral = neutral + 1
    const newTotal = total + 1
    setNeutral(newNeutral)
    setTotal(newTotal)
    calcStats(good, bad, newTotal)
  }
  const badClick = () => {
    const newBad = bad + 1
    const newTotal = total + 1
    setBad(newBad)
    setTotal(newTotal)
    calcStats(good, newBad, newTotal)
  }

  const calcTotal = () => {
    const newTotal = good + neutral + bad
    setTotal(newTotal)
  }
   const calcAverage = () => {
    const newAverage = (good*1 + neutral*0 + bad*-1)/3
    setAverage(newAverage)
  }

  const calcStats = (curGood, curBad, curTotal) => {

    const newAverage = (curGood - curBad)/curTotal
    const newPositive = (curGood/curTotal)*100
    console.log(curTotal,newAverage, newPositive)
    setAverage(newAverage)
    setPositive(newPositive)
  }

 //const calcAverage = () => {return (good*1 + neutral*0 + bad*-1)/3}
 //const calcPositivePercent = () => {return (total/100 * good)}

  return (
    <div>
      <Header title="Give feedback"/>
      <Button onClick={goodClick} text="good"/>
      <Button onClick={neutralClick} text="neutral"/>
      <Button onClick={badClick} text="bad"/>
      <Header title="Statistics"/>
      <Statistics good={good} neutral={neutral} bad={bad} total={total} average={average} positive={positive}/>
      {/* <Display text="good" value={good}/>
      <Display text="neutral" value={neutral}/>
      <Display text="bad" value={bad}/> */}
      {/* <Display text="all" value={total}/> */}
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

const Statistics = ({good, neutral, bad, total, average, positive}) => {

      /* <Statistic text={text[0]} value={value[0]} unit={unit[0]}/>
      <Statistic text={text[1]} value={value[1]} unit={unit[1]}/>
      <Statistic text={text[2]} value={value[2]} unit={unit[2]}/> */
      if(total > 0) {
        return (
          <div>
            <table>
              <StatisticLine text="good" value={good}/>
              <StatisticLine text="neutral" value={neutral}/>
              <StatisticLine text="bad" value={bad}/>
              <StatisticLine text="total" value={total}/>
              <StatisticLine text="average" value={average}/>
              <StatisticLine text="positive" value={positive} unit="%"/>
            </table>
          </div>
        )
      }
      else { return(<Display text="No feedback given"/>) }
}

const StatisticLine = ({text, value, unit}) => {
  return (
    <tr>
      <td>{text}</td>
      <td>{value} {unit}</td>
    </tr>
    // <p>{text} {value} {unit}</p>
  )
}

export default App
