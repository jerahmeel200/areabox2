import React, { Component } from 'react';
import Hls from 'hls.js';
import omit from 'lodash.omit';

export default class VideoPlayer extends Component {
  constructor() {
    super();
    this.state = {
      source: '',
      posterUrl: '',
      isLoading: true,
      error: null
    };
    this.video = React.createRef();
    this.hls = null;
  }

  static getDerivedStateFromProps(nextProps) {
    let source = null;
    let posterUrl = null;
    let isLoading = true;
    const { playbackId, status, poster } = nextProps;

    if (status === 'preparing') {
      isLoading = 'Video is loading from Mux';
    }
    if (status === 'ready' || status === 'active') {
      isLoading = false;
    }
    if (playbackId) {
      source = `https://stream.mux.com/${playbackId}.m3u8`;
      posterUrl = `https://image.mux.com/${playbackId}/thumbnail.jpg`;
    }
    if (typeof status === 'undefined') {
      isLoading = false;
    }
    if (typeof poster === 'string') {
      posterUrl = poster;
    }
    return { isLoading, source, posterUrl };
  }

  componentDidMount() {
    this.setState(VideoPlayer.getDerivedStateFromProps(this.props));
  }

  componentWillUnmount() {
    if (this.hls) {
      this.hls.destroy();
    }
  }

  componentDidUpdate(prevProps, prevState) {
    if (
      this.state.source !== null &&
      this.video.current &&
      !this.video.current.src
    ) {
      this.setState({ error: null });
      this.attachVideo();
    }
    if (this.state.source !== null && this.state.source !== prevState.source) {
      this.setState({ error: null, showControls: false });
      if (this.hls) {
        this.hls.destroy();
      }
      this.attachVideo();
    }
  }

  getVideo = () => {
    return this.video && this.video.current;
  };

  attachVideo = () => {
    const { autoload } = this.props;

    if (Hls.isSupported()) {
      this.hls = new Hls({ autoStartLoad: autoload });
      this.hls.loadSource(this.state.source);
      this.hls.attachMedia(this.video.current);
      this.hls.on(Hls.Events.MANIFEST_PARSED, () => {
        this.setState({ showControls: true });
        this.video.current.play();
      });

      this.hls.on(Hls.Events.ERROR, (event, data) => {
        switch (data.type) {
          case Hls.ErrorTypes.NETWORK_ERROR:
            // if(this.videoContainer.current) {
            //   this.videoContainer.current.style.display = 'none'
            // }
            if (this.video.current) {
              this.video.current.style.display = 'none';
            }
            this.setState({ error: data });
            break;
          case Hls.ErrorTypes.MEDIA_ERROR:
            break;
          default:
            // this.videoContainer.current.style.display = 'none'
            if (this.video.current) {
              this.video.current.style.display = 'none';
            }
            this.setState({ error: data });
        }
        console.error(data);
      });

      // If the player can support HLS natively
    } else if (video.canPlayType('application/vnd.apple.mpegurl')) {
      this.video.current.src = this.state.source;
      this.video.current.addEventListener('loadedmetadata', () => {
        this.video.current.controls = true;
        this.video.current.play();
      });
    }
  };

  handleVideoClick = (e) => {
    const { autoload } = this.props;
    if (!autoload) {
      this.setState({ showControls: true });
      if (this.hls) {
        this.hls.startLoad(0);
      }
    }
    if (this.props.onClick) {
      this.props.onClick(event);
    }
  };

  render() {
    const { posterUrl, isLoading, error } = this.state;
    const { status, autoload } = this.props;

    if (!status) {
      return null;
    }

    if (isLoading) {
      return (
        <div
          className={this.props.className}
          style={{ width: '100%', height: '300px' }}>
          <div className="SanityMuxPlayerInfoContainer">
            <img src={'../../static/img/areaboi.png'} alt="AreaBoi" />
          </div>
        </div>
      );
    }

    let showControls = autoload || this.state.showControls;
    if (this.props.showControls === false) {
      showControls = false;
    }

    const handledPropNames = [
      'autoload',
      'autoplay',
      'muted',
      'showControls',
      'style',
      'className',
      'playbackId',
      'poster',
      'onClick',
      'children',
      'status'
    ];

    let videoProps = { ...this.props };
    videoProps = omit(videoProps, handledPropNames);

    return (
      <div
        className="video-player"
        ref={this.videoContainer}
        style={{ display: 'block', width: '100%' }}>
        <video
          style={{ display: 'block', width: '100%', height: '300px' }}
          onClick={this.handleVideoClick}
          controls={showControls}
          muted={this.props.autoplay || this.props.muted}
          autoPlay={this.props.autoplay}
          ref={this.video}
          poster={posterUrl}
          {...videoProps}
        />
      </div>
    );
  }

  static defaultProps = {
    autoload: true,
    autoplay: true,
    className: '',
    loop: false,
    muted: false,
    showControls: true,
    poster: true,
    playbackId: '',
    status: 'preparing'
  };
}
