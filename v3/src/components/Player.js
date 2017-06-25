import React, { Component, PropTypes } from 'react'
import classnames from 'classnames'
import YouTube from 'react-youtube'

import '../css/player.scss'
import Delay from './Delay'
import tracks from '../utils/tracks'
var sc

const CLIENT_ID = 'a364360d3c9782e360e4759ce0424007'
let track

class Player extends Component {
  state = {
    active: this.props.songs[0],
    current: 0,
    progress: 0,
    play: false,
    songs: this.props.songs
  }

  fetch = () => {
    // sc = require('soundcloud')
    const superfluousText = 'Effulgence & Immensus - '

    // Disable SC API calls for now.
    // sc.initialize({ client_id: CLIENT_ID });
    // sc.get('/users/1041317/tracks').then((tracks) => {
    // console.log(tracks);
    let fetchedTracks = []
    tracks.forEach(t => {
      // console.log(t);
      let url = t.stream_url + '?client_id=' + CLIENT_ID
      let cover = t.artwork_url.replace('large', 't300x300')
      let trackName = t.title

      fetchedTracks.push({
        url: url,
        cover: cover,
        artist: {
          name: 'Effulgence',
          song: trackName.replace(superfluousText, '')
        }
      })
    })

    this.setState({ active: fetchedTracks[0], songs: fetchedTracks })
    // });
  }

  componentDidMount = () => {
    let playerElement = this.refs.player
    playerElement.addEventListener('timeupdate', this.updateProgress)
    playerElement.addEventListener('ended', this.end)
    playerElement.addEventListener('error', this.next)
    this.fetch()
  }

  componentWillUnmount = () => {
    let playerElement = this.refs.player
    playerElement.removeEventListener('timeupdate', this.updateProgress)
    playerElement.removeEventListener('ended', this.end)
    playerElement.removeEventListener('error', this.next)
  }

  setProgress = e => {
    let target = e.target.nodeName === 'SPAN' ? e.target.parentNode : e.target
    let width = target.clientWidth
    let rect = target.getBoundingClientRect()
    let offsetX = e.clientX - rect.left
    let duration = this.refs.player.duration
    let currentTime = duration * offsetX / width
    let progress = currentTime * 100 / duration

    this.refs.player.currentTime = currentTime
    this.setState({ progress: progress })
    this.play()
  }

  updateProgress = () => {
    let duration = this.refs.player.duration
    let currentTime = this.refs.player.currentTime
    let progress = currentTime * 100 / duration

    this.setState({ progress: progress })
  }

  play = () => {
    this.setState({ play: true })
    this.refs.player.play()
  }

  pause = () => {
    this.setState({ play: false })
    this.refs.player.pause()
  }

  toggle = () => {
    this.state.play ? this.pause() : this.play()
  }

  next = () => {
    let total = this.state.songs.length
    let current = this.state.current < total - 1 ? this.state.current + 1 : 0
    let active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })

    this.refs.player.src = active.url
    setTimeout(() => this.play(), 1000)
  }

  previous = () => {
    let total = this.state.songs.length
    let current = this.state.current > 0 ? this.state.current - 1 : total - 1
    let active = this.state.songs[current]

    this.setState({ current: current, active: active, progress: 0 })

    this.refs.player.src = active.url
    setTimeout(() => this.play(), 1000)
  }

  _handleClick = index => {
    let chosenTrack = this.state.songs[index]
    this.setState({ active: chosenTrack })
    setTimeout(() => this.play(), 1000)
  }

  _onYTReady(event) {
    // access to player in all event handlers via event.target
    event.target.pauseVideo()
  }

  render() {
    const { active, play, progress, songs } = this.state

    let playPauseClass = classnames(
      'fa',
      { 'fa-pause': play },
      { 'fa-play': !play }
    )

    const tracks = songs.map((track, index) =>
      <li
        className="track"
        key={track.artist.song.toString()}
        onClick={() => this._handleClick(index)}
      >
        <i className="fa fa-play" aria-hidden="true" />
        <div className="trackIndex">{index + 1}</div>
        <div className="trackName">{track.artist.song}</div>
      </li>
    )

    const opts = {
      width: '320',
      height: '195',
      playerVars: {
        // https://developers.google.com/youtube/player_parameters
        autoplay: 0
      }
    }

    return (
      <div id="player" className="fade">
        <div className="container">
          <audio
            src={active.url}
            autoPlay={false}
            preload="auto"
            ref="player"
          />

          <div className="platforms">
            <ul>
              <li className="spotify">
                <a
                  href="https://open.spotify.com/artist/2AUSdVDoLw0BgBFfXW5Xb5"
                  target="_blank"
                >
                  <i className="fa fa-2x fa-spotify" aria-hidden="true" />
                </a>
              </li>

              <li className="soundcloud">
                <a href="https://soundcloud.com/effulgence" target="_blank">
                  <i className="fa fa-2x fa-soundcloud" aria-hidden="true" />
                </a>
              </li>

              <li className="youtube">
                <a href="https://youtube.com/iameffulgence" target="_blank">
                  <i className="fa fa-2x fa-youtube-play" aria-hidden="true" />
                </a>
              </li>

              <li className="itunes">
                <a
                  href="https://itunes.apple.com/us/artist/effulgence/id1031779356"
                  target="_blank"
                >
                  <i className="fa fa-2x fa-music" aria-hidden="true" />
                </a>
              </li>

              <li className="bandcamp">
                <a href="https://effulgence.bandcamp.com" target="_blank">
                  <i className="fa fa-2x fa-bandcamp" aria-hidden="true" />
                </a>
              </li>
            </ul>
          </div>

          <div className="media">

            {/* Info Pane */}
            <div className="pane-info">

              {/* Artwork */}
              <img className="artwork" src={active.cover} />

              {/* Now Playing */}
              <div className="artist-info">
                <h3 className="artist-song-name">{active.artist.song}</h3>
                <br />
                <h2 className="artist-name">{active.artist.name}</h2>
              </div>

              {/* Player Controls */}
              <div className="options">
                <button
                  onClick={this.previous}
                  className="player-btn medium"
                  title="Previous Song"
                >
                  <i className="fa fa-backward" />
                </button>

                <button
                  onClick={this.toggle}
                  className="player-btn big"
                  title="Play/Pause"
                >
                  <i className={playPauseClass} />
                </button>

                <button
                  onClick={this.next}
                  className="player-btn medium"
                  title="Next Song"
                >
                  <i className="fa fa-forward" />
                </button>
              </div>

            </div>

            {/* Tracklist Pane */}
            <div className="pane-tracklist">
              <ul className="list">{tracks}</ul>
            </div>

          </div>

          <div className="yt-container">
            <div className="video">
              <Delay wait={1500}>
                <YouTube videoId="UHDN-TyN92U" opts={opts} />
              </Delay>
            </div>

            <div className="video">
              <Delay wait={1500}>
                <YouTube videoId="lKzFU30NyK8" opts={opts} />
              </Delay>
            </div>

            <div className="video">
              <Delay wait={1500}>
                <YouTube videoId="CPMwYzgbtH8" opts={opts} />
              </Delay>
            </div>
          </div>

          {/* <div className="progress-container" onClick={this.setProgress}>
            <span className="progress-value" style={{
              width: progress + '%'
            }}></span>
          </div> */}

        </div>
      </div>
    )
  }
}

Player.propTypes = {
  autoplay: React.PropTypes.bool,
  songs: React.PropTypes.array.isRequired
}

export default Player
