import React from 'react';
import PropTypes from 'prop-types';
import Modal from 'react-modal';
import UserProfile from './UserProfile';
import ProfileCard from './UserProfile/profileCard';

import { gAvatars, gDefaultAvatar } from '../settings/avatars.js';
import { child, onValue, ref as refD, set } from 'firebase/database';

const customStyles = {
  overlay: {
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    margin: '0 auto'
  },
  content: {
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',

    padding: '0px 25px',
    backgroundColor: 'transparent'
    // color: 'white'
  }
};

export default class Profile extends React.Component {
  static propTypes = {
    modalOpened: PropTypes.bool.isRequired,
    // gChatRef: PropTypes.object, //.required 0 on start commented to avoid type check
    username: PropTypes.string.isRequired,
    modalClosed: PropTypes.func.isRequired,
    onLogout: PropTypes.func.isRequired
    //userMetadata:  PropTypes.object.isRequired,
  };

  constructor(props) {
    super(props);
    this.getProfile = this.getProfile.bind(this);
    this.openAvatar = this.openAvatar.bind(this);
    this.state = {
      myProfile: false,
      modalIsOpen: props.modalOpened,
      loading: true,
      changeAvatar: false
    };
    this.profileRef = 0;
  }

  componentDidMount() {
    Modal.setAppElement('#__next');
    if (!this.state.myProfile) this.getProfile();
  }

  componentDidUpdate(prevProps) {
    if (this.props.modalOpened !== prevProps.modalOpened) {
      if (this.props.modalOpened) this.openModal();
      else this.closeModal();
    }
  }

  openAvatar(key, tit) {
    //window.top.location= "/?rk="+key+"&rt="+tit;
  }

  getProfile = () => {
    const gChatRef = this.props.gChatRef; //FirebaseDatabase()
    if (!gChatRef) return;
    let ref = refD(gChatRef, 'users');
    if (!ref || ref == null) return;
    ref = child(ref, this.props.username);
    if (!ref || ref == null) return;
    ref = child(ref, 'profile');

    if (!ref || ref == null) return;
    this.profileRef = ref;

    return onValue(
      ref,

      (dataSnapshot) => {
        const myProfile = dataSnapshot.val() || {};
        if (!myProfile.key) myProfile.key = dataSnapshot.key;
        if (!myProfile.ref) myProfile.ref = dataSnapshot.ref;
        // console.log("profile", myProfile);
        if (!myProfile.avatar) myProfile.avatar = gDefaultAvatar;

        this.setState({ myProfile, loading: false });
      }
    );
  };

  openModal = () => {
    this.setState({ modalIsOpen: true, changeAvatar: false });
  };

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    //this.subtitle.style.color = '#f00';
  }

  closeModal = () => {
    this.setState({ modalIsOpen: false, changeAvatar: false });
    this.props.modalClosed();
  };

  selectAvatar = () => {
    this.setState({ changeAvatar: true });
  };

  setAvatar = (key) => {
    const { myProfile } = this.state;
    // console.log("setAvatar", key);
    // if (myProfile && myProfile.ref) myProfile.ref.child("avatar").set(key);
    //new code
    if (myProfile && myProfile.ref) set(child(myProfile.ref, 'avatar'), key);

    this.setState({ changeAvatar: false });
  };

  render() {
    //const {avatars}= this;
    const { myProfile, loading, changeAvatar } = this.state;
    const { onLogout, fullProfile, viewUser, send } = this.props;
    //console.log("Profile render ", myProfile, "o=", this.state.modalIsOpen)

    //console.log("avatars # ", avatars.length, "o=", this.state.modalIsOpen)

    const has_avatar =
      myProfile && myProfile.avatar && gAvatars[myProfile.avatar];
    let nickname = this.props.username;
    if (myProfile && myProfile.nickname) nickname = myProfile.nickname;
    return (
      <Modal
        isOpen={this.state.modalIsOpen}
        style={customStyles}
        contentLabel="avatars"
        shouldCloseOnOverlayClick={true}
        onAfterOpen={this.afterOpenModal}
        onRequestClose={this.closeModal}>
        <ProfileCard
          fullProfile={fullProfile}
          closeModal={this.closeModal}
          viewUser={viewUser}
          send={send}
        />

        {/* <UserProfile
          nickname={nickname}
          onLogout={onLogout}
          myProfile={myProfile}
          has_avatar={has_avatar}
          changeAvatar={changeAvatar}
          setAvatar={this.setAvatar}
          profileRef={this.profileRef}
          closeModal={this.closeModal}
          selectAvatar={this.selectAvatar}
        /> */}

        {/* <div>
          {has_avatar && !changeAvatar &&
            <div>
              <div key={myProfile.key} className="profile">
                <p className="ptitle" >
                  Profile
				        </p>
                <p >
                  Nickname:
					      <input name="nickname" value={nickname} onChange={this.changeNickname} ref={(txt) => this.nickname = txt} />
                </p>
                <p >
                  Avatar
				        </p>
                <p >
                  <a onClick={this.selectAvatar}><img src={getAvatarUrl(myProfile.avatar)} /></a>
                </p>
              </div>
            </div>
          }


          {changeAvatar &&
            <div className="profile">
              <p>Pick new avatar:</p>
              {Object.keys(gAvatars).map((key) =>
                <div key={key} className="avatarsList">

                  <p>
                    <a onClick={() => this.setAvatar(key)}><img src={getAvatarUrl(key)} /></a>
                  </p>

                </div>
              )}
            </div>
          }

          {!(has_avatar) &&
            <div key={9999}>
              <p>No avatar available</p>
            </div>
          }
        </div> */}

        {/* <center ref={(endi) => this.lastBox = endi}>
          <a onClick={onLogout} style={{ color: 'black' }} title="Sign out" className="signout-footer" title={"logout"}><span><img src="static/img/exit-icon.svg" /> LOG OUT</span></a>
        </center> */}
      </Modal>
    );
  }

  /*
   
  onClick={this.openAvatar( post.key, post.title)}
  
  */

  componentWillUnmount() {}
}
