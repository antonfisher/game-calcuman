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
      fontSize: 60,
      disabled: true,
      onClick: function () {},
      background: '#6BC0D5'
    }
  }

  static get propTypes () {
    return {
      value: React.PropTypes.string,
      onClick: React.PropTypes.func,
      disabled: React.PropTypes.bool,
      fontSize: React.PropTypes.number,
      background: React.PropTypes.string
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
    const styleText = [styles.text, {
      fontSize: this.props.fontSize
    }]

    const styleContainer = [styles.container, {
      backgroundColor: this.props.background
    }]

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
    borderRadius: 2,
    borderWidth: 2,
    borderColor: 'rgba(255,255,255,.5)',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 6,
    paddingHorizontal: 16,
    margin: 6
  },
  containerPressed: {
    backgroundColor: 'orange'
  },
  containerDisabled: {
    backgroundColor: 'lightgray'
  },
  text: {
    color: 'white',
    fontWeight: 'bold'
  },
  textPressed: {
    color: 'white'
  },
  textDisabled: {
    color: 'lightgray'
  }
})
