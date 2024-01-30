import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactionPicker, { EmojiWrapper } from '../../components/EmojiReaction';
import PostNodes from '../postNodes/postNodes';

export default class PostDefault extends Component {
  render() {
    const {
      post,
      diffDay,
      timeStamp,
      userClass,
      avatar,
      avatarLeft,
      nickname,
      selectedEmojis,
      selectEmoji,
      onReaction,
      readonly,
      registered,
      userLogedIn,
      profileFn,
      commentFnMsgKey,
      editFnMsgKey,
      pinFnMsgKey,
      openEmoji,
      closeEmoji,
      page,
      loadMore,
      showPassport
    } = this.props;
    // console.log("first", selectedEmojis);
    const blockquote_class = post.in_thread ? 'msg-comment' : 'msg-main';
    let tagFn = '';
    let color_svg_btns = post.user != userLogedIn ? 'reply_' : 'sender_';
    let reactionBtn = `/static/img/${color_svg_btns}emoji.svg`;
    let shareBtn = `/static/img/${color_svg_btns}share.svg`;
    let pinBtn = `/static/img/${color_svg_btns}pin.svg`;
    var commentBtn = '/static/img/' + color_svg_btns + 'comments.svg';
    // let maxBtn = `/static/img/${color_svg_btns}max.svg`;
    //console.log("PostDefault", post)
    let colors =
      userLogedIn == post.user
        ? {
            tit: '#20093b',
            webText: '#5D3189',
            userText: '#20093B',
            icons: '#CA96FF',
            toolbar: '#20093B',
            demarcator: 'rgba(32, 9, 59, 0.5)',
            tagBG: 'rgba(32, 9, 59, 0.1)',
            tagColor: '#20093b'
          }
        : {
            tit: '#0B0061',
            webText: '#4233B5',
            userText: '#0B0061',
            icons: '#A8A4FF',
            toolbar: '#0B0061',
            demarcator: 'rgba(11, 0, 97, 0.5)',
            tagBG: 'rgba(11, 0, 97, 0.1)',
            tagColor: '#0B0061'
          };

    console.log('posts default: ', timeStamp);

    return (
      <React.Fragment>
        {<div>{loadMore}</div>}
        {diffDay && (
          <div>
            <span className="timestamp">{timeStamp}</span>
          </div>
        )}
        <div
          id={post.key}
          key={post.num}
          className={userClass}
          style={{
            marginTop: '10px',
            marginBottom: '10px',
            position: 'relative'
          }}>
          {/* {solveEmbeds &&  // not used due to handle of links for fullscreen and cant guess best card size
          <Iframe id="iframe-embeds" className="iframe-embeds" src={"static/post.html?v=191103c&k=" + post.key + "&r=" + post.room_key + "&l=" + is_latest} content={""} stylesheets={styles} scripts={scripts} />
        } */}

          {avatarLeft && (
            <img
              className="avatar avatar-left"
              onClick={() => profileFn(post.name)}
              src={avatar}
              style={{ cursor: 'pointer' }}
            />
          )}
          <div className="post-container">
            {
              <div
                className={`${
                  avatarLeft ? 'username-left' : 'username-right'
                } date`}>
                {/*nickname*/}
                {post.name}
              </div>
            }
            <div>
              <blockquote className={`card ${blockquote_class}`}>
                {post.cache_version < 28 && (
                  <div
                    contentEditable="false"
                    dangerouslySetInnerHTML={{
                      __html:
                        (post.pinned
                          ? "<a class='pinned' onclick='window.unpin()' title='unPin message from Top of room'>&#x1F4CC; &nbsp; Pinned</a>"
                          : '') + this.createMarkup(post)
                    }}></div>
                )}

                {post.cache_version >= 28 && (
                  <div>
                    {post.pinned && (
                      <div className="pin-container">
                        <a
                          className="pinned"
                          onClick="window.unpin()"
                          title="unPin message from Top of room">
                          <img
                            className="pin-icon"
                            src="../static/img/pin.svg"
                          />
                          <span>Pinned</span>
                        </a>
                      </div>
                    )}
                    {!readonly && registered && (
                      <Link
                        legacyBehavior
                        href={`/?k=${encodeURIComponent(
                          post.key
                        )}&rk=${encodeURIComponent(post.room_key)}`}>
                        <a
                          title="Maximize"
                          className="maximize-button"
                          style={{
                            position: 'absolute',
                            top: '0px',
                            right: '5px'
                          }}>
                          <img
                            className="boxBtn"
                            src={`/static/img/maximize.svg`}
                            style={{ width: '100%', height: '100%' }}
                          />
                        </a>
                      </Link>
                    )}

                    <PostNodes post={post} colors={colors} />
                  </div>
                )}

                {
                  //typeof post.comment != "undefined" && (
                  // <span>
                  //   <br />
                  //   replying to{" "}
                  //   <a
                  //     ref={(elem) => {
                  //       window.commNode = elem;
                  //     }}
                  //     className="msg-comm-link"
                  //     title="thread"
                  //   >
                  //     {post.replyto_user}
                  //   </a>
                  // </span>
                  //)
                }
                {/* post.num_comments > 0 && (
                  <span>
                    <br />
                    <a
                      ref={(elem) => {
                        window.numCommNode = elem;
                      }}
                      className="msg-comm-link"
                      title="thread"
                    >
                      {post.num_comments} comments ...{" "}
                    </a>
                  </span>
                )*/}
                {/* <div ref={(elem) => { window.blockquoteNode = elem; }} className="maximize-post">...</div> */}
              </blockquote>
            </div>

            <div
              className="toolbar-post"
              style={{
                backgroundColor: colors.toolbar,
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                minHeight: '23px',
                width: '100%'
              }}>
              <div className="toolbar-text-container">
                <span className="toolbar-text">
                  {!post.tag && (
                    <span
                      style={{ color: 'white', fontFamily: 'Noto Sans JP' }}
                      className={`${
                        !post.edited_hhmm ? '' : 'strikeout strikethrough'
                      } date`}>
                      {post.hhmm}
                    </span>
                  )}
                  {/* {post.tag && (
                    <a
                      href={
                        "?page=next&rk=" +
                        encodeURIComponent(post.room_key) +
                        "&msg=" +
                        encodeURIComponent(post.key)
                      }
                    >
                      <span
                        className="date"
                        style={{
                          textDecorationLine: "underline",
                          color: "white !important",
                        }}
                      >
                        {post.hhmm}
                      </span>
                    </a>
                  )} */}

                  {/* post.edited_hhmm && (
                    <span className="date">{post.edited_hhmm}</span>
                  ) */}
                </span>
                {selectedEmojis?.length === 0 ||
                selectedEmojis === 'undefined' ? (
                  <span className="toolbar-btns">
                    {!readonly && registered && (
                      <a
                        onClick={openEmoji}
                        title="Reaction"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={reactionBtn} /> */}
                        <svg
                          className="boxBtn"
                          xmlnsX="http://ns.adobe.com/Extensibility/1.0/"
                          xmlnsI="http://ns.adobe.com/AdobeIllustrator/10.0/"
                          xmlnsGraph="http://ns.adobe.com/Graphs/1.0/"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 125"
                          style={{
                            fill: colors.icons,
                            height: '14px',
                            width: '14px'
                          }}
                          xmlSpace="preserve">
                          <switch>
                            <g iExtraneous="self">
                              <g>
                                <path d="M5273.1,2400.1v-2c0-2.8-5-4-9.7-4s-9.7,1.3-9.7,4v2c0,1.8,0.7,3.6,2,4.9l5,4.9c0.3,0.3,0.4,0.6,0.4,1v6.4     c0,0.4,0.2,0.7,0.6,0.8l2.9,0.9c0.5,0.1,1-0.2,1-0.8v-7.2c0-0.4,0.2-0.7,0.4-1l5.1-5C5272.4,2403.7,5273.1,2401.9,5273.1,2400.1z      M5263.4,2400c-4.8,0-7.4-1.3-7.5-1.8v0c0.1-0.5,2.7-1.8,7.5-1.8c4.8,0,7.3,1.3,7.5,1.8C5270.7,2398.7,5268.2,2400,5263.4,2400z" />
                                <path d="M5268.4,2410.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1H5268.4z" />
                                <path d="M5272.7,2413.7h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2414.1,5273.3,2413.7,5272.7,2413.7z" />
                                <path d="M5272.7,2417h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2417.5,5273.3,2417,5272.7,2417z" />
                              </g>
                              <g>
                                <path d="M41.2,35.8c0-5-3.4-9-7.5-9s-7.5,4.1-7.5,9s3.4,9,7.5,9S41.2,40.8,41.2,35.8z" />
                                <path d="M66.3,26.8c-4.1,0-7.5,4.1-7.5,9s3.4,9,7.5,9s7.5-4.1,7.5-9S70.4,26.8,66.3,26.8z" />
                                <path d="M65.2,56.4H34.8c-1,0-1.9,0.4-2.5,1.2c-0.6,0.7-0.9,1.6-0.7,2.5c1.5,9,9.2,15.6,18.4,15.6c9.2,0,16.9-6.6,18.4-15.6     c0.1-0.9-0.1-1.8-0.7-2.5C67,56.8,66.1,56.4,65.2,56.4z" />
                                <path d="M77.7,2.5H22.3c-10.9,0-19.8,8.9-19.8,19.8v55.5c0,10.9,8.9,19.8,19.8,19.8h55.5c10.9,0,19.8-8.9,19.8-19.8V22.3     C97.5,11.4,88.6,2.5,77.7,2.5z M89.2,77.7c0,6.3-5.1,11.4-11.4,11.4H22.3c-6.3,0-11.4-5.1-11.4-11.4V22.3     c0-6.3,5.1-11.4,11.4-11.4h55.5c6.3,0,11.4,5.1,11.4,11.4V77.7z" />
                              </g>
                            </g>
                          </switch>
                          <text
                            x="0"
                            y="115"
                            fill="#000000"
                            font-size="5px"
                            font-weight="bold"
                            font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"></text>
                          <text
                            x="0"
                            y="120"
                            fill="#000000"
                            font-size="5px"
                            font-weight="bold"
                            font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"></text>
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Comment"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={commentBtn} /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 40"
                          enable-background="new 0 0 32 32"
                          xmlSpace="preserve"
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <g>
                            <path d="M12.1,17.4c0-2,1.6-3.6,3.6-3.6h11.4V3.3c0-1.5-1.2-2.8-2.7-2.8H3.2c-1.5,0-2.7,1.2-2.7,2.8v13.2c0,1.5,1.2,2.8,2.7,2.8   h1.4v4.5c0,0.3,0.2,0.6,0.5,0.7c0.1,0,0.2,0.1,0.3,0.1c0.2,0,0.4-0.1,0.5-0.2l4.9-5h1.3V17.4z" />
                            <path d="M29.5,15.3H15.7c-1.1,0-2,0.9-2,2.1V26c0,1.1,0.9,2.1,2,2.1h8.7l3.1,3.2c0.1,0.2,0.3,0.2,0.5,0.2c0.1,0,0.2,0,0.3-0.1   c0.3-0.1,0.5-0.4,0.5-0.7v-2.7h0.7c1.1,0,2-0.9,2-2.1v-8.6C31.5,16.2,30.6,15.3,29.5,15.3z" />
                          </g>
                        </svg>

                        {post?.num_comments}
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Share"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={shareBtn} /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 40"
                          enable-background="new 0 0 32 32"
                          xmlSpace="preserve"
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <g>
                            <path d="M25,21.5V10.5c2.4-0.4,4.3-2.5,4.3-5c0-2.8-2.3-5.1-5.1-5.1c-2.8,0-5.1,2.3-5.1,5.1c0,2.5,1.9,4.6,4.3,5v10.9   c-1.2,0.2-2.2,0.7-3,1.6L12,18.7c0.5-0.8,0.8-1.7,0.8-2.7c0-2.8-2.3-5.1-5.1-5.1c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1   c1.2,0,2.3-0.4,3.2-1.2l8.8,4.4c-0.3,0.6-0.5,1.4-0.5,2.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1   C29.3,23.9,27.4,21.8,25,21.5z" />
                          </g>
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && userLogedIn == post.user && (
                      <a
                        onClick={editFnMsgKey}
                        title="Edit"
                        className="footer_btn">
                        {/* <img
                          className="boxBtn"
                          src="/static/img/sender_edit.svg"
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 40"
                          enable-background="new 0 0 32 32"
                          xmlSpace="preserve"
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <path d="M30,15.9h-6.7c-0.4-2.5,0-5.3,1.2-7.8c1.1-2.4,2.7-4.5,5-6.2c0.3-0.2,0.4-0.5,0.3-0.8c-0.1-0.3-0.4-0.5-0.7-0.5l-0.3,0  C23.2,0.5,17.4,3,13,7.3c-2.5,2.5-4.5,5.4-5.9,8.7H2c-0.3,0-0.6,0.2-0.7,0.5c-0.1,0.3-0.1,0.6,0.2,0.8l14,14  c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l14-14c0.2-0.2,0.3-0.5,0.2-0.8C30.6,16.1,30.4,15.9,30,15.9z" />
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={pinFnMsgKey}
                        title="Pin message to Top of room"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={pinBtn} /> */}
                        <svg
                          className="boxBtn"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 8.17 10.22"
                          x="0px"
                          y="0px"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          style={{
                            shapeRendering: 'geometricPrecision',
                            textRendering: 'geometricPrecision',
                            imageRendering: 'optimizeQuality',
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <g>
                            <path
                              class="fil0"
                              d="M4.828 5.108l-0.001 -0.002c-0.421,0.407 -0.827,0.73 -1.169,0.897 -0.271,0.132 -0.488,0.16 -0.612,0.035 -0.101,-0.101 -0.139,-0.208 -0.132,-0.326 0.009,-0.141 0.077,-0.309 0.182,-0.505 0.041,-0.076 0.025,-0.169 -0.033,-0.228l-1.891 -1.89c0.338,-0.212 0.705,-0.505 1.058,-0.859 0.354,-0.353 0.647,-0.72 0.859,-1.058l1.89 1.891c0.065,0.065 0.164,0.074 0.239,0.028 0.191,-0.103 0.355,-0.169 0.494,-0.177 0.118,-0.007 0.225,0.031 0.326,0.132 0.125,0.124 0.097,0.341 -0.035,0.612 -0.168,0.344 -0.493,0.751 -0.903,1.175l0.002 0.001 3.011 3.011c0.075,0.076 0.075,0.199 0,0.274 -0.076,0.076 -0.198,0.076 -0.274,0l-3.011 -3.011zm-3.693 -3.973c-0.44,0.44 -0.777,0.894 -0.965,1.271 -0.16,0.319 -0.216,0.56 -0.13,0.646 0.086,0.085 0.326,0.03 0.645,-0.13 0.378,-0.189 0.832,-0.526 1.272,-0.965 0.439,-0.44 0.776,-0.894 0.965,-1.272 0.16,-0.319 0.215,-0.559 0.13,-0.645 -0.086,-0.086 -0.327,-0.03 -0.646,0.13 -0.377,0.188 -0.831,0.525 -1.271,0.965z"
                            />
                          </g>
                        </svg>
                      </a>
                    )}
                  </span>
                ) : (
                  <EmojiWrapper
                    reactions={selectedEmojis}
                    onReaction={(emoji) => onReaction(emoji)}
                  />
                )}
                <div>
                  {selectEmoji && (
                    <ReactionPicker
                      modalOpened={selectEmoji}
                      modalClosed={closeEmoji}
                    />
                  )}
                </div>
              </div>
              {selectedEmojis?.length !== 0 && (
                <div className="toolbar-btns-container">
                  <span className="toolbar-btns" style={{ marginLeft: 0 }}>
                    {!readonly && registered && (
                      <a
                        onClick={openEmoji}
                        title="Reaction"
                        className="footer_btn">
                        <svg
                          className="boxBtn"
                          xmlnsX="http://ns.adobe.com/Extensibility/1.0/"
                          xmlnsI="http://ns.adobe.com/AdobeIllustrator/10.0/"
                          xmlnsGraph="http://ns.adobe.com/Graphs/1.0/"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 100 125"
                          style={{
                            fill: colors.icons,
                            height: '14px',
                            width: '14px'
                          }}
                          xmlSpace="preserve">
                          <switch>
                            <g iExtraneous="self">
                              <g>
                                <path d="M5273.1,2400.1v-2c0-2.8-5-4-9.7-4s-9.7,1.3-9.7,4v2c0,1.8,0.7,3.6,2,4.9l5,4.9c0.3,0.3,0.4,0.6,0.4,1v6.4     c0,0.4,0.2,0.7,0.6,0.8l2.9,0.9c0.5,0.1,1-0.2,1-0.8v-7.2c0-0.4,0.2-0.7,0.4-1l5.1-5C5272.4,2403.7,5273.1,2401.9,5273.1,2400.1z      M5263.4,2400c-4.8,0-7.4-1.3-7.5-1.8v0c0.1-0.5,2.7-1.8,7.5-1.8c4.8,0,7.3,1.3,7.5,1.8C5270.7,2398.7,5268.2,2400,5263.4,2400z" />
                                <path d="M5268.4,2410.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1c0-0.6-0.4-1-1-1H5268.4z" />
                                <path d="M5272.7,2413.7h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2414.1,5273.3,2413.7,5272.7,2413.7z" />
                                <path d="M5272.7,2417h-4.3c-0.6,0-1,0.4-1,1c0,0.6,0.4,1,1,1h4.3c0.6,0,1-0.4,1-1C5273.7,2417.5,5273.3,2417,5272.7,2417z" />
                              </g>
                              <g>
                                <path d="M41.2,35.8c0-5-3.4-9-7.5-9s-7.5,4.1-7.5,9s3.4,9,7.5,9S41.2,40.8,41.2,35.8z" />
                                <path d="M66.3,26.8c-4.1,0-7.5,4.1-7.5,9s3.4,9,7.5,9s7.5-4.1,7.5-9S70.4,26.8,66.3,26.8z" />
                                <path d="M65.2,56.4H34.8c-1,0-1.9,0.4-2.5,1.2c-0.6,0.7-0.9,1.6-0.7,2.5c1.5,9,9.2,15.6,18.4,15.6c9.2,0,16.9-6.6,18.4-15.6     c0.1-0.9-0.1-1.8-0.7-2.5C67,56.8,66.1,56.4,65.2,56.4z" />
                                <path d="M77.7,2.5H22.3c-10.9,0-19.8,8.9-19.8,19.8v55.5c0,10.9,8.9,19.8,19.8,19.8h55.5c10.9,0,19.8-8.9,19.8-19.8V22.3     C97.5,11.4,88.6,2.5,77.7,2.5z M89.2,77.7c0,6.3-5.1,11.4-11.4,11.4H22.3c-6.3,0-11.4-5.1-11.4-11.4V22.3     c0-6.3,5.1-11.4,11.4-11.4h55.5c6.3,0,11.4,5.1,11.4,11.4V77.7z" />
                              </g>
                            </g>
                          </switch>
                          <text
                            x="0"
                            y="115"
                            fill="#000000"
                            font-size="5px"
                            font-weight="bold"
                            font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"></text>
                          <text
                            x="0"
                            y="120"
                            fill="#000000"
                            font-size="5px"
                            font-weight="bold"
                            font-family="'Helvetica Neue', Helvetica, Arial-Unicode, Arial, Sans-serif"></text>
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Comment"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={commentBtn} /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 40"
                          enable-background="new 0 0 32 32"
                          xmlSpace="preserve"
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <g>
                            <path d="M12.1,17.4c0-2,1.6-3.6,3.6-3.6h11.4V3.3c0-1.5-1.2-2.8-2.7-2.8H3.2c-1.5,0-2.7,1.2-2.7,2.8v13.2c0,1.5,1.2,2.8,2.7,2.8   h1.4v4.5c0,0.3,0.2,0.6,0.5,0.7c0.1,0,0.2,0.1,0.3,0.1c0.2,0,0.4-0.1,0.5-0.2l4.9-5h1.3V17.4z" />
                            <path d="M29.5,15.3H15.7c-1.1,0-2,0.9-2,2.1V26c0,1.1,0.9,2.1,2,2.1h8.7l3.1,3.2c0.1,0.2,0.3,0.2,0.5,0.2c0.1,0,0.2,0,0.3-0.1   c0.3-0.1,0.5-0.4,0.5-0.7v-2.7h0.7c1.1,0,2-0.9,2-2.1v-8.6C31.5,16.2,30.6,15.3,29.5,15.3z" />
                          </g>
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Share"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={shareBtn} /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 40"
                          enable-background="new 0 0 32 32"
                          xmlSpace="preserve"
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <g>
                            <path d="M25,21.5V10.5c2.4-0.4,4.3-2.5,4.3-5c0-2.8-2.3-5.1-5.1-5.1c-2.8,0-5.1,2.3-5.1,5.1c0,2.5,1.9,4.6,4.3,5v10.9   c-1.2,0.2-2.2,0.7-3,1.6L12,18.7c0.5-0.8,0.8-1.7,0.8-2.7c0-2.8-2.3-5.1-5.1-5.1c-2.8,0-5.1,2.3-5.1,5.1c0,2.8,2.3,5.1,5.1,5.1   c1.2,0,2.3-0.4,3.2-1.2l8.8,4.4c-0.3,0.6-0.5,1.4-0.5,2.1c0,2.8,2.3,5.1,5.1,5.1c2.8,0,5.1-2.3,5.1-5.1   C29.3,23.9,27.4,21.8,25,21.5z" />
                          </g>
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && userLogedIn == post.user && (
                      <a
                        onClick={editFnMsgKey}
                        title="Edit"
                        className="footer_btn">
                        {/* <img
                          className="boxBtn"
                          src="/static/img/sender_edit.svg"
                        /> */}
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          version="1.1"
                          x="0px"
                          y="0px"
                          viewBox="0 0 32 40"
                          enable-background="new 0 0 32 32"
                          xmlSpace="preserve"
                          style={{
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <path d="M30,15.9h-6.7c-0.4-2.5,0-5.3,1.2-7.8c1.1-2.4,2.7-4.5,5-6.2c0.3-0.2,0.4-0.5,0.3-0.8c-0.1-0.3-0.4-0.5-0.7-0.5l-0.3,0  C23.2,0.5,17.4,3,13,7.3c-2.5,2.5-4.5,5.4-5.9,8.7H2c-0.3,0-0.6,0.2-0.7,0.5c-0.1,0.3-0.1,0.6,0.2,0.8l14,14  c0.1,0.1,0.3,0.2,0.5,0.2c0.2,0,0.4-0.1,0.5-0.2l14-14c0.2-0.2,0.3-0.5,0.2-0.8C30.6,16.1,30.4,15.9,30,15.9z" />
                        </svg>
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={pinFnMsgKey}
                        title="Pin message to Top of room"
                        className="footer_btn">
                        {/* <img className="boxBtn" src={pinBtn} /> */}
                        <svg
                          className="boxBtn"
                          xmlns="http://www.w3.org/2000/svg"
                          xmlnsXlink="http://www.w3.org/1999/xlink"
                          xmlSpace="preserve"
                          version="1.1"
                          viewBox="0 0 8.17 10.22"
                          x="0px"
                          y="0px"
                          fill-rule="evenodd"
                          clip-rule="evenodd"
                          style={{
                            shapeRendering: 'geometricPrecision',
                            textRendering: 'geometricPrecision',
                            imageRendering: 'optimizeQuality',
                            width: '14px',
                            height: '14px',
                            fill: colors.icons
                          }}>
                          <g>
                            <path
                              class="fil0"
                              d="M4.828 5.108l-0.001 -0.002c-0.421,0.407 -0.827,0.73 -1.169,0.897 -0.271,0.132 -0.488,0.16 -0.612,0.035 -0.101,-0.101 -0.139,-0.208 -0.132,-0.326 0.009,-0.141 0.077,-0.309 0.182,-0.505 0.041,-0.076 0.025,-0.169 -0.033,-0.228l-1.891 -1.89c0.338,-0.212 0.705,-0.505 1.058,-0.859 0.354,-0.353 0.647,-0.72 0.859,-1.058l1.89 1.891c0.065,0.065 0.164,0.074 0.239,0.028 0.191,-0.103 0.355,-0.169 0.494,-0.177 0.118,-0.007 0.225,0.031 0.326,0.132 0.125,0.124 0.097,0.341 -0.035,0.612 -0.168,0.344 -0.493,0.751 -0.903,1.175l0.002 0.001 3.011 3.011c0.075,0.076 0.075,0.199 0,0.274 -0.076,0.076 -0.198,0.076 -0.274,0l-3.011 -3.011zm-3.693 -3.973c-0.44,0.44 -0.777,0.894 -0.965,1.271 -0.16,0.319 -0.216,0.56 -0.13,0.646 0.086,0.085 0.326,0.03 0.645,-0.13 0.378,-0.189 0.832,-0.526 1.272,-0.965 0.439,-0.44 0.776,-0.894 0.965,-1.272 0.16,-0.319 0.215,-0.559 0.13,-0.645 -0.086,-0.086 -0.327,-0.03 -0.646,0.13 -0.377,0.188 -0.831,0.525 -1.271,0.965z"
                            />
                          </g>
                        </svg>
                      </a>
                    )}
                    {/* {readonly && false &&
                  <a href={"?page=next&rk=" + encodeURIComponent(post.room_key) + "&msg=" + encodeURIComponent(post.key)}><img className="boxBtn" src="/static/img/edit.svg" /></a>
                } */}
                  </span>
                </div>
              )}
            </div>
          </div>
          {!avatarLeft && (
            <a>
              <img
                className="avatar avatar-right"
                src={avatar}
                onClick={() => showPassport()}
                style={{ cursor: 'pointer' }}
              />
            </a>
          )}
        </div>
        <style jsx>{`
          .post-container {
            width: 80%;
            min-width: 360px;
            max-width: 768px;
          }
          .card {
            width: 100%;
            background: #ffffff;
          }
          .webtexts {
            color: black;
          }
          .footer_btn {
            display: flex;
            align-items: center;
            justify-content: center;
          }
        `}</style>
      </React.Fragment>
    );
  }

  createMarkup = (post) => {
    var txt = '';
    if (post.html) txt = post.html;
    else txt = post.text;
    return txt;
  };
}

PostDefault.propTypes = {
  post: PropTypes.object.isRequired,
  diffDay: PropTypes.bool.isRequired,
  timeStamp: PropTypes.string.isRequired,
  userClass: PropTypes.string.isRequired,
  avatar: PropTypes.string.isRequired,
  avatarLeft: PropTypes.bool.isRequired,
  nickname: PropTypes.string.isRequired,
  selectedEmojis: PropTypes.array.isRequired,
  selectEmoji: PropTypes.bool.isRequired,
  onReaction: PropTypes.func.isRequired,
  readonly: PropTypes.bool.isRequired,
  registered: PropTypes.bool.isRequired,
  userLogedIn: PropTypes.string.isRequired,
  profileFn: PropTypes.func.isRequired,
  commentFnMsgKey: PropTypes.func.isRequired,
  editFnMsgKey: PropTypes.func.isRequired,
  pinFnMsgKey: PropTypes.func.isRequired,
  openEmoji: PropTypes.func.isRequired,
  closeEmoji: PropTypes.func.isRequired
};
