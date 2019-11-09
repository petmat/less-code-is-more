import React from 'react'
import styled from 'styled-components'
import { FaTwitter } from 'react-icons/fa'

const TweetButtonLink = styled.a`
  background-color: #1da1f2;
  border-radius: 3px;
  padding: 1px 8px 1px 6px;
  height: 22px;
  font-weight: 500;
  cursor: pointer;
  color: #fff;
  font-size: 13px;
  vertical-align: middle;
  text-decoration: none;
`

const TwitterIcon = styled(FaTwitter)`
  vertical-align: middle;
  height: 20px;
`

const objToQueryString = obj =>
  `${Object.values(obj).some(v => v) ? '?' : ''}${Object.entries(obj)
    .filter(([_, value]) => value)
    .map(([key, value]) => `${key}=${value}`)
    .join('&')}`

const TweetButton = ({ url, text, via, hashtags }) => (
  <TweetButtonLink
    href={`https://twitter.com/intent/tweet${objToQueryString({
      url,
      text,
      via,
      hashtags,
    })}`}
  >
    <TwitterIcon /> <span>Tweet</span>
  </TweetButtonLink>
)

export default TweetButton
