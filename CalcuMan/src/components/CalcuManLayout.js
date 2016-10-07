'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {Navigator} from 'react-native'

import MenuLayout from './MenuLayout'
import PlayLayout from './PlayLayout'

export default class CalcuManLayout extends Component {
  render () {
    return (
      <Navigator
        initialRoute={{index: 0}}
        renderScene={(route, navigator) => {
          if (route.index === 0) {
            return <MenuLayout navigator={navigator} />
          } else {
            return <PlayLayout navigator={navigator} />
          }
        }}
      />
    )
  }
}
