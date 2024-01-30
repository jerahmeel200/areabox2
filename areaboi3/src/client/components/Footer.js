import React, { useState, useRef } from 'react';
import Emoji from './Emoji';
import UploadForm from './UploadForm';
import Recorder from './Recorder';

export default (props) => {
  const [selectMediaType, setSelectMediaType] = useState(false);
  const [selectEmoji, setSelectEmoji] = useState(false);
  const [recordAudioActive, setRecordAudioActive] = useState(false);
  const [uploadFormActive, setUploadFormActive] = useState(false);
  const [initialMessage, setInitialMessage] = useState('');
  const [inputMessage, setInputMessage] = useState('');

  const openEmoji = () => setSelectEmoji(true);
  const closeEmoji = (emoji) => {
    if (emoji) {
      setSelectEmoji(false);
      setInitialMessage(this.input.value + ' ' + emoji);
    } else {
      setSelectEmoji(false);
    }
  };
  const recordAudio = () => {
    setRecordAudioActive(true);
    setSelectMediaType(false);
  };
  // const recordAudioClose = () => {
  //   setRecordAudioActive(false);
  //   setSelectMediaType(false);
  // }
  const openMediaType = () => setSelectMediaType(!selectMediaType);

  const modalUploadOpen = (activate) => setUploadFormActive(activate);
  const openModalUpload = () => modalUploadOpen(true);
  const modalRecorderOpen = (activate) => setRecordAudioActive(activate);
  const uploadFormOpen = (activate) => setUploadFormActive(activate);

  const handleChange = (event) => setInitialMessage(event.currentTarget.value);
  const sendInput = (event) => {
    let message = this.input.value;
    if (message != '') {
      //this.props.dispatch(sendMessageText( message )) //not working, simply use react state
      setInputMessage(message);
      //alert("This is buggy and under construction, so is disabled for now ...")
    }
    // deActivateInput(event)
  };
  const handleKeyPress = (e) => {
    if (e.which == 13 && !e.shiftKey) sendInput();
  };
  // const handleTextareaSize = () => {
  //   var observe = function (element, event, handler) {
  //     element.addEventListener(event, handler, false);
  //   };
  //   var text = document.getElementById('messageText');
  //   //console.log("handleTextareaSize elem", text)
  //   var resize = function () {
  //     //console.log("textarea resize", text.scrollHeight)
  //     let offset = text.offsetHeight - text.clientHeight;
  //     text.style.height = '3rem';
  //     text.style.height = text.scrollHeight + offset + 1 + 'px';
  //   }
  //   /* 0-timeout to get the already changed text */
  //   var delayedResize = function () {
  //     //console.log("textarea delayedResize")
  //     window.setTimeout(resize, 0);
  //   }
  //   if (text != null) {
  //     observe(text, 'input', resize);
  //     observe(text, 'cut', delayedResize);
  //     observe(text, 'paste', delayedResize);
  //     observe(text, 'drop', delayedResize);
  //     observe(text, 'keydown', delayedResize);

  //     text.focus();
  //     text.select();
  //     resize();
  //   }
  //   if (this.lastBox) this.lastBox.scrollIntoView();
  // }

  const inputRef = useRef(null);

  const commenting = true;
  const editing = false;
  const userName = 'Areaboi';
  let placeholder = 'Under construction';
  //commenting ? "Comment..." : (editing ? "Edit message: " : "Message...")

  return (
    <footer className="footer">
      {/* {!registering && */}

      <section className="sub_header_footer">
        <div className={'msg--me msg--input'}>
          <div>
            {/* {(registered && !no_input && (page.n == 1 || editing || commenting) && inputActivated) && */}
            <div className="input-footer-opened">
              <form onSubmit={(ev) => ev.preventDefault()}>
                <div className="input-div">
                  {selectMediaType && (
                    <div
                      id="attacharea"
                      style={{
                        transform: selectMediaType
                          ? 'translateX(0)'
                          : 'translateX(9999px)'
                      }}>
                      <div className="input_btn_container">
                        <button
                          type="button"
                          onClick={openModalUpload}
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
                          onClick={recordAudio}
                          className="inputs input_btn">
                          <img
                            className="input_btn_icon"
                            src="static/img/Record.svg"
                          />
                          <span>Record</span>
                        </button>
                      </div>

                      <div className="input_btn_container">
                        <button
                          type="button"
                          onClick={openModalUpload}
                          className="inputs input_btn">
                          <img
                            className="input_btn_icon"
                            src="static/img/Camera1.svg"
                          />
                          <span>Camera</span>
                        </button>
                      </div>
                    </div>
                  )}

                  {!recordAudioActive && (
                    <div id="inputarea">
                      <a
                        onClick={openMediaType}
                        style={{
                          transform: selectMediaType
                            ? 'rotate(45deg)'
                            : 'rotate(0deg)'
                        }}
                        className="input_btn_plus">
                        <span>+</span>
                      </a>
                      <div
                        className="messageText-container"
                        style={{
                          transform: selectMediaType
                            ? 'translateX(-9999px)'
                            : 'translateX(0)'
                        }}>
                        <div id="messageTextWrapper">
                          <textarea
                            name="msg"
                            id="messageText"
                            onKeyPress={handleKeyPress}
                            placeholder={placeholder}
                            ref={inputRef}
                            onChange={handleChange}
                            value={initialMessage}
                            className="inputs"></textarea>
                        </div>
                        <span className="messageText-icons">
                          <span className="messageTextTag-logo">
                            <img src="static/img/@at_icon.svg" />
                          </span>
                          <span>
                            <a
                              onClick={openEmoji}
                              className="inputs messageTextTag-emoji">
                              <img src="static/img/input_emoji.svg" />
                            </a>
                          </span>
                        </span>
                      </div>
                    </div>
                  )}

                  <div id="input_plus">
                    <div>
                      {uploadFormActive && (
                        <UploadForm
                          uploadFormActive={uploadFormOpen}
                          modalUploadOpen={modalUploadOpen}
                          user={userName}
                          concatInput={concatInput}
                        />
                      )}
                      {recordAudioActive && (
                        <Recorder
                          modalRecorderOpen={modalRecorderOpen}
                          concatInput={concatInput}
                        />
                      )}
                      {/* {recordAudioActive &&
                        <div className="footer_btn_close--container">
                          <input type="button" onClick={this.recordAudioClose} className="footer_btn footer_btn_close" value="Close Recording session" />
                        </div>
                      } */}

                      {selectEmoji && (
                        <Emoji
                          modalOpened={selectEmoji}
                          modalClosed={closeEmoji}
                        />
                      )}
                    </div>
                  </div>
                </div>
                <input type="hidden" name="page" value="post" />
              </form>
            </div>
            {/* } */}
          </div>
        </div>
      </section>
      {/* } */}
      <style jsx>
        {`
          .footer {
            z-index: 5;
            position: sticky;
            bottom: 0;
            margin: 0 auto;
          }

          .sub_header_footer {
            width: 100%;
            margin: 0 auto;
            vertical-align: middle;
          }

          .msg--input {
            width: 100%;
            padding-bottom: 8px;
          }

          .msg--input > div:nth-child(1) {
            margin: 0 auto;
          }

          .input-footer-closed {
            padding-bottom: 0px !important;
          }

          .input-footer-opened {
            padding-bottom: 0px !important;
          }

          .input-div-hint {
            text-align: left;
            margin: 0 auto;
            width: 100%;
            height: 100%;
            text-size: small;
          }

          .input-div {
            position: relative;
            display: grid;
            padding: 0 0.05rem;
            width: 96%;
            margin: 0 auto;
          }

          #attacharea {
            display: -webkit-box;
            display: -ms-flexbox;
            display: flex;
            -webkit-box-pack: center;
            -ms-flex-pack: center;
            justify-content: center;
            -webkit-box-align: center;
            -ms-flex-align: center;
            align-items: center;
            /* margin-bottom: 1rem; */
            position: absolute;
            bottom: 0;
            left: 0;
            right: 0;
            z-index: 5;
            width: calc(100% - 27.68px);
            height: 50px;
            margin-left: auto;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            transition: all 0.3s ease;
          }

          #attacharea > .input_btn_container {
            flex: 1;
          }

          .input_btn_container {
            border: 1px solid black;
            padding-bottom: 2px;
          }

          .input_btn {
            display: flex;
            align-items: center;
            position: relative;
            border-top: 0;
            border-right: 0;
            border-left: 0;
            border-bottom: 1px solid black;
            background-color: transparent;
            height: 2.3rem;
            font-size: 0.85rem;
            width: 100%;
            pointer-events: auto;
            font-family: 'Noto Sans JP';
          }

          .input_btn > span {
            position: absolute;
            top: 50%;
            left: 50%;
            -webkit-transform: translate(-50%, -50%);
            transform: translate(-50%, -50%);
          }

          .input_btn .fa {
            font-size: 1.5rem;
          }

          .input_btn_icon {
            width: 26px;
            height: 26px;
            float: left;
          }

          .input_btn_icon:not(:nth-child(2)) {
            padding-left: 6px;
          }

          #inputarea {
            align-items: center;
            display: flex;
          }

          .input_btn_plus {
            font-size: 2.5rem;
            font-weight: bolder;
            padding-right: 0.3rem;
            flex: 1;
            transition: all 0.3s;
          }

          .input_btn_plus span {
            color: black;
          }

          .messageText-container {
            position: relative;
            white-space: nowrap;
            width: 100%;
            flex: 100%;
          }

          #messageTextWrapper {
            width: 100%;
          }

          #messageText {
            width: 100%;
            color: #444;
            font-size: 100%;
            overflow: auto !important;
            min-height: 3rem;
            padding-left: 0.5rem;
            padding-right: 4.81rem;
            padding-top: 12px;
            border: 1px solid rgba(0, 0, 0, 0.3);
            font-family: 'Noto Sans JP';
            -webkit-box-shadow: 0 0 0 transparent;
            box-shadow: 0 0 0 transparent;
            line-height: 1.4;
          }

          #messageText:focus {
            outline: none;
          }

          #messageText::placeholder {
            font-size: 0.8rem;
          }

          .messageText-icons {
            display: flex;
            align-items: center;
            position: absolute;
            top: 0;
            right: 0;
            padding-top: 0.75rem;
          }

          .messageTextTag-logo {
            padding-right: 1rem;
            cursor: pointer;
          }

          .messageText-icons span:nth-child(2) {
            padding-right: 2px;
          }

          .messageText-icons span img {
            width: 32px;
            height: 32px;
          }
        `}
      </style>
    </footer>
  );
};
