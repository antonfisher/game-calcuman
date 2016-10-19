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

import ToggleButton from './ToggleButton'
import arrayShuffle from '../functions/arrayShuffle.js'
import generateValues from '../functions/generateValues.js'

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
    this.state.sum += Number(value)
    this.checkGameState()
  }

  decSum (value) {
    this.state.sum -= Number(value)
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

    const targetNum = (this.state.targetNum + 1);

    this.setState({
      targetNum,
      values: arrayShuffle(generateValues(targetNum)),
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
        <View style={styles.topBar}>
          {this.renderBackButton()}
          {this.renderMuteButton()}
        </View>
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
        value={this.state.values[valuesIndex].toString()}
        onDown={this.incSum.bind(this)}
        onUp={this.decSum.bind(this)}
        disabled={this.state.gameOver}
      />
    )
  }

  renderBackButton () {
    return (
      <TouchableHighlight
        onPress={this.props.navigator.pop}
        underlayColor={'gold'}
        style={styles.topBarBackButton}>
        <Text style={styles.topBarIcon}>&larr;</Text>
      </TouchableHighlight>
    )
  }

  renderMuteButton () {
    return (
      <TouchableHighlight
        onPress={() => {}}
        underlayColor={'gold'}
        style={styles.topBarMuteButton}>
        <Text style={styles.topBarIcon}> &#x266B; </Text>
      </TouchableHighlight>
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
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center'
  },
  targetNumberText: {
    fontSize: 120,
    margin: 20,
    marginTop: 0,
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
  topBar: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10
  },
  topBarBackButton: {
    borderRadius: 15,
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 12
  },
  topBarMuteButton: {
    borderRadius: 15,
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 12
  },
  topBarIcon: {
    fontSize: 30,
    textDecorationLine: 'line-through'
  },
  bottomBar: {
    height: 60,
    backgroundColor: 'silver',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 10
  }
})
