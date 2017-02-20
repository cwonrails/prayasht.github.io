import React from 'react';
import { Link } from 'react-router';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import avatar from '../../static/img/avatar.jpg';

export default function Bio() {
  return (
    <div className='about'>
      <img className='avatar' alt='avatar' src={prefixLink(`${avatar}`)} />
        <article class="overview">
          <h2 class="bold">Hi, I'm Prayash.</h2>
          <h2>I make music and write code that draws things.</h2>
        </article>
    </div>
  );
}
