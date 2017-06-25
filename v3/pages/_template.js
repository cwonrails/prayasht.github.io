import React, { Component, PropTypes } from 'react'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'

import Header from '../src/components/Header'
import Footer from '../src/components/Footer'
import Waves from '../src/components/Waves'

import '../src/css/index.scss'

export default function Template({ children }) {
  let route = children.props.location.pathname

  return (
    <main className={route === '/' ? 'home' : 'notHome'}>
      <Header />

      <ReactCSSTransitionGroup
        transitionName="singleFade"
        transitionEnterTimeout={2000}
        transitionLeaveTimeout={2000}
        transitionAppear={true}
        transitionAppearTimeout={2000}
      >
        <Waves cameraZoom={route === '/' ? 7 : 10} key="waves" />
      </ReactCSSTransitionGroup>

      {children}
      <Footer />
    </main>
  )
}

Template.propTypes = {
  children: PropTypes.any
}
