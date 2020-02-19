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
  stack.push(`${div.remainder}s`)

  /**
   * min
   */
  div = divideAndRemainder(duration, 60)
  duration = div.result
  stack.push(`${div.remainder}min`)

  /**
   * h
   */
  div = divideAndRemainder(duration, 24)
  duration = div.result
  stack.push(`${div.remainder}h`)

  /**
   * w
   */
  div = divideAndRemainder(duration, 7)
  stack.push(`${div.remainder}w`)

  /**
   * mo
   */
  div = divideAndRemainder(duration, 30)
  stack.push(`${div.remainder}mo`)

  /**
   * y
   */
  div = divideAndRemainder(duration, 365)
  stack.push(`${div.remainder}y`)

  return stack.reverse().join(' ') + ' ago'
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
