import request from './request'

export const getTopBanners = () => {
  return request({ url: '/banner' })
}

export const getHotRecommends = () => {
  return request({ url: '/personalized', params: { limit: 8 } })
}

export const getNewAlbums = limit => {
  return request({ url: '/top/album', params: { limit: 10 } })
}

export const getTopRankList = idx => {
  return request({ url: '/top/list', params: { idx } })
}
