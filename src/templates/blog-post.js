import React from 'react'
import Helmet from 'react-helmet'
import { Link, graphql } from 'gatsby'

import Bio from '../components/Bio'
import Layout from '../components/Layout'
import TweetButton from '../components/TweetButton'
import { rhythm, scale } from '../utils/typography'
import styled from 'styled-components'

const ShareButtonContainer = styled.div`
  margin-bottom: ${rhythm(1.5)};
`

class BlogPostTemplate extends React.Component {
  render() {
    const {
      fields,
      excerpt,
      frontmatter: { title, date, hashtags },
      html,
    } = this.props.data.markdownRemark
    const {
      title: siteTitle,
      siteUrl,
      twitterHandle,
    } = this.props.data.site.siteMetadata
    const { previous, next } = this.props.pageContext
    const { slug } = fields
    const url = `${siteUrl}${slug}`

    return (
      <Layout
        location={this.props.location}
        title={siteTitle}
        slug={slug}
        excerpt={excerpt}
      >
        <Helmet
          htmlAttributes={{ lang: 'en' }}
          meta={[{ name: 'description', content: excerpt }]}
          title={`${title} | ${siteTitle}`}
        >
          <link rel="canonical" href={url} />
        </Helmet>
        <h1>{title}</h1>
        <p
          style={{
            ...scale(-1 / 3),
            display: 'block',
            marginBottom: rhythm(1),
            marginTop: rhythm(-0.5),
            opacity: 0.6,
          }}
        >
          {date}
        </p>
        <div dangerouslySetInnerHTML={{ __html: html }} />

        <ShareButtonContainer>
          <TweetButton
            url={url}
            text={title}
            via={twitterHandle}
            hashtags={hashtags}
          />
        </ShareButtonContainer>

        <Bio />

        <ul
          style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'space-between',
            listStyle: 'none',
            padding: 0,
          }}
        >
          <li>
            {previous && (
              <Link to={previous.fields.slug} rel="prev">
                ← {previous.frontmatter.title}
              </Link>
            )}
          </li>
          <li>
            {next && (
              <Link to={next.fields.slug} rel="next">
                {next.frontmatter.title} →
              </Link>
            )}
          </li>
        </ul>
      </Layout>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    site {
      siteMetadata {
        title
        siteUrl
        twitterHandle
      }
    }
    markdownRemark(fields: { slug: { eq: $slug } }) {
      id
      fields {
        slug
      }
      excerpt
      html
      frontmatter {
        title
        date(formatString: "MMMM DD, YYYY")
        hashtags
      }
    }
  }
`
