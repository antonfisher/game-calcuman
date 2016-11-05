/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

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
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
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
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'azure'
  },
  logo: {
    flex: 1,
    margin: 20,
    justifyContent: 'center',
    alignItems: 'center'
  },
  menuContainer: {
    flex: 2,
    margin: 20,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'center'
  },
  menuItem: {
    marginBottom: 20,
    flexDirection: 'row'
  }
})