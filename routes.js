import Feed from './containers/feed'
import About from './about'

export default [
  {
    path: '/',
    indexRoute: {
      component: Feed
    }
  },
  {
    path: '/about',
    indexRoute: {
      component: About
    }
  }
]
