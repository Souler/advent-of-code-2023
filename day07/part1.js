// https://adventofcode.com/2023/day/5

import { readInput as _readInput } from '../utils.js'

const hands = readInput().sort(compareHands)

const result = hands.reduce(
  (acc, hand, idx) => {
    const rank = idx + 1
    return acc + rank * hand.bid
  },
  0,
)

console.log('>> result', result)

// ---

function readInput() {
  return _readInput(import.meta.url, line => {
    const [hand, bid] = line.split(' ')
    const cards = hand.split('')

    return {
      cards,
      bid: Number.parseInt(bid),
      type: categorizeHandType(cards)
    }
  })
}

function cardValue(card) {
  switch (card) {
    case 'A': return 14
    case 'K': return 13
    case 'Q': return 12
    case 'J': return 11
    case 'T': return 10
    default: return Number.parseInt(card)
  }
}

function categorizeHandType(cards) {
  const groups = Array.from(cards)
    .sort((cardA, cardB) => cardValue(cardB) - cardValue(cardA))
    .reduce((groups, card) => {
      const lastGroup = groups.pop()
      if (card === lastGroup?.charAt(0)) {
        return [...groups, lastGroup + card]
      } else if (lastGroup) {
        return [...groups, lastGroup, card]
      } else {
        return [card]
      }
    }, [])
      
  const fiveOfAKind = groups.find(cards => cards.length === 5)
  if (fiveOfAKind) {
    return 'FIVE_OF_A_KIND'
  }

  const fourOfAKind = groups.find(cards => cards.length === 4)
  if (fourOfAKind) {
    return 'FOUR_OF_A_KIND'
  }
  
  const fullHouse = groups.length === 2
  if (fullHouse) {
    return 'FULL_HOUSE'
  }

  const threeOfAKind = groups.find(cards => cards.length === 3)
  if (threeOfAKind) {
    return 'THREE_OF_A_KIND'
  }
  
  const pairs = groups.filter(group => group.length === 2)
  if (pairs.length === 2) {
    return 'TWO_PAIR'
  }
  if (pairs.length === 1) {
    return 'PAIR'
  }

  return 'HIGH_CARD'
}

function handTypeValue(handType) {
  switch (handType) {
    case 'FIVE_OF_A_KIND':  return 7
    case 'FOUR_OF_A_KIND':  return 6
    case 'FULL_HOUSE':      return 5
    case 'THREE_OF_A_KIND': return 4
    case 'TWO_PAIR':        return 3
    case 'PAIR':            return 2
    case 'HIGH_CARD':       return 1
    default:                return 0
  }
}

function compareHands(handA, handB) {
  const handDiff = handTypeValue(handA.type) - handTypeValue(handB.type)
  if (handDiff !== 0) {
    return 100 * handDiff
  }
  
  for (let i = 0; i<handA.cards.length; i++) {
    const cardA = handA.cards[i]
    const cardB = handB.cards[i]

    if (cardA !== cardB) {
      return cardValue(cardA) - cardValue(cardB)
    }
  }

  return 0
}
