import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './profile-pic2.png'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

import { titleColor } from '../utils/commonStyles'
import { GithubLink, TwitterLink } from './SomeLink'

const NameText = styled.strong`
  font-family: 'Knewave';
  color: ${titleColor};
`

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
          Written by <NameText>Matti Petrelius</NameText> who is a fan of
          serverless and other cool things.
          <TwitterLink href="https://twitter.com/mattipet" />{' '}
          <GithubLink href="https://github.com/petmat" />
        </p>
      </div>
    )
  }
}

export default Bio
