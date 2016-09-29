'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  LayoutAnimation
} from 'react-native'

import ToggleButton from './ToggleButton'

export default class CalcuManLayout extends Component {
  constructor (props) {
    super(props)

    this.state = {
      num: Math.round(Math.random() * 100),
      values: new Array(9).fill().map((i, k) => Math.round(Math.random() * 10))
    }
  }

  componentWillMount() {
    LayoutAnimation.configureNext({
      duration: 100,
      create: {
        type: LayoutAnimation.Types.spring,
        property: LayoutAnimation.Properties.scaleXY,
        springDamping: 0.5
      },
      update: {
        type: LayoutAnimation.Types.spring,
        springDamping: 0.5
      }
    })
  }

  render () {
    return (
      <View style={styles.container}>
        <View style={styles.numberContainer}>
          <Text style={styles.numberText}>
            {this.state.num}
          </Text>
        </View>
        <View style={styles.gridContainer}>
          {this.renderGridRow(0)}
          {this.renderGridRow(1)}
          {this.renderGridRow(2)}
        </View>
        <View style={styles.bottomBar}>
          <Text>AD</Text>
        </View>
      </View>
    )
  }

  renderGridRow (rowIndex) {
    return (
      <View style={styles.gridRow}>
        {this.renderGridRowButton(3 * rowIndex + 0)}
        {this.renderGridRowButton(3 * rowIndex + 1)}
        {this.renderGridRowButton(3 * rowIndex + 2)}
      </View>
    )
  }

  renderGridRowButton (valuesIndex) {
    return (
      <ToggleButton value={this.state.values[valuesIndex]} />
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure',
  },
  numberContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  numberText: {
    fontSize: 120,
    margin: 20,
    marginTop: 30,
    textShadowOffset: {width: 2, height: 2},
    textShadowRadius: 2,
    textShadowColor: 'white'
  },
  gridContainer: {
    flex: 5,
    margin: 10
  },
  gridRow: {
    flex: 1,
    flexDirection: 'row'
  },
  bottomBar: {
    height: 60,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
})
