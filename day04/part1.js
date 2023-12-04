// https://adventofcode.com/2023/day/4

import { readInput as _readInput } from '../utils.js'

const cards = readInput()

const result = cards.reduce((acc, card) => {
  const matchingNumbers = intersectArray(card.winningNumbers, card.myNumbers)
  const points = matchingNumbers.length > 0
    ? Math.pow(2, matchingNumbers.length - 1)
    : 0

  return points + acc
}, 0)

console.log('>> result', result)

// ---

function readInput() {
  return _readInput(import.meta.url, (line) => {
    const [
      _,
      cardId,
      winningNumbers,
      myNumbers,
    ] = /^Card\s+([0-9]+):\s+([0-9\s]+) \|\s+([0-9\s]+)$/.exec(line)

    return {
      cardId: Number.parseInt(cardId),
      winningNumbers: winningNumbers.split(/\s+/).map(n => Number.parseInt(n)),
      myNumbers:  myNumbers.split(/\s+/).map(n => Number.parseInt(n))
    }
  })
}

function intersectArray(arrayA, arrayB) {
  const setA = new Set(arrayA)
  const matchingNumbers = arrayB.filter(n => setA.has(n))

  return matchingNumbers
}