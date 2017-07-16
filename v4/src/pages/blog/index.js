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
    const blogPosts = this.props.data.allMarkdownRemark.edges.map(
      edge => edge.node
    )

    return (
      <section className="content">
        <Helmet title="effulgence // blog" />

        <header>
          <h2>Blog</h2>
        </header>
        <br />

        {blogPosts.map(post => {
          const { fields, frontmatter } = post

          return (
            <div className="blog-post" key={fields.slug}>
              <Link to={fields.slug}>
                <h2>
                  {frontmatter.title}
                </h2>
                <p>
                  {frontmatter.description}
                </p>
              </Link>
              <p>
                {frontmatter.date}
              </p>
            </div>
          )
        })}
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
