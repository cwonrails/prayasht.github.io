import React, { PropTypes } from 'react';
import Masthead from '../src/components/Masthead';
import Footer from '../src/components/Footer';
import '../src/css/index.scss';
import Waves from '../src/components/Waves';

export default function Template({ children }) {
  return (
    <main>
      <Masthead />
      <Waves />
      {children}
      <Footer />
    </main>
  );
}

Template.propTypes = {
  children: PropTypes.any
};
