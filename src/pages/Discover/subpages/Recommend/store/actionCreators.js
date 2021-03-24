import * as actionTypes from './constants'
import { getTopBanners, getHotRecommends, getNewAlbums, getTopRankList } from '@/services/recommend'

// 更新轮播图 action
const changeTopBannerAction = res => ({
  type: actionTypes.CHANGE_TOP_BANNERS,
  topBanners: res.banners,
})
// 获取轮播图数据
export const getTopBannerAction = () => {
  return dispatch => {
    getTopBanners().then(res => {
      dispatch(changeTopBannerAction(res))
    })
  }
}

// 获取热门推荐数据
export const getHotRecommendAction = limit => {
  return dispatch => {
    getHotRecommends(limit).then(res => {
      dispatch({
        type: actionTypes.CHANGE_HOT_RECOMMENDS,
        hotRecommends: res.result,
      })
    })
  }
}

// 获取新碟上架数据
export const getNewAlbumAction = limit => {
  return dispatch => {
    getNewAlbums(limit).then(res => {
      dispatch({ type: actionTypes.CHANGE_NEWALBUM, newAlbums: res.albums })
    })
  }
}

// 榜单数据
export const getTopRankListAction = idx => {
  const action = idx === 0 ? actionTypes.CHANGE_UP_RANK : idx === 2 ? actionTypes.CHANGE_NEW_RANK : actionTypes.CHANGE_ORIGIN_RANK
  return dispatch => {
    getTopRankList(idx).then(res => {
      dispatch({ type: action, topRankList: res.playlist })
    })
  }
}
