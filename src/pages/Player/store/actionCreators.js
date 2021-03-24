import * as actionTypes from '../store/constants'
import { getSongDetail, getLyric } from '@/services/player'
import { getRandom } from '@/utils/math-utils'
import { parselyric } from '@/utils/parse-lyric'

// 获取当前音乐并储存数据
export const getSongDetailAction = ids => {
  return async (dispatch, getState) => {
    // 根据 id 查找 playlist 中是否有该歌曲
    const playList = getState().getIn(['player', 'playList'])
    const songIndex = playList.findIndex(item => item.id === ids)
    let currentSong = ''
    // 找到歌曲
    if (songIndex !== -1) {
      dispatch(changeCurrentSongIndexAction(songIndex)) // 更新当前歌曲索引
      dispatch({ type: actionTypes.CHANGE_CURRENT_SONG, currentSong: playList[songIndex] }) // 更新当前歌曲信息
    } else {
      // 未找到
      const res = await getSongDetail(ids)
      currentSong = res?.songs?.[0]
      if (!currentSong) return // 没有数据直接不做处理
      const newPlayList = [...playList, currentSong]
      dispatch(changePlayListAction(newPlayList)) // 添加歌曲到 playlist 中
      dispatch(changeCurrentSongIndexAction(newPlayList.length - 1)) // 更新当前歌曲索引
      dispatch({ type: actionTypes.CHANGE_CURRENT_SONG, currentSong }) // 更新当前歌曲信息
    }
    // 请求歌曲的歌词
    dispatch(getLyricAction(ids))
  }
}

// 更新音乐列表
export const changePlayListAction = playList => ({
  type: actionTypes.CHANGE_PLAY_LIST,
  playList,
})

// 更新当前音乐索引
export const changeCurrentSongIndexAction = currentSongIndex => ({
  type: actionTypes.CHANGE_CURRENT_SONG_INDEX,
  currentSongIndex,
})

// 更新播放方式
export const changeSequenceAction = sequence => ({
  type: actionTypes.CHANGE_SEQUENCE,
  sequence,
})

// 切换音乐
export const changeCurrentSongAction = tag => {
  return (dispatch, getState) => {
    const playList = getState().getIn(['player', 'playList'])
    const sequence = getState().getIn(['player', 'sequence'])
    let currentSongIndex = getState().getIn(['player', 'currentSongIndex'])
    switch (sequence) {
      case 1: // 随机播放
        let randomIndex = getRandom(playList.length)
        if (playList.length > 1) {
          while (randomIndex === currentSongIndex) {
            randomIndex = getRandom(playList.length)
          }
        }
        currentSongIndex = randomIndex
        break
      default:
        // 顺序播放
        currentSongIndex += tag
        if (currentSongIndex >= playList.length) {
          currentSongIndex = 0
        } else if (currentSongIndex < 0) {
          currentSongIndex = playList.length - 1
        }
    }
    const currentSong = playList[currentSongIndex]
    dispatch(changeCurrentSongIndexAction(currentSongIndex)) // 更新当前歌曲索引
    dispatch({ type: actionTypes.CHANGE_CURRENT_SONG, currentSong }) // 更新当前歌曲信息
  }
}

// 获取歌词
export const getLyricAction = id => {
  return dispatch => {
    getLyric(id).then(res => {
      const lyricList = parselyric(res.lrc.lyric)
      dispatch({ type: actionTypes.CHANGE_LYRICS, lyricList })
    })
  }
}

// 更新当前歌词下标
export const changeCurrentLyricIndexAction = currentLyricIndex => ({ type: actionTypes.CHANGE_CURRENT_LYRICS_INDEX, currentLyricIndex })
