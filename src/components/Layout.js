import React from 'react'
import { Link } from 'gatsby'
import { rhythm, scale } from '../utils/typography'
import { createGlobalStyle } from 'styled-components'
import logoPic from './less-code-is-more.png'

const GlobalStyle = createGlobalStyle`
  body {
    background-color: #180531;
    color: #f0f0f0;
  }
  h1, h2, h3 {
    font-weight: normal;
  }
`

class Layout extends React.Component {
  render() {
    const { location, title, children } = this.props
    const rootPath = `${__PATH_PREFIX__}/`
    let header

    if (location.pathname === rootPath) {
      header = (
        <Link
          style={{
            backgroundImage: 'none',
            textDecoration: 'none',
            color: 'inherit',
            textShadow: 'none',
          }}
          to={'/'}
        >
          <img
            src={logoPic}
            style={{
              marginBottom: rhythm(1.5),
              marginTop: 0,
            }}
          />
        </Link>
      )
    } else {
      header = (
        <h3
          style={{
            fontFamily: 'Montserrat, sans-serif',
            marginTop: 0,
            marginBottom: rhythm(-1),
          }}
        >
          <Link
            style={{
              backgroundImage: 'none',
              textDecoration: 'none',
              color: 'inherit',
            }}
            to={'/'}
          >
            {title}
          </Link>
        </h3>
      )
    }
    return (
      <div
        style={{
          marginLeft: 'auto',
          marginRight: 'auto',
          maxWidth: rhythm(24),
          padding: `${rhythm(1.5)} ${rhythm(3 / 4)}`,
        }}
      >
        <GlobalStyle />
        {header}
        {children}
      </div>
    )
  }
}

export default Layout
