// cool blog article on how to do this: http://www.smartjava.org/content/exploring-html5-web-audio-visualizing-sound
// https://developer.mozilla.org/en-US/docs/Web/API/Web_Audio_API/Visualizations_with_Web_Audio_API

// distortion curve for the waveshaper, thanks to Kevin Ennis
// http://stackoverflow.com/questions/22312841/waveshaper-node-in-webaudio-how-to-emulate-distortion

// JM: adapted from npm react-mic for use with nextJS

import React, { Component } from 'react';
import { string, number, bool, func, oneOf, object } from 'prop-types';
import { MicrophoneRecorder } from '../reclibs/MicrophoneRecorder';
import AudioContext from '../reclibs/AudioContext';
import AudioPlayer from '../reclibs/AudioPlayer';
import Visualizer from '../reclibs/Visualizer';

export default class ReactMic extends Component {
  constructor(props) {
    super(props);
    this.state = {
      analyser: null,
      microphoneRecorder: null,
      canvas: null,
      canvasCtx: null
    };
  }

  componentDidMount() {
    const { onStop, onStart, onData, audioElem, audioBitsPerSecond, mimeType } =
      this.props;
    const { visualizer } = this.refs;
    const canvas = visualizer;
    const canvasCtx = canvas.getContext('2d');
    const options = {
      audioBitsPerSecond: audioBitsPerSecond,
      mimeType: mimeType
    };

    if (audioElem) {
      const analyser = AudioContext.getAnalyser();

      AudioPlayer.create(audioElem);

      this.setState(
        {
          analyser: analyser,
          canvas: canvas,
          canvasCtx: canvasCtx
        },
        () => {
          this.visualize();
        }
      );
    } else {
      const analyser = AudioContext.getAnalyser();
      const Recorder =
        this.props.mimeType === 'audio/mp3'
          ? MicrophoneRecorderMp3
          : MicrophoneRecorder;
      this.setState(
        {
          analyser: analyser,
          microphoneRecorder: new Recorder(onStart, onStop, onData, options),
          canvas: canvas,
          canvasCtx: canvasCtx
        },
        () => {
          this.visualize();
        }
      );
    }
  }

  visualize = () => {
    const self = this;
    const { backgroundColor, strokeColor, width, height, visualSetting } =
      this.props;
    const { canvas, canvasCtx, analyser } = this.state;

    if (visualSetting === 'sinewave') {
      Visualizer.visualizeSineWave(
        analyser,
        canvasCtx,
        canvas,
        width,
        height,
        backgroundColor,
        strokeColor
      );
    } else if (visualSetting === 'frequencyBars') {
      Visualizer.visualizeFrequencyBars(
        analyser,
        canvasCtx,
        canvas,
        width,
        height,
        backgroundColor,
        strokeColor
      );
    } else if (visualSetting === 'frequencyCircles') {
      Visualizer.visualizeFrequencyCircles(
        analyser,
        canvasCtx,
        canvas,
        width,
        height,
        backgroundColor,
        strokeColor
      );
    }
  };

  clear() {
    const { width, height } = this.props;
    const { canvasCtx } = this.state;
    canvasCtx.clearRect(0, 0, width, height);
  }

  render() {
    const { record, onStop, width, height } = this.props;
    const { analyser, microphoneRecorder, canvasCtx } = this.state;

    if (record) {
      if (microphoneRecorder) {
        microphoneRecorder.startRecording();
      }
    } else {
      if (microphoneRecorder) {
        microphoneRecorder.stopRecording(onStop);
        this.clear();
      }
    }

    return (
      <canvas
        ref="visualizer"
        height={height}
        width={width}
        className={this.props.className}></canvas>
    );
  }
}

ReactMic.propTypes = {
  backgroundColor: string,
  strokeColor: string,
  className: string,
  audioBitsPerSecond: number,
  mimeType: string,
  height: number,
  record: bool.isRequired,
  onStop: func,
  onData: func,
  bufferSize: oneOf([0, 256, 512, 1024, 2048, 4096, 8192, 16384]),
  sampleRate: number,
  recorderParams: object
};

ReactMic.defaultProps = {
  backgroundColor: 'black',
  strokeColor: '#ffffff',
  className: 'visualizer',
  audioBitsPerSecond: 128000,
  mimeType: 'audio/wav',
  bufferSize: 2048,
  sampleRate: 44100,
  record: false,
  width: 160,
  height: 100,
  visualSetting: 'sinewave',
  recorderParams: {}
};
