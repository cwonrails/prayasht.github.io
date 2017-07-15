import React, { PropTypes } from 'react'
import Link from 'gatsby-link'

export default function Header() {
  return (
    <header id="header">
      <div className="logo fade">
        <h1>
          <Link to="/">effulgence.io // prayash thapa</Link>
        </h1>
      </div>
    </header>
  )
}

Header.propTypes = {
  className: PropTypes.string
}
