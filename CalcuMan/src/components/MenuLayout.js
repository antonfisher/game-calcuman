'use strict'

/**
 * @flow
 */

import React, {Component} from 'react'
import {StyleSheet, View, Text} from 'react-native'

import Button from './Button'

export default class MenuLayout extends Component {
  render () {
    return (
      <View style={styles.container}>
        <View style={styles.logo}>
          <Text>LOGO</Text>
        </View>
        <View style={styles.menuContainer}>
          <Button
            value={'PLAY'}
            onPress={() => this.props.navigator.push({
              index: 1
            })}
            disabled={false}
          />
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFDA31'
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
    justifyContent: 'center',
    alignItems: 'flex-start',
    flexDirection: 'row'
  }
})
