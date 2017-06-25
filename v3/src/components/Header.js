import React, { PropTypes } from 'react'
import { Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import { config } from 'config' // eslint-disable-line

export default function Header() {
  return (
    <header id="header">
      <div className="logo fade">
        <h1>
          <Link to={prefixLink('/')}>{config.mastHead}</Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string
}
