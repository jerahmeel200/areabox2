import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';
/*
const publicRoomKey= "public-room"
const publicRoomTitle= "Development"
*/
const customStyles = {
  overlay: {
    backgroundColor: 'rgba(255, 255, 255, 1)',
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
    color: 'white'
  },
  input: {
    backgroundColor: 'black',
    color: 'white'
  }
};

export default class NewRoom extends React.Component {
  static propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    //gChatRef: PropTypes.object, //.required 0 on start commented to avoid type check
    //currentRoomKey: PropTypes.number,
    userName: PropTypes.string.isRequired,
    modalClosed: PropTypes.func.isRequired
  };

  constructor(props) {
    super(props);
    console.log('NewRoom constructor props.modalOpened');
    //this.NewRooms= this.NewRooms.bind(this)
    this.openRoom = this.openRoom.bind(this);
    this.state = {
      hasErr: false,
      modalIsOpen: props.modalOpened,
      title: '',
      isPublic: true,
      isAddPublic: false,
      isChannelModal: false,
      skipForNow: false,
      inviteInput: '',
      errors: {
        title: '',
        inviteInput: ''
      }
    };
    this.public = true;
    this.title = '';
    //this.rooms=[]
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.modalOpened !== nextProps.modalOpened) {
      if (nextProps.modalOpened) this.openModal();
      else this.closeModal();
    }
  }

  componentWillMount() {
    //Modal.setAppElement('#__next');
  }

  componentWillUpdate() {
    //console.log( "NewRoom componentWillUpdate", this.props.modalOpened )

    if (this.props.modalOpened && !this.state.modalIsOpen) {
      console.log('newR opening');
      this.openModal();
      return;
    }
    if (!this.props.modalOpened && this.state.modalIsOpen) {
      console.log('newR closing');
      this.closeModal();
      return;
    }

    if (!this.props.modalOpened) return;

    console.log('NewRooms');
    Modal.setAppElement('#__next');
  }

  openRoom(key, tit) {
    window.top.location =
      '/?rk=' + encodeURIComponent(key) + '&rt=' + encodeURIComponent(tit);
  }

  openModal = () => {
    const { addNewRoomModalOpen } = this.props;
    this.setState({ modalIsOpen: true });
    addNewRoomModalOpen();
  };

  afterOpenModal = () => {};

  closeModal = () => {
    const { addNewRoomModalClose } = this.props;
    this.setState({ modalIsOpen: false });
    this.props.modalClosed();
    addNewRoomModalClose();
  };

  render() {
    //const {rooms}= this;
    const { hideHeader, showHeader } = this.props;
    const { hasErr, title, inviteInput, isAddPublic, isChannelModal, errors } =
      this.state;

    //console.log("New room", this.state.modalIsOpen)

    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        style={customStyles}
        contentLabel="New Room"
        shouldCloseOnOverlayClick={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}>
        {!hasErr && !isAddPublic ? (
          <div className="newRoom-container">
            <img
              src="../static/img/x-black.svg"
              className="newRoom-container--close"
              onClick={this.closeModal}
            />

            <div className="newRoom-conversation">
              <div className="newRoom-conversation--child">
                <img src="../static/img/search_black.svg" alt="Search Icon" />
                <input
                  className="newRoom-conversation--input"
                  placeholder="Find or Join a Conversation"
                  onFocus={hideHeader}
                  onBlur={showHeader}
                />
              </div>
              <p className="newRoom-conversation--desc">
                Please explore other channels before adding a new one
              </p>
            </div>

            <div
              className="newRoom-messaging"
              onClick={this.handleNewPublicModal}>
              <div className="newRoom-mini--container">
                <div className="newRoom-messaging--child">
                  <img src="../static/img/big_black_edit.svg" alt="edit icon" />
                  <div className="newRoom-messaging--subchild">
                    <p className="newRoom-messaging--title">
                      Start Direct Messaging
                    </p>
                    <p className="newRoom-messaging--desc">
                      Direct Messages are private chats
                    </p>
                  </div>
                </div>
              </div>
            </div>

            <div
              className="newRoom-channel"
              onClick={this.handleNewPublicModal}>
              <div className="newRoom-mini--container">
                <div className="newRoom-channel--child">
                  <img src="../static/img/PAS_icon.svg" alt="PAS icon" />
                  <div className="newRoom-channel--subchild">
                    <p className="newRoom-channel--title">
                      Create a Public Channel
                    </p>
                    <p className="newRoom-channel--desc">
                      Public Channels are open to anyone
                    </p>
                  </div>
                </div>
              </div>
              {/* <form style={{ background: 'white' }} onSubmit={this.handleSubmit}>
                <input name="newRoom" id="newRoom" onChange={this.handleChangeN} value={title} title="New Room title" placeholder="Subject" type="text" />
                <button onClick={this.newChatSubmit} className="ui-btn">Ok</button>
              </form> */}
            </div>
          </div>
        ) : (
          <div>
            {isChannelModal && (
              <div className="newRoom-container">
                <div className="newRoom-name">
                  <div className="newRoom-name--child">
                    <img
                      src="../static/img/PAS_icon.svg"
                      width="25px"
                      height="22px"
                      alt="Search Icon"
                    />
                    <input
                      className="newRoom-name--input"
                      onFocus={hideHeader}
                      onBlur={showHeader}
                      onChange={this.handleChangeN}
                    />
                    {(title.length > 24 || title.trim() === '') && (
                      <span className="newRoom-name--error">
                        {errors.title}
                      </span>
                    )}
                  </div>
                  <div
                    className="newRoom-name--desc"
                    onClick={this.handleNewInviteModal}>
                    <p>Enter Channel name</p>{' '}
                    <img
                      src="../static/img/yellow-arrow.svg"
                      alt="Submit icon"
                    />
                  </div>
                </div>
              </div>
            )}
            {!isChannelModal && (
              <div className="newRoom-container">
                <div className="newRoom-name">
                  <div className="newRoom-name--desc newRoom-name--title">
                    <p>{title}</p>
                  </div>
                  <div className="newRoom-name--child">
                    <img
                      src="../static/img/big_black_edit.svg"
                      width="25px"
                      height="22px"
                      alt="Search Icon"
                    />
                    <input
                      className="newRoom-name--input"
                      onFocus={hideHeader}
                      onBlur={showHeader}
                      onChange={this.handleInviteInput}
                      title="Enter email or phone numbers separated by a comma"
                      placeholder="Enter email or phone numbers separated by a comma"
                    />
                    {inviteInput.trim() === '' && (
                      <span className="newRoom-name--error">
                        {errors.inviteInput}
                      </span>
                    )}
                  </div>
                  <div
                    className="newRoom-name--desc"
                    onClick={this.newChatSubmit}>
                    <p>Invite a friend or two</p>{' '}
                    <img
                      src="../static/img/yellow-arrow.svg"
                      alt="Submit icon"
                    />
                  </div>
                  <form onSubmit={this.handleSubmit}>
                    <div className="newRoom-skip">
                      <span onClick={this.handleSkipForNow}>
                        <p>Skip for now</p>
                        <img src="../static/img/skip-black.svg" />
                      </span>
                    </div>
                  </form>
                </div>
              </div>
            )}
          </div>
        )}
      </Modal>
    );
  }

  /*
   
   
<div>
            <input type="radio" id="room_public" name="room_visib" value="public" checked="checked"/>
            <label htmlFor="room_public">Public - anyone can join</label>
          </div>
          <div >
            <input type="radio" id="room_private" name="room_visib" value="private" onChange={this.handleChangeP}/>
            <label htmlFor="room_private">Private - invite only</label>
          </div>
          
  */

  newChatSubmit = () => {
    const { title: title0, isPublic, inviteInput, skipForNow } = this.state;
    let title = title0;
    console.log('room_name, isPublic', title, isPublic);
    // title = title.trim()
    // if (title == "") return;
    if (inviteInput.trim() === '' && !skipForNow) {
      const error = 'Please invite atleast 1 friend';
      this.setState({ errors: { inviteInput: error } });
      return;
    }
    const { userName } = this.props;
    console.log('user', userName);
    const gChatRef = this.props.gChatRef;
    if (!gChatRef) return;

    var key = userName + '_' + new Date().getTime();
    //add to public rooms ?
    //var myRadio = $('input[name=room_visib]');
    var isPublic1 = isPublic; //myRadio.filter(':checked').val() == "public";
    let room = { key, title, isPublic1 };

    //add to user's known rooms
    var usersRef = gChatRef.ref('users');
    console.log('uR', usersRef);
    var userRef = usersRef.child(userName);
    console.log('uR', userRef);
    var roomsRef = userRef.child('rooms');
    console.log('rR', roomsRef);
    roomsRef.child(room.key).set(room);

    if (isPublic) {
      var roomsRef2 = gChatRef.ref('rooms');
      console.log('rsR', roomsRef2);
      var rkR = roomsRef2.child(room.key);
      console.log('rkR', rkR);
      rkR.set(room);
    }

    this.openRoom(room.key, room.title);
  };

  handleChangeP = (event) => {
    this.setState({ public: event.target.value });
  };
  handleChangeN = (event) => {
    const { value } = event.target;

    const error = value.length > 24 ? 'Character Limit Exceeded!' : '';
    this.setState({ title: value, errors: { title: error } });
  };

  handleSubmit = (event) => {
    alert('A room was submitted: ' + this.state.title);
    event.preventDefault();
  };

  handleNewPublicModal = () => {
    this.setState({
      isAddPublic: true,
      isChannelModal: true,
      skipForNow: false
    });
  };

  handleNewInviteModal = () => {
    if (this.state.title.trim() === '') {
      const error = 'Please enter a channel title';
      this.setState({ errors: { title: error } });
      return;
    }
    this.setState({ isChannelModal: false });
  };

  handleInviteInput = ({ target: { value } }) => {
    this.setState({ inviteInput: value });
  };

  handleSkipForNow = () => {
    this.setState({ skipForNow: true }, () => {
      this.newChatSubmit();
    });
  };
}
