import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'

class BlogPostTemplate extends React.Component {
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
    const post = this.props.data.markdownRemark
    const { frontmatter } = post

    return (
      <section className="content">
        <Helmet
          title={frontmatter.title}
          meta={[
            { name: 'description', content: frontmatter.description },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: frontmatter.title },
            { property: 'og:image', content: '' },
            {
              property: 'article:author',
              content: 'https://facebook.com/prayasht'
            },
            {
              property: 'article:published_time'
            },
            { name: 'twitter:description', content: frontmatter.description },
            { name: 'twitter:title', content: frontmatter.title }
          ]}
        />
        <h1>
          {frontmatter.title}
        </h1>
        <div dangerouslySetInnerHTML={{ __html: post.html }} />
      </section>
    )
  }
}

export default BlogPostTemplate

export const pageQuery = graphql`
  query BlogPostBySlug($slug: String!) {
    markdownRemark(fields: { slug: { eq: $slug } }) {
      html
      frontmatter {
        title
        date
        description
      }
    }
  }
`
