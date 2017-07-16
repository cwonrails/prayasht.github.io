import React from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Header from '../components/Header'
import '../css/typography.css'
import '../css/index.scss'

export default class Template extends React.Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    const route = this.props.location.pathname

    return (
      <main className={route === '/' ? 'home' : 'notHome'}>
        <Helmet
          title="effulgence.io // prayash thapa"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />

        <Header />

        {this.props.children()}
      </main>
    )
  }
}
