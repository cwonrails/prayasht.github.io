import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import moment from 'moment'
import Helmet from 'react-helmet'
import { config } from 'config' // eslint-disable-line

import { TweetThis, FacebookShare } from '../components/Social'
import ReadNext from '../components/ReadNext'
import About from '../components/About'
import {
  isBlogPost,
  getBlogPosts,
  getNextPosts,
  getPostsFromPaths
} from '../utils/blog-helpers'
import avatar from '../../static/img/avatar.jpg'

export default class MarkdownWrapper extends Component {
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
    const { route } = this.props
    const { page: { data: post } } = route
    const path = (post.path = route.path)
    const thumbnail = post.thumbnail
      ? `http://effulgence.io/${path}${post.thumbnail}`
      : `http://effulgence.io/${avatar}`
    const posts = getBlogPosts(route)

    if (isBlogPost(post)) {
      const docTitle = `${post.title} - ${config.blogTitle}`
      const nextPosts = post.readNext
        ? getPostsFromPaths(post.readNext, posts)
        : getNextPosts(path, posts)
      return (
        <section className="content">
          <Helmet
            title={docTitle}
            meta={[
              { name: 'description', content: post.description },
              { property: 'og:type', content: 'article' },
              { property: 'og:title', content: docTitle },
              { property: 'og:image', content: thumbnail },
              {
                property: 'article:author',
                content: 'https://facebook.com/prayasht'
              },
              {
                property: 'article:published_time',
                content: `${moment(post.date, 'MM/DD/YYYY').format()}`
              },
              { name: 'twitter:description', content: post.description },
              { name: 'twitter:title', content: docTitle }
            ]}
          />
          <article id="blog-body" className="fade">
            <header className="blog-header">
              <h2>{post.title}</h2>
              <div>
                <time>
                  {moment(post.date, 'MM/DD/YYYY').format('MMMM D, YYYY')}
                </time>{' '}
                &middot; {post.words} words &middot; {post.readTime}
              </div>
            </header>
            <div
              className="post-content"
              dangerouslySetInnerHTML={{ __html: post.body }}
            />
          </article>
          <br />
          <aside className="post-footer">
            <ul>
              <li><TweetThis {...post} /></li>
              <li><FacebookShare {...post} /></li>
            </ul>
            {/* <ReadNext posts={nextPosts} /> */}
            <hr />
            {/* <About /> */}
          </aside>
        </section>
      )
    }

    return (
      <section className="content">
        <Helmet
          title={post.title}
          meta={[
            { name: 'description', content: config.description },
            { property: 'og:type', content: 'article' },
            { property: 'og:title', content: post.title },
            {
              property: 'article:author',
              content: 'https://facebook.com/prayasht'
            },
            {
              property: 'article:published_time',
              content: `${moment(post.date, 'MM/DD/YYYY').format()}`
            },
            { name: 'twitter:description', content: config.description },
            { name: 'twitter:title', content: post.title }
          ]}
        />
        {post.title
          ? <header>
              <h2>{post.title}</h2>
            </header>
          : null}
        <div
          className="post-content"
          dangerouslySetInnerHTML={{ __html: post.body }}
        />
      </section>
    )
  }
}

MarkdownWrapper.propTypes = {
  route: PropTypes.object
}
