import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
// import Iframe from './Iframe' // as in global styles (nextjs wiki)
import axios from 'axios';
import FileIcon from 'react-file-icon';
import { ref } from 'firebase/database';
import { getDownloadURL, ref as refS, uploadBytes } from 'firebase/storage';
import { firebaseStorage } from '../settings/firebase';
import { v4 } from 'uuid';
import { isUriAudio, isUriGif, isUriImage, isUriPdf, isUriVideo } from '../lib';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.7)',
    margin: '0 auto'
  },
  content: {
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

export default class UploadForm extends React.Component {
  componentWillMount() {
    Modal.setAppElement('#__next');
  }

  constructor(props) {
    super();

    this.state = {
      modalIsOpen: true, //props.uploadFormActive
      fileName: '',
      uploading: false,
      status: '',
      extension: ''
    };
  }

  static propTypes = {
    uploadFormActive: PropTypes.number.isRequired,
    modalUploadOpen: PropTypes.func.isRequired,
    user: PropTypes.string,
    concatInput: PropTypes.func.isRequired,
    setImageUrl: PropTypes.func.isRequired
  };

  componentDidMount() {
    // make module JS fucntion globaly available
    /*window.uploaded= this.uploaded; 

    var fn= function(event) {
          console.log("upload message", event, this.state.modalIsOpen)  
          if (event.origin !== "https://uploads.areabox.tv") return;
      if( this.state.modalIsOpen ) {//&& this.lastData!=event.data
        this.lastData= event.data
        window.uploaded(event.data); 
      } 
    }.bind(this)
    
    window.removeEventListener("message", fn, false);  
    window.addEventListener("message", fn, false);  
    */
  }

  uploaded = (url) => {
    //prompt("it worked !" , url)
    // console.log(url);
    if (url) {
      this.props.concatInput(url);
    }
  };

  openModal = () => {
    //this.setState({modalIsOpen: true});
    this.props.modalUploadOpen(true);
  };

  afterOpenModal = () => {
    // references are now sync'd and can be accessed.
    this.subtitle.style.color = '#f00';
  };

  closeModal = () => {
    //this.setState({modalIsOpen: false});
    this.props.modalUploadOpen(false);
  };

  handleFileChange = (e) => {
    console.log('dfdfdfdfdfdf');
    const { fileName } = this.state;
    const fileSize = fileName.size / 1024 / 1024; //size in MB
    if (fileSize > 10) {
      this.setState({ status: 'File cannot be larger than 10MB' });
      return;
    }
    const getFileExtension = (filename) => filename.split('.').pop();
    const extension = getFileExtension(e.target.files[0].name);
    this.setState({
      status: '',
      fileName: e.target.files[0],
      extension: extension
    });
  };

  uploadImageToFirebase = (e) => {
    // e.preventDefault();
    const { fileName } = this.state;

    if (!fileName || fileName?.size === undefined) {
      this.setState({ status: 'Please select a file first' });
      return;
    }
    let fileType;
    switch (true) {
      case isUriPdf(fileName.name):
        fileType = 'pdfs';
        break;
      case isUriAudio(fileName.name):
        fileType = 'audios';
        break;
      case isUriVideo(fileName.name):
        fileType = 'videos';
        break;
      case isUriGif(fileName.name):
        fileType = 'gifs';
        break;
      case isUriImage(fileName.name):
        fileType = 'images';
        break;
    }

    console.log(fileType);
    const imageUrl = `${fileType}/${fileName.name + v4()}`;
    const uploadImageRef = refS(firebaseStorage, imageUrl);
    uploadBytes(uploadImageRef, fileName)
      .then((snapshot) => {
        getDownloadURL(snapshot.ref).then((url) => {
          this.props.setImageUrl(url);
          console.log(url);
        });
      })
      .then(() => this.closeModal())
      .catch((e) => {
        console.log(e.message);
      });
    console.log(fileName);
  };

  handleSubmit = (e) => {
    e.preventDefault();
    // this.uploadImageToFirebase();
    const url = 'https://chat.areabox.tv/upload';
    const { fileName } = this.state;
    const { sendInput } = this.props;

    if (!fileName || fileName?.size === undefined) {
      this.setState({ status: 'Please select a file first' });
      return;
    }

    const formData = new FormData();
    formData.append('recfile', this.state.fileName);
    this.setState({ uploading: true });
    axios
      .post(url, formData, {
        headers: { 'Content-Type': 'multipart/form-data' }
      })
      .then(
        (res) => {
          console.log('Uploaded file >', res.data.storageUrl);
          const { storageUrl, message } = res.data;
          this.uploaded(storageUrl);
          if (sendInput) {
            sendInput(storageUrl);
          }
          this.setState({ uploading: false, status: message });
        },
        (err) => {
          this.uploaded(false);
          console.log(err);
          this.setState({
            uploading: false,
            status: `${err.message}. Please try again`
          });
        }
      );
  };

  render() {
    const { modalIsOpen, status, fileName, extension } = this.state;
    console.log('166 open');
    return (
      <div>
        <Modal
          isOpen={modalIsOpen}
          style={customStyles}
          contentLabel="Uploader"
          shouldCloseOnOverlayClick={true}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}>
          <h2 ref={(subtitle) => (this.subtitle = subtitle)}></h2>

          <div className="upload-file-container">
            <p className="upload-header">Upload a file</p>
            <p className="upload-subheader">Photo. Video. Document. Audio</p>

            <form
              id="uploadForm"
              onSubmit={this.handleSubmit}
              encType="multipart/form-data">
              <div className="filesZ-container">
                <label htmlFor="filesZ" id="file-input--label">
                  Choose File
                </label>
                <input
                  type="file"
                  id="filesZ"
                  name="recfile"
                  style={{ display: 'none' }}
                  onChange={this.handleFileChange}
                />
              </div>

              <div className="file-details">
                {this.state.extension && (
                  <FileIcon
                    size={24}
                    color="#34364E"
                    gradientOpacity={0}
                    labelColor="#34364E"
                    labelTextColor="#FFF606"
                    foldColor="#FFF606"
                    radius={0}
                    extension={extension}
                    {...`defaultStyles.${extension}`}
                  />
                )}
                <p className="fileName">
                  {!this.state.uploading ? fileName.name : ''}
                </p>
              </div>
              <span className="fileName status">{status}</span>

              <div
                id="upload-loading"
                style={{ display: this.state.uploading ? 'block' : 'none' }}>
                <span className="loader">
                  <span className="loader-inner"></span>
                </span>
              </div>

              <div className="upload-btn--container">
                {/* <input  type="submit" value="Upload" /> */}
                <button type="submit">
                  <img
                    src="../static/img/upload-yellow.svg"
                    alt="upload icon"
                  />
                  Upload
                </button>
              </div>
            </form>

            <div className="close-modal">
              <img src="../static/img/x-white.svg" onClick={this.closeModal} />
            </div>
          </div>
        </Modal>
      </div>
    );
  }
}
