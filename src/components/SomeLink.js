import React from 'react'
import styled from 'styled-components'
import { FaGithub, FaTwitter } from 'react-icons/fa'

const SomeLink = props => (
  <a className={props.className} href={props.href} target="_blank">
    {props.children}
  </a>
)

const StyledSomeLink = styled(SomeLink)`
  background-image: none;
`

const BaseTwitterLink = props => (
  <StyledSomeLink className={props.className} {...props}>
    <FaTwitter />
  </StyledSomeLink>
)

const BaseGithubLink = props => (
  <StyledSomeLink className={props.className} {...props}>
    <FaGithub />
  </StyledSomeLink>
)

export const TwitterLink = styled(BaseTwitterLink)`
  color: #1da1f2;
`

export const GithubLink = styled(BaseGithubLink)`
  color: #ccc;
`

export default StyledSomeLink
