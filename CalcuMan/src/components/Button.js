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
      disabled: true,
      onClick: function () {}
    }
  }

  static get propTypes () {
    return {
      value: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      onClick: React.PropTypes.func
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      pressed: false
    }
  }

  onClick () {
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

    this.setTimeout(() => {
      this.state.pressed = false
    }, 100)

    this.props.onClick()
  }

  render () {
    const styleText = [styles.text]
    const styleContainer = [styles.container]
    if (this.props.disabled) {
      styleText.push(styles.textDisabled)
      styleContainer.push(styles.containerDisabled)
    } else if (this.state.pressed) {
      styleText.push(styles.textPressed)
      styleContainer.push(styles.containerPressed)
    }

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={this.onClick.bind(this)}
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
    borderColor: 'gold',
    borderRadius: 13,
    borderWidth: 9,
    padding: 5,
    margin: 15
  },
  containerPressed: {
    backgroundColor: 'orange',
    height: 20,
    width: 20
  },
  containerDisabled: {
    backgroundColor: 'lightgray',
    borderRadius: 3
  },
  text: {
    fontSize: 60,
    color: 'white',
    fontWeight: 'bold'
  },
  textPressed: {
    fontSize: 1
  },
  textDisabled: {
    fontSize: 1,
    color: 'lightgray'
  }
})
