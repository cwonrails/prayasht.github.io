import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'
import Emblem from '../components/Emblem'

export default class Index extends React.Component {
  render() {
    return <Emblem />
  }
}

// export const pageQuery = graphql`
//   query SiteMetadataLookup($slug: String!) {
//     site {
//       siteMetadata {
//         title
//       }
//     }
//   }
// `
