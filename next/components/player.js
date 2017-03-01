import React, {Component, PropTypes} from 'react';
import classnames from 'classnames';
import shuffle from 'shuffle-array';

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

  componentDidMount = () => {
    let playerElement = this.refs.player;
    playerElement.addEventListener('timeupdate', this.updateProgress);
    playerElement.addEventListener('ended', this.end);
    playerElement.addEventListener('error', this.next);
  }

  componentWillUnmount = () => {
    let playerElement = this.refs.player;
    playerElement.removeEventListener('timeupdate', this.updateProgress);
    playerElement.removeEventListener('ended', this.end);
    playerElement.removeEventListener('error', this.next);
  }

  _handleUpload = (e) => {
    e.preventDefault();

    var files = e.target.files;
    console.log(files);
    var file = URL.createObjectURL(files[0]);

    var song = {
      url: file,
      cover: 'https://images-na.ssl-images-amazon.com/images/I/61ATGoNkASL.jpg',
      artist: {
        name: 'Andy McKee',
        song: files[0].name
      }
    }

    this.setState({ active: song, progress: 0 });
    this.play();
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
    var total = this.state.songs.length;
    var current = (this.state.repeat)
      ? this.state.current
      : (this.state.current < total - 1)
        ? this.state.current + 1
        : 0;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  previous = () => {
    var total = this.state.songs.length;
    var current = (this.state.current > 0)
      ? this.state.current - 1
      : total - 1;
    var active = this.state.songs[current];

    this.setState({ current: current, active: active, progress: 0 });

    this.refs.player.src = active.url;
    this.play();
  }

  randomize = () => {
    var s = shuffle(this.state.songs.slice());

    this.setState({
      songs: (!this.state.random)
        ? s
        : this.state.songs,
      random: !this.state.random
    });
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
      <div>
        <div className="player-container">
          <audio src={active.url} autoPlay={false} preload="auto" ref="player"></audio>

          <div className={coverClass} style={{
            backgroundImage: 'url(' + active.cover + ')'
          }}></div>

          <div className="artist-info">
            <input type="file" accept="audio/*" ref="uploadButton" onChange={this._handleUpload}/>
            <h2 className="artist-name">{active.artist.name}</h2>
            <h3 className="artist-song-name">{active.artist.song}</h3>
          </div>

          <div className="player-progress-container" onClick={this.setProgress}>
            <span className="player-progress-value" style={{
              width: progress + '%'
            }}></span>
          </div>

          <div className="player-options">
            <div className="player-buttons player-controls">
              <button onClick={this.toggle} className="player-btn big" title="Play/Pause">
                <i className={playPauseClass}/>
              </button>

              <button onClick={this.previous} className="player-btn medium" title="Previous Song">
                <i className="fa fa-backward"/>
              </button>

              <button onClick={this.next} className="player-btn medium" title="Next Song">
                <i className="fa fa-forward"/>
              </button>
            </div>

            <div className="player-buttons">
              <button className="player-btn small volume" onClick={this.toggleMute} title="Mute/Unmute">
                <i className={volumeClass}/>
              </button>

              <button className={repeatClass} onClick={this.repeat} title="Repeat">
                <i className="fa fa-repeat"/>
              </button>

              <button className={randomClass} onClick={this.randomize} title="Shuffle">
                <i className="fa fa-random"/>
              </button>
            </div>

          </div>
        </div>
        <style jsx>
          {
            `
            .player-container {
              width: 400px;
              margin: 0 auto;
              overflow: hidden;
              background-color: #222;
              box-shadow: 0 10px 20px rgba(0,0,0,.2);
            }

            .player-cover {
              height: 340px;
              // width: 340px;
              background-position: top center;
              background-size: cover;
              transition: height 0.4s;
            }

            .artist-info {
              padding: 30px 35px 35px;
              color: #ebebeb;
            }

            .artist-name,
            .artist-song-name {
              margin: 0;
            }

            .artist-name {
              margin-bottom: 5px;
              font-size: 32px;
              font-weight: 400;
            }

            .artist-song-name {
              font-size: 18px;
              font-weight: 400;
            }

            .player-progress-container {
              position: relative;
              width: 340px;
              height: 9px;
              margin: 0 auto;
              background-color: #414141;
            }

            .player-progress-value {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              background-color: #CDD2D8;
              border-radius: 40px;
              &:after {
                position: absolute;
                top: -3px;
                right: -6px;
                content: '';
                width: 15px;
                height: 15px;
                border-radius: 50%;
                background-color: #7748B5;
                box-shadow: rgba(0,0,0,.2) 0 0 5px 2px;
              }
            }

            .player-options {
              display: flex;
              justify-content: space-between;
              padding: 40px 0 20px;
              width: 365px;
              margin: 0 auto;
            }

            .player-buttons {
              display: inline-flex;
              justify-content: space-between;
              align-items: center;
              width: 135px;
            }

            .player-btn {
              display: inline-flex;
              justify-content: center;
              align-items: center;
              color: #D2D7DB;
              background-color: transparent;
              border: 0;
              border-radius: 50%;
              outline: 0;
              transition: all 0.4s;

              i {
                font-size: 28px;
                margin: 0 auto;
              }

              &.active {
                color: #838C92;
              }

              &.big {
                width: 70px;
                height: 70px;

                i {
                  font-size: 36px;
                }
              }

              &.medium {
                width: 50px;
                height: 50px;

                i {
                  font-size: 15px;
                }
              }

              &.volume {
                width: 40px;
              }
              &:disabled {
                opacity: 0.5;
              }
            }

            .player-controls {
              width: 180px;

              .player-btn {
                color: #D9D9D9;
                background-color: #414141;
              }
            }
            `
          }</style>
      </div>
    );
  }
}

Player.propTypes = {
  autoplay: PropTypes.bool,
  songs: PropTypes.array.isRequired
};

export default Player;
