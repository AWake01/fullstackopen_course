import { useState } from 'react'

const App = (props) => {
  //Single state version
  // const [clicks, setClicks] = useState({
  //   left: 0, right: 0
  // })

  // const handleLeftClick = () => {
  //   setClicks({...clicks, left: clicks.left + 1})
  // }

  // const handleRightClick = () => {
  //   setClicks({...clicks, right: clicks.right + 1})
  // }
  const [left, setLeft] = useState(0)
  const [right, setRight] = useState(0)
  const [allClicks, setAll] = useState([])
  const [total, setTotal] = useState(0)

  const handleLeftClick = () => {
    setAll(allClicks.concat('L'))
    const updatedLeft = left + 1
    setLeft(updatedLeft)
    setTotal(updatedLeft + right)
  }

  const handleRightClick = () => {
    setAll(allClicks.concat('R'))
    const updatedRight = right + 1
    setRight(updatedRight)
    setTotal(left + updatedRight)
  }


  return (
    <div>
      {left}
      <Button onClick={handleLeftClick} text='left'/>
      <Button onClick={handleRightClick} text='right'/>
      {right}
      <History allClicks={allClicks}/>
      <p>total {total}</p>
    </div>
  )
}

const History = (props) => {
  if(props.allClicks.length ===0) {
    return (
      <div>
        the app is used by pressing buttons
      </div>
    )
  }
   return (
    <div>
      button press history: {props.allClicks.join(' ')}
    </div>
  )
}

const Button = ({onClick, text}) => <button onClick={onClick}>{text}</button>

export default App