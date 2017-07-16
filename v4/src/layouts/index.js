import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Header from '../components/Header'
import '../css/typography.css'
import '../css/index.scss'

export default class Template extends Component {
  static propTypes = {
    children: PropTypes.func
  }

  render() {
    const route = this.props.location.pathname

    return (
      <main className={route === '/' ? 'home' : 'notHome'}>
        <Header left={route === '/' ? '' : route} />

        {this.props.children()}
      </main>
    )
  }
}
