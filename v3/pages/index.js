import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import moment from 'moment'
import Helmet from 'react-helmet'
import { config } from 'config' // eslint-disable-line

import '../src/css/index.scss'
import Emblem from '../src/components/Emblem'
import { getBlogPosts } from '../src/utils/blog-helpers'

export default function BlogIndex(props) {
  const latestBlogPost = getBlogPosts(props.route).shift()
  const { data: { title, date }, path } = latestBlogPost
  const fromNow = moment(date, 'MM/DD/YYYY').fromNow()
  // const docTitle = `${config.blogTitle} by ${config.authorName}`;
  const docTitle = `${config.blogTitle}`

  return (
    <section className={props.route.page.path === '/' ? '' : 'content'}>
      <Helmet
        title={docTitle}
        meta={[
          { name: 'description', content: config.description },
          { property: 'og:type', content: 'website' },
          { property: 'og:title', content: docTitle },
          { property: 'og:description', content: config.description },
          { name: 'twitter:description', content: config.description },
          { name: 'twitter:title', content: docTitle }
        ]}
      />
      <div id="home">
        <Emblem />
      </div>
    </section>
  )
}

BlogIndex.propTypes = {
  route: PropTypes.object
}
