//import 'babel-polyfill'

import React from 'react';
import PropTypes from 'prop-types';
//import { connect} from 'react-redux'

import Layout from '../../layouts/MsgList';

import FirebaseDatabase from '../../settings/firebase';
import Link from 'next/link';
import { publicRoomKey, publicRoomTitle } from '../../store';
import { child, get, onValue, ref } from 'firebase/database';

// export default class Rooms extends React.Component {
//room_key: 0

//props
//currentRoomKey

//   static async getInitialProps({ store, pathname, query, isServer }) {
Rooms.getInitialProps = async ({ store, pathname, query, isServer }) => {
  let currentRoomKey = 0;

  let state00 = {
    room: { key: publicRoomKey, title: publicRoomTitle, isPublic: true }
  };
  console.log(publicRoomKey);
  // const state= store.getState()

  console.log('Rooms');
  console.log('server ', isServer);
  console.log('q ', query);
  if (query.rk) currentRoomKey = query.rk;

  const gChatRef = FirebaseDatabase;
  // console.log(gChatRef);
  //console.log("gChatRef ", gChatRef);
  // const ref = gChatRef.ref("rooms");

  //new code for firebase update
  // const dbRef = ref("rooms");
  const dbRef = ref(gChatRef, 'rooms');

  // return ref.once("value").then(function(dataSnapshot) {

  return new Promise((resolve) => {
    const callback = function (dataSnapshot) {
      const posts = [];
      dataSnapshot.forEach((childSnapshot) => {
        const item = childSnapshot.val();
        // const time = childSnapshot.getPriority();
        const time = childSnapshot.priority;
        item.hhmm = '';
        if (time) {
          item.hhmm = formatTime(time);
        }

        //console.log("k ", item.key)
        if (item.key !== currentRoomKey && !item.is_private && !item.metro)
          posts.push(item);
      });
      // console.log(posts);
      //console.log("rooms # ", posts.length)
      //const state0= Object.assign({}, default_state, {posts})
      resolve({ posts });
    };
    onValue(dbRef, callback);
  });
  //Note: getInitialProps must return a Promise or converts result into one
};

//   constructor(props) {
//     super(props);
//   }

export default function Rooms(props) {
  //   render() {
  // const { posts } = this.props;
  const { posts } = props;
  // console.log(this.props);
  //   console.log(posts);

  return (
    <div
      style={{
        width: '100vw',
        minWidth: '360px',
        maxWidth: '768px',
        margin: '0 auto'
      }}>
      <Layout />

      <header className="header contact">
        <div className="fixed-nav-bar">
          <div className="mascot-div">
            <a href="/">
              <img className="mascot" src="../static/img/areabox_logo.svg" />
            </a>
          </div>
          <div className="header-div">
            <section className="main_header"></section>
            <section className="sub_header notif" style={{ paddingTop: '5px' }}>
              <center style={{ fontFamily: 'ScriberStencil' }}>
                <span>Channels</span>
              </center>
            </section>
          </div>
        </div>
      </header>

      <center
        style={{
          backgroundColor: 'black',
          color: 'white',
          fontFamily: 'ScriberStencil',
          paddingTop: '95px',
          cursor: 'pointer'
        }}>
        <div>
          {posts?.map((room) => (
            <div key={room} className="rooms_item">
              <Link
                legacyBehavior
                key={room?.key}
                href={
                  '/?rk=' +
                  encodeURIComponent(room.key) +
                  '&rt=' +
                  encodeURIComponent(room.title)
                }>
                <p>{room?.title}</p>
              </Link>
            </div>
          ))}
        </div>

        {posts?.length == 0 && (
          <div key={9999}>
            <p>No other rooms available</p>
          </div>
        )}
      </center>
    </div>
  );
}

//   componentDidMount() {}

//   componentWillUnmount() {}
// }

//redux
//export default connect( state => state )(Rooms);

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
