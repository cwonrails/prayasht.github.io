import React from 'react'

const Icon = ({ icon }) =>
  <span
    className="footer-icon"
    style={{ backgroundImage: `url($`/icons/${icon}.svg`)}` }}
  />

export default function Footer() {
  return (
    <footer>
      <section />
    </footer>
  )
}
