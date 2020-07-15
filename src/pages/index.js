import React from 'react'
import { graphql } from 'gatsby'
import Helmet from 'react-helmet'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import { rhythm } from '../utils/typography'
import PostLink from '../components/PostLink'
import VisitCounter from '../components/VisitCounter'

class BlogIndex extends React.Component {
  render() {
    const { data } = this.props
    const {
      site: { siteMetadata },
    } = data
    console.log('SITE METADTAA', siteMetadata)
    const { description, siteUrl, visitCount, title: siteTitle } = siteMetadata
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
          const title = node.frontmatter.title || node.fields.slug
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
        <VisitCounter visitCount={visitCount} />
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
        visitCount
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
