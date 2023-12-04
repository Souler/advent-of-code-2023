// https://adventofcode.com/2023/day/4#part2

import { readInput as _readInput } from '../utils.js'

const cards = readInput()
const cardCopies = Object.fromEntries(cards.map(card => [card.cardId, 1]))

for (const card of cards) {
  const currentCard = cards[card.cardId - 1]
  const extraCards = intersectArray(currentCard.winningNumbers, currentCard.myNumbers).length

  const currentCardAmount = cardCopies[card.cardId]
  for (let copyCardId = card.cardId+1; copyCardId <= card.cardId + extraCards; copyCardId++) {
    cardCopies[copyCardId] += currentCardAmount
  }
}

const result = Object.values(cardCopies).reduce((acc, cardCount) => acc + cardCount, 0)

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
