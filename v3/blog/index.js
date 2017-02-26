import React, { Component, PropTypes } from 'react';
import Helmet from 'react-helmet';
import { config } from 'config'; // eslint-disable-line
import Blog from '../src/components/Blog';

export default function BlogIndex({ route }) {
  return (
    <section className='content'>
      <Helmet title='effulgence // blog' />
      <header><h2>Thoughts</h2></header>
      <br />
      <Blog route={route} />
    </section>
  );
}

BlogIndex.propTypes = {
  route: PropTypes.object,
};
