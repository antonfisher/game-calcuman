/**
 * @flow
 */

import React, {Component} from 'react'
import IconButton from '../../components/IconButton'

export default class MuteButton extends Component {
  static get defaultProps () {
    return {
      muted: false
    }
  }

  static get propTypes () {
    return {
      muted: React.PropTypes.bool,
      soundsManager: React.PropTypes.object
    }
  }

  onClick () {
    this.props.soundsManager.setMuted(!this.props.muted)
  }

  render () {
    const name = (this.props.muted ? 'volume-off' : 'volume-up')
    const color = (this.props.muted ? 'red' : 'gray')

    return (
      <IconButton name={name} color={color} onClick={this.onClick.bind(this)}/>
    )
  }
}
