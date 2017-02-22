import React, { PropTypes } from 'react';
import Helmet from 'react-helmet'
import { config } from 'config'
import Player from '../../src/components/Player'

let songs = [
  {
    url: 'http://tegos.kz/new/mp3_full/Redfoo_-_New_Thang.mp3',
    cover: 'https://images-na.ssl-images-amazon.com/images/I/61ATGoNkASL.jpg',
    artist: {
      name: 'Effulgence',
      song: 'Us'
    }
  }
];

export default function Music({ route }) {
  return (
    <div>
      <Helmet title='effulgence // music' />
      <Player songs={songs} autoplay/>
    </div>
  )
}

Music.propTypes = {
  route: PropTypes.object,
};
