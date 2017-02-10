import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'

import SitePost from '../src/components/SitePost'
import Application from '../src/components/Application'

class MarkdownWrapper extends React.Component {
  render() {
    const {route} = this.props
    const post = route.page.data
    let layout, template

    layout = post.layout

    if (layout != 'page') {
      // template = <SitePost {...this.props}/>
    } else {
      // template = <Application {...this.props}/>
    }

    return (
      <div>
        <Helmet title={ `${post.title} - ${config.siteTitle}` }/>
        { template }
      </div>
    );
  }
}

MarkdownWrapper.propTypes = {
  route: React.PropTypes.object
}

export default MarkdownWrapper
