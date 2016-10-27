'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight
} from 'react-native'

export default class MuteButton extends Component {
  _onPressButton () {
    this.props.soundsManager.setMuted(!this.props.muted)
  }

  render () {
    const style = (this.props.muted ? styles.topBarIconLineThrough : styles.topBarIcon)

    return (
      <TouchableHighlight
        onPress={this._onPressButton.bind(this)}
        underlayColor={'gold'}
        style={styles.topBarMuteButton}>
        <Text style={style}> &#x266B; </Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  topBarMuteButton: {
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 12,
    borderRadius: 15
  },
  topBarIcon: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  topBarIconLineThrough: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
    textDecorationLine: 'line-through'
  }
})
