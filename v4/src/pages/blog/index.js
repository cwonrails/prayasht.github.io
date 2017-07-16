import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import Link from 'gatsby-link'
import '../../css/blog.scss'

export default class BlogPostsIndex extends React.Component {
  componentDidMount() {
    this.fadeIn()
  }

  fadeIn() {
    let elem = ReactDOM.findDOMNode(this)

    elem.style.opacity = 0
    window.requestAnimationFrame(() => {
      elem.style.transition = 'opacity 1000ms ease-out'
      elem.style.opacity = 1
    })
  }

  render() {
    const blogPosts = this.props.data.allMarkdownRemark.edges
      .map(edge => edge.node)
      .reverse()

    return (
      <section className="content">
        <Helmet title="effulgence // blog" />

        <div id="blog" className="fade">
          {blogPosts.map((post, index) => {
            const { fields, frontmatter } = post

            return (
              <div
                className={'blog-post ' + (index === 0 ? 'first' : '')}
                key={fields.slug}
              >
                <time dateTime={frontmatter.date}>
                  {frontmatter.date}
                </time>
                <h2>
                  <Link to={fields.slug}>
                    {frontmatter.title}
                  </Link>
                </h2>

                <p>
                  {frontmatter.description}
                </p>
              </div>
            )
          })}
        </div>
      </section>
    )
  }
}

export const pageQuery = graphql`
  query BlogPostsIndexQuery {
    allMarkdownRemark(
      sort: { order: DESC, fields: [frontmatter___date] }
      filter: {
        frontmatter: { draft: { ne: true } }
        fileAbsolutePath: { regex: "/blog/" }
      }
    ) {
      edges {
        node {
          excerpt
          fields {
            slug
          }
          frontmatter {
            title
            date
            description
          }
        }
      }
    }
  }
`
