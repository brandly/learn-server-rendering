import React, { PropTypes, Component } from 'react'

export default class Posts extends Component {
  render() {
    const { posts } = this.props

    return (
      <ul className="posts-list">
        {posts.map((post, i) =>
          <li key={i} className="posts-list-item">
            <h3 className="title"><a href={post.url}>{post.title}</a></h3>
            <p className="meta">
              <span className="ups">{post.ups}</span>
              <span className="submitted">
                {post.create} by {post.author} to /r/{post.subreddit} from {post.domain}
              </span>
            </p>
          </li>
        )}
      </ul>
    )
  }
}

Posts.propTypes = {
  posts: PropTypes.array.isRequired
}
