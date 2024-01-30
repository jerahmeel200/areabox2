import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { gAvatars, gDefaultAvatar, getAvatarUrl } from '../settings/avatars.js';

import { linkPlayer, getFavIcon } from '../lib/linkPlayersLib.js';

import {
  ref as refD,
  onValue,
  get,
  child,
  set,
  push,
  update
} from 'firebase/database';
//import { getTags, getCommentTag } from '../lib/tagsLib'
import Link from 'next/link';

import PostDefault from './post/PostDefault';
import PostCinema from './post/cinema/Post';
import PostRadio from './post/radio/Post';
import PostSchool from './post/school/Post';
import PostSales from './posts/sales/Posts.js';

export default class Post extends Component {
  constructor(props) {
    super(props);

    //this.domNode = 0
    //this.blockquoteNode = 0

    this.link_text_nodes = this.link_text_nodes.bind(this);
    //this.renderIframe = this.renderIframe.bind(this);
    this.commentFnMsgKey = this.commentFnMsgKey.bind(this);
    this.editFnMsgKey = this.editFnMsgKey.bind(this);
    this.pinFnMsgKey = this.pinFnMsgKey.bind(this);
    this.unpin = this.unpin.bind(this);
    this.getEmojis = this.getEmojis.bind(this);

    this.state = {
      usersAvatars: {},
      usersProfiles: {},
      selectEmoji: false,
      selectedEmojis: { selectedEmojis: [], allUsers: [] }
    };
  }
  render() {
    const {
      post,
      registered,
      userLogedIn,
      profileFn,
      readonly,
      postIndex,
      postsArray,
      layout,
      showPassport
    } = this.props;
    const { usersAvatars, usersProfiles, selectEmoji, selectedEmojis } =
      this.state;
    // let styles = [
    //   '../static/card-iframe.css',
    //   '../static/iframe-hidden.css',
    // ]
    // let scripts = [
    // ]
    let solveEmbeds = false; //typeof(post.is_latest)!="undefined"? post.is_latest : false;
    let is_latest = solveEmbeds ? 1 : 0;
    if (post.user != userLogedIn) solveEmbeds = false;

    console.log('Post timeStamp', postsArray, postIndex);
    let nickname = this.getUSerNickname(post, usersProfiles);
    const diffDay = this.isDifferentDay(postsArray, postIndex);
    const timeStamp = this.getTimeStamp(postsArray, postIndex);
    const userClass = this.getUSerClassName(post, solveEmbeds);
    const avatar = this.getUSerAvatar(post, usersAvatars);
    const avatarLeft = this.isAvatarLeft(post);
    // console.log(this.state.selectedEmojis);
    if (layout == 'cinema') {
      return (
        <PostCinema
          post={post}
          diffDay={diffDay}
          timeStamp={timeStamp}
          userClass={userClass}
          avatar={avatar}
          avatarLeft={avatarLeft}
          nickname={nickname}
          selectedEmojis={selectedEmojis}
          selectEmoji={selectEmoji}
          onReaction={this.onReaction}
          readonly={readonly}
          registered={registered}
          userLogedIn={userLogedIn}
          profileFn={profileFn}
          commentFnMsgKey={this.commentFnMsgKey}
          editFnMsgKey={this.editFnMsgKey}
          pinFnMsgKey={this.pinFnMsgKey}
          openEmoji={this.openEmoji}
          closeEmoji={this.closeEmoji}
        />
      );
    } else if (layout == 'school') {
      return (
        <PostSchool
          post={post}
          diffDay={diffDay}
          timeStamp={timeStamp}
          userClass={userClass}
          avatar={avatar}
          avatarLeft={avatarLeft}
          nickname={nickname}
          selectedEmojis={selectedEmojis}
          selectEmoji={selectEmoji}
          onReaction={this.onReaction}
          readonly={readonly}
          registered={registered}
          userLogedIn={userLogedIn}
          profileFn={profileFn}
          commentFnMsgKey={this.commentFnMsgKey}
          editFnMsgKey={this.editFnMsgKey}
          pinFnMsgKey={this.pinFnMsgKey}
          openEmoji={this.openEmoji}
          closeEmoji={this.closeEmoji}
        />
      );
    } else if (layout == 'radio') {
      return (
        <PostRadio
          post={post}
          diffDay={diffDay}
          timeStamp={timeStamp}
          userClass={userClass}
          avatar={avatar}
          avatarLeft={avatarLeft}
          nickname={nickname}
          selectedEmojis={selectedEmojis}
          selectEmoji={selectEmoji}
          onReaction={this.onReaction}
          readonly={readonly}
          registered={registered}
          userLogedIn={userLogedIn}
          profileFn={profileFn}
          commentFnMsgKey={this.commentFnMsgKey}
          editFnMsgKey={this.editFnMsgKey}
          pinFnMsgKey={this.pinFnMsgKey}
          openEmoji={this.openEmoji}
          closeEmoji={this.closeEmoji}
        />
      );
    } else if (layout == 'sales') {
      return (
        <PostSales
          post={post}
          diffDay={diffDay}
          timeStamp={timeStamp}
          userClass={userClass}
          avatar={avatar}
          avatarLeft={avatarLeft}
          nickname={nickname}
          selectedEmojis={selectedEmojis}
          selectEmoji={selectEmoji}
          onReaction={this.onReaction}
          readonly={readonly}
          registered={registered}
          userLogedIn={userLogedIn}
          profileFn={profileFn}
          commentFnMsgKey={this.commentFnMsgKey}
          editFnMsgKey={this.editFnMsgKey}
          pinFnMsgKey={this.pinFnMsgKey}
          openEmoji={this.openEmoji}
          closeEmoji={this.closeEmoji}
        />
      );
    } else
      return (
        <PostDefault
          post={post}
          diffDay={diffDay}
          timeStamp={timeStamp}
          userClass={userClass}
          avatar={avatar}
          avatarLeft={avatarLeft}
          nickname={nickname}
          selectedEmojis={selectedEmojis.selectedEmojis}
          selectEmoji={selectEmoji}
          onReaction={this.onReaction}
          readonly={readonly}
          registered={registered}
          userLogedIn={userLogedIn}
          profileFn={profileFn}
          commentFnMsgKey={this.commentFnMsgKey}
          editFnMsgKey={this.editFnMsgKey}
          pinFnMsgKey={this.pinFnMsgKey}
          openEmoji={this.openEmoji}
          closeEmoji={this.closeEmoji}
          showPassport={showPassport}
        />
      );
  }

  commentFnMsgKey() {
    const { key, user, num_comments } = this.props.post;
    console.log('Post commentFnMsgKey post.key', key);
    this.props.commentFn(window.event, key, user, num_comments);
  }
  editFnMsgKey() {
    this.props.editFn(window.event, this.props.post.key, this.props.post.text);
  }
  pinFnMsgKey() {
    this.props.pinFn(window.event, this.props.post.key);
  }
  unpin(e) {
    this.props.pinFn(window.event, 0);
    if (e.preventDefault()) e.preventDefault();
  }

  //<div>{renderHTML(this.createMarkup(post))}</div>   //  <a> work but js click does not
  // with dangerouslySetInnerHTML <a> does not work but js click does

  componentDidMount() {
    //const node = this.domNode1 || this.domNode;
    //if (node) {
    //  node.addEventListener("click", this.openPostFn, {}, /*useCapture*/false);
    //  this.link_text_nodes(node)
    //}

    // draft prevent card from being clicked if children have links
    //if (this.blockquoteNode) {
    //  //set read more only for read more letters
    //  this.blockquoteNode.addEventListener("click", this.openPostFn, {}, /*useCapture*/false);
    //}

    this.getEmojis();
    if (window.commNode)
      window.commNode.addEventListener(
        'click',
        this.tagResults,
        {},
        /*useCapture*/ false
      );

    if (window.numCommNode)
      //comments can mess with action press to read more
      window.numCommNode.addEventListener(
        'click',
        this.isNumCommentsFn,
        {},
        /*useCapture*/ false
      );

    window.unpin = this.unpin;
  }

  link_text_nodes(elem) {
    if (elem.tagName == 'A') {
      //console.log("link_text_nodes tag ", elem.tagName, " h ", elem.className)
      elem.addEventListener(
        'click',
        function (e) {
          if (elem.href != '') window.top.location = elem.href;
          e.stopPropagation();
          return false;
        },
        {},
        true
      ); //useCapture

      return false;
    }
    let x = elem.childNodes;
    let res = true;
    for (let i = 0; i < x.length; i++) {
      if (!this.link_text_nodes(x[i])) res = false;
    }
    /*
    if(res) 
      elem.addEventListener("click", this.openPostFn, {},  true); //useCapture
    else 
      elem.addEventListener("click", this.stopBubble, {},  true); //useCapture
    */
    return true;
  }

  openEmoji = () => {
    this.setState({ selectEmoji: true });
  };

  closeEmoji = (emoji) => {
    if (emoji) {
      const { userLogedIn } = this.props;
      console.log('closed');
      this.setState({ selectEmoji: false });
      const { selectedEmojis: emojiObject, allUsers } =
        this.state.selectedEmojis;

      console.log(emojiObject);
      //   this.setState({
      //     selectedEmojis: emojiObject,
      //   });
      //   console.log(this.state.selectedEmojis);
      const used = allUsers.some(({ usedEmoji }) => emoji === usedEmoji);
      console.log(used);
      if (used) {
        this.onReaction(emoji);
      } else {
        this.setState(
          {
            selectedEmojis: {
              selectedEmojis: Array.isArray(emojiObject)
                ? emojiObject.concat({ ...emoji, count: 0 })
                : [],
              allUsers: this.state.selectedEmojis.allUsers
            }
          },
          () => this.onReaction(emoji)
        );
        // console.log(emojiObject.concat({ ...emoji, count: 0 }));
        console.log(this.state.selectedEmojis);
        // this.onReaction(emoji);
      }
    }
    //
    // if (emoji) {
    //   emoji.user = userLogedIn;
    //   this.saveUserEmoji(emoji);
    //   let isEmojiAlreadyFound = false;
    //   let emojiWithCount = { ...emoji, count: 1 };
    //   let newSelectedEmojis =
    //     this.state.selectedEmojis.selectedEmojis.length > 0 &&
    //     this.state.selectedEmojis.selectedEmojis.map((emojiObject) => {
    //       if (emojiObject.id === emoji.id) {
    //         isEmojiAlreadyFound = true;
    //         return {
    //           ...emojiObject,
    //           count: emojiObject.count + 1,
    //         };
    //       }
    //       return emojiObject;
    //     });

    //   if (!isEmojiAlreadyFound) {
    //     console.log(this.state.selectedEmojis);
    //     this.setState((state) => {
    //       const selectedEmojis = [
    //         ...this.state.selectedEmojis?.selectedEmojis,
    //         emojiWithCount,
    //       ];

    //       this.saveEmoji(selectedEmojis);

    //   return {
    // selectedEmojis,
    // selectEmoji: false,
    //   };
    //     });
    //   } else {
    //     this.setState({
    //       selectedEmojis: newSelectedEmojis,
    //       selectEmoji: false,
    //     });

    //     this.saveEmoji(newSelectedEmojis);
    //   }
    // } else this.setState({ selectEmoji: false });
  };

  saveUserEmoji = (emoji) => {
    const { gChatRef, post, userLogedIn } = this.props;

    // const userRef = gChatRef.ref(
    //   "users/" + userLogedIn + "/reactions/" + post.key
    // );
    //new code
    const userRef = refD(
      gChatRef,
      'users/' + userLogedIn + '/reactions/' + post.key
    );
    console.log('single', emoji);
    // userRef
    //   .push()
    //   .set(emoji)
    //   .then(function() {
    //     console.log("reaction success");
    //   });
    //new code
    set(push(userRef), emoji).then(() => console.log('reaction success'));
  };

  saveEmoji = (emojis) => {
    const { gChatRef, post, page } = this.props;
    let channel_id = page.room_key;

    // const chatRef = gChatRef.ref(
    //   "chat/" + channel_id + "/" + post.key + "/reactions/"
    // );
    //new code
    const chatRef = refD(
      gChatRef,
      'chat/' + channel_id + '/' + post.key + '/reactions/'
    );

    // chatRef.update({ emojis }).then(function() {
    //   console.log("reaction saved on chat");
    // });
    //new code
    const emojObj = {
      selectedEmojis: emojis.selectedEmojis,
      allUsers: emojis.allUsers
    };
    console.log(emojObj);
    update(chatRef, emojObj).then(function () {
      console.log('reaction saved on chat');
    });
  };

  getEmojis() {
    let self = this;
    const { gChatRef, post, page } = this.props;
    let channel_id = page.room_key;

    //old code
    // const chatRef = gChatRef.ref(
    //   "chat/" + channel_id + "/" + post.key + "/reactions/"
    // );
    // chatRef.on(
    //     "value",
    //     function(snapshot) {
    //         snapshot.forEach((data) => {
    //             self.setState({ selectedEmojis: data.val() });
    //         });
    //     },
    //new code
    console.log('getemoji');
    const chatRef = refD(
      gChatRef,
      'chat/' + channel_id + '/' + post.key + '/reactions/'
    );
    onValue(
      chatRef,
      function (snapshot) {
        const allEmojiData = snapshot.val();
        console.log(allEmojiData);
        // for (const data in allEmojiData){
        self.setState(
          {
            selectedEmojis: {
              selectedEmojis:
                allEmojiData?.selectedEmojis || allEmojiData || [],
              allUsers: allEmojiData?.allUsers || []
            }
          },
          () => console.log(self.state.selectedEmojis, allEmojiData?.allUsers)

          // data.val()?.allUsers || self.state.selectedEmojis.allUsers,
        );
      },

      function (errorObject) {
        console.log('The read failed: ' + errorObject.code);
      }
    );
  }

  onReaction = (emoji) => {
    let selectedEmojis;
    let usedEmoji;
    const { userLogedIn } = this.props;
    const { selectedEmojis: emojiObject, allUsers } = this.state.selectedEmojis;
    console.log('jjjjj', emojiObject);
    const userIndexAllUsers = allUsers?.findIndex(({ user, emoji }) => {
      if (user === userLogedIn && (usedEmoji = emoji)) {
        return user === userLogedIn;
      }
    });
    const alreadyReacted = userIndexAllUsers !== -1;
    console.log(alreadyReacted);
    if (!alreadyReacted) {
      selectedEmojis = emojiObject.map((emojiObj) => {
        if (emojiObj.name === emoji.name) {
          !Array.isArray(emojiObj.user) && (emojiObj.user = []);
          emojiObj.user.unshift(userLogedIn);
          emojiObj.count = emojiObj.user.length;
        }
        return emojiObj;
      });
      allUsers.unshift({ user: userLogedIn, emoji: emoji.name });
    } else {
      allUsers.splice(userIndexAllUsers, 1);
      selectedEmojis = emojiObject.map((emojiObj, ind, arr) => {
        if (emojiObj.name === usedEmoji) {
          let userIndex = emojiObj.user?.findIndex(
            (user) => user === userLogedIn
          );
          if (userIndex !== -1 && typeof userIndex === 'number') {
            emojiObj.user.splice(userIndex, 1);
            // console.log(this.state.selectedEmojis);
            // emojiObject.count += 1;
            emojiObj.count = emojiObj.user.length;
            //emojiObj.user = userLogedIn;
          }
          //    else {
          //     emojiObj.user.unshift(userLogedIn);
          //     emojiObj.count = emojiObj.user.length;
          //   }
        } else if (
          emojiObj.name === emoji.name
          //&&!emojiObj.name === usedEmoji
        ) {
          !Array.isArray(emojiObj.user) && (emojiObj.user = []);
          emojiObj.user.unshift(userLogedIn);
          allUsers.unshift({ user: userLogedIn, emoji: emoji.name });

          console.log(emoji.name);
          emojiObj.count = emojiObj.user.length;
        }
        // allUsers.splice(userIndexAllUsers, 1);
        return emojiObj;
      });
      //   allUsers.unshift(userLogedIn);
    }
    console.log(selectedEmojis);
    const emoj = {
      //   selectedEmojis: selectedEmojis.filter(({ count }) => count !== 0),
      selectedEmojis: selectedEmojis.filter(({ count }) => count !== 0),
      allUsers
    };
    this.saveUserEmoji(emoji);
    this.saveEmoji(emoj);
    this.setState({ selectedEmojis: emoj });
    console.log(selectedEmojis, emoj);
  };

  getUSerClassName = (post, solveEmbeds) => {
    const { userLogedIn } = this.props;
    let res = post.user == userLogedIn ? 'msg msg--them' : 'msg msg--me';
    if (solveEmbeds) res = res + ' solveEmbeds';
    return res;
  };

  getUSerAvatar = (post, usersAvatars) => {
    const { userLogedIn, userMetadata } = this.props;

    let avatar = gDefaultAvatar;
    const path = 'static/img/ARISTOS/';
    let res = 0; //getAvatarUrl(gDefaultAvatar)
    //let exists = this.getAvatar(post.user);

    //console.log("getUSerAvatar", post.user,userMetadata )

    if (post.user == userLogedIn) {
      //get avatar of current user
      if (userMetadata.profile && userMetadata.profile.aristo)
        avatar = userMetadata.profile.aristo;

      return `static/img/ARISTOS/${avatar}.png`;
      //console.log("getUSerAvatar", avatar )
    } else if (usersAvatars) {
      if (usersAvatars[post.user]) avatar = usersAvatars[post.user];
      else this.getAvatar(post.user); // async, will change state.usersAvatars later
    }

    // if (avatar.indexOf(".") < 0) {
    //   // has extension: is URL
    //   if (gAvatars[avatar]) return getAvatarUrl(avatar);
    //   else getAvatarUrl(gDefaultAvatar);
    // }
    else if (exists) {
      this.getAvatar(post.user);
      avatar = usersAvatars[post.user];
    }

    return `static/img/ARISTOS/${avatar}.png`; //avatar; // otherwise it is custom image
  };

  getUSerNickname = (post, usersProfiles) => {
    const { userLogedIn, userMetadata } = this.props;

    let nickname = userLogedIn;

    if (post.user == userLogedIn) {
      if (userMetadata && userMetadata.profile && userMetadata.profile.nickname)
        nickname = userMetadata.profile.nickname;
      //console.log("getUSerNickname", nickname )
    } else if (usersProfiles && usersProfiles[post.user]) {
      nickname = usersProfiles[post.user].nickname;
    }
    if (!nickname) nickname = '-'; // may not have login data yet

    return nickname;
  };

  isAvatarLeft = (post) => {
    const { userLogedIn } = this.props;
    let res = post.user == userLogedIn ? false : true;
    return res;
  };

  stopBubble = (e) => {
    e.stopPropagation();
    return false;
  };

  tagResults = (e, tag) => {
    // Ref function ( client side )
    window.top.location =
      '?tag=' + (tag ? tag : this.props.post.replyto_tag.substring(1));
  };

  isNumCommentsFn = () => {
    //var tag = getCommentTag(this.props.post.key);
    //this.tagResults(0, tag.substring(1));
    const { post } = this.props;
    window.top.location = `?k=${encodeURIComponent(
      post.key
    )}&rk=${encodeURIComponent(post.room_key)}`;
  };

  isDifferentDay = (array, index) => {
    if (index === 0) return true;

    const date1 = new Date(array[index - 1].time);
    const date2 = new Date(array[index].time);
    return (
      date1.getFullYear() !== date2.getFullYear() ||
      date1.getMonth() !== date2.getMonth() ||
      date1.getDate() !== date2.getDate()
    );
  };

  getTimeStamp = (array, index) => {
    const todayDate = new Date().toDateString();
    const yesterdayLongDate = new Date();
    yesterdayLongDate.setDate(new Date().getDate() - 1);
    const yesterdayDate = yesterdayLongDate.toDateString();

    const today = todayDate.slice(0, todayDate.length - 5);
    const yesterday = yesterdayDate.slice(0, yesterdayDate.length - 5);

    const postDate = new Date(array[index].time);
    const fullDate = postDate.toDateString();
    const timeStampString = fullDate.slice(0, fullDate.length - 5);

    const options = { month: 'short', day: 'numeric', year: 'numeric' };
    console.log(array[index].text, timeStampString, today, postDate);
    if (timeStampString === today) return 'Today';
    else if (timeStampString === yesterday) return 'Yesterday';
    else return postDate.toLocaleDateString('en-US', options);
  };

  getAvatar = (userName) => {
    const { usersAvatars, usersProfiles } = this.state;
    if (!userName) return; //fix for old messages issue

    const gChatRef = this.props.gChatRef;
    if (!gChatRef) return;

    //old code
    // let ref = gChatRef.ref("users");
    // ref = ref.child(userName);
    let ref = refD(gChatRef, 'users');
    ref = child(ref, userName);
    if (!ref.child) return;
    // ref = ref.child("profile");
    ref = child(ref, 'profile');

    // return ref.on(
    //   "value",
    //   function (dataSnapshot) {
    //     const myProfile = dataSnapshot.val() || {};
    //     //console.log("profile", myProfile)
    //     if (!myProfile.aristo) myProfile.aristo = gDefaultAvatar;
    //     usersAvatars[userName] = myProfile.aristo;
    //     usersProfiles[userName] = myProfile;

    //     this.setState({ usersAvatars, usersProfiles });
    //   }.bind(this)
    // );
    return onValue(ref, (dataSnapshot) => {
      const myProfile = dataSnapshot.val() || {};
      //console.log("profile", myProfile)
      if (!myProfile.aristo) myProfile.aristo = gDefaultAvatar;
      usersAvatars[userName] = myProfile.aristo;
      usersProfiles[userName] = myProfile;

      this.setState({ usersAvatars, usersProfiles });
    });
  };
}

Post.propTypes = {
  post: PropTypes.object.isRequired,
  commentFn: PropTypes.func.isRequired,
  registered: PropTypes.bool.isRequired,
  editFn: PropTypes.func.isRequired,
  profileFn: PropTypes.func.isRequired,
  userMetadata: PropTypes.object.isRequired,
  readonly: PropTypes.bool.isRequired,
  pinFn: PropTypes.func.isRequired,
  layout: PropTypes.string.isRequired
};
