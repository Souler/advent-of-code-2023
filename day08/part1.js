// https://adventofcode.com/2023/day/8

import { readInput as _readInput } from '../utils.js'

const { instructions, nodes } = readInput()

let currentStep = 0
let currentNode = 'AAA'
while (currentNode !== 'ZZZ') {
  const instruction = instructions[currentStep % instructions.length] === 'L'
    ? 'left'
    : 'right'

  currentNode = nodes[currentNode][instruction]
  currentStep++
}

console.log('>> result', currentStep)

// ---

function readInput() {
  const [instructions, _, ...nodes] = _readInput(import.meta.url, (line, idx) => {
    if (idx === 0) return line.split('')
    if (idx === 1) return null

    const match = /^([A-Z0-9]{3}) = \(([A-Z0-9]{3}), ([A-Z0-9]{3})\)$/.exec(line)
    const value = match.at(1)
    const left = match.at(2)
    const right = match.at(3)
    return [value, { value, left, right }]
  })

  return { instructions, nodes: Object.fromEntries(nodes) }
}
