import React from 'react';
import Link from 'next/link';
import Head from '../../components/Header';
import { FirebaseDatabase } from '../../settings/firebase.js';
import { validateUser } from '../../lib/userLib.js';
import Register from '../../components/Register';
import styles from './home.module.css';

const PleaseRegisterMsg = 'Press to Register and write messages';

export default class Info extends React.Component {
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
            <div className="sub_sub_header">
              <img
                style={{
                  objectFit: 'cover'
                }}
                className="blue-star"
                src="static/img/notification.svg"
                alt="symbol"
              />
              <div className="title">
                <span>THIS IS LAGOS</span>
              </div>
              <div></div>
            </div>
          }
          // content={"center"}
        />
        {!registering && (
          <section className={styles.homeBody}>
            {console.log('Props :', this.props)}

            <div className={styles.blackImg}></div>
            <div
              style={{
                background: 'black',
                padding: '5px',
                display: 'flex',
                justifyContent: 'space-between'
              }}>
              <p
                style={{
                  background: 'white',
                  width: '200px',
                  textAlign: 'center',
                  fontSize: '15px',
                  border: '1px solid  black',
                  borderBottom: '4px solid cyan',
                  borderRight: '4px solid cyan',
                  fontWeight: '700',
                  fontFamily: 'roboto mono',
                  fontStyle: 'italic',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}>
                The city is yours
              </p>
              <div style={{ display: 'flex' }}>
                <img
                  width="11.91px"
                  height="15px"
                  src="static/img/cherry.png"
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span
                    style={{
                      color: 'rgba(102, 246, 255, 1)',
                      fontSize: '9px'
                    }}>
                    HIGH Rep
                  </span>
                  <span
                    style={{
                      color: 'rgba(102, 246, 255, 1)',
                      fontSize: '9px'
                    }}>
                    50 ARST
                  </span>
                </div>
              </div>
            </div>
            <div className={styles.blackCont}>
              <div className="welcome-cont">
                <p className="welcome">
                  Welcome to{' '}
                  <span style={{ fontFamily: 'Stolzl', fontWeight: '500' }}>
                    AREABOX
                  </span>
                  !
                </p>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    paddingBottom: '20px'
                  }}>
                  <img src="static/img/Aretha.png" className="sphinx" />
                </div>
              </div>

              <div className="info-cont">
                <p className="info">
                  Meet <span className="bold">Areanna Sphinx</span>,
                  neighborhood and reputation score tracker on{' '}
                  <span className="bold">Areabox</span>.
                </p>
                <p className="info">
                  A healthy pet means you gain reputation points.
                </p>
                <div
                  className="text-img"
                  style={{
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <p className="info">
                    You also <span className="bold">earn Aristo tokens</span> as
                    your rep score increases.{' '}
                    <span className="bold">1 AR$T earned = 100 NAIRA</span>.
                  </p>
                  <img width="20px" height="20px" src="static/img/coin.png" />
                  {/* <p>img</p> */}
                </div>
                <p className="info" style={{ paddingTop: '20px' }}>
                  You can{' '}
                  <span className="bold">
                    use Aristos on AreaBox or cash out
                  </span>{' '}
                  into your bank account.
                </p>
                <div
                  className="text-img"
                  style={{
                    paddingTop: '20px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <p className="info">
                    So, keep your pet safe and healthy.{' '}
                    <span className="bold">It's your responsibility!</span>
                  </p>
                  <img width="20px" height="20px" src="static/img/target.png" />

                  {/* <p>img</p> */}
                </div>
              </div>
              <div className="btn-cont">
                <div className="sphinx-cont">
                  {/* <img src="static/img/Aretha.png" className="sphinx-small" />
                  ASK ABOUT ME */}
                </div>
                <p className={styles.lorem}>
                  Lorem ipsum dolor sit amet consectetur adipisicing elit.
                  Deleniti, ratione.
                </p>
                <div className="btn" onClick={this.register}>
                  Sign Up
                </div>
              </div>
            </div>

            <div className="footer">
              <p> TM/© AreaBox Co.</p>
              <Link href="/bluepaper">
                <div style={{ color: 'blue', fontWeight: '700' }}>
                  Blue Paper
                </div>
              </Link>
              <img src="/static/img/twitter.svg" alt="" />
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
          .home-body {
            width: 400px;
            background: rgba(0, 0, 0, 0.07);
            display: flex;
            flex-direction: column;
            align-items: center;
            padding-top: 2px;
            font-family: BarlowRegular;
          }

          .sub_sub_header {
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            display: flex;
            justify-content: space-between;
            align-items: center;
          }
          .black-img {
            width: 360px;
            height: 140px;
            background: black;
            border-radius: 2px;
          }
          .info-cont {
            width: 100%;
          }
          .welcome-cont {
            width: 100%;
            text-align: left;
          }
          .welcome {
            font-weight: 600;
          }
          .bold {
            font-weight: 600;
          }
          .info {
            font-size: 14px;
            margin: 0px;
            max-width: 500px;
            padding-top: 20px;
          }

          .btn-cont {
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
            padding: 10px 5px;
            padding-top: 30px;
          }
          .btn {
            width: 75px;
            height: 30px;
            border: 1px solid rgba(0, 0, 0, 0.5);
            background: white;
            border-bottom: black 2px solid;
            text-align: center;
            cursor: pointer;
            font-weight: 700;
            font-size: 16px;
            color: black;
          }
          .btn:active {
            border-bottom: 1px solid rgba(0, 0, 0, 0.5);
          }
          .sphinx-cont {
            font-family: RobotoMono;
            font-weight: 700;
            font-size: 10px;
          }
          .sphinx {
            width: 50px;
            height: 50px;
          }
          .sphinx-small {
            height: 24px;
            width: 24px;
          }
          .footer {
            min-width: 360px;
            max-width: 768px;
            width: 100vw;
            min-height: 30px;
            font-size: 11px;
            display: flex;
            justify-content: space-around;
            align-items: center;
            background: rgba(0, 0, 0, 0.08);
            bottom: 0;
            position: fixed;
            margin: 0 auto;
            padding: 0 2em 3px 2rem;
          }
          .footer p {
            margin: 0px;
            padding: 0px;
          }
          #register {
            width: 100vw;
            // height: 100vh;
            // display: flex;
            // align-items: center;
            // justify-content: center;
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
