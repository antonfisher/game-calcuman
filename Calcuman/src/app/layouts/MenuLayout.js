/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

import Button from '../../components/Button'
import MuteButton from '../buttons/MuteButton'

import {ROUTE_INDEX_GAME, ROUTE_INDEX_DEMO} from '../AppLayout'

export default class MenuLayout extends Component {
  static get defaultProps () {
    return {
      maxScore: 0,
      muted: false
    }
  }

  static get propTypes () {
    return {
      muted: React.PropTypes.bool,
      maxScore: React.PropTypes.number,
      navigator: React.PropTypes.object,
      soundsManager: React.PropTypes.object
    }
  }

  onPlayClick () {
    this.props.soundsManager.play('toggle_off')
    this.props.navigator.push({index: ROUTE_INDEX_GAME})
  }

  onDemoClick () {
    this.props.soundsManager.play('toggle_off')
    this.props.navigator.push({index: ROUTE_INDEX_DEMO})
  }

  render () {
    return (
      <Image source={require('./img/background.png')} style={styles.container}>
        <View style={styles.topBar}>
          <MuteButton
            soundsManager={this.props.soundsManager}
            muted={this.props.muted} />
        </View>
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Button
              value={'PLAY'}
              onClick={this.onPlayClick.bind(this)}
              disabled={false} />
          </View>
          <View style={styles.menuItem}>
            <Button
              value={'HOW TO PLAY?'}
              fontSize={15}
              background={'lightsteelblue'}
              onClick={this.onDemoClick.bind(this)}
              disabled={false} />
          </View>
          <View style={styles.menuScoreItem}>
            <Text style={styles.maxScoreTitle}>Max score:</Text>
            <Text style={styles.maxScoreText}>{this.props.maxScore}</Text>
          </View>
          <View style={styles.versionItem}>
            <Text style={styles.versionText}>v1.0.3</Text>
          </View>
        </View>
      </Image>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: null,
    height: null,
    resizeMode: Image.resizeMode.stretch
  },
  topBar: {
    height: 60,
    justifyContent: 'flex-end',
    alignItems: 'center',
    flexDirection: 'row',
    paddingTop: 10,
    paddingLeft: 1,
    paddingRight: 3,
    marginBottom: 15
  },
  menuContainer: {
    flex: 4,
    margin: 20,
    marginTop: 50,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuItem: {
    marginBottom: 20,
    flexDirection: 'row'
  },
  menuScoreItem: {
    alignItems: 'center',
    justifyContent: 'flex-start',
    flexDirection: 'column',
    marginBottom: 30
  },
  versionItem: {
    marginTop: 25,
    marginBottom: 0
  },
  maxScoreTitle: {
    color: 'gray',
    fontSize: 16,
    lineHeight: 17,
    textShadowRadius: 1,
    textShadowColor: '#aaaaaa',
    textShadowOffset: {width: 1, height: 1}
  },
  maxScoreText: {
    fontWeight: 'bold',
    fontSize: 55,
    lineHeight: 50,
    textShadowRadius: 2,
    textShadowColor: '#aaaaaa',
    textShadowOffset: {width: 2, height: 2}
  },
  versionText: {
    color: 'gray',
    fontSize: 11,
    textShadowRadius: 1,
    textShadowColor: '#aaaaaa',
    textShadowOffset: {width: 1, height: 1}
  }
})
