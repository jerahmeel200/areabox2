import React, { Component } from 'react';
import PropTypes from 'prop-types';
import {
  child,
  endAt,
  get,
  limitToLast,
  off,
  onChildAdded,
  onChildChanged,
  onValue,
  orderByKey,
  query,
  ref as refD,
  remove,
  set,
  startAt,
  update
} from 'firebase/database';
import { connect } from 'react-redux';
import Snackbar from '../components/snackbar/Snackbar';

import Posts from './Posts';
import NewPost from './NewPost';
import Register from './Register';
import SignUp from './signUp';
// //import { style, merge } from 'next/css';
import UploadForm from './UploadForm';
import Recorder from './Recorder';
import Rooms from './Rooms';
import NewRoom from './NewRoom';
import Profile from './Profile';
import FullProfile from './UserProfile/fullProfile';
import Emoji from './Emoji';
import ToggleButton from './ToggleButton';
import Mentions from './Mentions';
import Link from 'next/link';
import Footer from './Footer_Black';
import Passport from './passport';
import Wallet from './wallet';

import RegisterChannelSvg from '../assets/svgs/register-icon.svg';
import ViewChannelsSvg from '../assets/svgComponents/nicons/ViewChannelsSvg';

import { getWordBits } from './IndexLib';
import lancasterStemmer from 'lancaster-stemmer';
import FirebaseDatabase, { auth } from '../settings/firebase';
import { NUM_MSGS } from '../store';
import { validateUser } from '../lib/userLib.js';
import LoginData from './LoginData';
import {
  ACTION_NEXT_PAGE,
  ACTION_SET_USER,
  ACTION_UPDATE_PAGE
} from '../store';
import intervalToDuration from 'date-fns/intervalToDuration';
import Home from './Home';
import { Timestamp, serverTimestamp } from 'firebase/firestore';

const pubRoomTitle = 'Public Room';
const PleaseRegisterMsg = 'Press to Register and write messages';
const defaultUserName = 'anonymous';

export class AsyncApp extends Component {
  constructor(props) {
    super(props);
    this.handleHideSnackbar = this.handleHideSnackbar.bind(this);
    this.handleShowSnackbar = this.handleShowSnackbar.bind(this);

    this.input = '';
    this.last_inputActivated = false;
    this.runRegisterFinish = false;
    this.runPleaseRegister = false;
    this.updateWordsIndex = this.updateWordsIndex.bind(this);

    this.firebaseRefs = [];
    (this.defaultMessage = 'Hello, the city’s yours! ✍️'),
      (this.state = {
        showSnackbar: false,
        showFullProfile: false,
        inputActivated: false,
        inputMessage: '',
        registered: false,
        registering: false,
        signup: false,
        userLogedIn: '',
        message: '', //"Loading ...",
        LoginDataLoaded: false,
        commenting: false,
        editing: false,
        initialMessage: '',
        editKey: 0,
        uploadFormActive: false,
        recordAudioActive: false,
        modalRoomsOpened: false,
        modalNewRoomOpened: false,
        num_unread: -1,
        channels: [],
        selectMediaType: false,
        ShowProfileBtn: false,
        userMetadata: {},
        userWallet: {},
        modalProfileOpened: false,
        selectEmoji: false,
        lastInputActivated: false,
        isSearchBoxOpen: false,
        isSearchPage: this.props.searchWords ? true : false,
        isChecked: this.props.recent ? false : true,
        color: '',
        prevScrollpos: 0,
        headerVisible: true,
        inputVisible: true,
        goSearchLink: 'index',
        addRoomModalOpen: false,
        showLogout: false,
        showProfile: false,
        passport: false,
        wallet: false,
        saleInfo: '',
        userDetails: false,
        viewUser: '',
        walletOptions: {
          wallet: {
            gen: '',
            spec: ''
          },
          clicked: '',
          chosen: undefined
        },
        phoneNo: ''
      }),
      (this.meta = {});
    this.goSearchElem = 0;
    this.searchTimeout = 0;
    this.gChatRef = FirebaseDatabase;

    this.changeReg = this.changeReg.bind(this);
  }

  changeReg() {
    document.getElementById('register').style.display = 'none';
    this.setState({ registering: false, signup: false, registered: true });
  }
  handleHideSnackbar() {
    this.setState({ showSnackbar: false });
  }
  handleShowSnackbar() {
    this.setState({ showSnackbar: true, ShowProfileBtn: false });
    console.log('snackbar is showing now');
  }
  componentDidMount() {
    this.setState({
      color:
        JSON.parse(localStorage.getItem('backgroundColor')) ||
        'rgba(242, 220, 252, 0.1)',
      prevScrollpos: window.scrollY
    });

    //Add scroll event
    // window.addEventListener('scroll', this.handleScroll);
    var fn = function (callback) {
      // PULL DOWN
      var pStart = { x: 0, y: 0 };
      var pStop = { x: 0, y: 0 };

      function swipeStart(e) {
        //console.log("offset swipeStart", typeof e['targetTouches']);
        //console.log("offset swipeStart", typeof e.screenY);
        if (typeof e['targetTouches'] !== 'undefined') {
          var touch = e.targetTouches[0];
          pStart.x = touch.screenX;
          pStart.y = touch.screenY;
        } else {
          pStart.x = e.screenX;
          pStart.y = e.screenY;
        }
      }

      function swipeEnd(e) {
        //console.log("offset swipeEnd", typeof e['targetTouches']);
        //console.log("offset swipeEnd", typeof e.screenY);
        if (typeof e['changedTouches'] !== 'undefined') {
          var touch = e.changedTouches[0];
          pStop.x = touch.screenX;
          pStop.y = touch.screenY;
        } else {
          pStop.x = e.screenX;
          pStop.y = e.screenY;
        }

        swipeCheck();
      }

      function swipeCheck() {
        //console.log("offset", pStart.y - pStop.y)
        var changeY = pStart.y - pStop.y;
        var changeX = pStart.x - pStop.x;
        if (isPullDown(changeY, changeX)) {
          //console.log('offset Down!', callback);
          callback();
        }
      }

      function isPullDown(dY, dX) {
        // methods of checking slope, length, direction of line created by swipe action
        return (
          window.scrollY == 0 &&
          dY < 0 &&
          Math.abs(dX) <= 100 &&
          Math.abs(dY) >= 150
        );
      }
      //console.log("set listener for pull down offset", window.document.addEventListener);
      window.document.addEventListener(
        'touchstart',
        function (e) {
          swipeStart(e);
        },
        false
      );
      window.document.addEventListener(
        'touchend',
        function (e) {
          swipeEnd(e);
        },
        false
      );
    };
    fn(this.pullDown);

    addScript('static/lib/emoji/emoji.min.js'); // continue on didUpdate // for :emoji: replacements
    /*
    // safari prevent state errors due to back-forward-cache
      console.log("did mount asyncApp");
      window.onpageshow = function(event) {
          console.log("onpageshow");	
          if (event.persisted) {
        console.log("onpageshow reload");
        window.location.reload() 
          }
      };
    */

    /*
    var fn = function (event) {
      console.log("upload message", event)
      if (event.origin !== "https://chat.areabox.tv" || "https://uploads.areabox.tv") return;
      this.concatInput(event.data);

    }.bind(this)

    window.addEventListener("message", fn, false);
    */

    //load rooms
    //old code
    // const ref = this.gChatRef.ref("rooms");

    //new code
    const ref = refD(this.gChatRef, 'rooms');

    // return ref.once("value").then(
    //new code
    return new Promise((resolve) =>
      onValue(ref, (dataSnapshot) => {
        const posts = [];
        dataSnapshot.forEach((childSnapshot) => {
          const item = childSnapshot.val();
          const time = item.priority;
          item.hhmm = '';
          if (time) {
            item.hhmm = formatTime(time);
          }

          //console.log("k ", item.key)
          if (!item.is_private && !item.metro) posts.push(item);
        });
        //console.log("rooms # ", posts.length)
        //const state0= Object.assign({}, default_state, {posts})
        // console.log(posts);
        //old code
        //   return this.setState({ channels: posts });
        resolve(this.setState({ channels: posts }));
      })
    );
  } //didMount

  handleKeyPress = (e) => {
    if (e.which == 13 && !e.shiftKey) this.sendInput();
  };

  LoginDataLoaded = () => {
    const { page, posts } = this.props;
    const { editing } = this.state;
    console.log(this.state.userLogedIn);
    if (!this.state.LoginDataLoaded && this.state.userLogedIn != '') {
      this.setState({ LoginDataLoaded: true });
    }
    if (this.lastBox && page.n == 1 && !posts) this.lastBox.scrollIntoView();
  };

  componentWillUnmount() {
    var ref0 = child(refD(this.gChatRef, 'chat'), room_key);
    var ref = query(
      ref0,
      orderByKey(),
      startAt(window.gLatestPrio),
      limitToLast(1)
    ); //get one latest
    this.firebaseRefs.push(ref);
    // onChildAdded(
    //   ref,
    //   function (childSnapshot) {
    //     if (window.gLatestPrio == childSnapshot.key) return;
    //     const item = childSnapshot.val();
    //     if (!item.key) item.key = childSnapshot.key;
    //     let eq_items = items.filter((it) => it.key == item.key);
    //     if (eq_items.length > 0) {
    //       return; //already exists and is an update / edit
    //     }
    //     console.log("detected a new post", item.key);
    //     window.gLatestPrio = item.key;
    //     item.room_key = room_key;
    //     item.user = item.name;
    //     let time =
    //       item.edited ||
    //       childSnapshot.exportVal()[".priority"] ||
    //       childSnapshot[".priority"];
    //     item.hhmm = "";
    //     if (time) {
    //       item.hhmm = formatTime(time);
    //     }
    //     if (item.comment) {
    //       item.replyto_txt =
    //         item.replyto_user + " (" + formatTime(item.replyto_prio) + ")";
    //     }
    //     //old code
    //     //   ref.off("child_added");
    //     off(ref, "child_added");

    //     //new code
    //     items.push(item);
    //     console.log("new post", item);
    //     this.updateStorePosts(items);
    //   }.bind(this)
    // );
  }

  componentDidUpdate() {
    if (!window.gLatestPrio) window.gLatestPrio = this.props.page.gLatestPrio;

    var bindedSetState_fn = this.bindedSetState_fn;

    const { page, tag } = this.props;
    const {
      inputActivated,
      userLogedIn,
      editing,
      lastInputActivated,
      isSearchBoxOpen
    } = this.state;
    const room_key = page.room_key;

    var inputMessage = this.state.inputMessage;

    if (typeof EmojiConvertor != 'undefined' && !window.emoji) {
      //emoji.js loaded on didMount
      var emoji = new EmojiConvertor();

      for (var i in emoji.img_sets) {
        emoji.img_sets[i].path = '/js-emoji/build/emoji-data/img-' + i + '-64/';
        emoji.img_sets[i].sheet =
          '/js-emoji/build/emoji-data/sheet_' + i + '_64.png';
      }

      emoji.use_sheet = true;

      emoji.init_env();
      var auto_mode = emoji.replace_mode;
      emoji.img_set = 'apple';
      emoji.replace_mode = auto_mode;
      emoji.text_mode = false;
      window.emoji = emoji;
    } //emoji

    if (window.emoji && inputMessage.length > 0) {
      var msg2 = window.emoji.replace_colons(inputMessage);
      if (msg2 != inputMessage) {
        inputMessage = msg2;
        console.log('emoji', msg2);
      }
    } // emoji

    if (
      this.props.loggedIn == 1 &&
      this.props.userInfo &&
      !this.state.registered &&
      !this.runRegisterFinish
    ) {
      //logged in, set metadata
      this.onRegisterFinish(this.props.userInfo, {});
    }
    if (
      this.props.loggedIn == 0 &&
      !this.state.registered &&
      !this.runPleaseRegister
    ) {
      //please register
      this.runPleaseRegister = true;
      this.setState({
        message: PleaseRegisterMsg
      });
    }
    var elem = document.getElementById('messageText');
    if (
      inputActivated &&
      this.last_inputActivated != inputActivated &&
      elem != null
    ) {
      //page.n==1 &&
      elem.focus();
      //if (editing && this.lastBox) this.lastBox.scrollIntoView() //no need with current layout and caused issues
      this.last_inputActivated = inputActivated;
    }

    //any new post?
    const { posts } = this.props;
    let items = posts; //.reverse()
    window.userLogedIn = userLogedIn;

    if (
      page.n == 1 &&
      this.gChatRef &&
      window.gLatestPrio &&
      room_key &&
      !tag
    ) {
      //new code
      var ref0 = child(refD(this.gChatRef, 'chat'), room_key);
      var ref = query(
        ref0,
        orderByKey(),
        startAt(window.gLatestPrio),
        limitToLast(1)
      ); //get one latest
      this.firebaseRefs.push(ref);
      // off(ref, "child_added");

      //console.log("set fn for new post", typeof(this.gChatRef ), room_key, window.gLatestPrio )
      onChildAdded(
        ref,
        (childSnapshot) => {
          if (window.gLatestPrio == childSnapshot.key) return;
          const item = childSnapshot.val();
          if (!item.key) item.key = childSnapshot.key;
          let eq_items = items.filter((it) => it.key == item.key);
          if (eq_items.length > 0) {
            return; //already exists and is an update / edit
          }
          console.log('detected a new post', item.key);
          window.gLatestPrio = item.key;
          item.room_key = room_key;
          item.user = item.name;
          let time =
            childSnapshot.exportVal()['.priority'] ||
            childSnapshot['.priority'] ||
            Date.now(); // TODO needs to be changed to timestamp in the future
          item.hhmm = 'z';
          item.time = time;
          // console.log(Timestamp.now().toMillis(), Date.now(), Timestamp.toString());
          const timePromise = Promise.resolve(formatTime(time));
          if (time) {
            timePromise.then((value) => (item.hhmm = value));
            // item.hhmm = formatTime(time);
          }
          if (item.comment) {
            item.replyto_txt =
              item.replyto_user + ' (' + formatTime(item.replyto_prio) + ')';
          }
          off(ref, 'child_added');
          items.push(item);
          console.log('new post', item, time);
          timePromise.then(() => this.updateStorePosts(items));

          //old code
          //   ref.off("child_added");

          //new code
        },
        { onlyOnce: true }
      );
    }

    //NEW gets updates of any edits
    //Added comments for deployment
    if (this.gChatRef && window.gLatestPrio && room_key) {
      //   var refc = this.gChatRef
      //     .ref("chat")
      //     .child(room_key)
      //     .orderByKey();
      var refc = child(refD(this.gChatRef, 'chat'), room_key);
      refc = query(
        refc,
        orderByKey(),
        endAt(window.gLatestPrio)
        // limitToLast(NUM_MSGS)
      );
      //   refc = refc.endAt(window.gLatestPrio); //.limitToLast(NUM_MSGS);
      this.firebaseRefs.push(refc);
      //   refc.off("child_changed");
      off(refc, 'child_changed');
      //new code
      onChildChanged(refc, (childSnapshot) => {
        if (window.gLatestPrioEdit == childSnapshot.key) return; // prevent check again for eficiency
        window.gLatestPrioEdit = childSnapshot.key;
        const item = childSnapshot.val();

        item.key = childSnapshot.key;
        item.room_key = room_key;
        item.user = item.name;

        console.log('detected an edited post, key:', item.key, item.text);

        //   refc.off("child_changed");
        // off(refc, "child_changed");

        //if( item.user ==  window.userLogedIn )
        //  return;

        let time =
          childSnapshot?.exportVal()['.priority'] ||
          item['.priority'] ||
          Date.now();
        console.log(time, 'time');
        // console.log(item.edited, childSnapshot?.exportVal()[".priority"]);
        item.hhmm = formatTime(time);
        if (time) {
          item.hhmm = formatTime(time);
          console.log(`%c time: ${item.hhmm}`, 'color:green;');
        }
        if (item.comment) {
          item.replyto_txt =
            item.replyto_user + ' (' + formatTime(item.replyto_prio) + ')';
        }
        let eq_items = items.filter((it) => it.key == item.key);
        off(refc, 'child_changed');
        if (eq_items.length > 0) {
          let n = items.indexOf(eq_items[0]);
          items[n] = item;
          this.updateStorePosts(items);
          console.log(this.updateStorePosts);
        }
      }); //end refc.on

      if (lastInputActivated != inputActivated) {
        if (inputActivated) this.handleTextareaSize();
        this.setState({
          lastInputActivated: inputActivated
        });
      }
    } //end: new get updated of any edits

    if (isSearchBoxOpen && this.searchField && this.searchField.focus) {
      this.searchField.focus();
    }
  } //didUpdate

  /*getNumMsgsUnread = () => {
    const { gRoomsList } = this.props;
    const { num_unread } = this.state;

    let copy = [];
    if (gRoomsList) {
      var n = 0;
      for (var k in gRoomsList) {
        copy[k] = gRoomsList[k].num_unread;
      }
      for (var k in copy) {
        n += copy[k]
      }
      if (num_unread != n)
        this.setState({ num_unread: n }) //items.reverse()
    }
  }*/

  componentWillUnmount() {
    clearInterval(this.timer);
    localStorage.clear();
    this.firebaseRefs.forEach((ref) => {
      //   ref.off("child_added");
      //   ref.off("child_changed");
      //new code
      off(ref, 'child_added');
      off(ref, 'child_changed');
    });
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.firebaseRefs = [];
  }

  goToMetro = () => {
    window.top.location = '/metro';
  };

  goLive = () => {
    window.top.location = '/live';
  };
  render() {
    const {
      page,
      defaultUserName,
      tag,
      searchWords,
      gRoomsList,
      dispatch,
      posts
    } = this.props;
    // console.log("this is posts from asyncapp", posts)
    const {
      showFullProfile,
      inputMessage,
      inputActivated,
      registering,
      signup,
      userLogedIn,
      message,
      LoginDataLoaded,
      commenting,
      editing,
      initialMessage,
      uploadFormActive,
      recordAudioActive,
      modalRoomsOpened,
      modalNewRoomOpened,
      num_unread,
      selectMediaType,
      ShowProfileBtn,
      userMetadata,
      userWallet,
      modalProfileOpened,
      selectEmoji, //isSearchPage, isChecked,
      goSearchLink,
      headerVisible,
      addRoomModalOpen,
      editKey,
      registered,
      showLogout,
      showProfile,
      passport,
      wallet,
      userDetails,
      viewUser,
      walletOptions,
      myProfile,
      saleInfo,
      channels,
      phoneNo,
      showSnackbar
    } = this.state;
    const room_key = page?.room_key;
    const { updatePost, gChatRef } = this;
    let userName = defaultUserName;
    if (userLogedIn != '') userName = userLogedIn;
    let form_action = ''; // the same page
    let placeholder = commenting
      ? 'Type a comment...'
      : editing
      ? 'Edit message: '
      : 'Message...';
    let no_input = !!(
      (tag && tag.length > 0 && !page.original_post_key) ||
      searchWords
    ); // page.n > 1

    const layout = page?.room_layout || '';
    const default_layout = layout == '';
    const featured_channel = !default_layout;

    if (editing || commenting) no_input = false;
    if (featured_channel) no_input = true;
    const readonly = !!(!registered || no_input);

    const styles_subheader =
      registered && gRoomsList != null && num_unread > 0
        ? 'sub_header notif'
        : 'sub_header no_notif';
    // console.log("asyncApp v01.097 no_input", no_input, layout, page);
    let footFirst = registered
      ? { text: 'my channels', url: '/' }
      : { text: 'SIGN UP', url: '' };
    let foot = [
      footFirst,
      { text: 'metro', url: '/metro' },
      { text: 'radio', url: '?rk=Radio' },
      { text: 'school', url: '?rk=basicSchool' },
      { text: 'cinema', url: '?rk=Cinema' }
    ];

    return (
      <>
        <div
          className="app-container"
          // style={{ backgroundColor: this.state.color }}
        >
          {(registered || registering) && (
            <header
              className={`header contact ${
                headerVisible ? 'show-header' : 'hide-header'
              }`}
              // onClick={this.deActivateInput}
            >
              <div className="fixed-nav-bar">
                <div className="mascot-div" onClick={this.goHome}>
                  {/* <img
                    className="messagepage-mascot"
                    // src="static/img/AreaBox.png"
                    alt="areabox"
                    style={{ height: "40px", width: "40px" }}
                  /> */}
                  {/* was commented out<img
                className="mascot"
                src="../static/img/areabox_logo.svg"
                
              ></img> was commented out*/}
                  <h4 className="mascot-text">AREABOX</h4>
                </div>
                <div className="header-div">
                  <section className="main_header">
                    <form
                      className={`searchbox-container ${
                        this.state.isSearchBoxOpen ? 'open-searchbox' : ''
                      }`}
                      id="searchForm"
                      onSubmit={this.handleSearch}>
                      <div className="searchbox">
                        <Link legacyBehavior href={goSearchLink}>
                          <a ref={(e) => (this.goSearchElem = e)}>
                            <i className="search-icon">
                              <img
                                src="../static/img/Search.png"
                                width="18px"
                                height="18px"
                                alt="search icon"
                              />
                            </i>
                          </a>
                        </Link>
                        <input
                          className="search-field"
                          type="text"
                          name="search"
                          ref={(field) => (this.searchField = field)}
                          id="searchField"
                          onChange={this.handleSearch}
                        />
                        <i
                          onClick={this.closeSearchBox}
                          className="fa fa-times"
                          aria-hidden="true"></i>
                      </div>
                    </form>
                    <div className="tab-container">
                      <a
                        className="tab"
                        onClick={
                          inputActivated
                            ? this.deActivateInput
                            : this.activateInput
                        }>
                        Message
                      </a>
                      <a className="tab" onClick={this.openSearchBox}>
                        Search
                      </a>
                      <a className="tab" onClick={this.goToMetro}>
                        Discover
                      </a>
                    </div>
                  </section>

                  {!registering && !userDetails && (
                    <section className={styles_subheader}>
                      <div className="unreadNotif">
                        {/* {this.handleNotifLensToggle(
                      registered,
                      gRoomsList,
                      num_unread,
                      this.state.isSearchPage,
                      addRoomModalOpen
                    ) */}
                        <div>
                          <span className="unreadBolt">
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              xmlnsXlink="http://www.w3.org/1999/xlink"
                              version="1.1"
                              x="0px"
                              y="0px"
                              viewBox="0 0 100 125"
                              xmlSpace="preserve"
                              style={{
                                enableBackground: 'new 0 0 100 100',
                                fill: 'yellow',
                                width: '35px',
                                height: '35px',
                                cursor: 'pointer'
                              }}>
                              <g>
                                <path d="M49.3,17h3.8c4,0,8,0.1,12,0.3c1.6,0.1,3.2,0.2,4.8,0.4c1.3,0.2,2.7,0.2,4,0.5c2.6,0.6,5,1.8,7,3.6   c2.8,2.6,4.7,6.2,4.9,10.1c0.1,1.5,0.4,3,0.5,4.5c0.3,3,0.4,6.1,0.5,9.2c0,0.1,0,0.2,0,0.4v2c-0.1,0.7-0.1,1.3-0.1,2   c0,1.6-0.1,3.2-0.3,4.8c-0.2,2-0.5,4-0.7,6c-0.4,3.7-2.3,7.3-5.1,9.8c-2.7,2.4-6.2,3.7-9.7,3.8c1.7,1.2,3.3,2.6,4.7,4.1   c0.4,0.4,0.8,0.8,1.1,1.4c0.5,0.9,0.5,2,0.1,2.9c-0.4,0.9-1.1,1.5-2,1.9c-1,0.4-2.2,0.2-3.1-0.3c-0.6-0.4-0.9-0.9-1.4-1.4   c-2.6-2.6-5.7-4.7-9-6.1c-5.1-2.2-11-2.8-16.4-1.5c-2.7,0.6-5.2,1.7-7.5,3.2c-2,1.2-3.8,2.7-5.4,4.5c-0.4,0.4-0.6,0.8-1,1.1   c-1,0.8-2.4,1-3.5,0.5c-0.9-0.4-1.7-1.2-1.9-2.2c-0.3-1-0.1-2.2,0.6-3c1.5-1.9,3.3-3.5,5.2-4.9c-1.8-0.1-3.6-0.5-5.3-1.2   c-2.5-1.1-4.7-2.8-6.3-5c-1.6-2.2-2.7-4.8-2.9-7.6c-0.1-0.8-0.2-1.5-0.3-2.3c-0.3-1.8-0.4-3.6-0.5-5.3c-0.2-3-0.2-5.9-0.2-8.9   c0-3.2,0.2-6.4,0.6-9.6c0.1-1,0.3-2,0.4-3c0.3-3.5,2-6.9,4.5-9.3c2.2-2.2,5-3.6,8-4.2c0.9-0.2,1.9-0.2,2.8-0.3   c2.4-0.3,4.8-0.5,7.2-0.6C42.5,17.1,45.9,17.1,49.3,17 M45.2,24c-2.4,0-4.7,0.1-7.1,0.2c-1.7,0.1-3.5,0.2-5.2,0.5   c-1,0.1-2.1,0.1-3.1,0.4c-1.4,0.3-2.7,1.1-3.7,2c-1.5,1.4-2.4,3.3-2.6,5.3c-0.1,1.5-0.4,3-0.6,4.5c-0.3,3.1-0.4,6.3-0.4,9.5   c0,4,0.2,8,0.8,11.9c0.2,1,0.2,2.1,0.4,3.2c0.3,1.2,0.9,2.3,1.7,3.3c1.5,1.8,3.8,2.9,6.1,2.9c12.9,0,25.8,0,38.7,0   c1.5,0,2.9-0.3,4.2-1.1c2-1.1,3.5-3,4-5.2c0.2-0.8,0.3-1.7,0.4-2.6c0.2-1.3,0.4-2.7,0.5-4c0.3-3.1,0.4-6.3,0.3-9.5   c-0.1-3.6-0.2-7.2-0.7-10.7c-0.1-0.7-0.2-1.5-0.2-2.2c-0.1-1.1-0.4-2.2-0.9-3.1c-1.1-2.1-3.1-3.6-5.4-4.2c-0.6-0.2-1.2-0.2-1.8-0.3   c-1.2-0.1-2.3-0.3-3.5-0.4c-3.5-0.3-7.1-0.4-10.6-0.5C52.8,23.9,49,23.9,45.2,24z" />
                                <path d="M43.5,36.5c3.8-0.2,7.7-0.2,11.5-0.1c2,0,4,0.1,6,0.3c0.7,0.1,1.4,0.1,2.2,0.3c0.4,1.5,0.4,3.1,0.5,4.6   c0.1,2.3,0.1,4.6,0,6.8c-0.1,1.5-0.2,3-0.5,4.4C61.3,53,59.5,53,57.6,53c-3,0-6,0-9-0.1c-0.8,0-1.6-0.1-2.3-0.2   c-2.4,1.8-4.7,3.6-7.1,5.4c0-0.2,0-0.5,0-0.7c-0.3-3.8-0.3-7.7-0.3-11.5c0-3,0-6,0.3-9.1C40.6,36.7,42,36.6,43.5,36.5z" />
                              </g>
                            </svg>
                          </span>
                        </div>
                      </div>
                      {registered && (
                        <a
                          onClick={this.openModalRooms}
                          style={
                            this.state.isSearchPage || addRoomModalOpen
                              ? {
                                  margin: '0',
                                  paddingLeft: '46px',
                                  textAlign: 'left'
                                }
                              : { margin: '0 auto' }
                          }
                          className="rooms_btn"
                          title="Rooms">
                          {addRoomModalOpen
                            ? 'Add a new channel'
                            : page.room_title}
                        </a>
                      )}
                      {!registered && (
                        <Link legacyBehavior href="/Rooms">
                          <a
                            style={
                              this.state.isSearchPage
                                ? {
                                    margin: '0',
                                    paddingLeft: '46px',
                                    textAlign: 'left'
                                  }
                                : { margin: '0 auto' }
                            }
                            className="rooms_btn"
                            title="Rooms">
                            {console.log('right', page.room_title)}
                            {page.room_title}
                          </a>
                        </Link>
                      )}

                      {/*this.handleRoomiconSearchToggle(
                    registered,
                    gRoomsList,
                    this.state.isSearchPage
                   ) */}
                      {this.handleRightHeadIcon(
                        page.room_key,
                        registered,
                        gRoomsList,
                        this.state.isSearchPage
                      )}
                    </section>
                  )}
                  {registering && !userDetails && (
                    <section className={styles_subheader}>
                      {registered && (
                        <a
                          onClick={this.openModalRooms}
                          style={
                            this.state.isSearchPage || addRoomModalOpen
                              ? {
                                  margin: '0',
                                  paddingLeft: '46px',
                                  textAlign: 'left'
                                }
                              : { margin: '0 auto' }
                          }
                          className="rooms_btn"
                          title="Rooms">
                          {
                            //addRoomModalOpen ? "Add a new channel" : page.room_title
                          }
                        </a>
                      )}
                      {!registered && (
                        <Link legacyBehavior href="/Rooms">
                          <a
                            style={
                              this.state.isSearchPage
                                ? {
                                    margin: '0',
                                    paddingLeft: '46px',
                                    textAlign: 'left'
                                  }
                                : { margin: '0 auto' }
                            }
                            className="rooms_btn"
                            title="Rooms">
                            {
                              //page.room_title
                            }
                            REGISTER
                          </a>
                        </Link>
                      )}

                      {/*this.handleRoomiconSearchToggle(
                    registered,
                    gRoomsList,
                    this.state.isSearchPage
                   ) */}
                      <a
                        onClick={this.openModalRooms}
                        title="Rooms"
                        className="rooms_icon">
                        <span>
                          <img
                            className="view_channels"
                            src="static/img/register-icon.svg"
                            style={{ height: '15px', width: '15px' }}
                          />
                        </span>
                      </a>
                    </section>
                  )}
                  {userDetails && (
                    <section className={styles_subheader}>
                      <div className="unreadNotif" onClick={this.hideAll}>
                        <div
                          style={{
                            height: '100%',
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center'
                          }}>
                          <span className="unreadBolt">
                            <svg
                              width="19"
                              height="18"
                              viewBox="0 0 19 18"
                              fill="yellow"
                              xmlns="http://www.w3.org/2000/svg"
                              style={{
                                fill: 'white',
                                width: '19px',
                                height: '19px',
                                cursor: 'pointer'
                              }}>
                              <path d="M15.4878 11.9763L11.0802 11.9763V12.5272C11.0802 13.4455 10.5905 14.3025 9.73342 14.6698C8.87639 15.0983 7.89693 14.9759 7.16233 14.425L2.02014 10.5071C1.95892 10.6295 1.95892 10.8132 1.95892 10.9968C1.95892 11.4866 2.14257 11.9151 2.50987 12.1599L9.67221 17.6694C10.1007 18.0367 10.7129 18.0979 11.2638 17.8531C11.7536 17.6082 12.1209 17.1185 12.1209 16.5063V15.5269C12.1209 15.2208 12.3657 14.9759 12.6718 14.9759L17.4467 14.9759C18.2425 14.9759 18.9159 14.3025 18.9159 13.5067V8.42573C18.9159 7.75235 18.4874 7.2014 17.8752 7.01775V9.52763C17.9364 10.9356 16.8345 11.9763 15.4878 11.9763Z" />
                              <path d="M7.7745 0.345098L0.612165 5.85459C0.244866 6.16067 0 6.58919 0 7.0177C0 7.50743 0.18365 7.93595 0.612165 8.18082L7.7745 13.6903C8.20302 14.0576 8.81518 14.1188 9.36613 13.874C9.85586 13.6291 10.2232 13.1394 10.2232 12.5272V11.5477C10.2232 11.2416 10.468 10.9968 10.7741 10.9968L15.549 10.9968C16.3448 10.9968 17.0182 10.3234 17.0182 9.52758V4.44661C17.0182 3.65079 16.3448 2.97741 15.549 2.97741L10.7129 2.97741C10.4068 2.97741 10.1619 2.73254 10.1619 2.42646V1.447C10.1619 0.896048 9.85586 0.345098 9.30491 0.100232C8.81518 -0.0834179 8.20302 -0.0222015 7.7745 0.345098Z" />
                            </svg>
                          </span>
                        </div>
                      </div>
                      {registered && (
                        <a
                          onClick={this.openModalRooms}
                          style={
                            this.state.isSearchPage || addRoomModalOpen
                              ? {
                                  margin: '0',
                                  paddingLeft: '46px',
                                  textAlign: 'left'
                                }
                              : { margin: '0 auto' }
                          }
                          className="rooms_btn"
                          title="Rooms">
                          {passport && !showProfile && 'PASSPORT'}
                          {wallet && 'WALLET'}
                          {showProfile && 'PROFILE'}
                        </a>
                      )}
                    </section>
                  )}
                </div>
              </div>
            </header>
          )}

          {registering && !signup && (
            <section id="register" className="register">
              <Register
                show={registering}
                onRegisterFinish={this.onRegisterFinish}
                changeReg={this.changeReg}
                register={this.register}
                signUp={this.signUp}
                phone={this.getPhoneNo}
                firebase={gChatRef}
              />
            </section>
          )}

          {registering && signup && (
            <section id="register" className="register">
              <SignUp
                changeReg={this.changeReg}
                onRegisterFinish={this.onRegisterFinish}
                firebase={gChatRef}
                phoneNo={phoneNo}
              />
            </section>
          )}
          {!registered && !registering && <Home register={this.register} />}
          {!registering && registered && (
            <section className="messages" id="messages" style={{}}>
              {posts === undefined && (
                <span className="colorful-loader">
                  <span className="colorful-loader-inner"></span>
                </span>
              )}
              {true && !userDetails && (
                <div ref={(el) => (this.messagesDiv = el)}>
                  <div
                    className={
                      (page.LastMsgKey ? 'load-more' : 'loaded-last') +
                      ' mobile'
                    }>
                    {layout == '' && (
                      <Link
                        legacyBehavior
                        href={
                          '/?page=next&msg=' +
                          encodeURIComponent(page.LastMsgKey) +
                          '&rk=' +
                          encodeURIComponent(room_key) +
                          '&tag=' +
                          encodeURIComponent(tag)
                        }>
                        <a ref={(el) => (this.loadMore = el)}>
                          Load older messages ...{' '}
                        </a>
                      </Link>
                    )}
                  </div>
                  {layout == '' && !userDetails && (
                    <div
                      className={
                        (page.LastMsgKey ? 'load-more' : 'loaded-last') +
                        ' desktop'
                      }>
                      <Link
                        legacyBehavior
                        href={
                          '/?page=next&msg=' +
                          encodeURIComponent(page.LastMsgKey) +
                          '&rk=' +
                          encodeURIComponent(room_key) +
                          '&tag=' +
                          encodeURIComponent(tag)
                        }>
                        <a ref={(el) => (this.loadMore = el)}>
                          Load older messages ...
                        </a>
                      </Link>
                    </div>
                  )}
                  {!userDetails && (
                    <Posts
                      key={page.n}
                      posts={posts}
                      page={page}
                      userMetadata={userMetadata}
                      commentFn={this.activateInputComment}
                      editFn={this.editFn}
                      userLogedIn={userLogedIn}
                      registered={registered}
                      nocache="1.4"
                      profileFn={this.openModalProfile}
                      gChatRef={this.gChatRef}
                      readonly={readonly}
                      pinFn={this.pinFn}
                      layout={layout}
                      showPassport={this.showPassport}
                      showWallets={this.showWallet}
                      getSaleInformation={this.getSaleInformation}
                    />
                  )}

                  <div
                    style={{ height: '80px' }}
                    ref={(e) => (this.lastPost = e)}></div>
                </div>
              )}

              {registered && !userDetails && gRoomsList != null && (
                <div>
                  <Rooms
                    modalOpened={modalRoomsOpened}
                    gChatRef={this.gChatRef}
                    newRoomFn={this.newRoomFn}
                    rooms={gRoomsList}
                    modalClosed={this.modalRoomsClosed}
                    handleColor={this.handleColor}
                    addNewRoomModalOpen={this.addNewRoomModalOpen}
                    user={userName}
                  />
                  <NewRoom
                    modalOpened={modalNewRoomOpened}
                    gChatRef={this.gChatRef}
                    userName={userName}
                    modalClosed={this.modalNewRoomClosed}
                    addNewRoomModalOpen={this.addNewRoomModalOpen}
                    addNewRoomModalClose={this.addNewRoomModalClose}
                    hideHeader={this.hideHeader}
                    showHeader={this.showHeader}
                  />
                </div>
              )}
              {registered && (
                <Profile
                  modalOpened={modalProfileOpened}
                  gChatRef={this.gChatRef}
                  userMetadata={userMetadata}
                  username={userName}
                  modalClosed={this.modalProfileClosed}
                  onLogout={this.onLogout}
                  fullProfile={this.showProfile}
                  viewUser={viewUser}
                  wallet={this.showWallet}
                  send={this.onSend}
                />
              )}
              {registered && showProfile && !wallet && (
                <FullProfile
                  viewUser={viewUser}
                  username={userName}
                  passport={passport}
                  userMetadata={userMetadata}
                  wallet={this.showWallet}
                  channels={channels}
                  hideAll={this.hideAll}
                  firebase={this.gChatRef}
                  profileFn={this.openModalProfile}
                />
              )}
              {registered && passport && !wallet && !showProfile && (
                <Passport
                  send={this.onSend}
                  name={userLogedIn}
                  userMetadata={userMetadata}
                  userWallet={userWallet}
                  logOut={this.onLogout}
                  showProfile={this.showProfile}
                  firebase={this.gChatRef}
                  showWallet={this.showWallet}
                />
              )}
              {registered &&
                !passport &&
                wallet &&
                !showProfile &&
                userMetadata && (
                  <Wallet
                    userMetadata={userMetadata}
                    userWallet={userWallet}
                    firebase={this.gChatRef}
                    options={walletOptions}
                    chosen={viewUser}
                    saleInfo={saleInfo}
                    resetSend={this.resetSend}
                  />
                )}
            </section>
          )}
          {!registering && !userDetails && (
            <footer
              className="footer"
              // style={{
              //   backgroundColor: page.room_layout ? this.state.color : "transparent",
              // }}
            >
              <div
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                {showSnackbar && (
                  <Snackbar
                    message="Please be nice 🙃..."
                    duration={3000}
                    HideSnackbar={this.handleHideSnackbar}
                  />
                )}
              </div>
              <div>
                {this.state.ShowProfileBtn && (
                  <div
                    onClick={() => this.showProfile()}
                    style={{
                      width: '100px',
                      display: 'flex',
                      justifyContent: 'center',
                      backgroundColor: 'white',
                      gap: '10px',
                      border: '1px solid black',
                      borderBottom: '2px solid black',
                      paddingTop: '10px',
                      paddingBottom: '10px',
                      cursor: 'pointer',
                      margin: '10px'
                    }}>
                    <img
                      width={15}
                      height={20}
                      src={`static/img/ARISTOS/${userMetadata?.profile?.aristo}.png`}
                      alt="stuff"
                    />

                    {this.state.ShowProfileBtn && (
                      <p style={{ fontWeight: '700', fontSize: '12px' }}>
                        Profile
                      </p>
                    )}
                  </div>
                )}
              </div>

              <>
                {page.n > 1 && (
                  <div className="input-footer-closed">
                    <div className="input-div-hint">
                      <a
                        className="no_link"
                        href={'?page=1&rk=' + encodeURIComponent(room_key)}>
                        Press to check latest messages
                      </a>
                    </div>
                  </div>
                )}
                {!page.room_layout && !registering && (
                  <section className="sub_header_footer">
                    <div
                      className={'msg--me msg--input'}
                      style={{ paddingBottom: '0px' }}>
                      <div>
                        {registered &&
                          !readonly &&
                          !inputActivated &&
                          LoginDataLoaded &&
                          message.length > 0 && (
                            <div
                              className="input-footer-closed"
                              onClick={this.activateInput}>
                              <div className="input-div-hint">{message}</div>
                            </div>
                          )}
                        {registered &&
                          !inputActivated &&
                          !LoginDataLoaded &&
                          message.length > 0 && (
                            <div className="input-footer-closed">
                              <div className="input-div-hint">{message}</div>
                            </div>
                          )}

                        {registered &&
                          (!readonly || editing || commenting) &&
                          inputActivated && (
                            <div
                              className="input-footer-opened"
                              style={{
                                background: '#e8e5e5',
                                border: 'solid 1px black'
                              }}>
                              {/* 
                              LOG OUT
                              {registered &&
                                showLogout /*&& userName != defaultUserName  && (
                                  <a
                                    onClick={this.onLogout}
                                    className="signout-footer"
                                    title={"logout " + userName}
                                    style={{
                                      color: "black",
                                      position: "relative",
                                      left: "45px",
                                    }}
                                  >
                                    <span>
                                      <img src="static/img/nicons/logout.svg" />
                                      &nbsp;&nbsp;LOG OUT
                                    </span>
                                  </a>
                                )} */}

                              <form action={form_action}>
                                <div className="input-div">
                                  {selectMediaType && (
                                    <div
                                      id="attacharea"
                                      style={{
                                        transform: this.state.selectMediaType
                                          ? 'translateX(0)'
                                          : 'translateX(9999px)',
                                        position: 'absolute',
                                        bottom: '68px',
                                        background: '#e8e5e5'
                                      }}>
                                      <div className="input_btn_container">
                                        <button
                                          type="button"
                                          onClick={this.openModalUpload}
                                          className="inputs input_btn">
                                          <img
                                            className="input_btn_icon"
                                            src="static/img/Gallery.svg"
                                          />
                                          <span>Gallery</span>
                                        </button>
                                      </div>

                                      <div className="input_btn_container">
                                        <button
                                          type="button"
                                          onClick={this.recordAudio}
                                          className="inputs input_btn">
                                          <img
                                            className="input_btn_icon"
                                            src="static/img/Record.svg"
                                          />
                                          <span>Audio</span>
                                        </button>
                                      </div>

                                      <div className="input_btn_container">
                                        {/* onClick={this.goLive}*/}
                                        <button
                                          type="button"
                                          className="inputs input_btn">
                                          <img
                                            className="input_btn_icon"
                                            src="static/img/black-star.svg"
                                          />
                                          <span>Map</span>
                                        </button>
                                      </div>
                                    </div>
                                  )}

                                  {!recordAudioActive && (
                                    <div
                                      id="inputarea"
                                      style={{ padding: '2px' }}>
                                      <a
                                        onClick={this.openMediaType}
                                        style={{
                                          transform: this.state.selectMediaType
                                            ? 'rotate(45deg)'
                                            : 'rotate(0deg)'
                                        }}
                                        className="input_btn_plus">
                                        <span>+</span>
                                      </a>
                                      <div
                                        className="messageText-container"
                                        style={{
                                          // transform: this.state.selectMediaType
                                          //   ? "translateX(-9999px)"
                                          //   : "translateX(0)",
                                          display: 'flex',
                                          flexDirection: 'column'
                                        }}>
                                        <div>
                                          <span
                                            className="messageText-icons"
                                            title="profile"
                                            style={{
                                              left: '3px',
                                              zIndex: '30',
                                              top: '-2px',
                                              width: '30px',
                                              cursor: 'pointer'
                                            }}
                                            onClick={this.handleButtonClick}>
                                            <img
                                              src="static/img/Aretha.png"
                                              style={{
                                                width: '30px',
                                                height: '30px',
                                                objectFit: 'cover'
                                              }}
                                            />
                                          </span>
                                          <div id="messageTextWrapper">
                                            <Mentions
                                              textareaValue={initialMessage}
                                              setTextAreaValue={
                                                this.updateTextAreaValue
                                              }
                                              db={this.gChatRef}
                                              roomKey={room_key}
                                              currentUser={userName}>
                                              <textarea
                                                name="msg"
                                                id="messageText"
                                                onKeyPress={this.handleKeyPress}
                                                placeholder={placeholder}
                                                ref={(txt) =>
                                                  (this.input = txt)
                                                }
                                                onChange={this.handleChange}
                                                value={initialMessage}
                                                className="inputs"
                                                style={{
                                                  resize: 'none',
                                                  paddingLeft: '32px'
                                                }}></textarea>
                                            </Mentions>
                                          </div>
                                          <span className="messageText-icons">
                                            <span className="messageTextTag-logo">
                                              <img
                                                onClick={this.handleAt}
                                                src="static/img/@at_icon.svg"
                                              />
                                            </span>
                                            <span>
                                              <a
                                                onClick={this.openEmoji}
                                                className="inputs messageTextTag-emoji">
                                                <img src="static/img/input_emoji.svg" />
                                              </a>
                                            </span>
                                          </span>
                                        </div>
                                      </div>
                                    </div>
                                  )}

                                  <div id="input_plus">
                                    <div>
                                      {uploadFormActive && (
                                        <UploadForm
                                          uploadFormActive={uploadFormActive}
                                          modalUploadOpen={this.modalUploadOpen}
                                          user={userName}
                                          concatInput={this.concatInput}
                                          sendInput={this.sendInput}
                                        />
                                      )}
                                      {recordAudioActive && (
                                        <Recorder
                                          modalRecorderOpen={
                                            this.modalRecorderOpen
                                          }
                                          concatInput={this.concatInput}
                                          sendInput={this.sendInput}
                                        />
                                      )}

                                      {selectEmoji && (
                                        <Emoji
                                          modalOpened={selectEmoji}
                                          modalClosed={this.closeEmoji}
                                        />
                                      )}
                                    </div>
                                  </div>
                                </div>
                                <input type="hidden" name="page" value="post" />
                                <input
                                  type="hidden"
                                  name="rk"
                                  value={room_key}
                                />
                              </form>
                            </div>
                          )}
                        {registered &&
                          userName != defaultUserName &&
                          room_key &&
                          !LoginDataLoaded && (
                            <LoginData
                              user={userName}
                              room_key={room_key}
                              dispatch={dispatch}
                              LoginDataLoaded={this.LoginDataLoaded}
                            />
                          )}

                        {registered &&
                          userName != defaultUserName &&
                          !readonly && (
                            <NewPost
                              user={userName}
                              text={inputMessage}
                              comment={commenting}
                              active={!no_input}
                              updatePost={updatePost}
                              editKey={editKey}
                              gRoomsList={gRoomsList}
                              dispatch={dispatch}
                              page={page}
                              handleShowSnackbar={this.handleShowSnackbar}
                            />
                          )}
                      </div>
                    </div>

                    <center
                      // style={{ backgroundColor: this.state.color }}
                      ref={(endi) => (this.lastBox = endi)}>
                      {/* {!registered && (
                        <a
                          onClick={this.register}
                          title="Sign in"
                          className="signout-footer"
                          style={{
                            width: "350px",
                            height: "40px",
                            border: "solid 1px rgba(0, 0, 0, 0.2)",
                            position: "relative",
                            left: "1px",
                          }}
                        >
                          <span
                            style={{
                              color: "black",
                              fontSize: "14px",
                              fontFamily: "RobotoMonoBold",
                              fontWeight: "700",
                              height: "100%",
                              display: "flex",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <img
                              src="static/img/Aretha.png"
                              style={{
                                width: "30px",
                                height: "30px",
                                marginRight: "8px",
                              }}
                            />
                            SIGN UP
                          </span>
                        </a>
                      )} */}
                    </center>
                  </section>
                )}
              </>
              {page.room_layout && page.room_layout !== 'sales' && (
                <div className="black-footer">
                  {page.room_layout &&
                    foot
                      .filter(
                        (ind) =>
                          ind.text.toLowerCase() !==
                          page.room_layout.toLowerCase()
                      )
                      .map((ind, i) => {
                        if (i === 0) {
                          return (
                            <div
                              style={{ display: 'flex', alignItems: 'center' }}>
                              <a
                                onClick={this.register}
                                title="Sign in"
                                className="signout-footer">
                                <span className="sphinx">
                                  <img src="static/img/Aretha.png" />
                                </span>
                              </a>
                              <Link href={ind.url}>
                                <span className="footer-item">
                                  {ind.text.toUpperCase()}
                                </span>
                              </Link>
                            </div>
                          );
                        }
                        return (
                          <Link href={ind.url}>
                            <span className="footer-item">
                              {ind.text.toUpperCase()}
                            </span>
                          </Link>
                        );
                      })}
                </div>
              )}
            </footer>
          )}
        </div>
        <style jsx>
          {`
            .areabox-mascot {
              height: 40px;
              width: 40px;
              position: relative;
              left: 5px;
            }
            .view_channels {
              height: 14px;
              width: 14px;
            }
            .unreadBolt img {
              height: 35px;
              width: 35px;
              position: relative;
              left: 4px;
            }
            .black-footer {
              background: black;
              display: flex;
              justify-content: space-around;
              height: 30px;
              align-items: center;
              font-family: 'RobotoMonoBold';
              font-weight: 700;
              position: fixed;
              bottom: 0px;
              width: 100vw;
              max-width: 768px;
              min-width: 360px;
            }

            .mascot-text {
              margin-top: 2em;
              font-weight: 500;
              font-size: 18px;
              // text-align: center;
              font-family: stolzl;

              font-style: normal;
            }
            .black-footer img {
              width: 24px;
              height: 24px;
            }
            .signout-footer {
              position: relative;
              right: 4px;
              bottom: 3px;
            }
            .footer-item {
              background: white;
              height: 15px;
              font-size: 11px;
              padding: 2px;
              text-align: center;
              white-space: nowrap;
              display: flex;
              align-items: center;
              cursor: pointer;
              font-weight: 700;
            }
            .unreadNotif {
              position: relative;
              left: 10px;
            }
            .tab {
              width: 72px;
              height: 30px;
            }
            .rooms_btn {
              width: 260px;
              font-size: 16px;
            }
          `}
        </style>
      </>
    );
  }

  pullDown = () => {
    // or do some async code here
    if (this.loadMore && this.loadMore.click) this.loadMore.click();
  };

  activateInput = (e) => {
    console.log('activateInput');
    this.setState({
      inputActivated: true,
      commenting: false,
      editing: false,
      editKey: 0
    });
  };

  activateInputComment = (e, key, user, numComments) => {
    console.log('activateInputComment', key, user);
    const { page } = this.props;
    const room_key = page.room_key;

    if (numComments > 0 && location.search.indexOf(key) < 0) {
      var goSearchLink = `?k=${encodeURIComponent(key)}&rk=${encodeURIComponent(
        room_key
      )}`;
      this.setState({ goSearchLink });
      if (this.goSearchElem)
        this.searchTimeout = setTimeout(() => {
          this.goSearchElem.click();
        }, 250);
    } else if (this.state.commenting) {
      this.setState({
        inputActivated: true,
        commenting: false,
        editing: false,
        // initialMessage: "",
        editKey: 0
      });
    } else {
      this.setState({
        inputActivated: true,
        commenting: { key, user },
        editing: false,
        initialMessage: '',
        editKey: 0
      });
    }
  };
  activateInputEdit = (e, message, editKey) => {
    console.log('activateInputEdit');
    window.gLatestPrioEdit = 0;
    this.setState({
      inputActivated: true,
      commenting: false,
      editing: true,
      initialMessage: message,
      editKey
    });
  };

  deActivateInput = (e) => {
    console.log('disable inputActivated');
    this.setState({
      inputActivated: false,
      editing: false,
      initialMessage: ''
    }); //commenting: false
  };

  //https://facebook.github.io/react/docs/uncontrolled-components.html
  sendInput = (event) => {
    console.log(this.input, event);
    let message = event ? event : this.input.value;
    console.log('sendInput ' + message);
    if (message != '') {
      this.setState({ inputMessage: message });
    }
    this.deActivateInput(event);
  };

  concatInput = (txt) => {
    const st = { uploadFormActive: false, recordAudioActive: false };
    st.initialMessage = this.state.initialMessage + '\n' + txt;
    this.setState(st);
  };

  dummyFn() {}

  handleChange = (event) => {
    console.log('textareavalue', event.target.value);
    this.setState({ initialMessage: event.currentTarget.value });
  };

  updateTextAreaValue = (val) => this.setState({ initialMessage: val });

  handleSearch = (event, words, isChecked1) => {
    if (this.searchTimeout) clearTimeout(this.searchTimeout);
    const isChecked = isChecked1 ? isChecked1 : this.state.isChecked;
    if (event) event.preventDefault();
    var goSearchLink = `/?s=${
      words || this.searchField ? this.searchField.value : ''
    }${isChecked ? '&o=t' : ''}`;
    console.log('handleSearch', goSearchLink);
    this.setState({ goSearchLink });
    if (this.goSearchElem)
      this.searchTimeout = setTimeout(() => {
        this.goSearchElem.click();
      }, 1000);
    return false;
  };

  handleToggle = () => {
    //this.setState({ isChecked: !this.state.isChecked }) //no time to propagate state since handleSearch reloads
    this.handleSearch(0, this.props.searchWords, this.state.isChecked);
  };

  handleRefreshMaximised = () => {
    const { tag } = this.props;
    var goSearchLink = `/${location.search}`;
    console.log('handleRefresh', goSearchLink);
    this.setState({ goSearchLink });
    if (this.goSearchElem)
      this.searchTimeout = setTimeout(() => {
        this.goSearchElem.click();
      }, 1000);
    return false;
  };

  handleScroll = () => {
    let headerVisible, inputVisible;
    const { prevScrollpos } = this.state;
    const currentScrollPos = window.pageYOffset;
    console.log('Current Scroll Pos', currentScrollPos);
    headerVisible = inputVisible =
      Math.floor(prevScrollpos) < Math.floor(currentScrollPos);
    console.log(
      'Scroll headervisible',
      headerVisible,
      Math.floor(prevScrollpos),
      Math.floor(currentScrollPos)
    );
    this.setState({
      prevScrollpos: currentScrollPos,
      headerVisible,
      inputVisible
    });
  };

  handleColor = (index) => {
    const colors = [
      'rgba(242, 220, 252, 0.1)',
      'rgba(255, 154, 252, 0.1)',
      'rgba(254, 255, 225, 0.1)',
      'rgba(231, 255, 225, 0.1)',
      'rgba(225, 255, 248, 0.1)',
      'rgba(225, 228, 255, 0.1)',
      'rgba(220, 220, 220, 0.1)',
      'rgba(199, 139, 208, 0.1)',
      'rgba(122, 106, 167, 0.1)'
    ];
    const mapToNum = (i, array) => {
      return i < array.length ? i : i % array.length;
    };

    const color = colors[mapToNum(index, colors)];
    this.setState({ color }, () => {
      if (typeof window !== 'undefined') {
        localStorage.setItem(
          'backgroundColor',
          JSON.stringify(this.state.color)
        );
      }
    });
  };

  // handles conditional rendering of notification or lens
  handleNotifLensToggle = (
    Registered,
    gRoomsList,
    num_unread,
    searchPage,
    addRoomModalOpen
  ) => {
    const key = `${Registered}-${gRoomsList != null}-${
      num_unread > 0
    }-${searchPage}-${addRoomModalOpen}`;
    return (
      <React.Fragment>
        {
          {
            'true-true-true-false-false': (
              <div>
                <span className="unreadBolt">
                  <img src="static/img/notification.svg" />
                </span>
                <span className="unreadNotifc">{num_unread}</span>
              </div>
            ),
            'false-false-false-false-false': (
              <div>
                <span className="unreadBolt">
                  <img src="static/img/notification.svg" />
                </span>
                {/* <span className="unreadNotifc">{num_unread}</span> */}
              </div>
            ),
            'true-false-false-true-false': (
              <div style={{ marginTop: '5px' }}>
                <img
                  width="25px"
                  height="25px"
                  src="../static/img/Search.png"
                />
              </div>
            ),
            'false-false-false-true-false': (
              <div style={{ marginTop: '5px' }}>
                <img
                  width="25px"
                  height="25px"
                  src="../static/img/Search.png"
                />
              </div>
            ),
            'true-true-true-false-true': (
              <div style={{ marginTop: '5px' }}>
                <img
                  width="25px"
                  height="25px"
                  src="../static/img/add-channel.svg"
                />
              </div>
            )
          }[key]
        }
      </React.Fragment>
    );
  };

  // handles conditional rendering of toggle button or rooms list icon
  handleRoomiconSearchToggle = (Registered, gRoomsList, searchPage) => {
    const key = `${Registered}-${gRoomsList != null}-${searchPage}`;
    return (
      <React.Fragment>
        {
          {
            'true-false-true': (
              <div className="toggle-container">
                <ToggleButton
                  isChecked={this.state.isChecked}
                  handleToggle={() => this.handleToggle()}
                />
                <div className="toggle-texts">
                  <p
                    className="toggle-text--recent"
                    style={{
                      color: !this.state.isChecked
                        ? 'white'
                        : 'rgba(255,255,255, 0.8)'
                    }}>
                    Recent
                  </p>
                  <p
                    className="toggle-text--relevant"
                    style={{
                      color: this.state.isChecked
                        ? 'white'
                        : 'rgba(255,255,255, 0.8)'
                    }}>
                    Relevant
                  </p>
                </div>
              </div>
            ),
            'true-true-false': (
              <a
                onClick={this.openModalRooms}
                title="Rooms"
                className="rooms_icon">
                <span>
                  {/* <img
                    className="view_channels"
                    src={viewchannelsvg}
                  /> */}
                  <ViewChannelsSvg className={'view_channels'} />
                </span>
              </a>
            ),
            'false-false-false': (
              <a
                onClick={this.openModalRooms}
                title="Rooms"
                className="rooms_icon">
                <span>
                  {/* <img
                    className="view_channels"
                    src={viewchannelsvg}
                  /> */}
                  <ViewChannelsSvg className={'view_channels'} />
                </span>
              </a>
            ),
            'false-false-true': (
              <div className="toggle-container">
                <ToggleButton
                  isChecked={this.state.isChecked}
                  handleToggle={() => this.handleToggle()}
                />
                <div className="toggle-texts">
                  <p
                    className="toggle-text--recent"
                    style={{
                      color: !this.state.isChecked
                        ? 'white'
                        : 'rgba(255,255,255, 0.8)'
                    }}>
                    Recent
                  </p>
                  <p
                    className="toggle-text--relevant"
                    style={{
                      color: this.state.isChecked
                        ? 'white'
                        : 'rgba(255,255,255, 0.8)'
                    }}>
                    Relevant
                  </p>
                </div>
              </div>
            )
          }[key]
        }
      </React.Fragment>
    );
  };

  //sub-header (black part of the header) right icon
  handleRightHeadIcon = (P, reg, roomList, search) => {
    // console.log("checking registered", reg);
    let viewChannels = { height: '15px', width: '15px' };
    let p = P.toLowerCase();
    if (p === 'radio') {
      return (
        <a onClick={this.openModalRooms} title="Rooms" className="rooms_icon">
          <span>
            <img
              className="view_channels"
              src="static/img/headphone.svg"
              style={viewChannels}
            />
          </span>
        </a>
      );
    } else if (p === 'cinema') {
      return (
        <a
          onClick={this.openModalRooms}
          title="Rooms"
          className="rooms_icon"
          style={viewChannels}>
          <span>
            <img
              className="view_channels"
              src="static/img/cinematic.svg"
              style={viewChannels}
            />
          </span>
        </a>
      );
    } else if (p === 'basicschool') {
      return (
        <a
          onClick={this.openModalRooms}
          title="Rooms"
          className="rooms_icon"
          style={viewChannels}>
          <span>
            <img className="view_channels" src="static/img/graduation.svg" />
          </span>
        </a>
      );
    } else {
      return this.handleRoomiconSearchToggle(reg, roomList, search);
    }
  };

  goHome = () => {
    window.top.location = '/';
  };

  register = () => {
    console.log('registering');
    setTimeout(function () {
      document.getElementById('register').style.display = 'block';
    }, 2000);
    this.setState({
      registering: true
    });
  };

  signUp = () => {
    console.log('signup');

    this.setState({
      registering: true,
      signup: true,
      registered: false
    });
  };

  onRegisterFinish = (user0, userOpts) => {
    // if (document.getElementById("register"))
    //   document.getElementById("register").style.display = "none";
    this.runRegisterFinish = true;
    // const { page, tag } = this.props;
    const readonly = false; //page.n > 1 || (tag && tag.length > 0)
    if (user0 === true) return; // do nothing has no valid user
    var user = validateUser(user0);
    const {
      uid,
      displayName,
      email,
      phoneNumber,
      refreshToken,
      photoUrl,
      isAnonymous
    } = user;

    var userName = isAnonymous
      ? this.props.defaultUserName
      : displayName
      ? displayName
      : email
      ? email
      : phoneNumber;
    if (userOpts && userOpts.firebaseRef) {
      let userName = userOpts.userName;
      if (userName == null && displayName && displayName != null)
        userName = displayName;
      if (userName == null && email && email != null) userName = email;
      if (userName == null && phoneNumber && phoneNumber != null)
        userName = phoneNumber;
      let meta = {
        userName
      };
      this.meta = meta;
      //if( userOpts.busStop) meta.busStop= userOpts.busStop   // obsolete opt not set anymore on register
      // console.log("onRegisterFinish fb", typeof userOpts.firebaseRef);
      // userOpts.firebaseRef.ref("users/" + userName)
      // var ref = refD(userOpts.firebaseRef, "users/" + userName);
      // console.log("onRegisterFinish fb2", typeof ref);
      // update(ref, meta);
      // ref.update(meta);
      this.defaultMessage = `Hi ${userName}, the city’s yours! ✍️`;
      this.onRegisterSetStore({ registered: true, userLogedIn });
      this.setState({
        registered: true,
        inputActivated: !readonly,
        registering: false,
        userLogedIn: userName,
        message: this.defaultMessage
      });
    } else if (this.props.userInfo && this.gChatRef) {
      // from loggedIn
      if (this.gChatRef) {
        //read user metadata
        //https://stackoverflow.com/questions/41142571/firebase-push-key-allowed-characters
        if (typeof userName != 'undefined' && userName != '' && !isAnonymous) {
          try {
            var ref = refD(this.gChatRef, `users/${userName}`);
            onValue(
              ref,
              (snapshot) => {
                //ref.once("value", (snapshot) => {
                if (!this.props.loggedIn) return;
                if (snapshot.exists()) {
                  var val = snapshot.val();
                  if (val.userName && val.userName != '') {
                    userName = val.userName;
                  }
                  if (val.profile) this.meta.profile = val.profile;
                } else {
                  console.log('onRegisterFinish !exists');
                }
                //ref.off("value") //if to prevent update
                this.defaultMessage = `Hi ${userName}, drop a line... ✍️`;

                this.setState({
                  registered: true,
                  inputActivated: !readonly,
                  registering: false,
                  userLogedIn: userName,
                  message: this.defaultMessage,
                  userMetadata: this.meta
                });
                this.onRegisterSetStore({ registered: true, userLogedIn });
              },
              { onlyOnce: false }
            );

            let transactionList = [];
            let transaction = refD(this.gChatRef, 'users'); //this.gChatRef.ref("users");
            transaction = child(transaction, userName); //transaction.child(userName);
            transaction = child(transaction, 'transactions'); //transaction.child("transactions");
            onValue(
              transaction,
              (snapshot) => {
                //transaction.once("value", (snapshot) => {
                if (snapshot.exists()) {
                  let trans = snapshot.val();
                  for (let tran of Object.keys(trans)) {
                    transactionList.push(trans[tran]);
                  }
                  this.setState({
                    userMetadata: {
                      ...this.state.userMetadata,
                      transactions: transactionList.transactions
                    }
                  });
                }
              },
              { onlyOnce: false }
            );

            let walletRef = refD(this.gChatRef, `users/${userName}/wallet`);
            onValue(
              walletRef,
              (snapshot) => {
                if (snapshot.exists()) {
                  this.setState({
                    userWallet: snapshot.val()
                  });
                }
              },
              { onlyOnce: false }
            );

            let aristo = refD(this.gChatRef, `users/${userName}`);
            onValue(
              aristo,
              (snapshot) => {
                //aristo.once("value", (snapshot) => {
                if (snapshot.exists()) {
                  let aristoInfo = snapshot.val();
                  this.setState({
                    userMetadata: {
                      ...this.state.userMetadata,
                      aristoInfo: aristoInfo.aristo
                    }
                  });
                }
              },
              { onlyOnce: true }
            );
          } catch (e) {
            this.runPleaseRegister = true;
            this.setState({
              message: PleaseRegisterMsg
            });
          }
        } else {
          //if try
          this.runPleaseRegister = true;
          this.setState({
            message: PleaseRegisterMsg
          });
        }
      }
    } else {
      //continue in unexpected status
      console.log('onRegisterFinish unexpected');
    }
    if (this.state.signup) {
      this.setState({
        registering: true,
        registered: false
      });
    } else if (
      (!this.state.signup && userOpts && userOpts.firebaseRef) ||
      (this.props.userInfo && this.gChatRef)
    ) {
      this.setState({
        registering: false,
        registered: true
      });
    }
  }; //onRegisterFinish

  onRegisterSetStore = (payload) => {
    this.props.dispatch({ type: ACTION_SET_USER, payload });
  };
  //get phone number
  getPhoneNo = (countryCode, no) => {
    this.setState({
      phoneNo: {
        countryCode,
        line: no
      }
    });
  };
  //send to selected user
  onSend = (gen, spec, clicked, chosen) => {
    console.log('chosen in async app', chosen);
    console.log('spec in async app', spec);
    this.setState({
      walletOptions: {
        wallet: {
          gen,
          spec
        },
        clicked,
        chosen
      }
    });
    this.showWallet();
  };
  //reseting send
  resetSend = () => {
    this.setState({
      walletOptions: {
        wallet: {
          gen: '',
          spec: ''
        },
        clicked: '',
        chosen: undefined
      }
    });
  };

  onChangePage = (page) => {
    this.props.dispatch({ type: ACTION_UPDATE_PAGE, page });
  };

  onLogout = () => {
    console.log('onRegisterFinish signOut');
    if (window.confirm('Log out?') && this.gChatRef && auth) {
      try {
        console.log('onRegisterFinish signOut');
        auth
          .signOut()
          .then(() => {
            //best to reload to fix issue of StyledFirebaseAuth
            location.reload();
          })
          .catch(() => {
            console.log('could not signout completly', e);
          });
      } catch (e) {
        console.log('could not signout completly', e);
      }
    }
  };

  updatePost = (data) => {
    const { msg_key } = data;
    const { posts, page, tag } = this.props;
    console.log('updatePost6', page.original_post_key, data);

    let eq_items = posts.filter((it) => it.key == msg_key);
    if (eq_items.length > 0) {
      //is edit
      //TODO
      let n = posts.indexOf(eq_items[0]);
      posts[n] = Object.assign(posts[n], data);
    }
    if (page.original_post_key) {
      this.handleRefreshMaximised();
      return;
    }
    this.updateStorePosts(posts);
    this.bindedSetState_fn({ message: this.defaultMessage });
    if (this.lastPost) {
      console.log('scroll to new post');
      this.lastPost.scrollIntoView();
    }
    this.updateWordsIndex(msg_key);
  };

  modalUploadOpen = (activate) => {
    console.log('modalUploadOpen');
    this.setState({ uploadFormActive: activate });
  };

  modalRecorderOpen = (activate) => {
    this.setState({ recordAudioActive: activate });
  };

  openModalUpload = () => {
    //this.setState({modalIsOpen: true});
    this.modalUploadOpen(true);
  };

  openModalRooms = () => {
    this.setState({
      modalNewRoomOpened: false,
      modalRoomsOpened: true,
      modalProfileOpened: false
    });
    console.log('openModalRooms state change', this.state.modalRoomsOpened);
  };

  fbCallback = (snapshot) => {
    let val = snapshot.val();
    if (val) {
      // console.log("snapshot", val);
      this.setState({
        modalProfileOpened: true,
        modalNewRoomOpened: false,
        modalRoomsOpened: false,
        viewUser: val
      });
    } else {
      this.setState({
        modalProfileOpened: true,
        modalNewRoomOpened: false,
        modalRoomsOpened: false
      });
    }
  };

  openModalProfile = (key) => {
    console.log('openModalProfile');

    if (key) {
      this.setState({
        viewUser: {
          userName: key,
          address: { display_name: 'not set' },
          aristo: 2
        }
      });

      let ref = refD(this.gChatRef, 'users'); //this.gChatRef.ref("users");
      if (!ref || ref == null) return;
      ref = child(ref, key); //ref.child(key);
      if (!ref || ref == null) return;
      ref = child(ref, 'profile'); //ref.child("profile");

      onValue(ref, (snapshot) => this.fbCallback(snapshot)); //ref.on("value", this.fbCallback);
    }
  };

  showProfile = () => {
    console.log('show profile');
    this.setState({
      showProfile: true,
      wallet: false,
      // passport:false,
      userDetails: true,
      ShowProfileBtn: false
    });
  };

  showPassport = () => {
    console.log('show passport');
    this.setState({
      showProfile: false,
      wallet: false,
      passport: true,
      userDetails: true
    });
  };

  getSaleInformation = (saleInfo) => {
    this.setState({
      saleInfo
    });
  };

  showWallet = () => {
    console.log('show wallet');
    this.setState({
      showProfile: false,
      wallet: true,
      passport: false,
      userDetails: true
    });
  };

  hideAll = () => {
    console.log('hide profile');
    this.setState({
      showProfile: false,
      wallet: false,
      passport: false,
      userDetails: false
    });
  };

  modalRoomsClosed = () => {
    this.setState({ modalRoomsOpened: false, LoginDataLoaded: false });
  };

  modalNewRoomClosed = () => {
    this.setState({ modalNewRoomOpened: false });
  };

  modalProfileClosed = () => {
    this.setState({ modalProfileOpened: false });
  };

  newRoomFn = () => {
    this.setState({
      modalNewRoomOpened: true,
      modalRoomsOpened: false,
      modalProfileOpened: false
    });
    console.log('newRoomFn state change', this.state.modalNewRoomOpened);
  };

  addNewRoomModalOpen = () => {
    this.setState({ addRoomModalOpen: true });
  };

  addNewRoomModalClose = () => {
    this.setState({ addRoomModalOpen: false });
  };

  recordAudio = () => {
    this.setState({ recordAudioActive: true, selectMediaType: false });
  };

  recordAudioClose = () => {
    this.setState({ recordAudioActive: false, selectMediaType: false });
  };

  openMediaType = () => {
    this.setState({
      selectMediaType: !this.state.selectMediaType,
      showLogout: false,
      ShowProfileBtn: false,
      showProfile: false
    });
  };
  handleButtonClick = () => {
    // Show the <p> tag when the button is clicked
    // this.setState({ showProfile: true,  });

    this.setState((prevState) => ({
      ShowProfileBtn: !prevState.ShowProfileBtn,
      selectMediaType: false
      // showProfile: true,
    }));
  };
  // handleProfileShow = () => {
  //   this.setState((prevState) => ({
  //     showProfile: !prevState.showProfile,
  //     selectMediaType: false,
  //     ShowProfileBtn: false,

  //   }));
  // };

  // emoji picker
  openEmoji = () => {
    this.setState({ selectEmoji: true });
  };
  closeEmoji = (emoji) => {
    console.log('here');
    if (emoji) {
      this.setState({
        selectEmoji: false,
        initialMessage: this.input.value + ' ' + emoji
      });
    } else this.setState({ selectEmoji: false });
  };

  handleAt = (e) => {
    this.input.focus();
    const textareaVal = this.state.initialMessage;
    if (textareaVal !== '') {
      return this.setState({ initialMessage: `${textareaVal} @` });
    }
    return this.setState({ initialMessage: '@' });
  };

  hideHeader = () => {
    this.setState({ headerVisible: false });
  };

  showHeader = () => {
    this.setState({ headerVisible: true });
  };

  openSearchBox = () => {
    if (this.state.isSearchBoxOpen) {
      document.getElementById('searchForm').submit();
      return;
    }
    this.setState({ isSearchBoxOpen: true });
    this.searchField.focus();
  };

  closeSearchBox = () => {
    this.setState({ isSearchBoxOpen: false });
    this.searchField.blur();
  };

  bindedSetState_fn = (state) => {
    console.log('new state');
    this.setState(state);
  };
  updateStorePosts = (posts) => {
    this.props.dispatch({ type: ACTION_NEXT_PAGE, payload: { posts } });
    console.log('update store posts: ', posts);
  };

  editFn = (e, msg_key, message) => {
    // activated on Post.js
    //e.stopPropagation();
    const { userLogedIn } = this.state;
    if (userLogedIn == '') return;

    this.activateInputEdit(e, message, msg_key);
  };

  pinFn = (e, msg_key) => {
    // activated on Post.js
    //e.stopPropagation();
    /*if( !window.confirm("Pin this message to top of this page and replace any previous pins?") )     
	return;
    */
    const { page } = this.props;
    const { userLogedIn } = this.state;

    var obj = {};
    obj[msg_key] = userLogedIn;
    const room_key = page.room_key;
    // console.log("pinning  ", msg_key, room_key);

    if (msg_key && this.gChatRef) {
      //   this.gChatRef
      //     .ref("rooms")
      //     .child(room_key)
      //     .child("pinned")
      //     .set(obj)
      //     .then(function() {
      //       console.log("pinned");
      //       if (
      //         window.confirm(
      //           "Pinned the message to room heading. Do you wish to reload and check latest message list?"
      //         )
      //       )
      //         location.reload(); //TODO use Link
      //     });
      //new code
      set(child(refD(this.gChatRef, 'rooms'), `${room_key}/pinned`), obj).then(
        () => {
          console.log('pinned');
          if (
            window.confirm(
              'Pinned the message to room heading. Do you wish to reload and check latest message list?'
            )
          )
            location.reload(); //TODO use Link
        }
      );
    }

    if (!msg_key) {
      if (this.gChatRef) {
        // this.gChatRef
        //   .ref("rooms")
        //   .child(room_key)
        //   .child("pinned")
        //   .remove()
        //   .then(function() {
        //     console.log("pin removed");
        //     if (
        //       window.confirm(
        //         "Removed pin from room heading. Do you wish to reload and check latest message list?"
        //       )
        //     )
        //       location.reload();
        //   });

        // new code
        const removeRef = child(
          refD(this.gChatRef, 'rooms'),
          `${room_key}/pinned`
        );
        remove(removeRef, () => {
          console.log('pin removed');
          if (
            window.confirm(
              'Removed pin from room heading. Do you wish to reload and check latest message list?'
            )
          )
            location.reload();
        });
      }
    }
  };

  //based on https://stackoverflow.com/questions/454202/creating-a-textarea-with-auto-resize
  handleTextareaSize = () => {
    var observe = function (element, event, handler) {
      element.addEventListener(event, handler, false);
    };
    var text = document.getElementById('messageText');
    //console.log("handleTextareaSize elem", text)
    var resize = function () {
      //console.log("textarea resize", text.scrollHeight)
      let offset = text.offsetHeight - text.clientHeight;
      text.style.height = '3rem';
      text.style.height = text.scrollHeight + offset + 1 + 'px';
    };
    /* 0-timeout to get the already changed text */
    var delayedResize = function () {
      //console.log("textarea delayedResize")
      window.setTimeout(resize, 0);
    };
    if (text != null) {
      observe(text, 'input', resize);
      observe(text, 'cut', delayedResize);
      observe(text, 'paste', delayedResize);
      observe(text, 'drop', delayedResize);
      observe(text, 'keydown', delayedResize);

      text.focus();
      text.select();
      resize();
    }
    if (this.lastBox) this.lastBox.scrollIntoView();
  };

  updateWordsIndex = (msg_key) => {
    // const ref = this.gChatRef.ref("export").child(msg_key);
    // const ref_index = this.gChatRef.ref("words");
    const ref = child(refD(this.gChatRef, 'export'), msg_key);
    const ref_index = refD(this.gChatRef, 'words');
    const stop_words = {
      words: [
        'i',
        'me',
        'my',
        'myself',
        'we',
        'our',
        'ours',
        'ourselves',
        'you',
        'your',
        'yours',
        'yourself',
        'yourselves',
        'he',
        'him',
        'his',
        'himself',
        'she',
        'her',
        'hers',
        'herself',
        'it',
        'its',
        'itself',
        'they',
        'them',
        'their',
        'theirs',
        'themselves',
        'what',
        'which',
        'who',
        'whom',
        'this',
        'that',
        'these',
        'those',
        'am',
        'is',
        'are',
        'was',
        'were',
        'be',
        'been',
        'being',
        'have',
        'has',
        'had',
        'having',
        'do',
        'does',
        'did',
        'doing',
        'a',
        'an',
        'the',
        'and',
        'but',
        'if',
        'or',
        'because',
        'as',
        'until',
        'while',
        'of',
        'at',
        'by',
        'for',
        'with',
        'about',
        'against',
        'between',
        'into',
        'through',
        'during',
        'before',
        'after',
        'above',
        'below',
        'to',
        'from',
        'up',
        'down',
        'in',
        'out',
        'on',
        'off',
        'over',
        'under',
        'again',
        'further',
        'then',
        'once',
        'here',
        'there',
        'when',
        'where',
        'why',
        'how',
        'all',
        'any',
        'both',
        'each',
        'few',
        'more',
        'most',
        'other',
        'some',
        'such',
        'no',
        'nor',
        'not',
        'only',
        'own',
        'same',
        'so',
        'than',
        'too',
        'very',
        's',
        't',
        'can',
        'will',
        'just',
        'don',
        'should',
        'now'
      ]
    };

    // console.log("processing chat");
    // return ref.once("value", function(snap) {
    const callback = (snap) => {
      const msg = snap.val();
      if (msg == null) return;
      let doPrint = false;
      if (typeof msg.text == 'undefined') return;

      let txt = getWordBits(msg);
      let words = txt.split(' ');

      let filtered = {}; // create obj index removes dups
      words.forEach((w) => {
        w = w.trim();
        w = w.toLowerCase();
        w = lancasterStemmer(w);
        if (w.length > 1 && !stop_words.words.includes(w)) filtered[w] = 1;
      });

      if (doPrint) {
        // console.log("----------");
        // console.log("MSG", msg.text);
        // console.log(" ");
        // console.log("HTML", msg.html);
        // console.log(" ");
        // console.log("STEM3", filtered);
      }

      Object.keys(filtered).forEach((w) => {
        if (doPrint) console.log('set words/', w, snap.key);
        // ref_index
        //   .child(w)
        //   .child(snap.key)
        //   .set(1);
        //new code
        set(child(ref_index, `${w}/${snap.key}`), 1);
      });
    };
    return get(ref).then(callback);

    // });
  };
} //class

AsyncApp.propTypes = {
  posts: PropTypes.array.isRequired,
  lastUpdated: PropTypes.number,
  page: PropTypes.object.isRequired,
  tag: PropTypes.string,
  loggedIn: PropTypes.number.isRequired,
  userInfo: PropTypes.object
};

export default AsyncApp;

function formatTime(time) {
  var date = new Date(time);
  var local_date = new Date(
    date.getTime() + date.getTimezoneOffset() /*mins*/ // * 60000
  );
  var hours = local_date.getHours();
  var minutes = local_date.getMinutes();
  console.log('get local date:', new Date().getHours(), local_date, hours);

  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var hhmm = hours + ':' + minutes;
  var now = new Date();
  // different day?
  if (now.toLocaleDateString() != date.toLocaleDateString()) {
    var yyyy = '';
    if (local_date.getFullYear() != now.getFullYear())
      yyyy = local_date.getFullYear() + '/';
    hhmm =
      yyyy +
      (local_date.getMonth() + 1) +
      '/' +
      local_date.getDate() +
      ' ' +
      hhmm;
  }
  return hhmm;
}

function addScript(src) {
  var s = document.createElement('script');
  s.setAttribute('src', src);
  document.body.appendChild(s);
}
