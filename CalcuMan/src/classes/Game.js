'use strict'

/**
 * @flow
 */

import arrayShuffle from '../functions/arrayShuffle.js'

export default class Game {
  constructor (targetNum) {
    this.targetNum = (targetNum || 0)
  }

  generateNext () {
    this.sum = 0
    this.isWin = false
    this.gameOver = false
    this.targetNum += 1
    this.values = arrayShuffle(this.generateValues(this.targetNum))
  }

  incSum (value) {
    this.sum += value
    this.updateState()
  }

  decSum (value) {
    this.sum -= value
    this.updateState()
  }

  updateState() {
    if (this.sum === this.targetNum) {
      this.isWin = true
      this.gameOver = true
    } else if (this.sum > this.targetNum) {
      this.isWin = false
      this.gameOver = true
    }
  }

  getState() {
    return {
      isWin: this.isWin,
      gameOver: this.gameOver,
      values: this.values,
      targetNum: this.targetNum
    }
  }

  generateValues (targetNum) {
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
}