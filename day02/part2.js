import { readInput as _readInput } from '../utils.js'

const games = readInput()

const result = games.reduce((acc, game) => {
  const reds = maxBy(game.sets, set => set.red ?? 0)
  const blues = maxBy(game.sets, set => set.blue ?? 0)
  const greens = maxBy(game.sets, set => set.green ?? 0)
  const power = reds * blues * greens

  return acc + power
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

function maxBy(arr, pickValue) {
  return arr.reduce(
    (acc, elem) => Math.max(acc, pickValue(elem)),
    Number.MIN_SAFE_INTEGER,
  )
}
