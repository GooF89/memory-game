import { WIDTH, HEIGHT, NUMBER_OF_INDEXES, MIX_FACTOR } from './constans'

const getArrayOfAllIndexes = () => {
  const allIndexes = []
  let i = 0
  while (allIndexes.push(i++) < NUMBER_OF_INDEXES) {}
  return allIndexes
}

const getRandomIndexes = () => {
  const randomIndexes = []
  const allIndexes = getArrayOfAllIndexes()
  let indexesToGet = HEIGHT * WIDTH / 2
  while (indexesToGet--) {
    const randomIndex = allIndexes.splice(Math.floor(Math.random() * allIndexes.length), 1)[0]
    randomIndexes.push(randomIndex, randomIndex)
  }
  return randomIndexes
}

const randomSwap = arr => {
  const randomIndex = Math.floor(Math.random() * arr.length)
  const randomIndex2 = Math.floor(Math.random() * arr.length)
  const tmp = arr[randomIndex]
  arr[randomIndex] = arr[randomIndex2]
  arr[randomIndex2] = tmp
}

export const getNewBoard = () => {
  const newBoard = getRandomIndexes()
  let numberOfMixes = HEIGHT * WIDTH * MIX_FACTOR
  while (numberOfMixes--) {
    randomSwap(newBoard)
  }
  return newBoard
}

export const getSrcById = id => `https://www.memozor.com/jeux/jquery/objects_diy/image${id}.jpg`