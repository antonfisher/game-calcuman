'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation,
  TouchableHighlight
} from 'react-native'
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

    this._onPressButton = this._onPressButton.bind(this)
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

    this.setTimeout(() => this.state.pressed = false, 100)

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
        onPress={this._onPressButton}
        underlayColor={'gold'}
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
    backgroundColor: 'lightskyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderColor: 'orange',
    borderWidth: 5,
    borderRadius: 5,
    padding: 5,
    margin: 15
  },
  containerPressed: {
    flex: 1,
    backgroundColor: 'white',
    borderColor: 'white',
    height: 1,
    width: 1
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
    fontSize: 50,
    color: 'darkslategray'
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
