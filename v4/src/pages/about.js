import React from 'react'
import Helmet from 'react-helmet'
import Bio from '../components/Bio'

export default function About() {
  return (
    <section className="content">
      <Helmet title="effulgence // about" />
      <Bio />
    </section>
  )
}
