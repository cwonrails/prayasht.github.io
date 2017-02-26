import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import Portfolio from '../../src/components/Portfolio';


export default function Work({ route }) {
  return (
    <section className='content'>
      <Helmet title='effulgence // work' />
      <Portfolio />
    </section>
  )
}

Work.propTypes = {
  route: PropTypes.object
};
