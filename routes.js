import Home from './home'
import About from './about'

export default [
  {
    path: '/',
    indexRoute: {
      component: Home
    }
  },
  {
    path: '/about',
    indexRoute: {
      component: About
    }
  }
]
