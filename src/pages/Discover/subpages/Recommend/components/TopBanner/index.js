import React, { memo, useCallback, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector, shallowEqual } from 'react-redux'
import { Carousel } from 'antd'
import { getTopBannerAction } from '../../store/actionCreators'
import { BannerControl, BannerLeft, BannerRight, BannerWrapper } from './style'

export default memo(function TopBanner() {
  // const recommend = useSelector(state => ({ topBanners: state.get('recommend').get('topBanners') }), shallowEqual)
  const { topBanners } = useSelector(state => ({ topBanners: state.getIn(['recommend', 'topBanners']) }), shallowEqual)
  const [currentIndex, setCurrentIndex] = useState() // 当前图片
  const bannerRef = useRef() // 轮播图组件

  const dispatch = useDispatch()
  useEffect(() => {
    // 初始化轮播数据
    dispatch(getTopBannerAction())
  }, [dispatch])

  // 监听轮播图改变更新图片
  const bannerChange = useCallback((from, to) => {
    setCurrentIndex(to)
  }, [])

  const bgImage = topBanners[currentIndex] && topBanners[currentIndex].imageUrl + '?imageView&blur=40x20'

  return (
    <BannerWrapper bgImage={bgImage}>
      <div className="banner wrap-v2">
        <BannerLeft>
          <Carousel effect="fade" autoplay={true} ref={bannerRef} beforeChange={bannerChange}>
            {topBanners.map(item => {
              return (
                <div className="banner-item" key={item.imageUrl}>
                  <img className="image" src={item.imageUrl} alt={item.typeTitle} />
                </div>
              )
            })}
          </Carousel>
        </BannerLeft>
        <BannerRight></BannerRight>
        <BannerControl>
          <button className="btn left" onClick={e => bannerRef.current.prev()}></button>
          <button className="btn right" onClick={e => bannerRef.current.next()}></button>
        </BannerControl>
      </div>
    </BannerWrapper>
  )
})
