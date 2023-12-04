# Day 1: Trebuchet?!
> https://adventofcode.com/2023/day/1

## Walkthrough

After reading the [puzzle](https://adventofcode.com/2023/day/1) we can split the problem in several parts:
- How do we find the _calibration value_ of every line?
  - How do we find the _first digit_ of a line?
  - How do we find the _last digit_ of a line?
  - How do we combine the _first digit_ and _last digit_ into a _calibration value_?
- How do we add all the _calibration values_ together?

This puzzle revolves mostly around string manipulation; which in general is a prefect scenario for using [_regex_](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Guide/Regular_expressions).

However I'm aware regex is something daunting if you are not already familiar with it (or even if you are) so we are going to solve the puzzle first without them; and later explore a solution using regex. I **really** encourage you to get familiar with regex and add them into your "programmer toolkit", they are a very useful tool!

### Finding the _calibration value_ of a line

According to the puzzle:
> On each line, the calibration value can be **found** by combining the **first digit** and the **last digit** (in that order) to form a single **two-digit number**.

So, given the line `a1b2c3d4e5f` we know `first digit = '1'`, `last digit = '5'` and `calibration value = 15`. It is important to note that **the only number here** is the _calibration value_! _first digit_ and _last digit_ are digits meaning they are **string**!

We are going to start by **finding** the first digit of a line. For us to [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) something we usually need an **array** of things; but we have a line (which is a string). How do we go from a string into a list of things? We [`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) the string! In this particular case we split it around each character so `'a1b2c3d4e5f'` would become `['a','1','b','2','c','3','d','4','e','5','f']`

```js
const characters = line.split('')

console.log('>> characters', characters) // ['a','1','b','2','c','3','d','4','e','5','f']
```

Now we can perform an [equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) check on every character until we find one that is a number

```js
const firstDigit = characters.find(character => {
  return (
    character == 1 || character == 2 || character == 3 ||
    character == 4 || character == 5 || character == 6 ||
    character == 7 || character == 8 || character == 9
  )
})

console.log('>> first digit', firstDigit) // '1'
```

Yay! We have successfully found the first digit! Now lets go for the last character. We want to find something again; but now starting **from the end**. For that we have [`findLast`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/findLast) which behaves similar to [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) but you know... for the last one.

```js
const lastDigit = characters.findLast(character => {
  return (
    character == 1 || character == 2 || character == 3 ||
    character == 4 || character == 5 || character == 6 ||
    character == 7 || character == 8 || character == 9
  )
})

console.log('>> last digit', lastDigit) // '5'
```

But I hear you say "That is a lot of duplicated code! That is bad!". Yes and no. There is nothing inherently wrong with duplicated code; but that is part of a broader discussion. For now lets take the suggestion and create a `isNumeric` convenience function.

```js
function isNumeric(character) {
  return (
    character == 1 || character == 2 || character == 3 ||
    character == 4 || character == 5 || character == 6 ||
    character == 7 || character == 8 || character == 9
  )
}

const firstDigit = characters.find(character => isNumeric(character))
const lastDigit = characters.findLast(character => isNumeric(character))
```

We are almost there! We now have our `firstDigit` and `lastDigit` and we want to combine them into a number. For that javascript provides [`Number.parseInt`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number/parseInt) which allows us [parsing](https://en.wikipedia.org/wiki/Parsing#:~:text=Parsing%2C%20syntax%20analysis%2C%20or%20syntactic%20analysis%20is%20the%20process%20of%20analyzing%20a%20string%20of%20symbols%2C%20either%20in%20natural%20language%2C%20computer%20languages%20or%20data%20structures%2C%20conforming%20to%20the%20rules%20of%20a%20formal%20grammar.%20The%20term%20parsing%20comes%20from%20Latin%20pars%20(orationis)%2C%20meaning%20part%20(of%20speech).%5B1%5D) a string into a number.

```js
const calibrationValue = Number.parseInt(`${firstDigit}${lastDigit}`)

console.log('>> calibration value', calibrationValue) // calibrationValue
```

Thats it! We got our _calibration value_!

### Adding all calibration values

For simplicity we are going to be assuming we are using the [`readInput`](https://github.com/Souler/advent-of-code-2023/blob/4ffdf657accecfe35f15407f51b6a14b5c5b3f36/utils.js#L35-L45) utility.

```js
const lines = readInput(import.meta.url) // ignore the import.meta.url for now!
```

We have the lines, now we want to get the calibration value of each line and them add them all together. First we are going to start with creating a function for getting the calibration line of a given line by wrapping the previous section into a single function:

```js
function getCalibrationValue(line) {
  const characters = line.split('')
  const firstDigit = characters.find(character => isNumeric(character))
  const lastDigit = characters.findLast(character => isNumeric(character))
  const calibrationValue = Number.parseInt(`${firstDigit}${lastDigit}`)
  return calibrationValue
}
```

Next step is going through every line and using the `getCalibrationValue` on them so we can add all them together. We have two options here:
- use the [`reduce`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/reduce) array function.
- use some kind of loop (e.g: [`for..of`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/for...of), [`forEach`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach)) for iterating through the array of lines and a variable outside the loop for accumulating the total sum.
For readability we are going to go with the later, but know that `reduce` would probably yield a much narrower solution.

```js
const result = 0

lines.forEach(line => {
  const calibrationValue = getCalibrationValue(line)
  result = result + calibrationValue
})

console.log('>> result', result)
```

Whit this we should have the solution for part one ready! So lets move into part 2!

### Finding the _calibration value_ of a line (again)

The rules for finding our _first digit_ and _last digit_ have changed!
> It looks like some of the digits are actually spelled out with letters: `one`, `two`, `three`, `four`, `five`, `six`, `seven`, `eight`, and `nine` also count as valid "digits".

This poses a bit of a challenge because we can no longer "split the line into characters"; we now need to look at one or more characters to figure out if there is a number there or not. So the issue now is "how do I find the digits in a line".

Lets start by adding a `findDigits` function. This is a function that will give us the **all the digits as they appear in a line**. For now; lets assume the function is there and it does what we have just said and re-visit our `getCalibrationValue`:

```js
function getCalibrationValue(line) {
  const digits = findDigits(line)
  const firstDigit = digits.at(0)
  const lastDigit = digits.at(-1)
  const calibrationValue = Number.parseInt(`${firstDigit}${lastDigit}`)
  return calibrationValue
}
```

That looks nice! But we still have one problem there: the digits returned by `findDigits` are not only numbers but also "spelled out" numbers; meaning we could have a situation where `firstDigit='one'` and `lastDigit='5'`. When we attempt to parse `one5` as a number using `Number.parseInt` we will end receiving `NaN` which is not a valid number!

Looks like we need to answer yet another question: how do we transform any ot the possible digit values into its number counter part? Let's define yet another function `parseDigit` just for doing that!

```js
function parseDigit(digit) {
  switch (digit) {
    case 'one':   return 1
    case 'two':   return 2
    case 'three': return 3
    case 'four':  return 4
    case 'five':  return 5
    case 'six':   return 6
    case 'seven': return 7
    case 'eight': return 8
    case 'nine':  return 9
    default:      return Number.parseInt(value)
  }
}
```

We can now safely parse our digits into numbers! Lets update `getCalibrationValue`:

```js
function getCalibrationValue(line) {
  const digits = findDigits(line)
  const firstDigit = parseDigit(digits.at(0))
  const lastDigit = parseDigit(digits.at(-1))
  const calibrationValue = Number.parseInt(`${firstDigit}${lastDigit}`)
  return calibrationValue
}
```

We implemented it using a [`switch`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Statements/switch) statement. We could have implemented it using a look-up table but I believe the switch here is easier to follow.

There is no more beating around the bush: we need to tackle `findDigits` if we want to solve the puzzle.

Lets start by answering this question "_why does splitting the string does not work anymore?_". The answer is mainly because we are now looking for things that have different lengths! before it was always a single character (length = 1); but now we have short digits (e.g.: `'one'`) and long ones (e.g: `'three'`). This difference in length means we are not going to solve the problem by splitting; so let's try to figure out a different course of action.

We have a **known list of valid digits**:

```js
const VALID_DIGITS = [
  '1',   '2',   '3',     '4',    '5',    '6',   '7',     '8',     '9',
  'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
]
```

We can start by finding them in the line using [`indexOf`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/indexOf) and storing only the ones that actually appear in the line:

```js
function findDigits(line) {
  const VALID_DIGITS = [
    '1',   '2',   '3',     '4',    '5',    '6',   '7',     '8',     '9',
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  ]

  const digits = []

  for (const digit of VALID_DIGITS) {
    if (line.indexOf(digit) >= 0) {
      digits.push(digit)
    }
  }

  return digits
}
```

Thats a start! But we have a problem now. The order of `digits` will be determined by the order of `VALID_DIGITS` because that is the array we are iterating. To solve this we can still iterate `VALID_DIGITS` but we are going to store the position of each digit so we can later [`sort`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/sort) them by position.

```js
function findDigits(line) {
  const VALID_DIGITS = [
    '1',   '2',   '3',     '4',    '5',    '6',   '7',     '8',     '9',
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  ]

  const digits = []

  for (const digit of VALID_DIGITS) {
    const position = line.indexOf(digit)
    if (position >= 0) {
      digits.push({ digit, position })
    }
  }

  digits = digits.sort((digitA, digitB) => {
    return digitB.position - digitA.position
  })

  return digits
}
```

Thats almost it! We still have one small caveat to go around. We are using `indexOf(digit)` which means we get the first occurrence of `digit`; but _what if a given digit appears **more than once**?_ Well, we will need to repeat the `indexOf` call until we exhaust it.

```js
function findDigits(line) {
  const VALID_DIGITS = [
    '1',   '2',   '3',     '4',    '5',    '6',   '7',     '8',     '9',
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  ]
  
  const digits = []

  for (const digit of VALID_DIGITS) {
    let position = line.indexOf(digit)
    while (position >= 0) {
      digits.push({ digit, position })
      position = line.indexOf(digit, position)
    }
  }

  digits = digits.sort((digitA, digitB) => {
    return digitB.position - digitA.position
  })

  return digits
}
```

And here we go! Let's put it all together a do a small recap of the solution:

```js
const result = 0

lines.forEach(line => {
  const calibrationValue = getCalibrationValue(line)
  result = result + calibrationValue
})

console.log('>> result', result)

// ----

function getCalibrationValue(line) {
  const digits = findDigits(line)
  const firstDigit = parseDigit(digits.at(0))
  const lastDigit = parseDigit(digits.at(-1))
  const calibrationValue = Number.parseInt(`${firstDigit}${lastDigit}`)
  return calibrationValue
}

function findDigits(line) {
  const VALID_DIGITS = [
    '1',   '2',   '3',     '4',    '5',    '6',   '7',     '8',     '9',
    'one', 'two', 'three', 'four', 'five', 'six', 'seven', 'eight', 'nine',
  ]
  
  const digits = []

  for (const digit of VALID_DIGITS) {
    let position = line.indexOf(digit)
    while (position >= 0) {
      digits.push({ digit, position })
      position = line.indexOf(digit, position)
    }
  }

  digits = digits.sort((digitA, digitB) => {
    return digitB.position - digitA.position
  })

  return digits
}


function parseDigit(digit) {
  switch (digit) {
    case 'one':   return 1
    case 'two':   return 2
    case 'three': return 3
    case 'four':  return 4
    case 'five':  return 5
    case 'six':   return 6
    case 'seven': return 7
    case 'eight': return 8
    case 'nine':  return 9
    default:      return Number.parseInt(value)
  }
}
```
