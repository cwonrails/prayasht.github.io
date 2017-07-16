import React, { Component } from 'react'
import Link from 'gatsby-link'

export default class Header extends Component {
  render() {
    const headerText = this.props.left
      ? 'effulgence.io'
      : 'effulgence.io // prayash thapa'
    return (
      <header id="header">
        <div
          className={'logo fade ' + (this.props.left ? '' : 'justify-center')}
        >
          <div className="breadcrumb">
            <strong className="fade">
              {this.props.left.substr(1)}
            </strong>
          </div>
          <h1>
            <Link to="/">
              {headerText}
            </Link>
          </h1>
        </div>
      </header>
    )
  }
}
