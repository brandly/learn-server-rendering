import React from 'react'
import { Link } from 'react-router'

const Home = React.createClass({
  getInitialState () {
    return {
      count: 0
    }
  },

  more () {
    this.setState({ count: this.state.count + 1})
  },

  less () {
    this.setState({ count: this.state.count - 1})
  },

  render () {
    const { count } = this.state
    return (
      <div>
        <h1>counter</h1>
        <p>{count}</p>
        <button onClick={this.more}>more</button>
        <button onClick={this.less}>less</button>

        <div>
          <Link to="/about">about</Link>
        </div>
      </div>
    )
  }
})

export default Home
