import React, { useState } from 'react'
import CardsGrid from './containers/CardsGrid'
import VictoryMessage from './components/VictoryMessage'
import { getNewBoard, getSrcById } from './utils'
import { WIDTH, HEIGHT, DELAY, SCORE_BONUS, GRID_WIDTH, GRID_HEIGHT, MARGIN } from './utils/constans'
import './App.css'

const App = () => {
  const [score, setScore] = useState(0)
  const [board, setBoard] = useState(getNewBoard())

  const initiateBoard = () => {
    setBoard(getNewBoard())
    setScore(0)
  }

  const onMatch = () => setScore(score + SCORE_BONUS)
  const showVictoryMessage = score === WIDTH * HEIGHT * SCORE_BONUS / 2

  return (
    <div className="App">
      <h1>Score: { score }</h1>
      <CardsGrid
        board={ board }
        getSrcById={ getSrcById }
        onMatch={ onMatch }
        delay={ DELAY }
        cardsInRow={ WIDTH }
        cardsInColumn={ HEIGHT }
        width={ GRID_WIDTH }
        height={ GRID_HEIGHT }
        cardMargin={ MARGIN }
      />
      <VictoryMessage
        show={ showVictoryMessage }
        text={ 'Victory!' }
        onClick={ initiateBoard }
      />
    </div>
  )
}

export default App
