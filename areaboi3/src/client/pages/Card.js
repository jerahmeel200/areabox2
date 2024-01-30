//import 'babel-polyfill'

import React from 'react';
import Link from 'next/link';

import { connect } from 'react-redux';
import { ACTION_NEXT_PAGE, default_state, reload_state } from '../store';

//import Error from '../components/_error'
import Layout from '../layouts/Card';
import Posts from '../components/Posts'; // as in global styles (nextjs wiki)
//import { connect } from 'react-redux';
//import { style, merge } from 'next/css'
import { FirebaseDatabase } from '../settings/firebase.js';
import Header from '../components/Header';
import Footer from '../components/Footer';
import ReactionPicker, { EmojiWrapper } from '../components/EmojiReaction';
import { linkPlayer, getFavIcon, formatTime } from '../lib'; //populateItemProps
import {
  child,
  onValue,
  ref as refD,
  query as queryF,
  orderByPriority,
  startAt,
  endAt,
  onChildAdded,
  orderByKey,
  limitToFirst
} from 'firebase/database';

const me = 'areaboi';

class Card extends React.Component {
  static async getInitialProps({ store, pathname, query, isServer }) {
    function result(data) {
      let state00 = isServer ? default_state : reload_state;
      state00.isServer = isServer;
      var payload = Object.assign({}, state00, data);
      let ss = store.dispatch({ type: ACTION_NEXT_PAGE, payload });
      return {};
    }

    console.log('Card getInitialProps v1.24');
    console.log('server ', isServer);

    console.log('q ', query);
    const post_key = query.k;
    const room_key = query.r;
    const comments = 0;

    const gChatRef = FirebaseDatabase;
    //console.log("gChatRef ", gChatRef);
    const ref = child(refD(gChatRef, 'chat'), `${room_key}/${post_key}`);

    if (!ref) return result({});

    return new Promise((resolve) => {
      onValue(
        ref,
        (childSnapshot) => {
          const posts = [];
          const post = childSnapshot.val();
          if (!post || post == null) resolve(result({}));
          post.key = childSnapshot.key;
          post.user = post.name;

          let time =
            childSnapshot.exportVal()['.priority'] || post['.priority'];
          post.hhmm = '';
          post.edited_hhmm = '';
          if (time) {
            post.hhmm = formatTime(time);
          }
          if (post.edited) {
            //  post.edited_hhmm= "edited: "+formatTime(  post.edited);
            post.edited_hhmm = formatTime(post.edited); //"(edited)";
          }
          if (post.comment) {
            post.replyto_txt =
              post.replyto_user + ' (' + formatTime(post.replyto_prio) + ')';
          }
          posts.push(post);
          resolve(getComments(posts));
        },
        { onlyOnce: false }
      );
    });

    function getComments(posts) {
      let post = posts[0];
      let tag = getCommentTag(posts[0].key);
      var ref = child(refD(gChatRef, 'comments'), tag);
      onValue(ref, (dataSnapshot) => {
        //ref.once("value").then((dataSnapshot) => {
        p = 0;
        dataSnapshot.forEach((childSnapshot) => {
          var data = childSnapshot.val();
          var prio = data.msg_priority;
          if (!p)
            // serialize promises
            p = new Promise((resolve) => {
              onValue(
                queryF(
                  child(refD(gChatRef, 'chat'), room_key),
                  orderByPriority(),
                  startAt(prio),
                  endAt(prio)
                ),
                (snapshot) => resolve(msg_fn_collect(snapshot)),
                { onlyOnce: false }
              );
            });
          //gChatRef.ref("chat").child(room_key).orderByPriority().startAt(prio).endAt(prio) .once("value")  .then(msg_fn_collect);
          else
            p = p.then(
              () =>
                new Promise((resolve) => {
                  onValue(
                    queryF(
                      child(refD(gChatRef, 'chat'), room_key),
                      orderByPriority(),
                      startAt(prio),
                      endAt(prio)
                    ),
                    (snapshot) => resolve(msg_fn_collect(snapshot)),
                    { onlyOnce: false }
                  );
                }) //gChatRef.ref("chat").child(room_key).orderByPriority().startAt(prio).endAt(prio) .once("value")  .then(msg_fn_collect);
            );
        }); //foreach

        if (p)
          return p.then(function () {
            console.log('Card have all promises');
            return result({ posts, post_key, room_key });
          });
        else {
          return result({ posts, post_key, room_key });
        }
      }); //once
    } //getComments

    // FN to collect messages with tag
    function msg_fn_collect(dataSnapshot) {
      dataSnapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();
        if (!item || item == null) return;
        item.room_key = room_key;

        //item= populateItemProps( item, childSnapshot)
        posts.push(item);
      });
    } //msg_fn_collect
  } //getInitialProps

  constructor(props) {
    super(props);
    this.domNode = 0;

    console.log('Card constructor ');
    this.tagResults = this.tagResults.bind(this);
    //this.getComments = this.getComments.bind(this);
    this.state = {
      next_key: false,
      usersAvatars: {},
      usersProfiles: {},
      selectEmoji: false,
      selectedEmojis: [],
      toolBtnsOpen: false
    };
  }

  render() {
    const { dispatch, posts, registered, userLogedIn } = this.props;
    const { next_key, selectedEmojis, selectEmoji, toolBtnsOpen } = this.state;
    console.log('Card v1.92', userLogedIn);

    const readonly = false;
    let post = posts && posts.length > 0 ? posts[0] : 0;

    let color_svg_btns = post.user != userLogedIn ? 'reply_' : 'sender_';
    let reactionBtn = `/static/img/${color_svg_btns}emoji.svg`;
    let shareBtn = `/static/img/${color_svg_btns}share.svg`;
    let pinBtn = `/static/img/${color_svg_btns}pin.svg`;
    var commentBtn = '/static/img/' + color_svg_btns + 'comments.svg';
    return (
      <>
        <Layout />
        <div className="app-container">
          <Header
            subheader={
              <div>
                <div className="unreadNotif">
                  <div>
                    <span
                      className="unreadBolt"
                      style={{ marginTop: '2px', marginLeft: '15px' }}>
                      <Link href="/">
                        <img src="static/img/back-arrow-fat.svg" />
                      </Link>
                    </span>
                  </div>
                </div>

                <a
                  style={{ margin: '-20px auto' }}
                  className="rooms_btn"
                  title="Rooms">
                  Channel Title
                </a>

                <a title="Rooms" className="rooms_icon">
                  <span>
                    <img
                      className="view_channels"
                      src="static/img/ghost-icon.svg"
                      width="15px"
                      height="15px"
                    />
                    <span>83</span>
                  </span>
                  <p className="sub-button">SUB</p>
                </a>
              </div>
            }
          />

          <section>
            <div className="messages-container">
              <Posts
                key="card"
                posts={posts}
                userMetadata={userMetadata}
                userLogedIn={userLogedIn}
                registered={registered}
                gChatRef={this.gChatRef}
              />
            </div>
          </section>

          <Footer />
        </div>
      </>
    );
  }

  //<div>{renderHTML(this.createMarkup(post))}</div>   //  <a> work but js click does not
  // with dangerouslySetInnerHTML <a> does not work but js click does

  componentDidMount() {
    const { post_key, room_key } = this.props;
    console.log('Card DidMount', room_key, post_key);
    window.tagResults = this.tagResults; //exports the function for use with fb .html referencing areaboi V1 Js lib
    if (!room_key || !post_key) return;

    const gChatRef = FirebaseDatabase;
    var ref = child(refD(gChatRef, 'chat'), room_key); //gChatRef.ref("chat").child(room_key);
    //console.log("componentDidMount ref", typeof( ref));
    if (ref)
      onChildAdded(
        queryF(ref, orderByKey(), startAt(post_key), limitToFirst(2)), //ref.orderByKey().startAt(post_key).limitToFirst(2).on("child_added",
        (snap) => {
          if (snap && snap.key != post_key)
            this.setState({ next_key: snap.key });
          //ref.off();
        },
        { onlyOnce: true }
      );
  }

  // An iframe is used as a firewall to isolate html markup issues that cause errors in react
  createMarkup(post) {
    if (!post || !post.html) return '';
    let html = post.html ? post.html : post.text;
    html = html + '<small>';
    // html = html + '<br/><span className="date"> ' + post.user + '</span>'
    // html = html + '<span className="date"> ' + post.hhmm + '</span><br/><span className="date"> ' + post.edited_hhmm + '</span>'
    if (post.replyto_txt)
      html = html + '<br/><span> replying to ' + post.replyto_txt + '</span>';
    html = html + '</small>';
    //return html; //for iframe
    return { __html: html }; // for dangerouslysetinnerhtml
  }

  createNodes(post) {
    let player = linkPlayer(post);
    let favIcon = getFavIcon(post);

    return (
      <div>
        {favIcon}

        {post.tit != 0 && <div className="tit">{post.tit}</div>}

        {post.link != 0 && (
          <a
            className="media-link"
            title="open in new window"
            target="_blank"
            ref="nofollow"
            href={post.link}>
            {post.img != 0 && (
              <div className="weblink-container">
                <img className="weblink" src={post.img} />
              </div>
            )}

            {post.texts != 0 && <span className="webtexts">{post.texts}</span>}
          </a>
        )}

        {player}

        {post.texts != 0 && (
          <div id="demarcator-container">
            <img
              className="demarcator"
              src="../static/img/demarcator.svg"
              width="12px"
              height="8px"
            />
          </div>
        )}

        {post.contents && (
          <div className="user-content">{post.contents.trim()}</div>
        )}

        {post.tags &&
          post.tags != 0 &&
          post.tags.map((tag) => {
            return (
              <a className="msg-tag-link" onclick='tagResults("tools",-1)'>
                #{tag}
              </a>
            );
          })}
      </div>
    );
  } //createNodes

  createComment(comment) {
    return (
      <div className="comment">
        <img src="../static/img/ghost-icon.svg" alt="User Avatar" />
        <div className="comment-body">
          <div className="comment-body--content">
            <div className="comment-body--content-text">
              This is a placeholder Text
            </div>
            <img
              onClick={this.displayToolbtns}
              src="../static/img/3-vertical-dots.svg"
            />
          </div>
          <div
            className="comment-body--dets"
            style={{ background: `${toolBtnsOpen ? 'white' : 'transparent'}` }}>
            <span className="comment-body--toolbar">
              <span className={`date`}>5:59pm</span>
              <span className="comment__author">John</span>
            </span>
            <span className="comment-body--reactions">😁😘</span>
            <span
              className="comment-body--toolbar-btns"
              style={{ display: `${toolBtnsOpen ? 'inline-flex' : 'none'}` }}>
              {!readonly && registered && (
                <a
                  onClick={this.openEmoji}
                  title="Reaction"
                  className="footer_btn">
                  <img className="boxBtn" src={reactionBtn} />
                </a>
              )}
              {!readonly && registered && (
                <a
                  onClick={this.commentFnMsgKey}
                  title="Comment"
                  className="footer_btn">
                  <img className="boxBtn" src={commentBtn} />
                </a>
              )}
              {!readonly && registered && (
                <a
                  onClick={this.commentFnMsgKey}
                  title="Share"
                  className="footer_btn">
                  <img className="boxBtn" src={shareBtn} />
                </a>
              )}
              {!readonly && registered && userLogedIn == post.user && (
                <a
                  onClick={this.editFnMsgKey}
                  title="Edit"
                  className="footer_btn">
                  <img className="boxBtn" src="/static/img/sender_edit.svg" />
                </a>
              )}
            </span>
          </div>
        </div>
      </div>
    );
  }

  getUSerClassName(post) {
    return post.user == me ? 'msg msg--me' : 'msg msg--them';
  }

  tagResults(tag) {
    //for client
    console.log('tagResults', tag);
    window.top.location = '?tag=' + tag;
  }

  openEmoji = () => {
    this.setState({ selectEmoji: true });
  };

  closeEmoji = (emoji) => {
    if (emoji) {
      let isEmojiAlreadyFound = false;
      let emojiWithCount = { ...emoji, count: 1 };
      let newSelectedEmojis = this.state.selectedEmojis.map((emojiObject) => {
        if (emojiObject.id === emoji.id) {
          isEmojiAlreadyFound = true;
          return {
            ...emojiObject,
            count: emojiObject.count + 1
          };
        }
        return emojiObject;
      });
      if (!isEmojiAlreadyFound) {
        this.setState((state) => {
          const selectedEmojis = [...state.selectedEmojis, emojiWithCount];
          return {
            selectedEmojis,
            selectEmoji: false
          };
        });
      } else {
        this.setState({
          selectedEmojis: newSelectedEmojis,
          selectEmoji: false
        });
      }
    } else this.setState({ selectEmoji: false });
  };

  onReaction(emoji) {
    const selectedEmojis = this.state.selectedEmojis.map((emojiObject) => {
      if (emojiObject.name === emoji.name) {
        emojiObject.count += 1;
      }
      return emojiObject;
    });
    this.setState({ selectedEmojis });
  }

  displayToolbtns = () => {
    this.setState({ toolBtnsOpen: !this.state.toolBtnsOpen });
  };

  /*getComments(msg_key) { //for client not being used here but on iframe static/card.js
    var tag= getCommentTag( msg_key);
    this.tagResults(tag);	
  } */
}

//redux
export default connect((state) => state)(Card); //, AreaboxChat.mapDispatchToProps

// previously, alternative to iframe
//<div contentEditable='true' dangerouslySetInnerHTML={{ __html: this.createMarkup(post) }} ></div>

function getCommentTag(msg_key) {
  return toValidTag(msg_key + '_commenttag');
}
function toValidTag(s) {
  var r = s.replace(/\W+/g, '_');
  return r;
}

// function formatTime(date) {
//   return timeSince(date) + " ago"
// }

// function timeSince(date) {

//   var seconds = Math.floor((new Date() - date) / 1000);

//   var interval = Math.floor(seconds / 31536000);

//   if (interval > 1) {
//     return interval + " years";
//   }
//   interval = Math.floor(seconds / 2592000);
//   if (interval > 1) {
//     return interval + " months";
//   }
//   interval = Math.floor(seconds / 86400);
//   if (interval > 1) {
//     return interval + " days";
//   }
//   interval = Math.floor(seconds / 3600);
//   if (interval > 1) {
//     return interval + " hours";
//   }
//   interval = Math.floor(seconds / 60);
//   if (interval > 1) {
//     return interval + " minutes";
//   }
//   return Math.floor(seconds) + " seconds";
// }
