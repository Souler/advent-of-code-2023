// https://adventofcode.com/2023/day/9

import { readInput as _readInput } from '../utils.js'

const histories = readInput()

let result = 0
for (const history of histories) {
  const rows = [history]
  let currentRow = rows.at(-1)
  
  while (!currentRow.every(value => value === 0)) {
    const newRow = currentRow.reduce(
      (acc, value, idx, values) => idx > 0
        ? [...acc, value - (values.at(idx - 1))]
        : acc,
      [],
    )
    rows.push(newRow)
    currentRow = rows.at(-1)
  }

  const value = rows.reduceRight((acc, row, idx) => {
    return idx > 0 ? acc + rows.at(idx - 1).at(-1) : acc
  }, 0) 

  result += value
}

console.log('>> result', result)

// ---

function readInput() {
  return _readInput(import.meta.url, line => {
    return line.split(' ').map(n => Number.parseInt(n))
  })
}
