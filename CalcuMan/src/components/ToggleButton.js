/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, TouchableHighlight, LayoutAnimation} from 'react-native'

export default class ToggleButton extends Component {
  static get defaultProps () {
    return {
      value: '-',
      color: '#a5d9e5',
      disabled: true,
      onUp: function () {},
      onDown: function () {}
    }
  }

  static get propTypes () {
    return {
      value: React.PropTypes.string,
      color: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      onUp: React.PropTypes.func,
      onDown: React.PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      pressed: false
    }
  }

  onPressButton () {
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
    const {color, disabled} = this.props

    const styleText = [styles.text]
    let styleContainer = [styles.container]
    if (disabled) {
      styleText.push(styles.textDisabled)
      styleContainer.push(styles.containerDisabled)
    } else if (this.state.pressed) {
      styleContainer.push(styles.containerPressed)
    } else {
      styleContainer = {
        ...StyleSheet.flatten(styleContainer),
        ...{backgroundColor: color}
      }
    }

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={this.onPressButton.bind(this)}
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
    backgroundColor: '#FFDA31',
    borderRadius: 10,
    padding: 10,
    margin: 10
  },
  containerDisabled: {
    backgroundColor: 'lightgray',
    borderRadius: 3,
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
