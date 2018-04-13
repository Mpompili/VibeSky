import React from 'react';
import ReactPlayer from 'react-player';

class TrackPlayer extends React.Component{

  constructor(props){
    super(props);
    this.state = {
        volume: 0.8,
        muted: false,
        played: 0,
        playedSeconds: 0,
        loaded: 0,
        duration: 0,
        playbackRate: 1.0,
        loop: false,
    };
    this.reactplayer = React.createRef(); 

  }

  componentWillReceiveProps(newProps){
    if (newProps.seek !== this.props.seek ){
      this.reactplayer.current.seekTo(newProps.seek);
    }

    // if (this.props.currentUser.liked !== newProps.currentUser.liked){
    //   console.log('new like toggle');
    //   this.props.fetchTrack(newProps.match.params.id); 
    // }
  }

  onDuration(){
    return ((duration) => {
      this.setState({ duration });
    });
  }

  onProgress(){
    return ((state) => {
      if (!this.state.seeking) { this.setState(state);}
    });
  }

  playPause(e) {
    e.preventDefault();
    let { currentTrack, playing} = this.props;
    if (currentTrack !== null) {
        this.props.setPlayPause(!playing);
      }
  }


  secondsToTime(seconds){
    let duration = new Date(null);
    duration.setSeconds(seconds);
    let response = duration.toISOString().substr(14,5);
    return response;
  }

  testFunction(){

    if (this.props.currentTrack === null){
      return {
        trackToPlay: '',
        trackImage: 'https://image.flaticon.com/icons/svg/3/3722.svg',
        trackUploader: '',
        trackName: '',
        likeButton: 'liked-button',
        linkToTrack: `/#/tracks`
    };} else {
      let liked; 
  
      if (this.props.liked){
        liked = 'liked-button-t';}else{ liked = 'liked-button';}
      return {
        trackToPlay: this.props.currentTrack.audioUrl,
        trackImage: this.props.currentTrack.imageUrl,
        trackUploader: this.props.currentTrack.uploader,
        trackName: this.props.currentTrack.title,
        likeButton: liked,
        linkToTrack: `/#/tracks/${this.props.currentTrack.id}`
      };
    }
  }

  // seekTest(){
  //   console.log('hit seekTest');
  //   this.reactplayer.current.seekTo(0.5);
  //   console.log(this.reactplayer); 
  //   console.log(' ^ is react player'); 
  // }

  toggleLike(trackId, e){
    e.preventDefault();
    this.props.toggleLike(trackId); 
  }

  render() {
    
  
    
    let { currentTrack, playing } = this.props;
    let { loop, volume, muted } = this.state;
    let { trackToPlay, trackImage, trackUploader, trackName, likeButton, linkToTrack } = this.testFunction();

    // let playButton = (currentTrack == null || playing ) ? 'play-pause-btn' : 'play-pause-btn-paused'; 
    // let playButton;
    // if (playing){ 
    //   playButton = 'play-pause-btn';}else{
    //     playButton = 'play-pause-btn-paused';
    //   }
    //  if (!currentTrack) playButton = 'play-pause-btn';

    let playButton = (playing) ?
    'play-pause-btn-paused' : 'play-pause-btn';

    let durationTime = this.secondsToTime(this.state.duration);
    let playedTime = this.secondsToTime(this.state.playedSeconds);
    let percentage = `${Math.ceil(this.state.played * 100)}%`;
    // let loopActive = loop ? 'loop-btn-active' : 'loop-btn';

    return (
      <div id='track-player-bar'>
        <div id='track-player-container'>
          <div id='tp-controller'>
            <div id='previous-btn' className='controller-btn non-active-btn'></div>
            <div id={playButton} className='controller-btn' onClick={(e) => this.playPause(e) }></div>
            <div id='next-btn' className='controller-btn non-active-btn' ></div>
            <div className='shuffle-btn controller-btn non-active-btn'></div>
            <div className='loop-btn controller-btn non-active-btn' onClick={() => this.setState({loop: !loop}) }></div>
          </div>
          <div id='tp-progress'>
            <div id='tp-timepassed'>{playedTime}</div>
            <div id='tp-scrubbar'>
              <div id='scrub-bg'></div>
              <div id='scrub-progress' style={{width: percentage}}></div>
              <div id='scrup-handle'></div>
            </div>
            <div id='tp-duration'>{durationTime}</div>
          </div>
          <div className='tp-track-dets'>
            <div id='mute-volume-btn' className='controller-btn'></div>
            <div className='tp-td-uploader-pic'>
              <img src={trackImage}/>
            </div>
            <div className='tp-td-track-info'>
            <a href={linkToTrack}><p className='tp-trackuploader'>{trackUploader}</p></a>
            <a href={linkToTrack}><p className='tp-trackname'>{trackName}</p></a>
            </div>
            <div id={likeButton} className='controller-btn' onClick={(e) => this.toggleLike(currentTrack.id, e)}></div>
            <div id='playlist-button' className='controller-btn'></div>

          </div>
        </div>
        <ReactPlayer
             ref={this.reactplayer}
             width='0%'
             height='0%'
             url={trackToPlay}
             playing={playing}
             loop={loop}
             volume={volume}
             muted={muted}

             progressInterval={500}
             onProgress={this.onProgress()}
             onDuration={this.onDuration()}
           />
      </div>
    );
  }

}

export default TrackPlayer;
// onReady={() => console.log('onReady')}
// onStart={() => console.log('onStart')}
// onError={e => console.log('onError', e)}
