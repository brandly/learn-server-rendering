import React, { Component, PropTypes } from 'react'
import { connect } from 'react-redux'
import { fetchPostsIfNeeded } from '../actions'
import Posts from '../components/posts'

const selectedSubreddit = 'nba'

class Feed extends Component {
  constructor (props) {
    super(props)
  }

  componentDidMount() {
    const { dispatch } = this.props
    dispatch(fetchPostsIfNeeded(selectedSubreddit))
  }

  render () {
    const { posts, isFetching, lastUpdated } = this.props

    return (
      <div className="feed">
        <h1>Feed</h1>
        <p>
          {lastUpdated &&
            <span>
              Last updated at {new Date(lastUpdated).toLocaleTimeString()}
            </span>
          }
        </p>
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

function mapStateToProps (state) {
  const { postsBySubreddit } = state
  const subreddit = postsBySubreddit[selectedSubreddit] || { isFetching: true, posts: [] }

  const { isFetching, posts, lastUpdated } = subreddit

  return {
    isFetching,
    posts,
    lastUpdated
  }
}

export default connect(mapStateToProps)(Feed)
