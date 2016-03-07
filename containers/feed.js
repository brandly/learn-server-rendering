import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { push } from 'react-router-redux'
import { fetchPostsIfNeeded, switchSubreddit } from '../actions'
import Posts from '../components/posts'

class Feed extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount () {
    const { dispatch, subredditName } = this.props
    dispatch(fetchPostsIfNeeded(subredditName))
  }

  componentWillReceiveProps (nextProps) {
    const { subredditName, dispatch } = this.props
    if (nextProps.subredditName !== subredditName) {
      dispatch(fetchPostsIfNeeded(nextProps.subredditName))
    }
  }

  handleSubredditForm (e) {
    e.preventDefault()
    this.props.dispatch(push('/r/' + this.newSubredditInput.value))
    this.newSubredditInput.value = ''
  }

  render () {
    const { subredditName, posts, isFetching, lastUpdated, error } = this.props

    return (
      <div className="container">
        <header className="header clearfix">
          <div className="header-left">
            <h1>r/{subredditName}</h1>
            {lastUpdated &&
              <p className="feed-updated-at">updated at {new Date(lastUpdated).toLocaleTimeString()}</p>
            }
            {error &&
              <p>{error}</p>
            }
          </div>
          <form onSubmit={(e) => this.handleSubredditForm(e)} className="switch-subreddit-form">
            <input type="text" ref={input => this.newSubredditInput = input} placeholder="switch subreddit" />
          </form>
        </header>
        {isFetching && posts.length === 0 &&
          <h2>Loading...</h2>
        }
        {!isFetching && posts.length === 0 &&
          <h2>Empty.</h2>
        }
        {posts.length > 0 &&
          <Posts posts={posts} />
        }
      </div>
    )
  }
}

Feed.propTypes = {
  posts: PropTypes.array.isRequired,
  isFetching: PropTypes.bool.isRequired,
  lastUpdated: PropTypes.number,
  dispatch: PropTypes.func.isRequired
}

function mapStateToProps (state, routing) {
  const { postsBySubreddit } = state
  const subredditName = routing.params.subreddit
  const subreddit = postsBySubreddit[subredditName] || { isFetching: true, posts: [] }
  const { isFetching, posts, lastUpdated, error } = subreddit

  return {
    subredditName,
    posts,
    isFetching,
    lastUpdated,
    error
  }
}

export default connect(mapStateToProps)(Feed)
