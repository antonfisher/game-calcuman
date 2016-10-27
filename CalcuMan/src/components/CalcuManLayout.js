'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {Navigator} from 'react-native'

import MenuLayout from './MenuLayout'
import PlayLayout from './PlayLayout'

import SoundsManager from '../classes/SoundsManager'

export default class CalcuManLayout extends Component {
  constructor (props) {
    super(props)

    this.soundsManager = new SoundsManager((muted) => this.setState({muted}))

    this.state = {
      muted: this.soundsManager.muted
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
                muted={this.state.muted} />
            )
          }
        }}
      />
    )
  }
}
