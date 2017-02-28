import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line

import '../css/about.scss';

class About extends Component {

  fadeIn() {
    var elem = ReactDOM.findDOMNode(this);
  	elem.style.opacity = 0;
    window.requestAnimationFrame(function() {
  		elem.style.transition = "opacity 750ms";
  		elem.style.opacity = 1;
  	});
  }

  componentDidMount() {
  	this.fadeIn();
  }

  render() {
    return (
      <div id='about'>
        {/* <img className='avatar' alt='avatar' src={prefixLink(`${avatar}`)} width="50px" /> */}
        <article className="overview">
          <h2 className="bold">Hi, I'm Prayash.</h2>
          <br />
          <h3>I make <a href="http://soundcloud.com/effulgence" target="_blank">music</a> and write <a href="http://github.com/prayasht" target="_blank">code</a> that draws things.</h3>
          <br />
          <p>I write software for a living and currently reside in <del>Kathmandu, Nepal</del> Boulder, CO.</p>
          <p>I use this space primarily for sharing personal projects, music, and other art-like things that I may be working on.
          If you'd like an overview of my professional work, check out my <a href="http://linkedin.com/in/prayasht" target="_blank">LinkedIn</a>.</p>
          <p>Feel free to peruse my blog if you're interested in any of my ramblings on art, tech, life, or other things.</p>
          <p>Want to make something together? <a href="" target="_blank">Don't be a stranger!</a></p>
        </article>
      </div>
    )
  }
}

export default About
