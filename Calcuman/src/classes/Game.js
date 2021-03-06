/**
 * @flow
 */

import arrayShuffle from '../functions/arrayShuffle.js'

const GAME_INIT_TIMEOUT_SEC = 10

export default class Game {
  constructor ({targetNum, onTimeOverCallback, onTickCallback}) {
    this.targetNum = (targetNum || 0)
    this.onTimeOverCallback = onTimeOverCallback
    this.onTickCallback = onTickCallback
    this.buttonsUsedCount = 0
    this.timeout = GAME_INIT_TIMEOUT_SEC
    this.solution = []
  }

  startTimer () {
    this.interval = setInterval(() => {
      this.timeout--
      this.onTickCallback(this.timeout)
      if (this.timeout <= 0) {
        clearInterval(this.interval)
        this.isWin = false
        this.gameOver = true
        this.onTimeOverCallback()
      }
    }, 1000)
  }

  stopTimer () {
    clearInterval(this.interval)
  }

  generateNext () {
    this.sum = 0
    this.isWin = false
    this.gameOver = false
    this.targetNum += 1
    this.timeout += (this.buttonsUsedCount + (this.targetNum < 12 ? 1 : 0))
    this.buttonsUsedCount = 0
    this.values = arrayShuffle(this.generateValues(this.targetNum))
    this.startTimer()
  }

  incSum (value) {
    this.sum += value
    this.buttonsUsedCount += 1
    this.updateState()
  }

  decSum (value) {
    this.sum -= value
    this.buttonsUsedCount -= 1
    this.updateState()
  }

  updateState () {
    if (this.sum === this.targetNum) {
      this.isWin = true
      this.gameOver = true
      this.stopTimer()
    } else if (this.sum > this.targetNum) {
      this.isWin = false
      this.gameOver = true
      this.stopTimer()
    }
  }

  getState () {
    return {
      isWin: this.isWin,
      values: this.values,
      timeout: this.timeout,
      gameOver: this.gameOver,
      targetNum: this.targetNum,
      buttonsUsedCount: this.buttonsUsedCount
    }
  }

  generateValues (targetNum) {
    const values = new Array(9).fill(0)
    const k = Math.floor(2 + 7 * Math.random())

    this.solution = []

    for (let i = 0; i < 9; i++) {
      values[i] = (targetNum - values.reduce((a, b) => a + b, 0))
      if (i <= k && values[i] > 0) {
        if (i < k && values[i] > 2) {
          values[i] = Math.max(1, Math.ceil(0.6 * Math.random() * values[i]))
        }
        this.solution.push(values[i])
      } else {
        values[i] = Math.max(1, Math.ceil(Math.random() * (targetNum - 1)))
      }
    }

    return values
  }
}
