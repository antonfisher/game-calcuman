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
  constructor (props) {
    super(props)

    this.state = {
      pressed: false
    }

    this._onButtonPress = this._onButtonPress.bind(this)
  }

  _onButtonPress () {
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
    let styleContainer = styles.container
    if (this.props.disabled) {
      styleContainer = styles.containerDisabled
    } else if (this.state.pressed) {
      styleContainer = styles.containerPressed
    }

    let styleText = (this.props.disabled ? styles.textDisabled : styles.text)

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={this._onButtonPress}
        disabled={this.props.disabled}>
        <View allowFontScaling={true}>
          <Text style={styleText} allowFontScaling={true}>
            {this.props.value}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

ToggleButton.propTypes = {
  value: React.PropTypes.number,
  disabled: React.PropTypes.bool
}
ToggleButton.defaultProps = {
  value: 0,
  disabled: true
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'lightskyblue',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 5,
    padding: 5,
    margin: 15
  },
  containerPressed: {
    flex: 1,
    backgroundColor: 'orange',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 3,
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
