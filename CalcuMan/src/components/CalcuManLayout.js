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
  render () {
    const soundsManager = new SoundsManager()

    return (
      <Navigator
        initialRoute={{index: 0}}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return <MenuLayout navigator={navigator} soundsManager={soundsManager} />
          } else {
            return <PlayLayout navigator={navigator} soundsManager={soundsManager} />
          }
        }}
      />
    )
  }
}
