'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'

export default class Timer extends Component {
  static get defaultProps () {
    return {
      timeout: 0,
      warningThreshold: 5
    }
  }

  static get propTypes () {
    return {
      timeout: React.PropTypes.number,
      warningThreshold: React.PropTypes.number
    }
  }

  render () {
    const textStyle = [styles.text]
    const iconStyle = [styles.icon]

    if (this.props.timeout <= this.props.warningThreshold) {
      textStyle.push(styles.red)
      iconStyle.push(styles.red)
    }

    if (this.props.timeout) {
      return (
        <View style={styles.container}>
          <Text style={iconStyle}>&#x25F7;</Text>
          <Text style={textStyle}>&nbsp;{this.props.timeout}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={textStyle}>Time over&nbsp;</Text>
          <Text style={iconStyle}>&#x2639;</Text>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  container: {
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row'
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray'
  },
  red: {
    color: 'red'
  },
  icon: {
    fontSize: 40,
    fontWeight: 'normal',
    marginTop: -6
  }
})
