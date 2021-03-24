import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { Slider, message } from 'antd'
import { NavLink } from 'react-router-dom'
import { PlaybarWrapper, Control, PlayInfo, Operator } from './style'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getSongDetailAction, changeSequenceAction, changeCurrentSongAction, changeCurrentLyricIndexAction } from '../store/actionCreators'
import { getSizeImage, formatDate, getPlayUrl } from '@/utils/data-format'

export default memo(function PlayerBar() {
  // props & state
  const [currentTime, setCurrentTime] = useState(0)
  const [progress, setProgress] = useState(0)
  const [isChanging, setIsChanging] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)

  // hooks
  const { currentSong, sequence, playList, lyricList, currentLyricIndex } = useSelector(
    state => ({
      currentSong: state.getIn(['player', 'currentSong']),
      sequence: state.getIn(['player', 'sequence']),
      playList: state.getIn(['player', 'playList']),
      lyricList: state.getIn(['player', 'lyricList']),
      currentLyricIndex: state.getIn(['player', 'currentLyricIndex']),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getSongDetailAction(1824020873))
  }, [dispatch])
  useEffect(() => {
    audioRef.current.src = getPlayUrl(currentSong.id)
    audioRef.current
      .play()
      .then(() => {
        setIsPlaying(true)
      })
      .catch(() => {
        setIsPlaying(false)
      })
  }, [currentSong])
  const audioRef = useRef()

  // handle
  const playMusic = useCallback(() => {
    isPlaying ? audioRef.current.pause() : audioRef.current.play()
    setIsPlaying(!isPlaying)
  }, [isPlaying])
  const timeUpdate = e => {
    if (!isChanging) {
      setCurrentTime(e.target.currentTime * 1000)
      setProgress((currentTime / currentSong.dt) * 100)
    }
    // 获取当前时间对应歌词
    let index = 0 // 歌词下标
    for (; index < lyricList.length; index++) {
      let lyricItem = lyricList[index]
      if (e.target.currentTime * 1000 < lyricItem.time) {
        break
      }
    }
    if (currentLyricIndex !== index - 1) {
      dispatch(changeCurrentLyricIndexAction(index - 1))
      const lyric = lyricList[index - 1]?.content
      lyric &&
        message.open({
          content: lyric,
          duration: 0,
          key: 'lyric',
        })
    }
  }
  const sliderChange = useCallback(
    value => {
      setIsChanging(true)
      setCurrentTime((value / 100) * currentSong.dt)
      setProgress(value)
    },
    [currentSong]
  )
  const sliderAfterChange = useCallback(
    value => {
      const currentTime = ((value / 100) * currentSong.dt) / 1000
      audioRef.current.currentTime = currentTime
      setCurrentTime(currentTime * 1000)
      setIsChanging(false)
      if (!isPlaying) {
        playMusic()
      }
    },
    [currentSong, isPlaying, playMusic]
  )
  const changeSequence = () => {
    let currentSequence = sequence + 1
    if (currentSequence > 2) {
      currentSequence = 0
    }
    dispatch(changeSequenceAction(currentSequence))
  }
  const changeMusic = tag => {
    dispatch(changeCurrentSongAction(tag))
  }
  const handleMusicEnded = () => {
    // 单曲循环
    if (sequence === 2) {
      audioRef.current.currentTime = 0
      audioRef.current.play()
    } else {
      dispatch(changeCurrentSongAction(1))
    }
  }

  return (
    <PlaybarWrapper className="sprite_playbar">
      <div className="content wrap-v2">
        <Control isPlaying={isPlaying}>
          <button className="sprite_playbar btn prev" name="prev" onClick={e => changeMusic(-1)}></button>
          <button className="sprite_playbar btn play" onClick={e => playMusic()}></button>
          <button className="sprite_playbar btn next" name="next" onClick={e => changeMusic(1)}></button>
        </Control>
        <PlayInfo>
          <div className="image">
            <NavLink to="/discover/player">
              <img src={getSizeImage(currentSong.al?.picUrl, 35)} alt="" />
            </NavLink>
          </div>
          <div className="info">
            <div className="song">
              <span className="song-name">{currentSong.name}</span>
              <a className="singer-name">{currentSong.ar?.[0]?.name}</a>
            </div>
            <div className="progress">
              <Slider value={progress} onChange={sliderChange} onAfterChange={sliderAfterChange} />
              <div className="time">
                <span className="now-time">{formatDate(currentTime, 'mm:ss')}</span>
                <span className="divider">/</span>
                <span className="duration">{formatDate(currentSong.dt || 0, 'mm:ss')}</span>
              </div>
            </div>
          </div>
        </PlayInfo>
        <Operator sequence={sequence}>
          <div className="left">
            <button className="sprite_playbar btn favor"></button>
            <button className="sprite_playbar btn share"></button>
          </div>
          <div className="right sprite_playbar">
            <button className="sprite_playbar btn volume"></button>
            <button className="sprite_playbar btn loop" onClick={changeSequence}></button>
            <button className="sprite_playbar btn playlist">{playList.length}</button>
          </div>
        </Operator>
      </div>
      <audio ref={audioRef} onTimeUpdate={e => timeUpdate(e)} onEnded={handleMusicEnded} />
    </PlaybarWrapper>
  )
})
