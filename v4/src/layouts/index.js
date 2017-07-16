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
    return (
      <div>
        <Helmet
          title="effulgence.io // prayash thapa"
          meta={[
            { name: 'description', content: 'Sample' },
            { name: 'keywords', content: 'sample, something' }
          ]}
        />

        <Header />

        <main>
          {this.props.children()}
        </main>
      </div>
    )
  }
}
