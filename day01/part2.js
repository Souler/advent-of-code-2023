// https://adventofcode.com/2023/day/1

import { readInput as _readInput } from '../utils.js'

const calibrationValues = readInput()
const result = calibrationValues.reduce((acc, calibrationValue) => acc + calibrationValue, 0)

console.log('>> result', result)

// ---

function readInput() {
  return _readInput(import.meta.url, line => {

    const numericCharacterRegexp = '(one|two|three|four|five|six|seven|eight|nine|[0-9]{1})'
    const firstNumericCharacterRegexp = new RegExp(`^.*?${numericCharacterRegexp}.*$`, 'i')
    const lastNumericCharacterRegexp = new RegExp(`.*${numericCharacterRegexp}.*?$`, 'i')
    
    const [, firstNumericCharacter] = firstNumericCharacterRegexp.exec(line)
    const [, lastNumericCharacter] = lastNumericCharacterRegexp.exec(line)

    return Number(`${parseValue(firstNumericCharacter)}${parseValue(lastNumericCharacter)}`)
  })
}

function parseValue(value) {
  switch (value) {
    case 'one': return 1
    case 'two': return 2
    case 'three': return 3
    case 'four': return 4
    case 'five': return 5
    case 'six': return 6
    case 'seven': return 7
    case 'eight': return 8
    case 'nine': return 9
    default:
      return Number(value)
  }
}
