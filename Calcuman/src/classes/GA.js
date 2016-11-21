/**
 * @flow
 */

import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge'

export default class GA {
  constructor (gaNumber) {
    if (__DEV__) { // eslint-disable-line
      this.ga = {
        trackScreenView: (...args) => {
          console.log('GA: trackScreenView', ...args)
        },
        trackEvent: (...args) => {
          console.log('GA: trackEvent', ...args)
        }
      }
    } else {
      this.ga = new GoogleAnalyticsTracker(gaNumber)
    }
  }

  eventOpenApplication () {
    this.ga.trackScreenView('Open-application')
  }

  eventGameOver (targetNum) {
    this.ga.trackEvent(
      'Game',
      `game-over-${targetNum}`,
      {
        label: 'target-number',
        value: targetNum
      }
    )
  }
}
