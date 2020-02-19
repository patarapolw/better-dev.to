/**
 *
 * @param {number} duration
 */
export function humanizeDuration (duration) {
  /**
   * @type {string[]}
   */
  const stack = []

  /**
   * ms
   */
  let div = divideAndRemainder(duration, 1000)
  duration = div.result

  /**
   * s
   */
  div = divideAndRemainder(duration, 60)
  duration = div.result
  stack.push(div.remainder ? `${div.remainder}s` : null)

  /**
   * min
   */
  div = divideAndRemainder(duration, 60)
  duration = div.result
  stack.push(div.remainder ? `${div.remainder}m` : null)

  /**
   * h
   */
  div = divideAndRemainder(duration, 24)
  duration = div.result
  stack.push(div.remainder ? `${div.remainder}h` : null)

  /**
   * d
   */
  div = divideAndRemainder(duration, 7)
  stack.push(div.remainder ? `${div.remainder}d` : null)

  /**
   * w
   */
  const w = div.result % 4
  stack.push(w ? `${w}w` : null)

  /**
   * mo
   */
  const mo = Math.floor(duration / 30) % 12
  stack.push(mo ? `${mo}mo` : null)

  /**
   * y
   */
  const y = Math.floor(duration / 365)
  stack.push(y ? `${y}y` : null)

  /**
   * @type {number}
   */
  let j = null

  return stack
    .reverse()
    .filter((s, i) => {
      if (j === null && s !== null) {
        j = i
        return true
      }
      if (j !== null && i < j + 2) {
        return true
      }
      return false
    })
    .join(' ')
}

/**
 *
 * @param {number} n
 * @param {number} by
 */
function divideAndRemainder (n, by) {
  return {
    result: Math.floor(n / by),
    remainder: n % by
  }
}
