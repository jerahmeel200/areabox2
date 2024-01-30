import React, { Component } from 'react';

export default class GetRecent extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hovered: false
    };
  }

  onHover = () => this.setState({ hovered: true });
  offHover = () => this.setState({ hovered: false });
  src = (playbackId, hovered) =>
    hovered
      ? `https://image.mux.com/${playbackId}/animated.gif`
      : `https://image.mux.com/${playbackId}/thumbnail.jpg`;

  render() {
    const { hovered } = this.state;
    const { playbackId } = this.props;

    return (
      <img
        className="recent-preview"
        src={this.src(playbackId, hovered)}
        onMouseOver={this.onHover}
        onMouseOut={this.offHover}></img>
    );
  }
}
