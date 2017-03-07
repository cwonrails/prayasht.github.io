import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';

import About from '../../src/components/About';

export default function AboutMe({ route }) {
  return (
    <section className='content'>
      <Helmet title='effulgence // about' />
      <About />
    </section>
  )
}

AboutMe.propTypes = {
  route: PropTypes.object
};
