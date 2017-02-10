import React from 'react'
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import './style.scss';

class Header extends React.Component {
  render() {
    const {route} = this.props

    return (
      <header id="header">
        <div className="logo">
          <a><h1>prayash thapa</h1></a>
        </div>
      </header>
    );
  }
}

Header.propTypes = {
  route: React.PropTypes.object
}

export default Header
