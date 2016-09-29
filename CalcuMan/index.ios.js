'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {AppRegistry} from 'react-native'
import CalcuManLayout from './src/components/CalcuManLayout'

class CalcuMan extends Component {
  render() {
    return (
      <CalcuManLayout />
    )
  }
}

AppRegistry.registerComponent('CalcuMan', () => CalcuMan)
