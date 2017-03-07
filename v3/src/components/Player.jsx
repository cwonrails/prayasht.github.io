import React, { Component, PropTypes } from 'react';
import { fadeIn } from '../utils/blog-helpers';
import classnames from 'classnames';
import tracks from '../utils/tracks';
var sc;

const CLIENT_ID = 'a364360d3c9782e360e4759ce0424007';
let track;

import '../css/player.scss';

class Player extends Component {

  state = {
    active: this.props.songs[0],
    current: 0,
    progress: 0,
    random: false,
    repeat: false,
    mute: false,
    play: this.props.autoplay || true,
    songs: this.props.songs
  }

  fetch = () => {
    sc = require('soundcloud');
    // sc.initialize({ client_id: CLIENT_ID });
    // sc.get('/users/1041317/tracks').then((tracks) => {
      // console.log(tracks);
      let fetchedTracks = [];
      tracks.tracks.forEach((t) => {
        // console.log(t);
        let url = t.stream_url + '?client_id=' + CLIENT_ID;
        let cover = t.artwork_url.replace('large', 't300x300');
        let trackName = t.title;

        fetchedTracks.push({
          url: url,
          cover: cover,
          artist: {
            name: 'Effulgence',
            song: trackName
          }
        });
      })

      this.setState({ active: fetchedTracks[0], songs: fetchedTracks });
      fadeIn.call(this);
      // this.play();
    // });
  }

  componentDidMount = () => {
    let playerElement = this.refs.player;
    playerElement.addEventListener('timeupdate', this.updateProgress);
    playerElement.addEventListener('ended', this.end);
    playerElement.addEventListener('error', this.next);
    this.fetch();
  }

  componentWillUnmount = () => {
    let playerElement = this.refs.player;
    playerElement.removeEventListener('timeupdate', this.updateProgress);
    playerElement.removeEventListener('ended', this.end);
    playerElement.removeEventListener('error', this.next);
  }

  setProgress = (e) => {
    let target = e.target.nodeName === 'SPAN'
      ? e.target.parentNode
      : e.target;
    let width = target.clientWidth;
    let rect = target.getBoundingClientRect();
    let offsetX = e.clientX - rect.left;
    let duration = this.refs.player.duration;
    let currentTime = (duration * offsetX) / width;
    let progress = (currentTime * 100) / duration;

    this.refs.player.currentTime = currentTime;
    this.setState({ progress: progress });
    this.play();
  }

  updateProgress = () => {
    let duration = this.refs.player.duration;
    let currentTime = this.refs.player.currentTime;
    let progress = (currentTime * 100) / duration;

    this.setState({ progress: progress });
  }

  play = () => {
    this.setState({ play: true });
    this.refs.player.play();
  }

  pause = () => {
    this.setState({ play: false });
    this.refs.player.pause();
  }

  toggle = () => {
    this.state.play ? this.pause() : this.play();
  }

  end = () => {
    (this.state.repeat) ? this.play() : this.setState({ play: false });
  }

  next = () => {
    let total = this.state.songs.length;
    let current = (this.state.repeat)
      ? this.state.current
      : (this.state.current < total - 1)
        ? this.state.current + 1
        : 0;
    let active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  previous = () => {
    let total = this.state.songs.length;
    let current = (this.state.current > 0)
      ? this.state.current - 1
      : total - 1;
    let active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  randomize = () => {
    // let s = shuffle(this.state.songs.slice());
    //
    // this.setState({
    //   songs: (!this.state.random)
    //     ? s
    //     : this.state.songs,
    //   random: !this.state.random
    // });
  }

  repeat = () => {
    this.setState({ repeat: !this.state.repeat });
  }

  toggleMute = () => {
    let mute = this.state.mute;

    this.setState({ mute: !this.state.mute });
    this.refs.player.volume = (mute) ? 1 : 0;
  }

  render() {

    const { active, play, progress, songs } = this.state;
    // console.log(active);

    let playPauseClass = classnames('fa', { 'fa-pause': play }, { 'fa-play': !play });
    let volumeClass = classnames('fa', { 'fa-volume-up': !this.state.mute }, {'fa-volume-off': this.state.mute});
    let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
    let randomClass = classnames('player-btn small random', {'active': this.state.random});

    const opts = {
      width: '320',
      height: '195',
      playerVars: { // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    };

    const tracks = songs.map((track) =>
      <li key={track.artist.song.toString()}>
        {track.artist.song}
      </li>
    );

    return (
      <div id='player'>
        <div className="container">
          <audio src={active.url} autoPlay={false} preload="auto" ref="player"></audio>

          <div className="platforms">
            <ul>
              <li className="spotify">
                <a href="https://open.spotify.com/artist/2AUSdVDoLw0BgBFfXW5Xb5" target="_blank">
                  <i className="fa fa-2x fa-spotify" aria-hidden="true"></i>
                </a>
              </li>

              <li className="soundcloud"><i className="fa fa-2x fa-soundcloud" aria-hidden="true"></i></li>
              <li className="youtube"><i className="fa fa-2x fa-youtube" aria-hidden="true"></i></li>
              <li className="itunes"><i className="fa fa-2x fa-music" aria-hidden="true"></i></li>
              <li className="bandcamp"><i className="fa fa-2x fa-bandcamp" aria-hidden="true"></i></li>
            </ul>
          </div>

          <div className="media">

            {/* Info Pane */}
            <div className="pane-info">

              {/* Artwork */}
              <img className='artwork' src={active.cover} />

              {/* Now Playing */}
              {/* <div className="artist-info">
                <h2 className="artist-name">{active.artist.name}</h2>
                <span> - </span>
                <h3 className="artist-song-name">{active.artist.song}</h3>
              </div> */}

              {/* Player Controls */}
              <div className="options">
                <button onClick={this.previous} className="player-btn medium" title="Previous Song">
                  <i className="fa fa-backward"/>
                </button>

                <button onClick={this.toggle} className="player-btn big" title="Play/Pause">
                  <i className={playPauseClass}/>
                </button>

                <button onClick={this.next} className="player-btn medium" title="Next Song">
                  <i className="fa fa-forward"/>
                </button>
              </div>

            </div>

            {/* Tracklist Pane */}
            <div className="pane-tracklist">
              <ul>{tracks}</ul>
            </div>

          </div>

          {/* <div className="progress-container" onClick={this.setProgress}>
            <span className="progress-value" style={{
              width: progress + '%'
            }}></span>
          </div> */}

        </div>
      </div>
    );
  }
}

Player.propTypes = {
  autoplay: React.PropTypes.bool,
  songs: React.PropTypes.array.isRequired
};

export default Player;
