module.exports = {
  siteMetadata: {
    title: 'Less Code Is More',
    author: 'Matti Petrelius',
    description:
      'A blog about serverless, functional programming, web development, machine learning and all the fun stuff.',
    siteUrl: 'https://lesscodeismore.dev',
    twitterHandle: 'mattipet',
  },
  plugins: [
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        path: `${__dirname}/src/pages`,
        name: 'pages',
      },
    },
    {
      resolve: `gatsby-transformer-remark`,
      options: {
        plugins: [
          {
            resolve: `gatsby-remark-images`,
            options: {
              maxWidth: 675,
            },
          },
          {
            resolve: `gatsby-remark-responsive-iframe`,
            options: {
              wrapperStyle: `margin-bottom: 1.0725rem`,
            },
          },
          {
            resolve: 'gatsby-remark-embed-gist',
            options: {
              // Optional:

              // the github handler whose gists are to be accessed
              username: 'petmat',

              // a flag indicating whether the github default gist css should be included or not
              // default: true
              includeDefaultCss: true,
            },
          },
          {
            resolve: 'gatsby-remark-custom-social-cards',
            options: {
              title: {
                color: 'white',
              },
              meta: {
                parts: [
                  '- ',
                  { field: 'author' },
                  ' » ',
                  { field: 'date', format: 'mmmm dS' },
                ],
                color: 'white',
              },
              background: '#180531',
            },
          },
          'gatsby-remark-prismjs',
          'gatsby-remark-copy-linked-files',
          'gatsby-remark-smartypants',
        ],
      },
    },
    'gatsby-plugin-styled-components',
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
    {
      resolve: `gatsby-plugin-google-analytics`,
      options: {
        trackingId: `UA-140385122-1`,
      },
    },
    `gatsby-plugin-feed`,
    {
      resolve: `gatsby-plugin-manifest`,
      options: {
        name: `Less Code Is More`,
        short_name: `LCIM`,
        start_url: `/`,
        background_color: `#180531`,
        theme_color: `#FE00FB`,
        display: `minimal-ui`,
        icon: `src/assets/matti-icon.png`,
      },
    },
    `gatsby-plugin-offline`,
    `gatsby-plugin-react-helmet`,
    {
      resolve: 'gatsby-plugin-typography',
      options: {
        pathToConfigModule: 'src/utils/typography',
      },
    },
  ],
}
