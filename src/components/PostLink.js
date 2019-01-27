import React from 'react'
import styled from 'styled-components'
import { titleColor } from '../utils/commonStyles'
import { Link } from 'gatsby'

const PostLink = ({ className, slug, title }) => (
  <Link className={className} to={slug}>
    {title}
  </Link>
)

const StyledPostLink = styled(PostLink)`
  background-image: none;
  text-shadow: none;
  color: ${titleColor};
  text-decoration: none;
`

export default StyledPostLink
