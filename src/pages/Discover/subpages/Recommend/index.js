import React, { memo } from 'react'
import { RecommendWraper, RecommendLeft, RecommendRight, Content } from './style'
import TopBanner from './components/TopBanner'
import HotRecommend from './components/HotRecommend'
import NewAlbum from './components/NewAlbum'
import Ranking from './components/Ranking'
import HotAnchor from './components/HotAnchor'
import SettleSinger from './components/SettleSinger'
import UserLogin from './components/UserLogin'

function Recommend() {
  return (
    <RecommendWraper>
      <TopBanner />
      <Content className="wrap-v2">
        <RecommendLeft>
          <HotRecommend />
          <NewAlbum />
          <Ranking />
        </RecommendLeft>
        <RecommendRight>
          <UserLogin />
          <SettleSinger />
          <HotAnchor />
        </RecommendRight>
      </Content>
    </RecommendWraper>
  )
}

export default memo(Recommend)

// function Recommend(props) {
//   const { getBanners, topBanners } = props
//   useEffect(() => {
//     getBanners()
//   }, [getBanners])
//   return <div>{topBanners.length}</div>
// }

// const mapStateToProps = state => ({
//   topBanners: state.recommend.topBanners,
// })
// const mapDispatchToProps = dispatch => ({
//   getBanners() {
//     dispatch(getTopBannerAction())
//   },
// })
// export default connect(mapStateToProps, mapDispatchToProps)(memo(Recommend))
