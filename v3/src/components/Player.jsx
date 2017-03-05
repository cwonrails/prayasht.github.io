import React, { Component, PropTypes } from 'react';
import { fadeIn } from '../utils/blog-helpers';
import classnames from 'classnames';
var sc;

const CLIENT_ID = 'a364360d3c9782e360e4759ce0424007';
let track;

import '../css/player.scss';
// import Visualizer from './Visualizer';

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
    sc.initialize({ client_id: CLIENT_ID });
    sc.get('/users/1041317/tracks').then((tracks) => {

      let fetchedTracks = [];
      tracks.forEach((t) => {
        // console.log(t);
        let url = t.stream_url + '?client_id=' + CLIENT_ID;
        let cover = t.arkwork_url;
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
      this.play();
    });
  }

  componentDidMount = () => {
    let playerElement = this.refs.player;
    playerElement.addEventListener('timeupdate', this.updateProgress);
    playerElement.addEventListener('ended', this.end);
    playerElement.addEventListener('error', this.next);
    fadeIn.call(this);
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

    const {active, play, progress} = this.state;

    let coverClass = classnames('player-cover', { 'no-height': !!!active.cover });
    let playPauseClass = classnames('fa', { 'fa-pause': play }, { 'fa-play': !play });
    let volumeClass = classnames('fa', { 'fa-volume-up': !this.state.mute }, {'fa-volume-off': this.state.mute});
    let repeatClass = classnames('player-btn small repeat', {'active': this.state.repeat});
    let randomClass = classnames('player-btn small random', {'active': this.state.random});

    return (
      <div id='player'>
        <div className="player-container">
          <audio src={active.url} autoPlay={false} preload="auto" ref="player"></audio>

          <div className={coverClass}>
            {/* <Visualizer /> */}
          </div>

          <div className="player-progress-container" onClick={this.setProgress}>
            <span className="player-progress-value" style={{
              width: progress + '%'
            }}></span>
          </div>

          <div className="player-options">
            <div className="player-buttons player-controls">
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

          <div className="artist-info">
            <h2 className="artist-name">{active.artist.name}</h2>
            <span> - </span>
            <h3 className="artist-song-name">{active.artist.song}</h3>
          </div>
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
