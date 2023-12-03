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

We are going to start by **finding** the first digit of a line. For us to [`find`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array/find) something we usually need an **array** of things; but we have a line (which is a string). How do we go from a string into a list of things? We [`split`](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String/split) the string! In this particular case we split it around each character so `'a1b2c3d4e5f'` would be `['a','1','b','2','c','3','d','4','e','5','f']`

```js
const characters = line.split('')

console.log('>> characters', characters) // ['a','1','b','2','c','3','d','4','e','5','f']
```

Now we can perform [equality](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/Equality) check on every character until we find one that is a number

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

But now I hear you say "That is a lot of duplicated code! That is bad!". Yes and no. There is nothing inherently wrong with duplicated code; but that is part of a broader discussion. For now lets take your suggestion and abstract a `isNumeric` convenience function.

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

> [!WARNING]
> This is not complete yet!