// https://leetcode.cn/problems/substring-with-concatenation-of-all-words/

function findSubstring(s: string, words: string[]): number[] {
  console.log(s.length, words.length)
  const matchLen = words.reduce((a, b) => a + b.length, 0)
  if (s.length < matchLen) return []

  let res: number[] = []

  {
    // check if it only repeats one character
    let x = Array.from(new Set(s.split(''))).join('')
    let w = Array.from(new Set(words)).join('')
    if (x.length === 1 && x === w) {
      for (let i = 0; i <= s.length - matchLen; i++) {
        res.push(i)
      }
      return res
    }
  }

  let smallestWord = words
    .reduce((a, b) => (a.length < b.length ? a : b))
    .split('')
  let smallestLength = Array.from(new Set(smallestWord)).length
  for (let i = 0; i < s.length; ) {
    const end = i + matchLen
    const substr = s.slice(i, end)
    if (substr.length !== matchLen) {
      break
    }
    // console.log('**', i, end, substr)
    const tempWords = words.slice(0)
    let substrIndex = 0
    let isMatch = true
    while (tempWords.length && isMatch) {
      for (let x = 0; x < tempWords.length; x++) {
        const word = tempWords[x]
        const subWord = substr.slice(substrIndex, substrIndex + word.length)
        // console.log("--", word, subWord, substrIndex, substrIndex + word.length)
        if (word === subWord) {
          substrIndex += word.length
          tempWords.splice(x, 1)
          break
        }
        if (x === tempWords.length - 1) {
          isMatch = false
        }
      }
    }
    if (isMatch) {
      res.push(i)
      i += smallestLength
      // console.log("matched", i)
    } else {
      i++
    }
  }
  return res
}
