import React from 'react'
import Head from 'next/head'
import Player from '../components/player'

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

export default class extends React.Component {
  static async getInitialProps({req}) {
    return req ? { userAgent: req.headers['user-agent'] } : { userAgent: navigator.userAgent }
  }

  render() {
    // console.log(this.props.userAgent);
    return (
      <div>
        <Head>
          <title>effulgence // prayash thapa</title>
          <meta name="viewport" content="initial-scale=1.0001, minimum-scale=1.0001, maximum-scale=1.0001, user-scalable=no" />
          <link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/font-awesome/4.6.2/css/font-awesome.min.css" />
        </Head>
        <Player songs={songs} autoplay/>
      </div>
    )
  }
}
