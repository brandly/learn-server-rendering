import fetch from 'isomorphic-fetch'

export const REQUEST_HOT_POSTS = 'REQUEST_HOT_POSTS'
export const HOT_POSTS_SUCCESS = 'HOT_POSTS_SUCCESS'
export const HOT_POSTS_ERROR = 'HOT_POSTS_ERROR'
export const SWITCH_SUBREDDIT = 'SWITCH_SUBREDDIT'

function requestHotPosts (subreddit) {
  return {
    subreddit,
    type: REQUEST_HOT_POSTS
  }
}

function hotPostsSuccess (subreddit, posts) {
  return {
    subreddit,
    type: HOT_POSTS_SUCCESS,
    posts: posts,
    receivedAt: Date.now()
  }
}

function hotPostsError (subreddit, error) {
  return {
    subreddit,
    error,
    type: HOT_POSTS_ERROR,
    receivedAt: Date.now()
  }
}

export function switchSubreddit (newSubreddit) {
  return {
    newSubreddit,
    type: SWITCH_SUBREDDIT
  }
}

function simplifyPosts (json) {
  return json.data.children.map(child => child.data)
}

function fetchPosts(subreddit) {
  return dispatch => {
    dispatch(requestHotPosts(subreddit))
    return fetch(`http://www.reddit.com/r/${subreddit}.json`)
      .then(req => {
        if (req.status < 300 && req.ok) {
          return req.json()
        } else {
          throw (req.statusText || 'Problem fetching posts')
        }
      })
      .then(json => dispatch(hotPostsSuccess(subreddit, simplifyPosts(json))))
      .catch(error => dispatch(hotPostsError(subreddit, error.toString())))
  }
}

function shouldFetchPosts (state, subreddit) {
  const posts = state.postsBySubreddit[subreddit]
  if (!posts) {
    return true
  } else if (posts.isFetching) {
    return false
  } else {
    return posts.didInvalidate
  }
}

export function fetchPostsIfNeeded (subreddit) {
  return (dispatch, getState) => {
    if (shouldFetchPosts(getState(), subreddit)) {
      return dispatch(fetchPosts(subreddit))
    }
  }
}
