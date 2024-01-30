import React, { Component } from 'react';
// import Link from 'next/link';
// import axios from 'axios';
import VideoPlayer from '../../components/LiveStream/VideoPlayer';
// import GetRecent from '../../components/LiveStream/GetRecent';
import Header from '../../components/Header';
import Footer from '../../components/Footer';
import Comment from '../../components/Comment';
import AreaboiHelp from '../../components/AreaboiHelp';
import ReactionPicker, { EmojiWrapper } from '../../components/EmojiReaction';

import Layout from '../../layouts/Card';

import FirebaseDB, { firedbStore } from '../../settings/firebase.js';
import { ref as refD } from 'firebase/database';
import { doc, getDoc, onSnapshot } from 'firebase/firestore';

export default class Live extends Component {
  constructor() {
    super();

    this.state = {
      stream: {
        status: 'idle'
      },
      recentStreams: [],
      isLoading: false,
      selectEmoji: false,
      selectedEmojis: [],
      toolBtnsOpen: false
    };
    this.db = FirebaseDB();
    this.streamsRef = refD(this.db, 'streams'); //this.db.ref('streams');
    this.firestore = firedbStore; //this.db.theFirebaseLib.firestore();
  }

  componentDidMount() {
    this.getCurrentStream();
  }

  getCurrentStream = () => {
    const streamDocRef = doc(this.firestore, 'streams', 'current'); //this.firestore.collection("streams").doc("current").get()
    getDoc(streamDocRef)
      .then((doc) => {
        if (doc.exists) {
          const data = doc.data();
          this.setState({ stream: data });
        } else {
          console.log('No live stream exists yet');
        }
      })
      .catch((e) => console.log('Error retrieving the stream', e));

    onSnapshot(
      streamDocRef, //this.firestore.collection("streams").doc("current").onSnapshot(
      (docSnapshot) => {
        const data = docSnapshot.data();
        if (data && data.status === 'ready') {
          this.setState({ stream: data });
        }
      },
      (e) => console.error('Error getting snapshot of livestream', e)
    );
  };

  subHeader = () => {
    return (
      <div>
        <div className="unreadNotif">
          <div>
            <span
              className="unreadBolt"
              style={{ marginTop: '2px', marginLeft: '15px' }}>
              <img
                src="static/img/purple-lolly.svg"
                width="21px"
                height="21px"
              />
            </span>
          </div>
        </div>

        <a style={{ margin: '-22px auto' }} className="rooms_btn" title="Rooms">
          LIVE
        </a>

        <a title="Rooms" className="rooms_icon">
          <span>
            <img
              className="view_channels"
              src="/static/img/ghost-icon.svg"
              width="15px"
              height="15px"
            />
            <span>83</span>
          </span>
          <p className="sub-button">SUB</p>
        </a>
      </div>
    );
  };

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

  render() {
    const { stream, recentStreams, selectedEmojis, selectEmoji, toolBtnsOpen } =
      this.state;

    //Demo Values
    // let color_svg_btns = (post.user != userLogedIn) ? "reply_" : "sender_";
    let color_svg_btns = 'sender_';
    let reactionBtn = `../../static/img/${color_svg_btns}emoji.svg`;
    let shareBtn = `../../static/img/${color_svg_btns}share.svg`;
    var commentBtn = '../../static/img/' + color_svg_btns + 'comments.svg';

    return (
      <>
        <Layout />
        <Header subheader={this.subHeader()} />
        <section className="live-body">
          <div className="live-container">
            <div className="video-container">
              <img
                className="avatar avatar-left"
                src="../../static/img/pins_svg/02-a.svg"
              />
              <div className="post-container">
                <p className="live-banner">
                  {stream.status !== 'active' ? 'OFFLINE' : 'LIVE'}
                </p>
                <div className="video-container">
                  {stream.status === 'active' ? (
                    <VideoPlayer
                      playbackId={stream.playbackId}
                      status={stream.status}
                    />
                  ) : (
                    <div className="placeholder">
                      <AreaboiHelp
                        message={'No Active Live Stream📺 at the moment'}
                      />
                    </div>
                  )}
                </div>

                <div className="toolbar-post">
                  <div className="toolbar-text-container">
                    <span className="toolbar-text">
                      <span
                        className="date"
                        style={{ color: 'white !important' }}>
                        {new Date().toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </span>
                    {selectedEmojis.length === 0 ? (
                      <span className="toolbar-btns">
                        <a
                          onClick={this.openEmoji}
                          title="Reaction"
                          className="footer_btn">
                          <img className="boxBtn" src={reactionBtn} />
                        </a>
                        <a title="Comment" className="footer_btn">
                          <img className="boxBtn" src={commentBtn} />
                        </a>
                        <a title="Share" className="footer_btn">
                          <img className="boxBtn" src={shareBtn} />
                        </a>
                      </span>
                    ) : (
                      <EmojiWrapper
                        reactions={selectedEmojis}
                        onReaction={(emoji) => this.onReaction(emoji)}
                      />
                    )}
                    <div>
                      {selectEmoji && (
                        <ReactionPicker
                          modalOpened={selectEmoji}
                          modalClosed={this.closeEmoji}
                        />
                      )}
                    </div>
                  </div>
                  {selectedEmojis.length !== 0 && (
                    <div className="toolbar-btns-container">
                      <span className="toolbar-btns" style={{ marginLeft: 0 }}>
                        <a
                          onClick={this.openEmoji}
                          title="Reaction"
                          className="footer_btn">
                          <img className="boxBtn" src={reactionBtn} />
                        </a>
                        <a title="Comment" className="footer_btn">
                          <img className="boxBtn" src={commentBtn} />
                        </a>
                        <a title="Share" className="footer_btn">
                          <img className="boxBtn" src={shareBtn} />
                        </a>
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
            <Comment />
          </div>
        </section>

        <Footer />
        {/*
         <header>
              <h1>📺 Live</h1>
            </header>
            <main>
              <h2 className='title'>Status: {stream.status || 'No Live Stream'}</h2>

              <h3 className='recent-streams--title'>Recent Streams</h3>
              <ul className='recent-streams'>
                {
                  recentStreams.map(asset => {
                    <li>
                      <GetRecent playbackId={asset.playbackId} />
                      <span className='created-time'>{(new Date(asset.createdAt * 1000)).toDateString()}</span>
                    </li>
                  })
                }
              </ul>
            </main> */}

        <style jsx>
          {`
            body,
            html {
              height: 100%;
            }

            p {
              margin: 0;
              padding: 0;
            }

            .rooms_icon {
              top: 62px;
            }

            .sub-button {
              border: 0.5px dotted #ffffff;
              font-size: 0.625rem;
              margin-left: 13px;
              text-align: center;
              padding: 4px;
            }

            .live-body {
              padding-top: 6.3em;
              display: grid;
              overflow-y: scroll;
            }

            .placeholder {
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: center;
              background: #2d2926ff;
              width: 100%;
              height: 250px;
            }

            .live-container {
              width: 80%;
              margin-left: auto;
              margin-right: auto;
            }

            .live-banner {
              position: absolute;
              top: 0;
              left: 0;
              z-index: 6;
              padding: 1.5px;
              margin: 3px;
              color: ${stream.status !== 'active' ? '#e94b3cff' : '#20093B'};
              border: 1px solid
                ${stream.status !== 'active' ? '#e94b3cff' : '#20093B'};
              font-size: 0.625rem;
              font-weight: 700;
              font-family: 'Noto Sans JP Bold', sans-serif;
            }

            .video-container {
              display: flex;
              justify-content: center;
            }

            .avatar {
              display: flex;
              object-fit: scale-down;
              height: 30pt;
              margin-right: 2px;
            }

            .post-container {
              max-width: calc(100% - 25px);
              display: flex;
              flex-direction: column;
              width: 100%;
              z-index: 2;
              position: relative;
            }

            .post-container .date {
              font-weight: bolder;
            }

            /* Comment Section Styles */
            .comments-container {
              overflow-y: scroll;
              height: 12.5rem;
              // background: red;
              margin-top: 15px;
              margin-left: auto;
              margin-right: auto;
              //width: 80%;
            }

            .comment {
              display: flex;
              align-items: flex-start;
              height: 2.875rem;
              width: 100%;
              margin-bottom: 10px;
            }

            .comment-body {
              min-height: 1.75rem;
              display: flex;
              flex-direction: column;
              width: 100%;
            }

            .comment-body--content {
              background: #ffffff;
              display: flex;
              position: relative;
            }

            .comment-body--content-text {
              color: #20093b;
              margin-left: 10px;
              margin-top: 2px;
            }

            .comment-body--content > img {
              // justify-self: flex-end;
              position: absolute;
              top: 15%;
              bottom: 50%;
              right: 5px;
            }

            .comment-body--dets {
              height: 1.125rem;
              color: #20093b;
              padding-top: -3px;
              padding-bottom: 3px;
              display: flex;
              justify-content: space-between;
              transition: all 0.3s;
            }

            .comment-body--toolbar {
              padding-left: 4px;
            }

            .comment__author,
            .date {
              font-family: 'Roboto Mono';
              font-size: 0.625rem;
            }

            .comment-body--toolbar-btns {
              display: flex;
              justify-content: space-between;
              width: 30%;
            }

            /* Tool Post Styles */
            .toolbar-post {
              background-color: #20093b;
              width: inherit;
              /*text-align: center;*/
              opacity: 0.95;
              animation-name: more-anim;
              animation-duration: 3s;
              font-weight: bold;
              /*font-size: 16pt; */
              white-space: pre-wrap;
              padding: 0 10px;
              display: flex;
              flex-direction: column;
              align-items: center;
              justify-content: space-between;
              // max-width: 100%;
              height: auto;
            }

            .toolbar-text {
              display: flex;
              flex-direction: column;
              padding: 0 5px;
              // align-items: baseline;
            }

            .toolbar-text .date {
              white-space: nowrap;
            }

            .toolbar-text-container {
              display: flex;
              align-items: center;
              justify-content: space-between;
              width: 100%;
            }

            .toolbar-btns-container {
              display: flex;
              width: 100%;
            }

            .toolbar-btns {
              display: flex;
              flex: 1;
              align-items: center;
              justify-content: space-between;
              margin-left: 20px;
              // padding-right: 5px;
            }

            .reactions {
              width: 60%;
              margin-left: 50px;
              margin-right: -10px;
              text-align: right;
            }

            /* Footer Styles */
            .live-footer {
              background: #000000;
              font-family: 'Roboto Mono Bold', Helvetica;
              font-weight: bold;
              padding-top: 10px;
              padding-bottom: 10px;
              padding-left: 5px;
              padding-right: 5px;
              position: fixed;
              bottom: 0;
              left: 0;
              width: 100%;
            }

            .live-footer-navs {
              display: flex;
              justify-content: space-between;
              flex-wrap: wrap;
            }

            .live-footer-nav {
              background: rgba(255, 255, 255, 1);
              display: block;
              color: #000000;
              text-align: center;
              padding: 1px 2px;
              text-decoration: none;
              text-transform: uppercase;
              font-size: 0.875rem;
            }
          `}
        </style>
      </>
    );
  }
}
