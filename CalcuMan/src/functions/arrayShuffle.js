'use strict'

/**
 * @flow
 */

export default function arrayShuffle (arr) {
  let counter = arr.length

  while (counter > 0) {
    let index = Math.floor(Math.random() * counter)
    counter--
    let temp = arr[counter]
    arr[counter] = arr[index]
    arr[index] = temp
  }

  return arr
}
