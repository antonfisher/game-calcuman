/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, TouchableHighlight} from 'react-native'
import Icon from 'react-native-vector-icons/MaterialIcons'

const ICON_SIZE = 30

export default class IconButton extends Component {
  static get defaultProps () {
    return {
      name: 'remove',
      color: 'gray',
      style: {},
      onClick: (function () {})
    }
  }

  static get propTypes () {
    return {
      name: React.PropTypes.string,
      color: React.PropTypes.string,
      style: React.PropTypes.object,
      onClick: React.PropTypes.func
    }
  }

  render () {
    return (
      <TouchableHighlight
        onPress={this.props.onClick}
        underlayColor={'gold'}
        style={[styles.button, this.props.style]}>
        <Icon name={this.props.name} size={ICON_SIZE} color={this.props.color}/>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  button: {
    margin: 1,
    paddingLeft: 21,
    paddingRight: 20,
    paddingTop: 5,
    paddingBottom: 5,
    borderRadius: 13
  }
})
