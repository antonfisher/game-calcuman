'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

export default class MuteButton extends Component {
  _onPressButton () {
    this.props.soundsManager.setMuted(!this.props.muted)
  }

  render () {
    const name = (this.props.muted ? 'volume-off' : 'volume-up')
    const color = (this.props.muted ? 'red' : 'gray')

    return (
      <TouchableHighlight
        onPress={this._onPressButton.bind(this)}
        underlayColor={'gold'}
        style={styles.topBarMuteButton}>
        <Icon name={name} size={30} color={color} />
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  topBarMuteButton: {
    marginRight: 10,
    paddingLeft: 21,
    paddingRight: 20,
    paddingBottom: 2,
    borderRadius: 15
  }
})
