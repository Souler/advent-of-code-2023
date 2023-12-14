// https://adventofcode.com/2023/day/5

import { readInputFileContents as _readInput } from '../utils.js'

const races = readInput()
const raceRecords = []

for (const { time, distance } of races) {
  console.log(time, distance)

  let raceRecordCount = 0
  const minV = Math.ceil(distance / time)
  const maxV = (time - 1)

  for (let v = minV; v <= maxV; v++) {
    const holdTime = v
    const travelTime = time - v
    const travelDistance = v * travelTime

    if (travelDistance > distance) {
      raceRecordCount += 1
      console.log('hold=', holdTime, 'travel_distance=', travelDistance)
    }
  }
  
  raceRecords.push(raceRecordCount)
}

const result = raceRecords.reduce((acc, v) => acc * v, 1)

console.log('>> result', result)

// ---

function readInput() {
  const input = _readInput(import.meta.url)
  const [timesStr, distancesStr] = input.split('\n')
  const times = timesStr.split(/\s+/).map(n => Number.parseInt(n)).filter(n => Number.isSafeInteger(n))
  const distances = distancesStr.split(/\s+/).map(n => Number.parseInt(n)).filter(n => Number.isSafeInteger(n))
  const races = times.map((time, idx) => ({ time, distance: distances.at(idx) }))

  return races
}
