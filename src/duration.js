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
   * w
   */
  div = divideAndRemainder(duration, 7)
  stack.push(div.remainder ? `${div.remainder}w` : null)

  /**
   * mo
   */
  div = divideAndRemainder(duration, 30)
  stack.push(div.remainder ? `${div.remainder}mo` : null)

  /**
   * y
   */
  div = divideAndRemainder(duration, 365)
  stack.push(div.remainder ? `${div.remainder}y` : null)

  return stack
    .filter(s => s)
    .slice(0, 2)
    .filter(s => s)
    .reverse()
    .join(' ') + ' ago'
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
