// https://adventofcode.com/2023/day/5

import { readInputFileContents as _readInput } from '../utils.js'

const input = readInput()

const result = minBy(input.seeds, seed => {
  return resolveSeed('seed', 'location', seed, input.maps)
})

console.log('>> result', result)

// ---

function readInput() {
  const input = _readInput(import.meta.url)
  const [seedsSection, ...mapSections] = input.split('\n\n')
  const seeds = seedsSection.split(/\s+/).map(seed => Number(seed)).filter(seed => Number.isSafeInteger(seed))
  const maps = mapSections.map(mapSection => {
    const [mapName, ...lines] = mapSection.split('\n')
    const [_, sourceCategory, destinationCategory] = /^([a-z]+)\-to\-([a-z]+) map:$/.exec(mapName)
    const l = lines.map(line => {
      const [destinationRangeStart, sourceRangeStart, rangeLength] = line.split(' ')
      return {
        destinationRangeStart: Number.parseInt(destinationRangeStart),
        sourceRangeStart: Number.parseInt(sourceRangeStart),
        rangeLength: Number.parseInt(rangeLength),
      }
    })
    return { sourceCategory, destinationCategory, lines: l }
  })

  return {
    seeds,
    maps,
  }
}

function resolveSeed(sourceCategory, destinationCategory, seedNumber, maps) {
  const mapsBySourceCategory = new Map(maps.map(m => [m.sourceCategory, m]))

  let currentCategory = sourceCategory
  let solvedSeedNumber = seedNumber

  while (currentCategory !== destinationCategory) {
    const map = mapsBySourceCategory.get(currentCategory)
    solvedSeedNumber = resolveRange(solvedSeedNumber, map.lines)
    currentCategory = map.destinationCategory
  }

  return solvedSeedNumber
}

function resolveRange(seedNumber, ranges) {
  for (const range of ranges) {
    const { sourceRangeStart, destinationRangeStart, rangeLength } = range
    const sourceRangeEnd = sourceRangeStart + rangeLength
    const offset = destinationRangeStart - sourceRangeStart

    if (seedNumber >= sourceRangeStart && seedNumber < sourceRangeEnd) {
      return seedNumber + offset
    }
  }

  return seedNumber
}

function minBy(arr, pickValue) {
  return arr.reduce(
    (acc, elem) => Math.min(acc, pickValue(elem)),
    Number.MAX_SAFE_INTEGER,
  )
}
