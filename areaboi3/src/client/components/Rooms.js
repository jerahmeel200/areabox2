import React from 'react';
import PropTypes from 'prop-types';

import Modal from 'react-modal';
import Link from 'next/link';
import {
  child,
  get,
  onValue,
  orderByKey,
  query,
  ref as refD
} from 'firebase/database';

const publicRoomKey = 'public-room';
const publicRoomTitle = 'Development';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: '0 auto'
  },
  content: {
    top: '45px',
    left: '15%',
    right: 0,
    bottom: 'auto',
    width: '85%',
    marginRight: '-50%',
    backgroundColor: 'black',
    color: 'white'
  }
};

export default class Rooms extends React.Component {
  static propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    currentRoomKey: PropTypes.number,
    user: PropTypes.string,
    newRoomFn: PropTypes.func.isRequired,
    modalClosed: PropTypes.func.isRequired,
    rooms: PropTypes.object.isRequired
  };

  constructor(props) {
    super(props);

    console.log('Rooms constructor v1.001', props.modalOpened);

    this.state = {
      hasRooms: false,
      modalIsOpen: props.modalOpened,
      loading: true,
      mentionCount: null
    };
  }
  componentWillReceiveProps(nextProps) {
    if (this.props.modalOpened !== nextProps.modalOpened) {
      if (nextProps.modalOpened) this.openModal();
      else this.closeModal();
    }
  }
  componentDidMount() {
    const chatRef = this.props.gChatRef;
    console.log('chatRef', chatRef);

    const currentUser = this.props.user;
    const mentionCountRef = child(
      refD(chatRef, `users/${currentUser}/profile`),
      'mentionCount'
    ); // chatRef.ref(`users/${currentUser}/profile`).child('mentionCount');

    onValue(mentionCountRef, (snapshot) => {
      this.setState({ mentionCount: snapshot.val() });
    });
    // mentionCountRef.on('value', snapshot => {
    //   this.setState({ mentionCount: snapshot.val() });
    // });
    // console.log("mentionCountRef", snapshot.val);
  }

  componentWillUpdate() {
    /*var el= document.getElementsByClassName('ReactModal__Overlay')[0]
     if( el!=null) { 
	console.log("rooms_list scrollIntoView");
	el.scrollIntoView();
     } else console.log("rooms_list NOT scrollIntoView");*/
    if (this.state.modalIsOpen) Modal.setAppElement('#messages'); //#__next
  }

  getRooms = () => {
    //not used, it is already availble from LoginData
    console.log('Rooms getRooms');
    let currentRoomKey = 0;

    if (this.props.currentRoomKey) currentRoomKey = this.props.currentRoomKey;

    const gChatRef = this.props.gChatRef; //FirebaseDatabase()
    console.log('gChatRef ', typeof gChatRef);
    if (!gChatRef) return;
    const ref = query(refD(gChatRef, 'rooms'), orderByKey()); // gChatRef.ref("rooms").orderByKey()//creation time
    //.orderByChild("title") //text sort
    return get(ref, (dataSnapshot) => {
      const posts = [];
      dataSnapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        const time =
          childSnapshot.exportVal()['.priority'] || item['.priority'];
        // const time = getPriority(childSnapshot)// childSnapshot.getPriority();
        item.hhmm = '';
        if (time) {
          item.hhmm = formatTime(time);
        }
        //item.key= childSnapshot.key
        console.log('k ', item.key, item.title, item.is_private);

        if (item.key !== currentRoomKey && !item.metro)
          //&& !item.is_private
          posts.push(item);
      });

      // text sort
      /*
      posts.sort(function(a, b) {
         return ('' + a.title).localeCompare(b.title);
      });
      */
      console.log('posts # ', posts.length);
      this.rooms = posts;

      this.setState({ hasRooms: posts.length > 0, loading: false });
      //this.setState({modalIsOpen: true});
    });
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false });
    this.props.modalClosed();
  };

  handleSelectAndClose = (i) => {
    this.props.handleColor(i);
    setTimeout(() => {
      this.closeModal();
    }, 500);
  };

  handleMentions = () => {
    console.log('Mentions Modal opened');
  };

  render() {
    const { newRoomFn, rooms, addNewRoomModalOpen, handleMentions } =
      this.props;
    const hasRooms = Object.keys(rooms).length > 0;
    const { loading, mentionCount } = this.state;

    // console.log("rooms # ", rooms);

    var newRoom = function () {
      this.closeModal();
      newRoomFn();
      addNewRoomModalOpen();
    }.bind(this);

    if (!this.state.modalIsOpen) return null;
    else
      return (
        <Modal
          closeTimeoutMS={500}
          isOpen={this.state.modalIsOpen}
          style={customStyles}
          contentLabel="Rooms"
          shouldCloseOnOverlayClick={true}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}>
          {hasRooms && (
            <ul id="rooms_list" ref={(endi) => (this.room1 = endi)}>
              <li className="rooms_item add_channel">
                <span style={{ width: '0.5rem' }} className="channel-icon">
                  <img src="static/img/add-channel.svg" />
                </span>
                <span onClick={newRoom}>Add a channel</span>
              </li>

              <li className="rooms_item mentions">
                <div className="unreadMention-container">
                  <span style={{ width: '0.5rem' }} className="unreadMention">
                    <img src="static/img/@at_icon-red.svg" />
                  </span>
                  <span className="unreadNotifc">
                    {mentionCount === 0 || null ? null : mentionCount}
                  </span>
                </div>
                <span onClick={handleMentions}>Mentions</span>
              </li>
              {Object.values(rooms).map((room, i) => (
                <li key={room.key} className="rooms_item">
                  <span style={{ width: '0.5rem' }}>
                    <Link
                      onClick={() => this.handleSelectAndClose(i)}
                      href={
                        '/?rk=' +
                        encodeURIComponent(room.key) +
                        '&rt=' +
                        encodeURIComponent(room.title)
                      }>
                      {/* <a onClick={() => this.handleSelectAndClose(i)}> */}
                      {rooms &&
                        rooms[room.key] &&
                        rooms[room.key].num_unread > 0 && (
                          <div className="unreadNotif rooms_notif">
                            <div>
                              <span className="unreadBolt">
                                <img src="static/img/notification.svg" />
                              </span>
                              <span className="unreadNotifc">
                                {rooms[room.key].num_unread}
                              </span>
                            </div>
                          </div>
                        )}
                      {/* </a> */}
                    </Link>
                  </span>
                  <span>
                    <Link
                      legacyBehavior
                      href={
                        '/?rk=' +
                        encodeURIComponent(room.key) +
                        '&rt=' +
                        encodeURIComponent(room.title)
                      }>
                      <a onClick={() => this.handleSelectAndClose(i)}>
                        {room.title}
                      </a>
                    </Link>
                  </span>
                </li>
              ))}
            </ul>
          )}

          {!hasRooms && (
            <div key={9999}>
              <p>No rooms available</p>
            </div>
          )}
        </Modal>
      );
  }
}

function formatTime(date) {
  return timeSince(date) + ' ago';
}

function timeSince(date) {
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = Math.floor(seconds / 31536000);

  if (interval > 1) {
    return interval + ' years';
  }
  interval = Math.floor(seconds / 2592000);
  if (interval > 1) {
    return interval + ' months';
  }
  interval = Math.floor(seconds / 86400);
  if (interval > 1) {
    return interval + ' days';
  }
  interval = Math.floor(seconds / 3600);
  if (interval > 1) {
    return interval + ' hours';
  }
  interval = Math.floor(seconds / 60);
  if (interval > 1) {
    return interval + ' minutes';
  }
  return Math.floor(seconds) + ' seconds';
}
