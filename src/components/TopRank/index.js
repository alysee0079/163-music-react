import React, { memo } from 'react'
import { TopRankingWrapper } from './style'
import { getSizeImage } from '@/utils/data-format'
import { getSongDetailAction } from '@/pages/Player/store'
import { useDispatch } from 'react-redux'

export default memo(function TopRank(props) {
  // props && state
  const { info } = props
  const { tracks = [] } = info

  // hooks
  const dispatch = useDispatch()

  // handle
  const playMusic = item => {
    dispatch(getSongDetailAction(item.id))
  }

  return (
    <TopRankingWrapper>
      <div className="header">
        <div className="image">
          <img src={getSizeImage(info.coverImgUrl, 80)} alt="" />
          <a className="image_cover">rank</a>
        </div>
        <div className="info">
          <a>{info.name}</a>
          <div>
            <button className="btn play sprite_02"></button>
            <button className="btn favor sprite_02"></button>
          </div>
        </div>
      </div>
      <div className="list">
        {tracks.splice(0, 10).map((item, index) => {
          return (
            <div key={item.id} className="list-item">
              <div className="rank">{index + 1}</div>
              <div className="info">
                <span className="name text-nowrap">{item.name}</span>
                <div className="operate">
                  <button className="btn play sprite_02" onClick={() => playMusic(item)}></button>
                  <button className="btn addto sprite_icon2"></button>
                  <button className="btn favor sprite_02"></button>
                </div>
              </div>
            </div>
          )
        })}
      </div>
      <div className="footer">
        <a>查看全部&gt;</a>
      </div>
    </TopRankingWrapper>
  )
})
