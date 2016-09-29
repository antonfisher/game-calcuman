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
      pressed: false,
      value: props.value
    }

    this._onButtonPress = this._onButtonPress.bind(this)
  }

  _onButtonPress (index) {
    LayoutAnimation.configureNext({
      duration: 200,
      update: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5
      }
    })

    console.log('-- button pressed', arguments)

    this.setState({
      pressed: !this.state.pressed
    })
  }

  render () {
    const style = (this.state.pressed ? styles.containerPressed : styles.container)
    return (
      <TouchableHighlight style={style} onPress={this._onButtonPress}>
        <View allowFontScaling={true}>
          <Text style={styles.text} allowFontScaling={true}>
            {this.state.value}
          </Text>
        </View>
      </TouchableHighlight>
    )
  }
}

ToggleButton.propTypes = {
  value: React.PropTypes.string
}
ToggleButton.defaultProps = {
  value: '-'
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
  text: {
    fontSize: 60,
    color: 'darkslategray'
  }
})
