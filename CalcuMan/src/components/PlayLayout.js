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
import Game from '../classes/Game.js'

const WIN_SCREEN_DELAY = 1500
const LOSE_SCREEN_DELAY = 1500

export default class PlayLayout extends Component {
  static get defaultProps () {
    return {
      muted: false,
      targetNum: 9
    }
  }

  static get propTypes () {
    return {
      muted: React.PropTypes.bool,
      targetNum: React.PropTypes.number
    }
  }

  constructor (props) {
    super(props)

    this.game = new Game(props.targetNum)
    this.game.generateNext()
    this.state = {...{muted: this.props.soundsManager.muted}, ...this.game.getState()}
  }

  onMuteClick () {
    const muted = !this.state.muted

    this.setState({muted})
    this.props.soundsManager.muted = muted
  }

  incSum (value) {
    this.props.soundsManager.play('toggle_on')
    this.game.incSum(Number(value))
    this.updateGameState()
  }

  decSum (value) {
    this.props.soundsManager.play('toggle_off')
    this.game.decSum(Number(value))
    this.updateGameState()
  }

  updateGameState () {
    if (this.state.gameOver) {
      return
    }

    this.setState({
      isWin: this.game.isWin,
      gameOver: this.game.gameOver
    })

    if (this.game.gameOver) {
      if (this.game.isWin) {
        this.setTimeout(this.generateNewGame, WIN_SCREEN_DELAY)
      } else {
        this.setTimeout(this.props.navigator.pop, LOSE_SCREEN_DELAY)
      }
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

    this.game.generateNext()
    this.setState(this.game.getState())
  }

  render () {
    let targetNumberTextStyle = styles.targetNumberText
    if (this.state.gameOver) {
      if (this.state.isWin) {
        targetNumberTextStyle = styles.targetNumberWinText
      } else {
        targetNumberTextStyle = styles.targetNumberLoseText
      }
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
    const style = (this.state.muted ? styles.topBarIconLineThrough : styles.topBarIcon)
    return (
      <TouchableHighlight
        onPress={this.onMuteClick.bind(this)}
        underlayColor={'gold'}
        style={styles.topBarMuteButton}>
        <Text style={style}> &#x266B; </Text>
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
    marginLeft: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 12,
    borderRadius: 15
  },
  topBarMuteButton: {
    marginRight: 10,
    paddingLeft: 10,
    paddingRight: 10,
    paddingBottom: 12,
    borderRadius: 15
  },
  topBarIcon: {
    fontSize: 30,
    fontWeight: 'bold'
  },
  topBarIconLineThrough: {
    color: 'red',
    fontSize: 30,
    fontWeight: 'bold',
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
