import React from 'react'
import ReactDOM from 'react-dom'
import Link from 'gatsby-link'
import '../../css/blog.scss'

export default class BlogPostsIndex extends React.Component {
  componentDidMount() {
    this.fadeIn()
  }

  fadeIn() {
    var elem = ReactDOM.findDOMNode(this)
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
        <h1>Blog</h1>
        {blogPosts.map(post => {
          const { fields, frontmatter } = post

          return (
            <div key={fields.slug}>
              <Link to={fields.slug}>
                <h2>
                  {frontmatter.title}
                </h2>
                <p>
                  {frontmatter.excerpt ? frontmatter.excerpt : post.excerpt}
                </p>
              </Link>
              <div>
                <small>
                  <em>
                    {frontmatter.date}
                  </em>
                </small>
              </div>
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
