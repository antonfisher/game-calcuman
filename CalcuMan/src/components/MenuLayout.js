'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  View
} from 'react-native'

import ToggleButton from './ToggleButton'

export default class MenuLayout extends Component {
  constructor (props) {
    super(props)
  }

  render () {
    return (
      <View style={styles.container}>
        <ToggleButton
          value={'Play'}
          onDown={() => this.props.navigator.push({
            index: 1
          })}
          onUp={() => this.props.navigator.push({
            index: 1
          })}
          disabled={false}
        />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure'
  }
})
