import React, { PropTypes } from 'react';
import Header from '../src/components/Header';
import Footer from '../src/components/Footer';
import Waves from '../src/components/Waves';

import '../src/css/index.scss';

export default function Template({ children }) {
  return (
    <main>
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
