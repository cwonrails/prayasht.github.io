import React, {Component, PropTypes} from 'react';
import moment from 'moment'
import { RouteHandler, Link } from 'react-router'
import { prefixLink } from 'gatsby-helpers'
import access from 'safe-access'
import { config } from 'config'
import './style.scss';

class Footer extends Component {
  render() {
    const {route} = this.props

    return (
      <footer id="header">
        <div className="copyright">
          <h6>all rights reserved</h6>
        </div>
      </footer>
    );
  }
}

Footer.propTypes = {
  route: React.PropTypes.object
}

export default Footer
