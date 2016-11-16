/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, View, Image, Text} from 'react-native'

import Button from '../../components/Button'
import MuteButton from '../buttons/MuteButton'

export default class MenuLayout extends Component {
  static get defaultProps () {
    return {
      muted: false
    }
  }

  static get propTypes () {
    return {
      muted: React.PropTypes.bool,
      navigator: React.PropTypes.object,
      soundsManager: React.PropTypes.object
    }
  }

  onPlayClick () {
    this.props.soundsManager.play('toggle_off')
    this.props.navigator.push({index: 1})
  }

  render () {
    return (
      <Image source={require('./img/background-60.png')} style={styles.container}>
        <View style={styles.logo} />
        <View style={styles.menuContainer}>
          <View style={styles.menuItem}>
            <Button
              value={'PLAY'}
              onClick={this.onPlayClick.bind(this)}
              disabled={false} />
          </View>
          <View style={styles.menuItem}>
            <MuteButton
              soundsManager={this.props.soundsManager}
              muted={this.props.muted} />
          </View>
          <View style={styles.versionItem}>
            <Text style={styles.versionText}>v1.0.1</Text>
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
  logo: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuContainer: {
    flex: 2,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'space-between',
    alignItems: 'center'
  },
  menuItem: {
    marginBottom: 20,
    flexDirection: 'row'
  },
  versionItem: {
    marginTop: 40,
    marginBottom: 0
  },
  versionText: {
    color: 'gray',
    fontSize: 11
  }
})
