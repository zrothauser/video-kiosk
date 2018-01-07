// Dependencies
import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'

// Reducers
import appData from './appData'
import categories from './categories'
import videos from './videos'

export default combineReducers({
  routing: routerReducer,
  appData,
  categories,
  videos
})
