import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { config } from 'config'; // eslint-disable-line
import Blog from '../src/components/Blog';

export default function BlogIndex({ route }) {
  return (
    <section className='content'>
      <Helmet title='effulgence // blog' />
      <Blog route={route} />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};
