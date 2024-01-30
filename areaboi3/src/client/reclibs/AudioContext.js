let audioCtx = 0;
let analyser = 0;

const AudioContext = {
  getAudioContext() {
    return (
      audioCtx ||
      (audioCtx = new (window.AudioContext || window.webkitAudioContext)())
    );
  },

  getAnalyser() {
    return (
      analyser || (analyser = AudioContext.getAudioContext().createAnalyser())
    );
  },

  decodeAudioData() {
    audioCtx.decodeAudioData(audioData).then(function (decodedData) {
      // use the decoded data here
    });
  }
};

export default AudioContext;
