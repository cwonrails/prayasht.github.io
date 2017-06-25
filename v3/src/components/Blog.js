import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import moment from 'moment'
import { getBlogPosts } from '../utils/blog-helpers'

import '../css/blog.scss'

const generatePostsTable = ({ route }) => {
  const posts = []
  getBlogPosts(route).forEach(({ data, path }) => {
    if (!data.draft) {
      const { title, date, description } = data
      posts.push(
        <div className="blog-post" key={path}>
          <time dateTime={moment(data).format('MMMM YYYY')}>
            {moment(date).format('MMMM YYYY')}
          </time>
          <span style={{ padding: '5px' }} />
          {/* <span className='blog-category'>{ category }</span> */}
          <h2>
            <Link style={{ borderBottom: 'none' }} to={prefixLink(path)}>
              {title}
            </Link>
          </h2>
          <p dangerouslySetInnerHTML={{ __html: description }} />
          {/* <Link className='readmore' to={prefixLink(path)}>Read</Link> */}
        </div>
      )
    }
  })

  return posts
}

class Blog extends Component {
  render() {
    const posts = generatePostsTable(this.props)
    // return <table className='post-list'><tbody>{posts}</tbody></table>;
    return (
      <div id="blog" className="fade">
        <header><h2>/* Blog */</h2></header>
        <br />
        {posts}
      </div>
    )
  }
}

Blog.propTypes = {
  posts: PropTypes.object
}

export default Blog
