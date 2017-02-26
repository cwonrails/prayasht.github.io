import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line

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
      <div className='about'>
        {/* <img className='avatar' alt='avatar' src={prefixLink(`${avatar}`)} width="50px" /> */}
        <article className="overview">
          <h2 className="bold">Hi, I'm Prayash.</h2>
          <br />
          <h3>I make music and write code that draws things.</h3>
        </article>
      </div>
    )
  }
}

export default About
