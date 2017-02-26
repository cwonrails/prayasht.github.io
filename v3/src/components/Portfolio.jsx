import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import Masonry from 'react-masonry-component';
import nucleactor from '../../static/img/nucleactor.png';

var masonryOptions = {
  transitionDuration: 0,
  columnWidth: 200,
  itemSelector: '.grid-item',
  gutter: 10,
  percentPosition: true
};

let elements = [
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/one-world-trade.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/drizzle.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/cat-nose.jpg",
  "https://s3-us-west-2.amazonaws.com/s.cdpn.io/82/contrail.jpg"
]

class Portfolio extends Component {

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

    var childElements = elements.map((element) => {
      return (
        <div className="grid-item">
          <img src={element} />
        </div>
      );
    });

    return (
      <div id='portfolio'>
        <article className="project">
          <a href="http://effulgence.io/Nucleactor" target="_blank">
            <img src={nucleactor} alt="nucleactor" width='600px'/>
            <span className="project-title">
              <h1>Nucleactor</h1>
              <h2>audio visualization for soundcloud</h2>
            </span>
          </a>
        </article>
      </div>
    )
  }
}

export default Portfolio
