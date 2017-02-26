import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import Bio from '../../src/components/About';

export default function About({ route }) {
  return (
    <section className='content'>
      <Helmet title='effulgence // about' />
      <Bio />
    </section>
  )
}

About.propTypes = {
  route: PropTypes.object
};
