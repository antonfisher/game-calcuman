/**
 * @flow
 */

import React, {Component} from 'react'
import {AppRegistry, UIManager} from 'react-native'
import AppLayout from './src/app/AppLayout'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

class App extends Component {
  render () {
    return (
      <AppLayout />
    )
  }
}

AppRegistry.registerComponent('CalcuMan', () => App)
