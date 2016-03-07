import React from 'react'
import { Link } from 'react-router'

const About = ({ children }) => (
  <div>
    <h1>it's reddit</h1>
    <Link to="/r/nba">r/nba</Link>
    <p>p cool huh</p>
    {children}
  </div>
)

export default About
