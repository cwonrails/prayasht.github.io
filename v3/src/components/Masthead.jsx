import React, { PropTypes } from 'react';
import { Link } from 'react-router';
import { prefixLink } from 'gatsby-helpers'; // eslint-disable-line
import { config } from 'config'; // eslint-disable-line

export default function Masthead() {
  return (
    <header id="header">
      <div className="logo">
        <h1>
          <Link to={prefixLink('/')}>{config.mastHead}</Link>
        </h1>
      </div>
    </header>
  );
}

Masthead.propTypes = {
  className: PropTypes.string
};
