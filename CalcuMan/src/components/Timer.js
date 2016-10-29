'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

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
          <Icon name={'timer'} size={30} color={'gray'} />
          <Text style={textStyle}>&nbsp;{this.props.timeout}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={textStyle}>Time over&nbsp;</Text>
          <Icon name={'mood-bad'} size={30} color={'gray'} />
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
