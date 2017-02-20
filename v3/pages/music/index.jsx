import React from 'react'
import Helmet from 'react-helmet'
import { config } from 'config'
import Player from '../../src/components/Player'

export default class ReactComponent extends React.Component {
  constructor () {
    super()
    this.state = { count: 0 }
  }

  handlePlusClick () {
    this.setState({ count: this.state.count + 1 })
  }

  handleMinusClick () {
    this.setState({ count: this.state.count - 1 })
  }

  render () {

    let songs = [
      {
        url: 'http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3',
        cover: 'https://images-na.ssl-images-amazon.com/images/I/61ATGoNkASL.jpg',
        artist: {
          name: 'Artist Name',
          song: 'Song Name'
        }
      }, {
        url: 'http://a.tumblr.com/tumblr_lpoc6cHNDP1r0jthjo1.mp3',
        cover: 'http://www.thailandballoonfestival.com/tibf2013/images/HugoSlider1.jpg',
        artist: {
          name: 'Hugo',
          song: '99 Problems'
        }
      }
    ];

    return (
      <div>
        <Helmet title={`${config.siteTitle} | React.js components`} />
        {/* <h1>React.js components</h1>
        <h3>Counter example</h3>
        <p>{this.state.count}</p>
        <button onClick={() => this.handlePlusClick()}>+</button>
        <button onClick={() => this.handleMinusClick()}>-</button> */}
        <Player songs={songs} autoplay/>
      </div>
    )
  }
}
