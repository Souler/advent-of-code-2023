// https://adventofcode.com/2023/day/8#part2

import { readInput as _readInput } from '../utils.js'

const { instructions, nodes } = readInput()

let currentNodes = Object.keys(nodes).filter(node => node.endsWith('A'))

let nodeSteps = currentNodes.map(node => calcSteps(node))

const result = lcm(nodeSteps)

console.log('>> result', result)

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

function calcSteps(startingNode) {
  let currentStep = 0
  let currentNode = startingNode
  while (!currentNode.endsWith('Z')) {
    const instruction = instructions[currentStep % instructions.length] === 'L'
      ? 'left'
      : 'right'

    currentNode = nodes[currentNode][instruction]
    currentStep++
  }

  return currentStep
}

function lcm(values) {
  // I did not want to implement an LCM nor add any dependencies into
  // the project, so here is a link to calculate it
  console.log('calc the lcm for these values:', ...values)
  console.log('or use this link:', `https://www.calculatorsoup.com/calculators/math/lcm.php?action=solve&input=${values.join(',')}`)
  return '^^^^^^'
}