'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {AppRegistry, UIManager} from 'react-native'
import CalcuManLayout from './src/components/CalcuManLayout'

if (UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true)
}

class CalcuMan extends Component {
  render () {
    return (
      <CalcuManLayout />
    )
  }
}

AppRegistry.registerComponent('CalcuMan', () => CalcuMan)
