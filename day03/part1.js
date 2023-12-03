
import { readInput as _readInput } from '../utils.js'

const schematic = readInput()

const result = schematic.reduce((acc, part) => {
  if (!isNumeric(part.value)) {
    return acc
  }

  const neighbors = findNeighbors(schematic, part)
  const symbolNeighbors = neighbors.filter(neighbor => !isNumeric(neighbor.value))
  
  return symbolNeighbors.length > 0 ? acc + Number.parseInt(part.value) : acc
}, 0)

console.log('>> result', result)

// ---

function readInput() {
  const things = _readInput(import.meta.url, (line, y) => {
    const lineParts = []
    
    const rgx = /([0-9]+|[^\.])/g
    let match = rgx.exec(line)
    while (match) {
      lineParts.push({ x: match.index, y, value: match[1] })
      match = rgx.exec(line)
    }

    return lineParts
  })

  return things.flat()
}

function isNumeric(value) {
  return /^([0-9]+)$/.test(value)
}

function neighborBox(part) {
  return {
    x1: part.x - 1,
    y1: part.y - 1,
    x2: part.x + part.value.length,
    y2: part.y + 1,
  }
}

function boxOverlap(boxA, boxB) {
	// no horizontal overlap
	if (boxA.x1 >= boxB.x2 || boxB.x1 >= boxA.x2) return false;

	// no vertical overlap
	if (boxA.y1 >= boxB.y2 || boxB.y1 >= boxA.y2) return false;

	return true;
}

function findNeighbors(parts, part) {
  return parts.filter(otherPart => {
    if (otherPart === part) {
      return false
    }

    const partBox = neighborBox(part)
    const otherPartBox = neighborBox(otherPart)
    
    return boxOverlap(partBox, otherPartBox)
  })
}
