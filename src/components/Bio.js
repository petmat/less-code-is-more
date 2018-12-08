import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic.png'
import { rhythm } from '../utils/typography'

import { FaTwitter } from 'react-icons/fa'

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(2.5),
        }}
      >
        <img
          src={profilePic}
          alt={`Kyle Mathews`}
          style={{
            marginRight: rhythm(1 / 2),
            marginBottom: 0,
            width: rhythm(2),
            height: rhythm(2),
          }}
        />
        <p>
          Written by <strong>Matti Petrelius</strong> who is a fan of serverless
          and other cool things.{' '}
          <a href="https://twitter.com/mattipet">
            <FaTwitter /> You should follow him on Twitter
          </a>
        </p>
      </div>
    )
  }
}

export default Bio
