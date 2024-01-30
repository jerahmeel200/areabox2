import React from 'react';
import Link from 'next/link';
import Head from '../../components/Header';
import { FirebaseDatabase } from '../../settings/firebase.js';
import { validateUser } from '../../lib/userLib.js';
import Register from '../../components/Register';

const PleaseRegisterMsg = 'Press to Register and write messages';

export default class Home extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      inputActivated: false,
      inputMessage: '',
      registered: false,
      registering: false,
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
      //gRoomsList: null,
      selectMediaType: false,
      userMetadata: {},
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
      addRoomModalOpen: false
    };

    this.runRegisterFinish = false;
    this.runPleaseRegister = false;
    this.meta = {};
    this.gChatRef = FirebaseDatabase;
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

    if (
      this.props.loggedIn == 1 &&
      this.props.userInfo &&
      !this.state.registered &&
      !this.runRegisterFinish
    ) {
      //logged in, set metadata
      //console.log("AsyncApp componentDidUpdate2 loggedIn", this.props.loggedIn, typeof(this.props.userInfo))
      this.onRegisterFinish(this.props.userInfo, {});
    }
    if (
      this.props.loggedIn == 0 &&
      !this.state.registered &&
      !this.runPleaseRegister
    ) {
      //please register
      //console.log("AsyncApp componentDidUpdate3 loggedIn", this.props.loggedIn)
      this.runPleaseRegister = true;
      this.setState({
        message: PleaseRegisterMsg
      });
    }
  }

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
    const { registering } = this.state;
    return (
      <>
        <Head
          subHeader={
            <div
              style={{
                width: '150px',
                display: 'flex',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginLeft: '18px'
              }}
              className="sub_sub_header">
              <div className="notif_container">
                <img
                  className="blue-star"
                  src="static/img/notification.svg"
                  alt="symbol"
                />
              </div>
              <div className="title">
                <span>THIS IS LAGOS</span>
              </div>
            </div>
          }
          content={'flex-start'}
        />
        {!registering && (
          <section className="home-body">
            <div className="black-img"></div>
            <div className="info-cont">
              <p className="info">
                <span style={{ fontFamily: 'Stolzl', fontWeight: '500' }}>
                  AREABOX
                </span>{' '}
                is your digital neighbourhood.
              </p>
              <p className="info">
                Connect with people and businesses in your area, and enjoy the
                fresh, crypto-infused experiences from the future.
              </p>
              <p className="info">Digital good times await!</p>
            </div>
            <div className="btn-cont">
              <div className="btn">
                <Link legacyBehavior href="/info">
                  <a>More</a>
                </Link>
              </div>
              <img src="static/img/Aretha.png" className="sphinx" />
              <div className="btn" onClick={this.register}>
                Sign Up
              </div>
            </div>
            <div className="blue-strip">
              <div>Built on Celo Blockchain</div>
              <div>Blue Paper</div>
              <div>Privacy (is our) Policy</div>
            </div>
            <div className="footer">
              <p>
                {' '}
                {'&copy'} Copyright 2022 AreaBox Co. Inc. All rights reserved.
              </p>
              <img
                className="twitter"
                src="static/img/twitter.svg"
                style={{ width: '10px', height: '8px' }}
              />
              <p>RC 1689728</p>
            </div>
          </section>
        )}
        {registering && (
          <div id="register">
            <Register
              show={registering}
              onRegisterFinish={this.onRegisterFinish}
              changeReg={this.changeReg}
            />
          </div>
        )}
        <style jsx>{`
          .sub_sub_header {
            width: 100%;
            display: flex;
            justifycontent: center !important;
            alignitems: center;
            // marginLeft: 18px;
          }

          .notif_container {
            position: absolute;
            top: -1px;
            left: 3%;
            width: 13px;
            height: 15px;
          }
          // .blue-star {
          //       position: absolute;
          //       right 2.7%;
          //       top: -1px;
          // }
          .home-body {
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            margin: 5rem auto;
            background: rgba(0, 0, 0, 0.07);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 2px;
            font-family: BarlowRegular;
          }
          .black-img {
            width: 350px;
            height: 290px;
            background: black;
            border-radius: 2px;
          }
          .info-cont {
            width: 100%;
          }
          .info {
            font-size: 14px;
            margin: 0px;
            max-width: 310px;
          }
          .blue-strip {
            color: white;
            width: 100%;
            height: 40px;
            display: flex;
            justify-content: space-around;
            background: #1505cc;
            border-bottom: black 1px solid;
            margin: 0px;
            font-size: 10px;
            align-items: center;
          }
          .btn-cont {
            display: flex;
            justify-content: space-around;
            align-items: center;
            width: 100%;
          }
          .btn {
            width: 64px;
            height: 24px;
            border: 1px solid rgba(0, 0, 0, 0.5);
            background: white;
            border-bottom: black 2px solid;
            text-align: center;
            cursor: pointer;
            font-weight: 700;
          }
          .btn a {
            color: black;
          }
          .btn:active {
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          }
          .sphinx {
            width: 50px;
            height: 50px;
          }
          .footer {
            width: 100%;
            height: 24px;
            font-size: 8px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: rgba(0, 0, 0, 0.08);
          }
          .footer p {
            margin: 0px;
            padding: 0px;
          }
        `}</style>
      </>
    );
  }

  register = () => {
    console.log('registering');
    setTimeout(function () {
      document.getElementById('register').style.display = 'flex';
    }, 2000);
    this.setState({
      registering: true
    });
  };

  onRegisterFinish = (user0, userOpts) => {
    if (document.getElementById('register'))
      document.getElementById('register').style.display = 'none';
    this.runRegisterFinish = true;

    const { page, tag } = this.props;
    const readonly = false; //page.n > 1 || (tag && tag.length > 0)

    console.log('onRegisterFinish userName', user0, userOpts);
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
      : phoneNumber; //default
    console.log(
      'onRegisterFinish userName',
      userName,
      'anonymous=',
      isAnonymous
    );

    if (userOpts && userOpts.firebaseRef) {
      console.log('onRegisterFinish from register');
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
      console.log('onRegisterFinish fb', typeof userOpts.firebaseRef);
      var ref = userOpts.firebaseRef.ref('users/' + userName);
      console.log('onRegisterFinish fb2', typeof ref);
      ref.update(meta);
      this.defaultMessage = `Hi ${userName}, the city’s yours! ✍️`;
      this.setState({
        registered: true,
        inputActivated: !readonly,
        registering: false,
        userLogedIn: userName,
        message: this.defaultMessage
      });
      this.onRegisterSetStore({ registered: true, userLogedIn });
    } else if (this.props.userInfo && this.gChatRef) {
      // from loggedIn
      console.log('onRegisterFinish from loggedIn');
      if (this.gChatRef) {
        console.log('onRegisterFinish has gChatRef');
        //read user metadata
        //https://stackoverflow.com/questions/41142571/firebase-push-key-allowed-characters
        if (typeof userName != 'undefined' && userName != '' && !isAnonymous) {
          try {
            console.log('onRegisterFinish try', userName);
            var ref = this.gChatRef.ref('users/' + userName);
            ref.once('value', (snapshot) => {
              console.log('onRegisterFinish value', this.props.loggedIn);
              if (!this.props.loggedIn) return; //logout
              if (snapshot.exists()) {
                var val = snapshot.val();
                console.log('onRegisterFinish exists', val);

                if (val.userName && val.userName != '') {
                  userName = val.userName;
                  console.log('onRegisterFinish got userName', userName);
                }
                if (val.profile) this.meta.profile = val.profile;
                console.log('onRegisterFinish profile', val.profile);
              } else {
                console.log('onRegisterFinish !exists');
              }
              //ref.off("value") //if to prevent update
              this.defaultMessage = `Hi ${userName}, the city’s yours! ✍️`;

              this.setState({
                registered: true,
                inputActivated: !readonly,
                registering: false,
                userLogedIn: userName,
                message: this.defaultMessage,
                userMetadata: this.meta
              });
              this.onRegisterSetStore({ registered: true, userLogedIn });
            });
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
  }; //onRegisterFinish

  onRegisterSetStore = (payload) => {
    this.props.dispatch({ type: ACTION_SET_USER, payload });
  };
}
