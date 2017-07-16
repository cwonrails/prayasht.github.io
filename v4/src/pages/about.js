import React from 'react'
import Helmet from 'react-helmet'

import About from '../components/About'

export default function AboutMe({ route }) {
  return (
    <section className="content">
      <Helmet title="effulgence // about" />
      <About />
    </section>
  )
}
