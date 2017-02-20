import { config } from 'config'; // eslint-disable-line
import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import Blog from '../src/components/Blog';

export default function BlogIndex({ route }) {
  return (
    <section className='content'>
      <Helmet title='effulgence // blog' />
      <header>
        <h2>Thoughts</h2>
      </header>
      <Blog route={route} />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};
