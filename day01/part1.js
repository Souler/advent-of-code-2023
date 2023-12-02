import { readInput as _readInput } from '../utils.js'

const calibrationValues = readInput()
const result = calibrationValues.reduce((acc, calibrationValue) => acc + calibrationValue, 0)

console.log('>> result', result)

// ---

function readInput() {
  return _readInput(import.meta.url, line => {
    const characters = line.split('')

    const isNumeric = char => /^[0-9]+$/.test(char)

    const firstNumericCharacter = characters.find(c => isNumeric(c))
    const lastNumericCharacter = characters.findLast(c => isNumeric(c))

    return Number(`${firstNumericCharacter}${lastNumericCharacter}`)
  })
}
