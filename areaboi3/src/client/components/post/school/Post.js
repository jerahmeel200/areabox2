import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Link from 'next/link';
import ReactionPicker, {
  EmojiWrapper
} from '../../../components/EmojiReaction';
import PostNodesDefault from '../../postNodes/PostNodesDefault'; //will have to revisit why this is used

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
      closeEmoji
    } = this.props;
    const blockquote_class = post.in_thread ? 'msg-comment' : 'msg-main';
    let tagFn = '';
    let color_svg_btns = post.user != userLogedIn ? 'reply_' : 'sender_';
    let reactionBtn = `/static/img/${color_svg_btns}emoji.svg`;
    let shareBtn = `/static/img/${color_svg_btns}share.svg`;
    let pinBtn = `/static/img/${color_svg_btns}pin.svg`;
    var commentBtn = '/static/img/' + color_svg_btns + 'comments.svg';
    // let maxBtn = `/static/img/${color_svg_btns}max.svg`;
    //console.log("PostDefault", post)

    return (
      <React.Fragment>
        {/* {diffDay && (
          <div>
            <span className="timestamp">{timeStamp}</span>
          </div>
        ) */}
        <div id={post.key} key={post.num} className={userClass}>
          {/* {solveEmbeds &&  // not used due to handle of links for fullscreen and cant guess best card size
          <Iframe id="iframe-embeds" className="iframe-embeds" src={"static/post.html?v=191103c&k=" + post.key + "&r=" + post.room_key + "&l=" + is_latest} content={""} stylesheets={styles} scripts={scripts} />
        } */}

          {
            //avatarLeft && <img className="avatar avatar-left" src={avatar} />
          }
          <div className="post-container">
            <PostNodesDefault post={post} />
            {/* {<div
              className={`${
                avatarLeft ? "username-left" : "username-right"
              } date`}
            >
              {nickname}
            </div>
            <div>
              <blockquote className={blockquote_class}>
                {post.cache_version < 28 && (
                  <div
                    contentEditable="false"
                    dangerouslySetInnerHTML={{
                      __html:
                        (post.pinned
                          ? "<a class='pinned' onclick='window.unpin()' title='unPin message from Top of room'>&#x1F4CC; &nbsp; Pinned</a>"
                          : "") + this.createMarkup(post),
                    }}
                  ></div>
                )}

                {post.cache_version >= 28 && (
                  <div>
                    {post.pinned && (
                      <div className="pin-container">
                        <a
                          className="pinned"
                          onClick="window.unpin()"
                          title="unPin message from Top of room"
                        >
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
                        href={`?k=${encodeURIComponent(
                          post.key
                        )}&rk=${encodeURIComponent(post.room_key)}`}
                      >
                        <a title="Maximize" className="maximize-button">
                          <img
                            className="boxBtn"
                            src={`/static/img/maximize.svg`}
                          />
                        </a>
                      </Link>
                    )}

                    {//original position for postDefault}
                  </div>
                )}

                {typeof post.comment != "undefined" && (
                  <span>
                    <br />
                    replying to{" "}
                    <a
                      ref={(elem) => {
                        window.commNode = elem;
                      }}
                      className="msg-comm-link"
                      title="thread"
                    >
                      {post.replyto_user}
                    </a>
                  </span>
                )}
                {post.num_comments > 0 && (
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
                )}
                {// <div ref={(elem) => { window.blockquoteNode = elem; }} className="maximize-post">...</div> 
              }
              </blockquote>
            </div>
            <div className="toolbar-post">
              <div className="toolbar-text-container">
                <span className="toolbar-text">
                  {!post.tag && (
                    <span
                      className={`${!post.edited_hhmm ? "" : "strikeout"} date`}
                    >
                      {post.hhmm}
                    </span>
                  )}
                  {post.tag && (
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
                  )}

                  {post.edited_hhmm && (
                    <span className="date">{post.edited_hhmm}</span>
                  )}
                </span>
                {selectedEmojis.length === 0 ? (
                  <span className="toolbar-btns">
                    {!readonly && registered && (
                      <a
                        onClick={openEmoji}
                        title="Reaction"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={reactionBtn} />
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Comment"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={commentBtn} />
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Share"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={shareBtn} />
                      </a>
                    )}
                    {!readonly && registered && userLogedIn == post.user && (
                      <a
                        onClick={editFnMsgKey}
                        title="Edit"
                        className="footer_btn"
                      >
                        <img
                          className="boxBtn"
                          src="/static/img/sender_edit.svg"
                        />
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={pinFnMsgKey}
                        title="Pin message to Top of room"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={pinBtn} />
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
              {selectedEmojis.length !== 0 && (
                <div className="toolbar-btns-container">
                  <span className="toolbar-btns" style={{ marginLeft: 0 }}>
                    {!readonly && registered && (
                      <a
                        onClick={openEmoji}
                        title="Reaction"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={reactionBtn} />
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Comment"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={commentBtn} />
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={commentFnMsgKey}
                        title="Share"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={shareBtn} />
                      </a>
                    )}
                    {!readonly && registered && userLogedIn == post.user && (
                      <a
                        onClick={editFnMsgKey}
                        title="Edit"
                        className="footer_btn"
                      >
                        <img
                          className="boxBtn"
                          src="/static/img/sender_edit.svg"
                        />
                      </a>
                    )}
                    {!readonly && registered && (
                      <a
                        onClick={pinFnMsgKey}
                        title="Pin message to Top of room"
                        className="footer_btn"
                      >
                        <img className="boxBtn" src={pinBtn} />
                      </a>
                    )}
                    {// {readonly && false && <a href={"?page=next&rk=" + encodeURIComponent(post.room_key) + "&msg=" + encodeURIComponent(post.key)}><img className="boxBtn" src="/static/img/edit.svg" /></a>
              } 
                  </span>
                </div>
              )}
            </div> */}
          </div>
          {/* {!avatarLeft && (
            <a onClick={profileFn}>
              <img className="avatar avatar-right" src={avatar} />
            </a>
          ) */}
        </div>
        <style jsx>
          {`
            .post-container {
              width: 100vw;
              min-width: 360px;
              max-width: 768px;
            }
          `}
        </style>
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
