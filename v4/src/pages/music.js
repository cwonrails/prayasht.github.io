import React from 'react'
import Link from 'gatsby-link'
import Helmet from 'react-helmet'

import Player from '../components/Player'

export default class Page2 extends React.Component {
  render() {
    const songs = [
      {
        url:
          'https://api.soundcloud.com/tracks/274242735/stream?client_id=a364360d3c9782e360e4759ce0424007',
        cover: 'https://i1.sndcdn.com/artworks-000172119017-djpgcd-large.jpg',
        artist: {
          name: 'Effulgence',
          song: 'Us'
        }
      }
    ]

    return (
      <div>
        <Helmet title="effulgence // music" />
        <Player songs={songs} />
      </div>
    )
  }
}
