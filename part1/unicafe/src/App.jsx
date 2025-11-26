import { useState } from 'react'

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  const calculateAllComments = () => good + neutral + bad

  const calculateAverageComments = () => (good - bad) / calculateAllComments()

  const calculateGoodPercentage = () => (good / calculateAllComments()) * 100

  return (
    <div>
      <h1>give feedback</h1>
      <button onClick={() => setGood(good + 1)}>good</button>
      <button onClick={() => setNeutral(neutral + 1)}>neutral</button>
      <button onClick={() => setBad(bad + 1)}>bad</button>
      <h1>statistics</h1>
      <p>good {good}</p>
      <p>neutral {neutral}</p>
      <p>bad {bad}</p>
      <p>all {calculateAllComments()}</p>
      {calculateAllComments() ?
        <div>
          <p>average {calculateAverageComments()}</p>
          <p>positive {calculateGoodPercentage()}%</p>
        </div>
        : ''
      }
    </div>
  )
}

export default App
