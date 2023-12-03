// https://adventofcode.com/2023/day/2

import { readInput as _readInput } from '../utils.js'

const games = readInput()

const result = games.reduce((acc, game) => {
  const isPossible = game.sets.every(set => {
    const reds = set.red ?? 0
    const blues = set.blue ?? 0
    const greens = set.green ?? 0
    return reds <= 12 && greens <= 13 && blues <= 14
  })
  return isPossible ? acc + game.id : acc
}, 0)

console.log('>> result', result)

// ---

function readInput() {
  return _readInput(import.meta.url, line => {
    const [gameName, setsPart] = line.split(':')
    const sets = setsPart.split(';')

    const gameId = gameName.trim().replace('Game ', '')
    const cubeSets = sets.map(set => {
      const cubes = set.trim().split(',')
      return Object.fromEntries(
        cubes.map(cube => {
          const [amount, color] = cube.trim().split(' ');
          return [color, Number.parseInt(amount)]
        }),
      )
    })

    return { id: Number.parseInt(gameId), sets: cubeSets }
  })
}
