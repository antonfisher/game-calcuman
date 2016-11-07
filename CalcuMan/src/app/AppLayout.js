/**
 * @flow
 */

import React, {Component} from 'react'
import {Navigator} from 'react-native'
import {GoogleAnalyticsTracker} from 'react-native-google-analytics-bridge'

import {gaNumber} from './gaNumber.js'

import MenuLayout from './layouts/MenuLayout'
import PlayLayout from './layouts/PlayLayout'

import SoundsManager from '../classes/SoundsManager'

export default class AppLayout extends Component {
  constructor (props) {
    super(props)

    this.soundsManager = new SoundsManager((muted) => this.setState({muted}))

    this.state = {
      muted: this.soundsManager.muted
    }

    if (__DEV__) {
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

  render () {
    return (
      <Navigator
        initialRoute={{index: 0}}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return (
              <MenuLayout
                navigator={navigator}
                soundsManager={this.soundsManager}
                muted={this.state.muted} />
            )
          } else {
            return (
              <PlayLayout
                navigator={navigator}
                soundsManager={this.soundsManager}
                muted={this.state.muted}
                ga={this.ga} />
            )
          }
        }} />
    )
  }
}
