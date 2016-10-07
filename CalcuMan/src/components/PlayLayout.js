'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {
  StyleSheet,
  Text,
  View,
  LayoutAnimation
} from 'react-native'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

import ToggleButton from './ToggleButton'

export default class PlayLayout extends Component {
  static get defaultProps () {
    return {
      targetNum: 9
    }
  }

  static get propTypes () {
    return {
      targetNum: React.PropTypes.number
    }
  }

  constructor (props) {
    super(props)

    this.state = {
      targetNum: props.targetNum,
      values: new Array(9).fill(0),
      sum: 0,
      isWin: false,
      isLose: false,
      gameOver: false
    }
  }

  incSum (value) {
    this.state.sum += value
    this.checkGameState()
  }

  decSum (value) {
    this.state.sum -= value
    this.checkGameState()
  }

  checkGameState () {
    if (this.state.gameOver) {
      return
    }

    if (this.state.sum === this.state.targetNum) {
      this.setState({
        isWin: true,
        gameOver: true
      })
      this.setTimeout(this.generateNewGame, 1500)
    } else if (this.state.sum > this.state.targetNum) {
      this.setState({
        isLose: true,
        gameOver: true
      })
      this.setTimeout(this.props.navigator.pop, 1500)
    }
  }

  generateNewGame () {
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

    this.setState({
      targetNum: (this.state.targetNum + 1),
      values: new Array(9).fill().map((i, k) => Math.round(Math.random() * 10)),
      sum: 0,
      isWin: false,
      isLose: false,
      gameOver: false
    })
  }

  componentWillMount () {
    this.generateNewGame()
  }

  render () {
    let targetNumberTextStyle = styles.targetNumberText
    if (this.state.isWin) {
      targetNumberTextStyle = styles.targetNumberWinText
    } else if (this.state.isLose) {
      targetNumberTextStyle = styles.targetNumberLoseText
    }

    return (
      <View style={styles.container}>
        <View style={styles.targetNumberContainer}>
          <Text style={targetNumberTextStyle}>
            {this.state.targetNum}
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
      <ToggleButton
        value={this.state.values[valuesIndex]}
        onDown={this.incSum.bind(this)}
        onUp={this.decSum.bind(this)}
        disabled={this.state.gameOver}
      />
    )
  }
}

reactMixin.onClass(PlayLayout, TimerMixin)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure'
  },
  targetNumberContainer: {
    flex: 3,
    justifyContent: 'center',
    alignItems: 'center'
  },
  targetNumberText: {
    fontSize: 120,
    margin: 20,
    marginTop: 30,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: '#aaaaaa'
  },
  targetNumberWinText: {
    fontSize: 120,
    margin: 20,
    marginTop: 30,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: '#aaaaaa',
    color: 'lightgreen'
  },
  targetNumberLoseText: {
    fontSize: 120,
    margin: 20,
    marginTop: 30,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: '#aaaaaa',
    color: 'red'
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
