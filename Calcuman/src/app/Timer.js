/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const COLOR_DEFAULT = 'gray'
const COLOR_WARNING = 'indianred'
const ICON_SIZE = 25

export default class Timer extends Component {
  static get defaultProps () {
    return {
      demo: false,
      timeout: 0,
      warningThreshold: 5
    }
  }

  static get propTypes () {
    return {
      demo: React.PropTypes.bool,
      timeout: React.PropTypes.number,
      warningThreshold: React.PropTypes.number
    }
  }

  render () {
    if (this.props.demo) {
      return (
        <View style={styles.container}>
          <Text style={styles.text}>How to play?</Text>
        </View>
      )
    } else if (this.props.timeout) {
      let color = COLOR_DEFAULT
      let textStyle = [styles.text]
      if (this.props.timeout <= this.props.warningThreshold) {
        textStyle.push(styles.textWarning)
        color = COLOR_WARNING
      }

      return (
        <View style={styles.container}>
          <Icon name={'timer'} size={ICON_SIZE} color={color} />
          <Text style={textStyle}>&nbsp;{this.props.timeout}</Text>
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          <Text style={[styles.text, styles.textWarning]}>Time over&nbsp;</Text>
          <Icon name={'mood-bad'} size={ICON_SIZE} color={COLOR_WARNING} />
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
    color: COLOR_DEFAULT,
    textShadowRadius: 2,
    textShadowColor: '#aaaaaa',
    textShadowOffset: {width: 1, height: 1}
  },
  textWarning: {
    color: COLOR_WARNING
  }
})
