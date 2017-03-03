import React, { Component, PropTypes } from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Waves from '../src/components/Waves';

import '../src/css/index.scss';

export default function Template({ children }) {
  var route = children.props.location.pathname;
  return (
    <main className={ (route === '/' || route === '/music/') ? '' : 'notHome' }>
      <Header />
      <Waves cameraZoom={ (route === '/' ? 1.25 : 2.25) }/>
      {children}
      <Footer />
    </main>
  );
}

Template.propTypes = {
  children: PropTypes.any
};
