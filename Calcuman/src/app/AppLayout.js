/**
 * @flow
 */

import React, {Component} from 'react'
import {Navigator} from 'react-native'

import MenuLayout from './layouts/MenuLayout'
import PlayLayout from './layouts/PlayLayout'

import GA from '../classes/GA'
import Storage from '../classes/Storage'
import {gaNumber} from '../configs/gaNumber'
import SoundsManager from '../classes/SoundsManager'

const MAX_SCORE_DEFAULT_VALUE = 10

export const ROUTE_INDEX_MENU = 0
export const ROUTE_INDEX_GAME = 1
export const ROUTE_INDEX_DEMO = 2

export default class AppLayout extends Component {
  constructor (props) {
    super(props)

    this.ga = new GA(gaNumber)
    this.storage = new Storage()
    this.soundsManager = new SoundsManager((muted) => this.setState({muted}))

    this.state = {
      muted: this.soundsManager.muted,
      maxScore: MAX_SCORE_DEFAULT_VALUE
    }

    this.storage.getMaxScore()
      .then((maxScore) => {
        if (maxScore) {
          this.setState({maxScore})
        }
      })
      .done()
  }

  onMaxScoreUpdate (maxScore) {
    if (maxScore > this.state.maxScore) {
      this.storage.setMaxScore(maxScore)
        .then(() => this.setState({maxScore}))
        .done()
    }
  }

  render () {
    return (
      <Navigator
        initialRoute={{index: ROUTE_INDEX_MENU}}
        renderScene={(route, navigator) => {
          if (route.index === ROUTE_INDEX_MENU) {
            return (
              <MenuLayout
                navigator={navigator}
                muted={this.state.muted}
                maxScore={this.state.maxScore}
                soundsManager={this.soundsManager} />
            )
          } else {
            return (
              <PlayLayout
                demo={route.index === ROUTE_INDEX_DEMO}
                ga={this.ga}
                navigator={navigator}
                muted={this.state.muted}
                soundsManager={this.soundsManager}
                onMaxScoreUpdate={this.onMaxScoreUpdate.bind(this)} />
            )
          }
        }} />
    )
  }
}
