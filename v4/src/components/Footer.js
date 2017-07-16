import React, { PropTypes } from 'react'

const Icon = ({ icon }) =>
  <span
    className="footer-icon"
    style={{ backgroundImage: `url($`/icons/${icon}.svg`)}` }}
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
