/**
 * @flow
 */

import {default as Sound} from 'react-native-sound'

export default class SoundsManager {
  constructor (onChangeCallback) {
    this.muted = false
    this.sounds = {}
    this.onChangeCallback = onChangeCallback

    // there is an issue with sound liblary
    this._blockPlaying = false
    this._blockPlayingTimeout = null

    this.loadSound('toggle_on')
    this.loadSound('toggle_off')
    this.loadSound('timeout')
  }

  loadSound (key) {
    this.sounds[key] = new Sound(`${key}.mp3`, Sound.MAIN_BUNDLE)
  }

  play (key) {
    if (this.muted || !this.sounds[key].isLoaded()) {
      return
    } else if (this._blockPlaying) {
      // wait for playing end
      clearTimeout(this._blockPlayingTimeout)
      this._blockPlayingTimeout = setTimeout(() => (this.play(key)), 100)
      return;
    }

    this._blockPlaying = true

    // sometimes play callbakc does not work
    setTimeout(
      () => (this._blockPlaying = false),
      this.sounds[key].getDuration() * 1000 + 50
    )

    this.sounds[key].play()
  }

  setMuted (muted) {
    this.muted = muted
    this.onChangeCallback(muted)
  }
}
