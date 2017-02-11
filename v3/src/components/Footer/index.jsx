import React, {Component, PropTypes} from 'react';

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
