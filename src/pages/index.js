import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'
import PostLink from '../components/PostLink'
import VisitCounter from '../components/VisitCounter'

class BlogIndex extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      visitCount: 0,
    }
  }

  componentDidMount() {
    const getAndUpdateVisits = async () => {
      const response = await fetch('/.netlify/functions/visits-get', {
        method: 'POST',
      })
      const { data } = await response.json()
      this.setState({ visitCount: data.length + 1 })
      await fetch('/.netlify/functions/visits-create', {
        method: 'POST',
      })
    }

    getAndUpdateVisits()
  }

  render() {
    const { data } = this.props
    const {
      site: { siteMetadata },
    } = data
    const { description, siteUrl, title: siteTitle } = siteMetadata
    const posts = data.allMarkdownRemark.edges

    return (
      <Layout location={this.props.location} title={siteTitle}>
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: description }]}
          title={siteTitle}
        >
          <link rel="canonical" href={siteUrl} />
        </Helmet>
        <Bio />
        {posts.map(({ node }) => {
          const title = (node.frontmatter.title || node.fields.slug).replace(
            '{visitCount}',
            this.state.visitCount
          )

          return (
            <div key={node.fields.slug}>
              <h3
                style={{
                  marginBottom: rhythm(1 / 4),
                }}
              >
                <PostLink slug={node.fields.slug} title={title} />
              </h3>
              <small
                style={{
                  display: 'block',
                  opacity: 0.6,
                  marginBottom: rhythm(1 / 4),
                }}
              >
                {node.frontmatter.date}
              </small>
              <p
                style={{ marginBottom: rhythm(1.5) }}
                dangerouslySetInnerHTML={{ __html: node.excerpt }}
              />
            </div>
          )
        })}
        <VisitCounter visitCount={this.state.visitCount} />
      </Layout>
    )
  }
}

export default BlogIndex

export const pageQuery = graphql`
  query {
    site {
      siteMetadata {
        title
        description
        siteUrl
      }
    }
    allMarkdownRemark(sort: { fields: [frontmatter___date], order: DESC }) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            date(formatString: "MMMM DD, YYYY")
            title
          }
        }
      }
    }
  }
`
