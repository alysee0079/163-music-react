import React, { memo, useEffect } from 'react'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getTopRankListAction } from '../../store/actionCreators'
import ThemeHeaderRcm from '@/components/ThemeHeaderRcm'
import { RankingWrapper } from './style'
import TopRank from '@/components/TopRank'

export default memo(function Ranking() {
  const { upRankList, newRankList, originRankList } = useSelector(
    state => ({
      upRankList: state.getIn(['recommend', 'upRankList']),
      newRankList: state.getIn(['recommend', 'newRankList']),
      originRankList: state.getIn(['recommend', 'originRankList']),
    }),
    shallowEqual
  )

  const dispatch = useDispatch()
  useEffect(() => {
    dispatch(getTopRankListAction(0))
    dispatch(getTopRankListAction(2))
    dispatch(getTopRankListAction(3))
  }, [dispatch])

  return (
    <RankingWrapper>
      <ThemeHeaderRcm title="榜单" />
      <div className="tops">
        <TopRank info={upRankList} />
        <TopRank info={newRankList} />
        <TopRank info={originRankList} />
      </div>
    </RankingWrapper>
  )
})
