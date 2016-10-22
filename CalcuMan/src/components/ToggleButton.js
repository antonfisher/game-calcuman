'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native'

export default class ToggleButton extends Component {
  static get defaultProps () {
    return {
      value: '-',
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
      duration: 200,
      update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5
      }
    })

    this.setState({
      pressed: !this.state.pressed
    })

    if (this.state.pressed) {
      this.props.onUp(this.props.value)
    } else {
      this.props.onDown(this.props.value)
    }
  }

  componentDidUpdate (prevProps, prevState) {
    if (prevState.pressed && prevProps.disabled && !this.props.disabled) {
      this.setState({
        pressed: false
      })
    }
  }

  render () {
    const styleText = (this.props.disabled ? styles.textDisabled : styles.text)

    let styleContainer = styles.container
    if (this.props.disabled) {
      styleContainer = styles.containerDisabled
    } else if (this.state.pressed) {
      styleContainer = styles.containerPressed
    }

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={this._onPressButton}
        disabled={this.props.disabled}
        underlayColor={'gold'}>
        <Text style={styleText} allowFontScaling>
          {this.props.value}
        </Text>
      </TouchableHighlight>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5d9e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    padding: 5,
    margin: 15
  },
  containerPressed: {
    flex: 1,
    backgroundColor: '#FFDA31',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding: 10,
    margin: 10
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
    color: 'darkslategray'
  },
  textDisabled: {
    fontSize: 1,
    color: 'lightgray'
  }
})
