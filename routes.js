import Feed from './containers/feed'
import About from './containers/about'

export default [
  {
    path: '/',
    indexRoute: {
      component: About
    }
  },
  {
    path: '/r/:subreddit',
    indexRoute: {
      component: Feed
    }
  }
]
