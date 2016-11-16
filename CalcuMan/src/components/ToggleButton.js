/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  TouchableHighlight,
  LayoutAnimation,
  Dimensions
} from 'react-native'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

const DEMO_CLICK_DELAY = 500
const DEMO_CLICK_INTERVAL = 600

export default class ToggleButton extends Component {
  static get defaultProps () {
    return {
      value: '-',
      color: '#a5d9e5',
      disabled: true,
      demo: false,
      demoPressSec: 0,
      onUp: function () {},
      onDown: function () {}
    }
  }

  static get propTypes () {
    return {
      value: React.PropTypes.string,
      color: React.PropTypes.string,
      disabled: React.PropTypes.bool,
      demo: React.PropTypes.bool,
      demoPressSec: React.PropTypes.number,
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

  componentDidMount () {
    if (this.props.demoPressSec > 0) {
      this.setTimeout(
        this.onPressButton.bind(this, true),
        DEMO_CLICK_DELAY + this.props.demoPressSec * DEMO_CLICK_INTERVAL
      )
    }
  }

  onPressButton (force) {
    if (this.props.demo && !force) {
      return
    }

    const pressed = !this.state.pressed
    LayoutAnimation.configureNext({
      duration: 200,
      update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5
      }
    })

    this.setState({
      pressed: pressed
    })

    if (pressed) {
      this.props.onDown(this.props.value)
    } else {
      this.props.onUp(this.props.value)
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
    const {color, disabled, value} = this.props

    let styleContainer = [styles.container]
    if (disabled) {
      styleContainer.push(styles.containerDisabled)
    } else if (this.state.pressed) {
      styleContainer.push(styles.containerPressed)
    } else {
      styleContainer = {
        ...StyleSheet.flatten(styleContainer),
        ...{backgroundColor: color}
      }
    }

    let styleText = [styles.text]
    if (disabled) {
      styleText.push(styles.textDisabled)
    } else {
      const {height, width} = Dimensions.get('window')
      const x = Math.min(height, width)

      styleText = {
        ...StyleSheet.flatten(styleText),
        ...{fontSize: (x / 4.3 / Math.max(value.length, 2))}
      }
    }

    return (
      <TouchableHighlight
        style={styleContainer}
        onPress={this.onPressButton.bind(this, false)}
        disabled={this.props.disabled}
        underlayColor={'gold'}>
        <Text style={styleText} allowFontScaling>
          {this.props.value}
        </Text>
      </TouchableHighlight>
    )
  }
}

reactMixin.onClass(ToggleButton, TimerMixin)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#a5d9e5',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 7,
    padding: 5,
    paddingBottom: 7,
    margin: 15
  },
  containerPressed: {
    backgroundColor: '#FFDA31',
    borderRadius: 10,
    padding: 10,
    paddingBottom: 14,
    margin: 10
  },
  containerDisabled: {
    backgroundColor: 'lightgray',
    borderRadius: 3,
    margin: 25
  },
  text: {
    color: 'darkslategray'
  },
  textDisabled: {
    fontSize: 1,
    color: 'lightgray'
  }
})
