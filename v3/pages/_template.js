import React, { PropTypes } from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Waves from '../src/components/Waves';

import '../src/css/index.scss';

export default function Template({ children }) {
  var state = children.props.location.pathname;
  return (
    <main className={ (state === '/' || state === '/music/') ? '' : 'notHome' }>
      <Header />
      <Waves />
      {children}
      <Footer />
    </main>
  );
}

Template.propTypes = {
  children: PropTypes.any
};
