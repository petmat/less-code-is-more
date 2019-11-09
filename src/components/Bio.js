import React from 'react'

// Import typefaces
import 'typeface-montserrat'
import 'typeface-merriweather'

import profilePic from './matti-pic.png'
import { rhythm } from '../utils/typography'
import styled from 'styled-components'

import { titleColor } from '../utils/commonStyles'
import { GithubLink, TwitterLink, RssLink } from './SomeLink'

const BioContainer = styled.div`
  display: flex;
  margin-bottom: ${rhythm(2)};

  @media (max-width: 600px) {
    margin-bottom: ${rhythm(1.5)};
  }
`

const NameText = styled.span`
  font-family: 'Kaushan Script';
  color: ${titleColor};
`

class Bio extends React.Component {
  render() {
    return (
      <BioContainer>
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
        <p
          style={{
            margin: 0,
          }}
        >
          <span style={{ marginRight: rhythm(0.25) }}>
            Written by <NameText>Matti Petrelius</NameText> who is a fan of
            serverless and other cool things.
          </span>
          <span style={{ whiteSpace: 'nowrap' }}>
            <TwitterLink href="https://twitter.com/mattipet" />{' '}
            <GithubLink href="https://github.com/petmat" />{' '}
            <RssLink href="https://lesscodeismore.dev/rss.xml" />
          </span>
        </p>
      </BioContainer>
    )
  }
}

export default Bio
