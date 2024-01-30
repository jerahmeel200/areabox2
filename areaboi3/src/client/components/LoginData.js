import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FirebaseDatabase } from '../settings/firebase.js';
import { ACTION_SET_ROOMS_LIST } from '../store';
import {
  child,
  limitToLast,
  onChildAdded,
  onValue,
  orderByChild,
  orderByKey,
  orderByPriority,
  query,
  ref as refD,
  setWithPriority,
  startAt
} from 'firebase/database';

const global_chat_tag_min_len = 3;

// handles data for channel list and notifications

export default class LoginData extends Component {
  constructor(props) {
    super(props);

    const { user, room_key } = this.props;
    console.log('LoginData const.', user);

    //will hold in memory props for rooms
    this.gRoomsList = {};
    //where msgs are stored
    this.gChatRef = FirebaseDatabase;
    // this.gMessagesRef = this.gChatRef.ref("chat");
    this.gMessagesRef = refD(this.gChatRef, 'chat'); // this.gChatRef.ref("chat");

    //rooms known to a user
    this.gRoomsRef_user = child(refD(this.gChatRef, 'users'), user + '/rooms'); //this.gChatRef.ref("users").child();
    //all rooms
    this.gAllRoomsRef = refD(this.gChatRef, 'rooms'); // this.gChatRef.ref("rooms");

    // for bots, currently disabled
    //this.gQueueFbOut= gChatRef.child("queue/web/responses");
    //this.gQueueFbIn= gChatRef.child("queue/web/requests");

    //for simple export of all messages to third party
    //this.gExportRef= this.gChatRef.ref("export");

    this.getRooms = this.getRooms.bind(this);
    this.getNumMsgsUnread = this.getNumMsgsUnread.bind(this);
    this.addRoomToCache = this.addRoomToCache.bind(this);
    this.getRoomNotifications = this.getRoomNotifications.bind(this);
    this.markRoomAsRead = this.markRoomAsRead.bind(this);

    this.getRooms(room_key);

    this.state = {};
  }

  render() {
    //maybe render some status message later
    return null;
  }

  // gets unread notifications of rooms
  getNumMsgsUnread(room_key) {
    console.log('LoginData getNumMsgsUnread');

    const { gRoomsList } = this;
    if (!gRoomsList[room_key]) return -1;
    return gRoomsList[room_key].num_unread;
  }

  getRooms(curr_room_key) {
    console.log('LoginData getRooms');
    const { gChatRef, gAllRoomsRef, gRoomsRef_user } = this;
    const { dispatch, LoginDataLoaded } = this.props;
    const ref = query(gAllRoomsRef, orderByKey()); // orderByChild() //gAllRoomsRef.orderByKey()//creation time
    return new Promise((resolve) => {
      onValue(ref, (dataSnapshot) => {
        dataSnapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          item.key = childSnapshot.key;
          if (!item.is_private && !item.metro) {
            onValue(
              child(gRoomsRef_user, item.key),
              (snap) => {
                let time;
                if (snap?.exportVal()) {
                  time =
                    snap?.exportVal()['.priority'] || snap.val()['.priority']; //.getPriority();
                  // console.log("line 75: ", snap, snap?.exportVal());
                } else {
                  time = snap;
                  // console.log("%cno priority", "background: green", snap);
                }
                this.addRoomToCache(item, time, curr_room_key);
              },
              { onlyOnce: true }
            );
            // gRoomsRef_user.child(item.key).once("value").then( function(snap) {
            // const time = snap.getPriority();
            // this.addRoomToCache( item, time, curr_room_key)
            // }.bind(this))
          }
        });
        dispatch({
          type: ACTION_SET_ROOMS_LIST,
          payload: { gRoomsList: this.gRoomsList }
        });
        console.log('LoginData loaded', Object.keys(this.gRoomsList).length);
        LoginDataLoaded();
        resolve(dataSnapshot);
      });
    });
    // return ref.once("value").then(
    //   function (dataSnapshot) {
    //       dataSnapshot.forEach( function(childSnapshot) {
    //         const item = childSnapshot.val()
    //         item.key= childSnapshot.key
    //         if( !item.is_private && !item.metro ){
    //             gRoomsRef_user.child(item.key).once("value").then( function(snap) {
    //             const time = snap.getPriority();
    //             this.addRoomToCache( item, time, curr_room_key)
    //             }.bind(this))
    //         }
    //     }.bind(this))
    //     dispatch({type: ACTION_SET_ROOMS_LIST,  payload:{gRoomsList: this.gRoomsList} })
    //     console.log("LoginData loaded", Object.keys( this.gRoomsList).length)
    //     LoginDataLoaded()
    //   }.bind(this)
    // )
  }

  // FROM HERE ALL ARE SUB ROUTINES, not ready to call directly

  // add a room to this components cache, optionally set proprity of room (has been read)
  addRoomToCache(data, t, curr_room_key) {
    const { gRoomsList } = this;

    //if( gRoomsList[data.key] ) return; //duplicate
    if (!gRoomsList[data.key]) {
      gRoomsList[data.key] = data;
      gRoomsList[data.key].num_unread = 0;
    }
    //update room as been read
    if (t > 0) gRoomsList[data.key].priority = t;

    if (data.key != curr_room_key) {
      // listen for counts of msgs only on other rooms, not this room as it would render data unsorted
      //if( t==0) /* public only */
      this.getRoomNotifications(data.key);
    } else {
      this.markRoomAsRead(curr_room_key); // initial room
    }
  }

  //gets messages count for a room
  getRoomNotifications(key) {
    //console.log("LoginData getRoomNotifications")

    const { gChatRef } = this;
    const { gRoomsList } = this;

    if (!gRoomsList[key]) return;
    if (!gRoomsList[key].priority) gRoomsList[key].priority = 0;

    //count just a few messages for speed
    onChildAdded(
      query(
        child(this.gMessagesRef, key),
        orderByPriority(),
        startAt(gRoomsList[key].priority),
        limitToLast(10)
      ),
      (snapshot) => {
        gRoomsList[key].num_unread++;
      },
      { onlyOnce: true }
    );
    //   this.gMessagesRef.child(key).orderByPriority().startAt( gRoomsList[key].priority).limitToLast(10)
    //   .on('child_added', function(snapshot) {
    //       gRoomsList[key].num_unread++;
    //   });
  }

  // the last time the user read the room msgs is in the users's room reference:
  markRoomAsRead(room_key) {
    console.log('LoginData markRoomAsRead');
    const { gRoomsList, gRoomsRef_user } = this;
    var t = new Date().getTime();

    //mark room as read by setting priority to time = now
    if (gRoomsRef_user) {
      // console.log("LoginData markRoomAsRead set fb", room_key, t)
      setWithPriority(child(gRoomsRef_user, room_key), false, t);
      // gRoomsRef_user.child(room_key).setWithPriority( false, t);
    }
    //time that was read:
    if (!gRoomsList[room_key]) gRoomsList[room_key] = {};
    gRoomsList[room_key].priority = t;
    gRoomsList[room_key].num_unread = 0;
    //not here since is done last for all rooms
    //dispatch({type: ACTION_SET_ROOMS_LIST,  payload:{gRoomsList: gRoomsList} })
  }
} //class

LoginData.propTypes = {
  user: PropTypes.string.isRequired,
  room_key: PropTypes.string.isRequired,
  dispatch: PropTypes.func.isRequired,
  LoginDataLoaded: PropTypes.func.isRequired
  //refresh: PropTypes.bool.isRequired,
};
