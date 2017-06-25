import React, { PropTypes } from 'react'
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line

const Icon = ({ icon }) =>
  <span
    className="footer-icon"
    style={{ backgroundImage: `url(${prefixLink(`/icons/${icon}.svg`)})` }}
  />

Icon.propTypes = {
  icon: PropTypes.string
}

export default function Footer() {
  return (
    <footer>
      <section />
    </footer>
  )
}
