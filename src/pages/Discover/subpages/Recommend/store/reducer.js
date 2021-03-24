import * as actionTypes from './constants'
import { Map } from 'immutable'

const defaultState = Map({
  topBanners: [],
  hotRecommends: [],
  newAlbums: [],
  upRankList: [],
  newRankList: [],
  originRankList: [],
})

function reducer(state = defaultState, action) {
  switch (action.type) {
    case actionTypes.CHANGE_TOP_BANNERS:
      return state.set('topBanners', action.topBanners)
    case actionTypes.CHANGE_HOT_RECOMMENDS:
      return state.set('hotRecommends', action.hotRecommends)
    case actionTypes.CHANGE_NEWALBUM:
      return state.set('newAlbums', action.newAlbums)
    case actionTypes.CHANGE_UP_RANK:
      return state.set('upRankList', action.topRankList)
    case actionTypes.CHANGE_NEW_RANK:
      return state.set('newRankList', action.topRankList)
    case actionTypes.CHANGE_ORIGIN_RANK:
      return state.set('originRankList', action.topRankList)
    default:
      return state
  }
}

export default reducer
