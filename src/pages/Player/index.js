import React, { memo } from 'react'
import { PlayerWrapper, PlayerLeft, PlayerRight } from './style'

export default memo(function Player() {
  return (
    <PlayerWrapper>
      <div className="content wrap-v2">
        <PlayerLeft>
          <h2>info</h2>
          <h2>content</h2>
        </PlayerLeft>
        <PlayerRight>
          <h2>歌单</h2>
          <h2>歌单</h2>
        </PlayerRight>
      </div>
    </PlayerWrapper>
  )
})
