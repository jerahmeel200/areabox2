import { useReducer, useEffect, useState } from 'react';
import PropTypes from 'prop-types';
// import ReactMic from "../components/ReactMic";
import 'react-voice-recorder/dist/index.css';
import Modal from 'react-modal';
import axios from 'axios';
import { firebaseStorage } from '../settings/firebase';
import {
  ref as refS,
  uploadBytes,
  uploadBytesResumable,
  getDownloadURL
} from 'firebase/storage';
import { v4 } from 'uuid';
import AudioReactRecorder, { RecordState } from 'audio-react-recorder';

const customStyles = {
  overlay: {
    position: 'fixed',
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    'z-index': 999,
    margin: '0 auto'
  },
  content: {
    minWidth: '350px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    backgroundColor: 'transparent',
    color: 'white',
    overflow: 'hidden'
  }
};

const Recorder = (props) => {
  // const [state, setState] = useReducer((state, newState) => ({...state, ...newState}),{
  //   record: false,
  //   wait: false,
  //   modalIsOpen: true,
  //   uploading: false,
  //   blobURL: "",
  //   blob: "",
  //   options: "",
  // });
  const [record, setRecord] = useState(false);
  const [wait, setWait] = useState(false);
  const [modalIsOpen, setmodalIsOpen] = useState(true);
  const [uploading, setUploading] = useState(false);
  const [blobURL, setBlobURL] = useState('');
  const [blob, setBlob] = useState('');
  const [options, setOptions] = useState(null);
  const [status, setStatus] = useState('');
  const [fileName, setFileName] = useState('');
  const [audioBase64, setAudioBase64] = useState(null);
  const [stopped, setStopped] = useState(false);
  const [recordingTime, setRecordingTime] = useState(0);
  // }

  // let getAudioExtension = useCallback(() => {
  //   console.log("options: ",options);
  //     var mt = options.mimeType;
  //     var pos1 = mt?.indexOf("/");
  //     var pos2 = mt?.indexOf(";");
  //     if (pos2 < 0) return mt.substring(pos1 + 1);
  //     else return mt?.substring(pos1 + 1, pos2);
  // }, [deps])

  const getAudioExtension = (blobOptions) => {
    console.log('options: ', blobOptions);
    let ext = blobOptions?.split('/');
    console.log(ext[1]);
    return ext[1];
    // var mt = blobOptions.mimeType;
    // var pos1 = mt?.indexOf("/");
    // var pos2 = mt?.indexOf(";");
    // if (pos2 < 0) return mt.substring(pos1 + 1);
    // else return mt?.substring(pos1 + 1, pos2);
  };

  const timeRecording = () =>
    setInterval(() => setRecordingTime(recordingTime + 1), 1000);

  const uploadRecordToFirebase = (audioBase64) => {
    // e.preventDefault();
    // const { fileName } = this.state;
    // if (!fileName || fileName?.size === undefined) {
    //   this.setState({ status: 'Please select a file first' })
    //   return;
    // }
    const audioUrl = `audio/`;
    const uploadAudioRef = refS(firebaseStorage, audioUrl);
    uploadBytes(uploadAudioRef, audioBase64)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          console.log(snapshot, url);
          setUploading(false);
          setWait(false);
          setStatus('Audio uploaded!');
        });
      })
      .catch((e) => {
        console.log;
      });
  };

  const postData = (audioBase64, blobOptions) => {
    // const storage = firebaseStorage
    console.log('line 65', blobOptions);
    // const { options } = state;
    const { sendInput } = props;
    // console.log("line 61: ", options);
    const ext = getAudioExtension(blobOptions);
    const url = `https://chat.areabox.tv/audio?ext=${ext}`;
    const formData = new FormData();
    uploadRecordToFirebase(audioBase64);
    // const audioStorageRef = ref(storage, 'audio/' + Date.now() + ext);

    if (audioBase64) {
      //  uploadBytes(audioStorageRef, audioBase64);
      console.log('Audio uploaded successfully.');
    }
    formData.append('audiofile', audioBase64);
    setUploading(true);
    axios
      .post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(
        (res) => {
          console.log('Uploaded audio >', res.data);
          const { storageUrl } = res.data;
          uploaded(storageUrl);
          sendInput(storageUrl);
          setUploading(false);
          setWait(false);
          setStatus('Audio uploaded!');
          // setState({
          //   ...state,
          //   uploading: false,
          //   wait: false,
          //   status: "Audio uploaded!",
          // });
        },
        (err) => {
          setUploading(false);
          setWait(false);
          setStatus(`${err.message}. Please try again`);
          // setState({
          //   ...state,
          //   uploading: false,
          //   wait: false,
          //   status: `${err.message}. Please try again`,
          // });
        }
      );
  };

  const openModal = () => {
    this.props.modalRecorderOpen(true);
  };

  const closeModal = () => {
    props.modalRecorderOpen(false);
  };

  const uploaded = (url) => {
    // console.log("window.uploaded this", this)
    props.concatInput(url);
  };

  const startRecording = () => {
    console.log('recording');
    setRecord(RecordState.START);
    timeRecording();
    // setState({ ...state, record: true });
  };

  const stopRecording = () => {
    console.log('stopped');
    setRecord(RecordState.STOP);
    clearInterval(recordingTime);
    // setState({ ...state, record: false, wait: true });
  };
  console.log('recording time: ', recordingTime);
  const onData = (recordedBlob) => {};
  // console.log("state data: ", state);
  const onStop = (recordedBlob) => {
    const { blob, url, type: blobOptions } = recordedBlob;
    setBlob(blob);
    setBlobURL(url);
    setOptions(blobOptions);
    console.log('blobOptions: ', blobOptions, options);

    axios({
      method: 'get',
      url,
      responseType: 'blob'
    })
      .then(
        (response) =>
          new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(response.data);
            reader.onloadend = () => {
              const base64data = reader.result;
              resolve(base64data);
            };
          })
      )
      .then((audioBase64) => {
        setAudioBase64(audioBase64);
        setStopped(true);
      });
  };

  const uploadAudio = () => {
    if (stopped) {
      setWait(true);
      postData(audioBase64, options);
      setStopped(false);
    }
  };

  const onCancel = () => {
    setStopped(false);
    setAudioBase64(null);
    setBlob(null);
    setBlobURL(null);
    setOptions(null);
  };

  // stopWorker() {
  // 	w.terminate();
  // 	w = undefined;
  // }

  // const { modalIsOpen, record } = state;

  //
  //
  //Testing
  //Testing
  //Testing
  //Testing
  //Testing
  //Testing

  //   this.state = {
  //     audioDetails: {
  //       url: null,
  //       blob: null,
  //       chunks: null,
  //       duration: {
  //         h: 0,
  //         m: 0,
  //         s: 0,
  //       },
  //     },
  //   };

  //   const [audioDetails, setAudioDetails] = useState({
  //     url: null,
  //     blob: null,
  //     chunks: null,
  //     duration: {
  //       h: 0,
  //       m: 0,
  //       s: 0,
  //     },
  //   });
  //   const handleAudioStop = (data) => {
  //     console.log(data);
  //     // this.setState({ audioDetails: data });
  //     setAudioDetails(() => data);
  //   };

  //   const handleAudioUpload = (file) => {
  //     console.log(file);
  //     uploadRecordToFirebase(file);
  //   };

  //   const handleCountDown = (data) => {
  //     console.log(data);
  //   };

  //   const handleReset = () => {
  //     const reset = {
  //       url: null,
  //       blob: null,
  //       chunks: null,
  //       duration: {
  //         h: 0,
  //         m: 0,
  //         s: 0,
  //       },
  //     };
  //     // this.setState({ audioDetails: reset });
  //     setAudioDetails(() => reset);
  //   };

  useEffect(() => {
    console.log('useEffect log: ', options);
  }, [options]);
  return (
    <>
      <Modal
        isOpen={modalIsOpen}
        style={customStyles}
        contentLabel="Recorder"
        shouldCloseOnOverlayClick={false}
        // onAfterOpen={afterOpenModal}
        onRequestClose={closeModal}>
        <div className="recorder-container">
          <center>Record Audio</center>
          <AudioReactRecorder
            backgroundColor="black"
            foregroundColor="white"
            canvasHeight={60}
            canvasWidth={150}
            state={record}
            onStop={onStop}
          />
          {/* <ReactMic
            record={record}
            className="sound-wave"
            onStop={onStop}
            strokeColor="#ffffff"
            backgroundColor="#000000"
          /> */}
          <br />
          {!wait && (
            <div className="recorder-container--buttons">
              {!stopped ? (
                <>
                  <div
                    onClick={startRecording}
                    className="start-stop--container">
                    <img
                      src="../static/img/record-gold.svg"
                      alt="start record icon"
                    />
                    <input
                      type="button"
                      className="footer_btn footer_btn_start"
                      value="Start"
                    />
                  </div>
                  <div
                    onClick={stopRecording}
                    className="start-stop--container">
                    <img
                      src="../static/img/stop-gold.svg"
                      alt="stop record icon"
                    />
                    <input
                      type="button"
                      className="footer_btn footer_btn_stop"
                      value="Stop"
                    />
                  </div>
                </>
              ) : (
                <>
                  <div onClick={onCancel} className="start-stop--container">
                    {/* <img
                  src="../static/img/record-gold.svg"
                  alt="start record icon"
                /> */}
                    <input
                      type="button"
                      className="footer_btn footer_btn_start"
                      value="Cancel"
                    />
                  </div>
                  <div onClick={uploadAudio} className="start-stop--container">
                    {/* <img src="../static/img/stop-gold.svg" alt="stop record icon" /> */}
                    <input
                      type="button"
                      className="footer_btn footer_btn_stop"
                      value="Upload"
                    />
                  </div>
                </>
              )}
            </div>
          )}
          {wait && (
            <div id="loading">
              <span className="loader">
                <span className="loader-inner"></span>
              </span>
            </div>
          )}

          <div className="close-modal" style={{ top: '4px' }}>
            <img src="../static/img/x-white.svg" onClick={closeModal} />
          </div>
        </div>
      </Modal>
    </>
  );
};
Recorder.propTypes = {
  concatInput: PropTypes.func.isRequired,
  modalRecorderOpen: PropTypes.func.isRequired
};
export default Recorder;
// export default class Recorder extends React.Component {

// 	static propTypes = {
// 		concatInput: PropTypes.func.isRequired,
// 		modalRecorderOpen: PropTypes.func.isRequired,
// 	};

// 	constructor(props) {
// 		super(props);

// 		state = {
// 			record: false,
// 			wait: false,
// 			modalIsOpen: true,
// 			uploading: false,
// 			blobURL: '',
// 			blob: '',
// 			options: ''
// 		}

// 	}

// 	componentDidMount() {
// 		// make module JS fucntion globaly available
// 		// window.uploadedAudio = uploaded;
// 		//document.domain="areabox.tv"
// 		//console.log( "domain", document.domain)
// 		/*
// 			var fn= function(event) {
// 							console.log("audio message", event, this.wait)
// 							if (event.origin !== "https://uploads.areabox.tv") return;

// 					if( this.wait) { // && this.lastData!=event.data
// 						this.lastData= event.data
// 						window.uploadedAudio(event.data);
// 					}

// 			}.bind(this)

// 			window.removeEventListener("message", fn, false);
// 			window.addEventListener("message", fn, false);
// 		*/
// 	}

// 	openModal = () => {
// 		this.props.modalRecorderOpen(true);
// 	}

// 	closeModal = () => {
// 		this.props.modalRecorderOpen(false);
// 	}

// 	uploaded = (url) => {
// 		console.log("window.uploaded this", this)
// 		this.props.concatInput(url)
// 	}

// 	startRecording = () => {
// 		console.log("recording")
// 		this.setState({
// 			record: true
// 		});
// 	}

// 	stopRecording = () => {
// 		console.log("stopped")
// 		this.setState({
// 			record: false, wait: true
// 		});
// 	}

// 	onData = (recordedBlob) => {
// 		console.log('chunk of real-time data is: ', recordedBlob);
// 	}

// 	onStop = (recordedBlob) => {
// 		const { blob, blobURL, options } = recordedBlob;
// 		this.setState({
// 			blob,
// 			blobURL,
// 			options
// 		})
// 		console.log('recordedBlob is: ', recordedBlob);

// 		axios({
// 			method: 'get',
// 			url: blobURL,
// 			responseType: 'blob',
// 		})
// 			.then(response =>
// 				new Promise(resolve => {
// 					const reader = new FileReader();
// 					reader.readAsDataURL(response.data);
// 					reader.onloadend = () => {
// 						const base64data = reader.result;
// 						resolve(base64data);
// 					};
// 				})
// 			)
// 			.then(audioBase64 => {
// 				this.postData({ audioBase64 });
// 			})

// 	}

// 	// stopWorker() {
// 	// 	w.terminate();
// 	// 	w = undefined;
// 	// }

// 	postData = ({ audioBase64 }) => {
// 		const { options } = this.state;
// 		const { sendInput } = this.props;

// 		const ext = getAudioExtension(options);
// 		const url = `https://chat.areabox.tv/audio?ext=${ext}`;
// 		const formData = new FormData();
// 		formData.append('audiofile', audioBase64);
// 		this.setState({ uploading: true })
// 		axios.post(url, formData, { headers: { 'Content-Type': 'multipart/form-data' } })
// 			.then(res => {
// 				console.log('Uploaded audio >', res.data)
// 				const { storageUrl } = res.data;
// 				this.uploaded(storageUrl)
// 				sendInput();
// 				this.setState({ uploading: false, wait: false, status: 'Audio uploaded!' })
// 			}, err => {
// 				this.setState({ uploading: false, wait: false, status: `${err.message}. Please try again` })
// 			})
// 	}

// 	render() {
// 		const { modalIsOpen, record } = this.state;

// 		return (
// 			<React.Fragment>
// 				<Modal
// 					isOpen={modalIsOpen}
// 					style={customStyles}
// 					contentLabel="Recorder"
// 					shouldCloseOnOverlayClick={false}
// 					onAfterOpen={this.afterOpenModal}
// 					onRequestClose={this.closeModal}
// 				>
// 					<div className="recorder-container">
// 						<center>Record Audio</center>
// 						<ReactMic
// 							record={record}
// 							className="sound-wave"
// 							onStop={this.onStop}
// 							strokeColor="#ffffff"
// 							backgroundColor="#000000" />
// 						<br />
// 						{!this.wait &&
// 							<div className="recorder-container--buttons">
// 								<div className="start-stop--container">
// 									<img src="../static/img/record-gold.svg" alt="start record icon" />
// 									<input type="button" onClick={this.startRecording} className="footer_btn footer_btn_start" value="Start" />
// 								</div>
// 								<div className="start-stop--container">
// 									<img src="../static/img/stop-gold.svg" alt="stop record icon" />
// 									<input type="button" onClick={this.stopRecording} className="footer_btn footer_btn_stop" value="Stop" />
// 								</div>
// 							</div>
// 						}
// 						{this.wait &&
// 							<div id="loading">
// 								<span className="loader"><span className="loader-inner"></span></span>
// 							</div>
// 						}

// 						<div className="close-modal" style={{ top: '4px' }}>
// 							<img src="../static/img/x-white.svg" onClick={this.closeModal} />
// 						</div>
// 					</div>
// 				</Modal>
// 			</React.Fragment>
// 		);
// 	}
// }

/*<img className="center-img" src="/static/img/preload.gif" />
 */

//https://hacks.mozilla.org/2009/07/cross-site-xmlhttprequest-with-cors/
// function callOtherDomain(url, blob, onload) {
// 	var reader = new FileReader();
// 	reader.readAsDataURL(blob);
// 	reader.onloadend = function () {
// 		var base64data = reader.result;
// 		console.log("callOtherDomain have audio base64", typeof base64data, base64data.length);
// 		var frame = document.getElementById("audio_iframe").contentWindow.document
// 		console.log("callOtherDomain have frame", frame);
// 		frame.getElementById("audioForm").action = url;
// 		console.log("callOtherDomain have action");
// 		frame.getElementById("audio_b64").value = base64data;
// 		console.log("callOtherDomain have set value");
// 		frame.getElementById("audioForm").submit();
// 		console.log("callOtherDomain have submited");
// 		onload();
// 	}
// }

// function callOtherDomainPreflighted(url, blob, ext, onload) {
// 	var xhr = new XMLHttpRequest();

// 	if (xhr) {
// 		xhr.open('POST', url, true);
// 		xhr.onload = onload;
// 		xhr.setRequestHeader('X-PINGOTHER', 'pingpong');
// 		xhr.setRequestHeader('Content-Type', 'audio/' + ext);
// 		xhr.onreadystatechange = function () {
// 			if (xhr.readyState == 4) {
// 				if (xhr.status == 200) console.log("200", xhr.responseText);
// 				else console.log("xhr Errors Occured ", xhr.readyState, " status is ", xhr.status);
// 			}
// 			else console.log("xhr state ", xhr.readyState);
// 		}
// 		xhr.send(blob);
// 	}
// }
