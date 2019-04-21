import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './matti-pic.png'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

import { titleColor } from '../utils/commonStyles'
import { GithubLink, TwitterLink } from './SomeLink'

const NameText = styled.span`
  font-family: 'Knewave';
  color: ${titleColor};
`

class Bio extends React.Component {
  render() {
    return (
      <div
        style={{
          display: 'flex',
          marginBottom: rhythm(1),
        }}
      >
        <img
          src={profilePic}
          alt={`Matti Petrelius`}
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
