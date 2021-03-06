import { Map } from 'immutable'
import * as actionTypes from './constants'

const defaultState = Map({
  currentSong: {}, // 当前音乐信息
  playList: [], // 音乐列表
  currentSongIndex: 0, // 当前音乐索引
  sequence: 0, // 0: 循环 1: 随机 2: 单曲
  lyricList: [],
  currentLyricIndex: 0, // 当前歌词下标
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_CURRENT_SONG:
      return state.set('currentSong', action.currentSong)
    case actionTypes.CHANGE_PLAY_LIST:
      return state.set('playList', action.playList)
    case actionTypes.CHANGE_CURRENT_SONG_INDEX:
      return state.set('currentSongIndex', action.currentSongIndex)
    case actionTypes.CHANGE_SEQUENCE:
      return state.set('sequence', action.sequence)
    case actionTypes.CHANGE_LYRICS:
      return state.set('lyricList', action.lyricList)
    case actionTypes.CHANGE_CURRENT_LYRICS_INDEX:
      return state.set('currentLyricIndex', action.currentLyricIndex)
    default:
      return state
  }
}

export default reducer
