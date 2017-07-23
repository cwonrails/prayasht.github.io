import React, { Component } from 'react'
import PropTypes from 'prop-types'
import Link from 'gatsby-link'

import Header from '../components/Header'
import Waves from '../components/Waves'
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
        <Header breadcrumb={route === '/' ? '' : route} />

        <Waves cameraZoom={route === '/' ? 7 : 10} key="waves" />

        {this.props.children()}
      </main>
    )
  }
}
