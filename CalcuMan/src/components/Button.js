'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, LayoutAnimation, TouchableHighlight} from 'react-native'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

export default class Button extends Component {
  static get defaultProps () {
    return {
      value: '',
      disabled: true
    }
  }

  static get propTypes () {
    return {
      value: React.PropTypes.string,
      disabled: React.PropTypes.bool
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      pressed: false
    }
  }

  _onPressButton () {
    LayoutAnimation.configureNext({
      duration: 300,
      update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5
      }
    })

    this.setState({
      pressed: true
    })

    this.setTimeout(() => { this.state.pressed = false }, 100)

    this.props.onPress()
  }

  render () {
    let styleText = styles.text
    let styleContainer = styles.container
    if (this.props.disabled) {
      styleText = styles.textDisabled
      styleContainer = styles.containerDisabled
    } else if (this.state.pressed) {
      styleText = styles.textPressed
      styleContainer = styles.containerPressed
    }

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={this._onPressButton.bind(this)}
        underlayColor={'orange'}
        disabled={this.props.disabled}>
        <Text style={styleText} allowFontScaling>
          {this.props.value}
        </Text>
      </TouchableHighlight>
    )
  }
}

reactMixin.onClass(Button, TimerMixin)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#6BC0D5',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderRadius: 13,
    borderWidth: 9,
    padding: 5,
    margin: 15
  },
  containerPressed: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderRadius: 13,
    borderWidth: 9,
    padding: 5,
    margin: 15,
    height: 20,
    width: 20
  },
  containerDisabled: {
    flex: 1,
    backgroundColor: 'lightgray',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
    padding: 5,
    margin: 25
  },
  text: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold'
  },
  textPressed: {
    fontSize: 1,
    color: 'white'
  },
  textDisabled: {
    fontSize: 1,
    color: 'lightgray'
  }
})
