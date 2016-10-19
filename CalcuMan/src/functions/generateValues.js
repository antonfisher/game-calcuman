'use strict'

/**
 * @flow
 */

export default function generateValues (targetNum) {
  const values = new Array(9).fill(0);
  const k = Math.floor(2 + 7 * Math.random());

  for (let i = 0; i < 9; i++) {
    values[i] = (targetNum - values.reduce((a, b) => a + b, 0))
    if (i <= k && values[i] > 0) {
      if (i < k && values[i] > 2) {
        values[i] = Math.max(1, Math.ceil(0.6 * Math.random() * values[i]))
      }
    } else {
      values[i] = Math.max(1, Math.ceil(Math.random() * (targetNum - 1)))
    }
  }

  return values;
}
