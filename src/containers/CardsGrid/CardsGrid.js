import React, { memo, useState, useEffect } from 'react'
import propTypes from 'prop-types'
import Card, { openStateEnum } from '../../components/Card'
import './CardsGrid.scss'

const initiateOpenStates = length => new Array(length).fill(openStateEnum.CLOSED)

const CardGrid = ({ board, getSrcById, onMatch, delay, cardsInRow, cardsInColumn, width, height, cardMargin }) => {
  const [openStates, setOpenStates] = useState(initiateOpenStates(board.length))

  useEffect(() => setOpenStates(initiateOpenStates(board.length)), [board])

  const tmpOpened = openStates.reduce((acc, openState, i) => {
    if (openState === openStateEnum.TMP_OPENED) {
      acc.push(i)
    }
    return acc
  },[])

  const defineStateOfTmpOpened = (idx1, idx2) => {
    const newOpenState = board[idx1] === board[idx2]? openStateEnum.OPENED : openStateEnum.CLOSED
    setOpenStates(openStates.map((openState, i) => [idx1, idx2].includes(i) ? newOpenState : openState))
    if (newOpenState === openStateEnum.OPENED) {
      onMatch()
    }
  }

  const onCardClick = index => {
    if (openStates[index] || tmpOpened.length === 2) {
      return
    }
    if (tmpOpened.length) {
      setTimeout(() => defineStateOfTmpOpened(tmpOpened[0], index), delay)
    }
    setOpenStates(openStates.map((openState, i) => i === index ? openStateEnum.TMP_OPENED : openState))
  }

  const getCardStyle = () => {
    const margin = cardMargin
    const cardWidth = width / cardsInRow - margin * 2
    const cardHeight = height / cardsInColumn - margin * 2
    return { width: cardWidth, height: cardHeight, margin }
  }

  const cardStyle = getCardStyle()

  return (
    <div className='card-grid' style={{ width, height }}>
      { board.map((id, i) =>
        <Card
          src={ getSrcById(id) }
          index={ i }
          openState={ openStates[i] }
          style={ cardStyle }
          onClick={ onCardClick }
          key={ `${ id }_${ i }` }
        />) }
    </div>
  )
}

CardGrid.defaultProps = {
  board: [],
  getSrcById: () => '',
  onMatch: e => e,
  delay: 800,
  cardsInRow: 1,
  cardsInColumn: 1,
  width: 1000,
  height: 500,
  cardMargin: 1
}

CardGrid.propTypes = {
  board: propTypes.array,
  getSrcById: propTypes.func,
  onMatch: propTypes.func,
  delay: propTypes.number,
  cardsInRow: propTypes.number,
  cardsInColumn: propTypes.number,
  width: propTypes.number,
  height: propTypes.number,
  cardMargin: propTypes.number
}

export default memo(CardGrid)