/**
 * @flow
 */

import {default as Sound} from 'react-native-sound'

export default class SoundsManager {
  constructor (onChangeCallback) {
    this.muted = false
    this.sounds = {}
    this.onChangeCallback = onChangeCallback
    this.lastPlayed = null

    this.loadSound('toggle_on')
    this.loadSound('toggle_off')
    this.loadSound('timeout')
  }

  loadSound (key) {
    this.sounds[key] = new Sound(`${key}.mp3`, Sound.MAIN_BUNDLE)
  }

  play (key) {
    if (!this.muted) {
      if (this.lastPlayed && this.lastPlayed.stop) {
        this.lastPlayed.stop()
      }
      this.lastPlayed = this.sounds[key]
      this.sounds[key].play()
    }
  }

  setMuted (muted) {
    this.muted = muted
    this.onChangeCallback(muted)
  }
}
