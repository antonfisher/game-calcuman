/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, Text, View, LayoutAnimation} from 'react-native'
import reactMixin from 'react-mixin'
import TimerMixin from 'react-timer-mixin'

import ToggleButton from '../../components/ToggleButton'
import MuteButton from '../buttons/MuteButton'
import IconButton from '../../components/IconButton'
import Game from '../../classes/Game'
import Timer from '../Timer'

const START_NUMBER = 10;
const WARNING_THRESHOLD = 5
const WIN_SCREEN_DELAY = 1500
const LOSE_SCREEN_DELAY = 1500

export default class PlayLayout extends Component {
  static get defaultProps () {
    return {
      muted: false,
      buttonColors: [
        'lightsteelblue',
        'lightgreen',
        'lightcoral',
        'lightblue',
        'lavender',
        'lightsalmon',
        '#a5d9e5'
      ]
    }
  }

  static get propTypes () {
    return {
      muted: React.PropTypes.bool,
      navigator: React.PropTypes.object,
      soundsManager: React.PropTypes.object,
      buttonColors: React.PropTypes.array
    }
  }

  constructor (props) {
    super(props)

    this.game = new Game({
      targetNum: START_NUMBER - 1,
      onTimeOverCallback: this.updateGameState.bind(this),
      onTickCallback: this.onTimerTick.bind(this)
    })

    this.game.generateNext()

    this.state = {
      ...this.game.getState(),
      ...{
        demo: true,
        buttonColor: this.props.buttonColors[0]
      }
    }

    //weird
    this._demoPressSec = 0
    this._solution = this.game.solution
  }

  componentWillUnmount () {
    this.game.stopTimer()
  }

  incSum (value) {
    this.props.soundsManager.play('toggle_off')
    this.game.incSum(Number(value))
    this.updateGameState()
  }

  decSum (value) {
    this.props.soundsManager.play('toggle_on')
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
    const {buttonColors} = this.props

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
    this.setState({
      ...this.game.getState(),
      ...{
        demo: false,
        buttonColor: buttonColors[Math.floor(Math.random() * buttonColors.length)]
      }
    })
  }

  onTimerTick (timeout) {
    this.setState({timeout})
    if (this.state.timeout <= WARNING_THRESHOLD) {
      this.props.soundsManager.play('timeout')
    }
  }

  render () {
    const targetNumberTextStyle = [styles.targetNumberText]
    if (this.state.gameOver) {
      if (this.state.isWin) {
        targetNumberTextStyle.push(styles.targetNumberWinText)
      } else {
        targetNumberTextStyle.push(styles.targetNumberLoseText)
      }
    }

    return (
      <View style={styles.container}>
        <View style={styles.topBar}>
          <IconButton
            name={'arrow-back'}
            onClick={this.props.navigator.pop} />
          <Timer
            timeout={this.state.timeout}
            warningThreshold={WARNING_THRESHOLD} />
          <MuteButton
            soundsManager={this.props.soundsManager}
            muted={this.props.muted} />
        </View>
        <View style={styles.targetNumberContainer}>
          <Text style={targetNumberTextStyle}>
            {this.state.targetNum}
          </Text>
        </View>
        {this.state.gameOver ? null : this.renderGridContainer()}
        <View style={styles.bottomBar}>
          <Text>{this.state.buttonColor} - {this.state.demo ? 'yes' : 'no'}</Text>
        </View>
      </View>
    )
  }

  renderGridContainer () {
    return (
      <View style={styles.gridContainer}>
        {this.renderGridRow(0)}
        {this.renderGridRow(1)}
        {this.renderGridRow(2)}
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
    let demoPressSec = 0
    const value = this.state.values[valuesIndex]

    if (this.state.demo) {
      const index = this._solution.indexOf(value)
      if (index !== -1) {
        this._demoPressSec++
        this._solution = this._solution.filter((v, k) => (k !== index))
        demoPressSec = this._demoPressSec
      }
    }

    return (
      <ToggleButton
        value={value.toString()}
        onDown={this.incSum.bind(this)}
        onUp={this.decSum.bind(this)}
        disabled={this.state.gameOver}
        color={this.state.buttonColor}
        demoPressSec={demoPressSec} />
    )
  }
}

reactMixin.onClass(PlayLayout, TimerMixin)

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure'
  },
  topBar: {
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 1,
    paddingRight: 3,
    marginBottom: 15
  },
  targetNumberContainer: {
    flex: 2,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 5
  },
  targetNumberText: {
    fontSize: 120,
    margin: 20,
    marginTop: 20,
    textShadowOffset: {width: 3, height: 3},
    textShadowRadius: 5,
    textShadowColor: '#aaaaaa'
  },
  targetNumberWinText: {
    color: 'lightgreen'
  },
  targetNumberLoseText: {
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
