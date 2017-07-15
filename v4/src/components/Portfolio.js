import React, { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { Link } from 'react-router'
import { config } from 'config' // eslint-disable-line
import { prefixLink } from 'gatsby-helpers' // eslint-disable-line

import '../css/portfolio.scss'
import nucleactor from '../../static/img/nucleactor.jpg'
import musiverse from '../../static/img/musiverse.jpg'
import processes from '../../static/img/processes.jpg'

class Portfolio extends Component {
  render() {
    return (
      <div id="portfolio" className="fade">
        <header><h2>/* Work */</h2></header>
        <article className="project">
          <a href="http://effulgence.io/Nucleactor" target="_blank">
            <img src={nucleactor} alt="nucleactor" width="600px" />
          </a>
          <span className="project-details">
            <h2 className="project-title">Nucleactor</h2>
            <h3 className="project-description">
              soundcloud audio visualization
            </h3>
          </span>
        </article>

        <article className="project">
          <a href="http://effulgence.io/Musiverse" target="_blank">
            <img src={musiverse} alt="musiverse" width="600px" />
          </a>
          <span className="project-details">
            <h2 className="project-title">Musiverse</h2>
            <h3 className="project-description">audio-reactive musical toy</h3>
          </span>
        </article>

        <article className="project">
          <a href="http://processes.effulgence.io" target="_blank">
            <img src={processes} alt="processes" width="600px" />
          </a>
          <span className="project-details">
            <h2 className="project-title">Processes</h2>
            <h3 className="project-description">365 days of creative coding</h3>
          </span>
        </article>
      </div>
    )
  }
}

export default Portfolio
