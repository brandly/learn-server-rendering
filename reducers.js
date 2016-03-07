import { combineReducers } from 'redux'
import { routerReducer } from 'react-router-redux'
import {
  REQUEST_HOT_POSTS,
  HOT_POSTS_SUCCESS,
  HOT_POSTS_ERROR
} from './actions'

function posts (state = {
  isFetching: false,
  didInvalidate: false,
  posts: []
}, action) {
  switch (action.type) {
    case REQUEST_HOT_POSTS:
      return Object.assign({}, state, {
        isFetching: true,
        didInvalidate: false
      })
    case HOT_POSTS_SUCCESS:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        posts: action.posts,
        error: null,
        lastUpdated: action.receivedAt
      })
    case HOT_POSTS_ERROR:
      return Object.assign({}, state, {
        isFetching: false,
        didInvalidate: false,
        posts: [],
        error: action.error,
        lastUpdated: action.receivedAt
      })
    default:
      return state
  }
}

function postsBySubreddit(state = { }, action) {
  switch (action.type) {
    case REQUEST_HOT_POSTS:
    case HOT_POSTS_SUCCESS:
    case HOT_POSTS_ERROR:
      return Object.assign({}, state, {
        [action.subreddit]: posts(state[action.subreddit], action)
      })
    default:
      return state
  }
}

const rootReducer = combineReducers({
  postsBySubreddit,
  routing: routerReducer
})

export default rootReducer
