/**
 * @flow
 */

import {AsyncStorage} from 'react-native'

const MAX_SCORE_KEY = '@MainStorage:max-score'

export default class Storage {
  getMaxScore () {
    return AsyncStorage.getItem(MAX_SCORE_KEY).then((value) => Number(value))
  }

  setMaxScore (value) {
    return AsyncStorage.setItem(MAX_SCORE_KEY, value.toString())
  }
}
