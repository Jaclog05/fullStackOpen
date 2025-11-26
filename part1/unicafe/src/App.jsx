import { useState } from 'react'

const Button = ({handleClick, text}) => <button onClick={handleClick}>{text}</button>

const StatisticsLine = ({text, value}) => <p>{text} {value}</p>

const Statistics = ({good, neutral, bad}) => {
  const calculateAllComments = () => good + neutral + bad
  const calculateAverageComments = () => (good - bad) / calculateAllComments()
  const calculateGoodPercentage = () => (good / calculateAllComments()) * 100

  if(calculateAllComments() === 0) return <p>No feedback given</p>

  return (
    <>
      <StatisticsLine text="good" value={good}/>
      <StatisticsLine text="neutral" value={neutral} />
      <StatisticsLine text="bad" value={bad} />
      <StatisticsLine text="all" value={calculateAllComments()} />
      <StatisticsLine text="average" value={calculateAverageComments()} />
      <StatisticsLine text="positive" value={calculateGoodPercentage()} />
    </>
  )
}

const App = () => {
  const [good, setGood] = useState(0)
  const [neutral, setNeutral] = useState(0)
  const [bad, setBad] = useState(0)

  return (
    <div>
      <h1>give feedback</h1>
      <Button handleClick={() => setGood(good + 1)} text="good" />
      <Button handleClick={() => setNeutral(neutral + 1)} text="neutral" />
      <Button handleClick={() => setBad(bad + 1)} text="bad"/>
      <h1>statistics</h1>
      <Statistics good={good} neutral={neutral} bad={bad}/>
    </div>
  )
}

export default App
