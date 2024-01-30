import React, { useState } from 'react';
import ReactionPicker from './EmojiReaction';

export default () => {
  const [toolBtnsOpen, setToolBtnsOpen] = useState(false);
  const [selectEmoji, setSelectEmoji] = useState(false);

  const displayToolbtns = () => setToolBtnsOpen(!toolBtnsOpen);
  const openEmoji = () => setSelectEmoji(true);
  const closeEmoji = (emoji) => {
    if (emoji) {
      setSelectEmoji(false);
      // setInitialMessage(this.input.value + " " + emoji)
    } else {
      setSelectEmoji(false);
    }
  };

  let color_svg_btns = 'sender_';
  let reactionBtn = `../../static/img/${color_svg_btns}emoji.svg`;
  let shareBtn = `../../static/img/${color_svg_btns}share.svg`;
  var commentBtn = '../../static/img/' + color_svg_btns + 'comments.svg';

  return (
    <div className="comments-container">
      <div className="comment">
        <img
          src="../../static/img/pins_svg/04-a.svg"
          alt="User Avatar"
          width="22px"
          height="27.52px"
        />
        <div className="comment-body">
          <div className="comment-body--content">
            <div className="comment-body--content-text">
              This is a placeholder Text
            </div>
            <img
              onClick={displayToolbtns}
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
              <a onClick={openEmoji} title="Reaction" className="footer_btn">
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
          <div>
            {selectEmoji && (
              <ReactionPicker
                modalOpened={selectEmoji}
                modalClosed={closeEmoji}
              />
            )}
          </div>
        </div>
      </div>

      <style jsx>
        {`
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
        `}
      </style>
    </div>
  );
};
