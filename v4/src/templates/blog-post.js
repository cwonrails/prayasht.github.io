import React from 'react'
import ReactDOM from 'react-dom'
import Helmet from 'react-helmet'
import { TweetThis, FacebookShare } from '../components/Social'
// import ReadNext from '../components/ReadNext'

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
        <article id="blog-body" className="fade">
          <header className="blog-header">
            <h2>
              {frontmatter.title}
            </h2>
          </header>
          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.html }}
          />
        </article>
        <br />
        <aside className="post-footer">
          <ul>
            <li>
              <TweetThis {...frontmatter} />
            </li>
            <li>
              <FacebookShare
                {...frontmatter}
                path={this.props.location.pathnam}
              />
            </li>
          </ul>
          {/* <ReadNext posts={nextPosts} /> */}
          {/* <hr /> */}
          {/* <About /> */}
        </aside>
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
