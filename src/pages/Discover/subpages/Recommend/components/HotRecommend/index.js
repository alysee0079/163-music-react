import React, { memo, useEffect } from 'react'
import { RecommendWrapper } from './style'
import ThemeHeaderRcm from '@/components/ThemeHeaderRcm'
import { shallowEqual, useDispatch, useSelector } from 'react-redux'
import { getHotRecommendAction } from '../../store/actionCreators'
import SongsCover from '@/components/SongsCover'

export default memo(function HotRecommend() {
  const { hotRecommends } = useSelector(
    state => ({
      hotRecommends: state.getIn(['recommend', 'hotRecommends']),
    }),
    shallowEqual
  )
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getHotRecommendAction())
  }, [dispatch])

  return (
    <RecommendWrapper>
      <ThemeHeaderRcm title="热门推荐" keywords={['华语', '流行', '民谣', '摇滚', '电子']} />
      <div className="recommend-list">
        {hotRecommends.map(item => {
          return (
            <SongsCover info={item} key={item.id}>
              {item.name}
            </SongsCover>
          )
        })}
      </div>
    </RecommendWrapper>
  )
})
