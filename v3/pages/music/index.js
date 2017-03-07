import React, { PropTypes } from 'react';
import Helmet from 'react-helmet';
import { config } from 'config';
import Player from '../../src/components/Player';

let songs = [{
  url: 'https://api.soundcloud.com/tracks/274242735/stream?client_id=a364360d3c9782e360e4759ce0424007',
  cover: 'https://i1.sndcdn.com/artworks-000172119017-djpgcd-large.jpg',
  artist: {
    name: 'Effulgence',
    song: 'Us'
  }
}];

export default function Music({ route }) {
  return (
    <div>
      <Helmet title='effulgence // music' />
      <Player songs={songs} />
    </div>
  )
}

Music.propTypes = {
  route: PropTypes.object,
};
