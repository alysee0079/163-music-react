import { combineReducers } from 'redux-immutable'
import { reducer as recommendReducer } from '../pages/Discover/subpages/Recommend/store/index'
import { reducer as playerReducer } from '../pages/Player/store'

const reducers = combineReducers({
  recommend: recommendReducer, // 推荐
  player: playerReducer, // 音乐
})

export default reducers
