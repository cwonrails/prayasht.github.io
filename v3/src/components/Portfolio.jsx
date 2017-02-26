import React, { Component, PropTypes } from 'react';
import ReactDOM from 'react-dom';
import { Link } from 'react-router';
import { config } from 'config'; // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line
import Masonry from 'react-masonry-component';

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
        <Masonry
          className={'grid'} // default ''
          elementType={'div'} // default 'div'
          options={masonryOptions} // default {}
          disableImagesLoaded={false} // default false
          updateOnEachImageLoad={false} // default false and works only if disableImagesLoaded is false
        >
          {childElements}
        </Masonry>
      </div>
    )
  }
}

export default Portfolio
