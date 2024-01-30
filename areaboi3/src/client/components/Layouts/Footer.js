// import React, { useState, useRef } from "react";
// import { useRouter } from "next/router";
// import Link from "next/link";
// import Mentions from "../../components/Mentions";
// import UploadForm from "../../components/UploadForm";
// import Recorder from "../../components/Recorder";
// import Emoji from "../../components/Emoji";
// import LoginData from "../../components/LoginData";
// import NewPost from "../../components/NewPost";
// import LogoutSvg from "../../assets/svgComponents/nicons/LogoutSvg";
// import ViewChannelsSvg from "../../assets/svgComponents/nicons/ViewChannelsSvg";
// import GallerySvg from "../../assets/svgComponents/GallerySvg";
// import RecordSvg from "../../assets/svgComponents/RecordSvg";
// import BlackStarSvg from "../../assets/svgComponents/BlackStarSvg";
// import AtIconSvg from "../../assets/svgComponents/AtIconSvg";
// import InputEmojiSvg from "../../assets/svgComponents/InputEmojiSvg";

// import Aretha from "../../assets/imgs/Aretha.png";

function Footer() {
  //   const [page, setPage] = useState({
  //     room_key: "forsale",
  //     room_name: "Forsale",
  //     room_title: "forsale",
  //   });
  //   const [color, setColor] = useState("");
  //   const [registering, setRegistering] = useState(false);
  //   const [registered, setRegistered] = useState(false);
  //   const [readonly, setReadonly] = useState(false);
  //   const [editing, setEditing] = useState(false);
  //   const [commenting, setCommenting] = useState(false);
  //   const [inputActivated, setInputActivated] = useState(false);
  //   const [selectMediaType, setSelectMediaType] = useState(false);
  //   const [uploadFormActive, setUploadFormActive] = useState(false);
  //   const [recordAudioActive, setRecordAudioActive] = useState(false);
  //   const [selectEmoji, setSelectEmoji] = useState(false);
  //   const [showLogout, setShowLogout] = useState(false);
  //   const [message, setMessage] = useState("");
  //   const [userName, setUserName] = useState("");
  //   const [defaultUserName, setDefaultUserName] = useState("");
  //   const [placeholder, setPlaceholder] = useState("");
  //   const [initialMessage, setInitialMessage] = useState("");
  //   const [inputMessage, setInputMessage] = useState("");
  //   const [editKey, setEditKey] = useState("");
  //   const [no_input, setNo_input] = useState(false);
  //   const [LoginDataLoaded, setLoginDataLoaded] = useState(false);
  //   const [gRoomsList, setGRoomsList] = useState([]);
  //   const [dispatch, setDispatch] = useState("");
  //   const [updatePost, setUpdatePost] = useState("");
  //   const [form_action, setForm_action] = useState("");
  //   const [foot, setFoot] = useState([]);
  //   const [gChatRef, setGChatRef] = useState("");
  //   const [modalUploadOpen, setModalUploadOpen] = useState(false);
  //   const [modalRecorderOpen, setModalRecorderOpen] = useState(false);
  //   const [input, setInput] = useState("");
  //   const lastBox = useRef();
  //   const router = useRouter();
  //   const { asPath: room_key } = router.query;
  //   console.log("room_key", room_key);
  //   const activateInput = (e) => {
  //     console.log("activateInput");
  //     setInputActivated(true);
  //     setCommenting(false);
  //     setEditing(false);
  //     setEditKey(0);
  //   };
  //   const onLogout = () => {
  //     console.log("onRegisterFinish signOut");
  //     if (
  //       window.confirm("Log out?") &&
  //       gChatRef &&
  //       gChatRef.theFirebaseLib.auth
  //     ) {
  //       try {
  //         console.log("onRegisterFinish signOut");
  //         gChatRef.theFirebaseLib
  //           .auth()
  //           .signOut()
  //           .then(() => {
  //             //best to reload to fix issue of StyledFirebaseAuth
  //             location.reload();
  //           })
  //           .catch(() => {
  //             console.log("could not signout completly", e);
  //           });
  //       } catch (e) {
  //         console.log("could not signout completly", e);
  //       }
  //     }
  //   };
  //   const openModalUpload = () => {
  //     //this.setState({modalIsOpen: true});
  //     modalUploadOpen(true);
  //   };
  //   const recordAudio = () => {
  //     setRecordAudioActive(true);
  //     setSelectMediaType(false);
  //   };
  //   const recordAudioClose = () => {
  //     setRecordAudioActive(false);
  //     setSelectMediaType(false);
  //   };
  //   const openMediaType = () => {
  //     setSelectMediaType(!selectMediaType), setShowLogout(false);
  //   };
  //   const handleChange = (event) => {
  //     console.log("textareavalue", event.target.value);
  //     setInitialMessage(event.currentTarget.value);
  //   };
  //   const handleAt = (e) => {
  //     input.focus();
  //     const textareaVal = initialMessage;
  //     if (textareaVal !== "") {
  //       return setInitialMessage(`${textareaVal} @`);
  //     }
  //     return setInitialMessage("@");
  //   };
  //   const openEmoji = () => {
  //     setSelectEmoji(true);
  //   };
  //   const register = () => {
  //     console.log("registering");
  //     setTimeout(function() {
  //       document.getElementById("register").style.display = "block";
  //     }, 2000);
  //     setRegistering(true);
  //   };
  //   return (
  //     <footer
  //       className="footer"
  //       style={{ backgroundColor: page.room_layout ? color : "none" }}
  //     >
  //       <>
  //         {!page.room_layout && !registering && (
  //           <section className="sub_header_footer">
  //             <div
  //               className={"msg--me msg--input"}
  //               style={{ paddingBottom: "0px" }}
  //             >
  //               <div>
  //                 {registered &&
  //                   !readonly &&
  //                   !inputActivated &&
  //                   LoginDataLoaded &&
  //                   message.length > 0 && (
  //                     <div
  //                       className="input-footer-closed"
  //                       onClick={activateInput}
  //                     >
  //                       <div className="input-div-hint">{message}</div>
  //                     </div>
  //                   )}
  //                 {registered &&
  //                   !inputActivated &&
  //                   !LoginDataLoaded &&
  //                   message.length > 0 && (
  //                     <div className="input-footer-closed">
  //                       <div className="input-div-hint">{message}</div>
  //                     </div>
  //                   )}
  //                 {registered &&
  //                   (!readonly || editing || commenting) &&
  //                   inputActivated && (
  //                     /* <div className="list-an-item">
  //                         dfhgh
  //                       </div> */
  //                     <div
  //                       className="input-footer-opened"
  //                       style={{
  //                         background: "#e8e5e5",
  //                         border: "solid 1px black",
  //                       }}
  //                     >
  //                       {registered &&
  //                       showLogout /*&& userName != defaultUserName */ && (
  //                           <a
  //                             onClick={onLogout}
  //                             className="signout-footer"
  //                             title={"logout " + userName}
  //                             style={{
  //                               color: "black",
  //                               position: "relative",
  //                               left: "45px",
  //                             }}
  //                           >
  //                             <span>
  //                               <LogoutSvg />
  //                               &nbsp;&nbsp;LOG OUT
  //                             </span>
  //                           </a>
  //                         )}
  //                       <form action={form_action}>
  //                         <div className="input-div">
  //                           {selectMediaType && (
  //                             <div
  //                               id="attacharea"
  //                               style={{
  //                                 transform: selectMediaType
  //                                   ? "translateX(0)"
  //                                   : "translateX(9999px)",
  //                                 position: "absolute",
  //                                 bottom: "68px",
  //                                 background: "#e8e5e5",
  //                               }}
  //                             >
  //                               <div className="input_btn_container">
  //                                 <button
  //                                   type="button"
  //                                   onClick={openModalUpload}
  //                                   className="inputs input_btn"
  //                                 >
  //                                   <GallerySvg className="input_btn_icon" />
  //                                   <span>Gallery</span>
  //                                 </button>
  //                               </div>
  //                               <div className="input_btn_container">
  //                                 <button
  //                                   type="button"
  //                                   onClick={recordAudio}
  //                                   className="inputs input_btn"
  //                                 >
  //                                   <RecordSvg className="input_btn_icon" />
  //                                   <span>Audio</span>
  //                                 </button>
  //                               </div>
  //                               <div className="input_btn_container">
  //                                 {/* onClick={goLive}*/}
  //                                 <button
  //                                   type="button"
  //                                   className="inputs input_btn"
  //                                 >
  //                                   <BlackStarSvg className="input_btn_icon" />
  //                                   <span>Map</span>
  //                                 </button>
  //                               </div>
  //                             </div>
  //                           )}
  //                           {!recordAudioActive && (
  //                             <div id="inputarea" style={{ padding: "2px" }}>
  //                               <a
  //                                 onClick={openMediaType}
  //                                 style={{
  //                                   transform: selectMediaType
  //                                     ? "rotate(45deg)"
  //                                     : "rotate(0deg)",
  //                                 }}
  //                                 className="input_btn_plus"
  //                               >
  //                                 <span>+</span>
  //                               </a>
  //                               <div
  //                                 className="messageText-container"
  //                                 style={{
  //                                   // transform: state.selectMediaType
  //                                   //   ? "translateX(-9999px)"
  //                                   //   : "translateX(0)",
  //                                   display: "flex",
  //                                   flexDirection: "column",
  //                                 }}
  //                               >
  //                                 <div>
  //                                   <span
  //                                     className="messageText-icons"
  //                                     title="logout"
  //                                     style={{
  //                                       left: "3px",
  //                                       zIndex: "30",
  //                                       top: "-2px",
  //                                       width: "30px",
  //                                     }}
  //                                     onClick={() => {
  //                                       setShowLogout(!showLogout);
  //                                       setSelectMediaType(false);
  //                                     }}
  //                                   >
  //                                     <img
  //                                       src={Aretha}
  //                                       style={{ width: "30px", height: "30px" }}
  //                                     />
  //                                   </span>
  //                                   <div id="messageTextWrapper">
  //                                     <Mentions
  //                                       textareaValue={initialMessage}
  //                                       setTextAreaValue={updateTextAreaValue}
  //                                       db={gChatRef}
  //                                       roomKey={room_key}
  //                                       currentUser={userName}
  //                                     >
  //                                       <textarea
  //                                         name="msg"
  //                                         id="messageText"
  //                                         onKeyPress={handleKeyPress}
  //                                         placeholder={placeholder}
  //                                         // ref={(txt) => (input = txt)}
  //                                         onChange={handleChange}
  //                                         value={initialMessage}
  //                                         className="inputs"
  //                                         style={{
  //                                           resize: "none",
  //                                           paddingLeft: "32px",
  //                                         }}
  //                                       ></textarea>
  //                                     </Mentions>
  //                                   </div>
  //                                   <span className="messageText-icons">
  //                                     <span className="messageTextTag-logo">
  //                                       <AtIconSvg onClick={handleAt} />
  //                                     </span>
  //                                     <span>
  //                                       <a
  //                                         onClick={openEmoji}
  //                                         className="inputs messageTextTag-emoji"
  //                                       >
  //                                         <InputEmojiSvg />
  //                                       </a>
  //                                     </span>
  //                                   </span>
  //                                 </div>
  //                               </div>
  //                             </div>
  //                           )}
  //                           <div id="input_plus">
  //                             <div>
  //                               {uploadFormActive && (
  //                                 <UploadForm
  //                                   uploadFormActive={uploadFormActive}
  //                                   modalUploadOpen={modalUploadOpen}
  //                                   user={userName}
  //                                   concatInput={concatInput}
  //                                   sendInput={sendInput}
  //                                 />
  //                               )}
  //                               {recordAudioActive && (
  //                                 <Recorder
  //                                   modalRecorderOpen={modalRecorderOpen}
  //                                   concatInput={concatInput}
  //                                   sendInput={sendInput}
  //                                 />
  //                               )}
  //                               {selectEmoji && (
  //                                 <Emoji
  //                                   modalOpened={selectEmoji}
  //                                   modalClosed={closeEmoji}
  //                                 />
  //                               )}
  //                             </div>
  //                           </div>
  //                         </div>
  //                         <input type="hidden" name="page" value="post" />
  //                         <input type="hidden" name="rk" value={room_key} />
  //                       </form>
  //                     </div>
  //                   )}
  //                 {registered &&
  //                   userName != defaultUserName &&
  //                   room_key &&
  //                   !LoginDataLoaded && (
  //                     <LoginData
  //                       user={userName}
  //                       room_key={room_key}
  //                       dispatch={dispatch}
  //                       LoginDataLoaded={LoginDataLoaded}
  //                     />
  //                   )}
  //                 {registered && userName != defaultUserName && !readonly && (
  //                   <NewPost
  //                     user={userName}
  //                     text={inputMessage}
  //                     comment={commenting}
  //                     active={!no_input}
  //                     updatePost={updatePost}
  //                     editKey={editKey}
  //                     gRoomsList={gRoomsList}
  //                     dispatch={dispatch}
  //                     page={page}
  //                   />
  //                 )}
  //                 {registered && <div className="list-an-item-btn"></div>}
  //                 {page.n > 1 && (
  //                   <div className="input-footer-closed">
  //                     <div className="input-div-hint">
  //                       <a
  //                         className="no_link"
  //                         href={"?page=1&rk=" + encodeURIComponent(room_key)}
  //                       >
  //                         Press to check latest messages
  //                       </a>
  //                     </div>
  //                   </div>
  //                 )}
  //               </div>
  //             </div>
  //             <center style={{ backgroundColor: color }} ref={lastBox}>
  //               {!registered && (
  //                 <a
  //                   onClick={register}
  //                   title="Sign in"
  //                   className="signout-footer"
  //                   style={{
  //                     width: "350px",
  //                     height: "40px",
  //                     border: "solid 1px rgba(0, 0, 0, 0.2)",
  //                     position: "relative",
  //                     left: "1px",
  //                   }}
  //                 >
  //                   <span
  //                     style={{
  //                       color: "black",
  //                       fontSize: "14px",
  //                       fontFamily: "RobotoMonoBold",
  //                       fontWeight: "700",
  //                       height: "100%",
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                     }}
  //                   >
  //                     <img
  //                       src={Aretha}
  //                       style={{
  //                         width: "30px",
  //                         height: "30px",
  //                         marginRight: "8px",
  //                       }}
  //                     />
  //                     SIGN UP
  //                   </span>
  //                 </a>
  //               )}
  //             </center>
  //           </section>
  //         )}
  //       </>
  //       {
  //         //<Footer cont={foot} />
  //       }
  //       {page.room_layout && (
  //         <div className="black-footer">
  //           {page.room_layout &&
  //             foot
  //               .filter(
  //                 (ind) =>
  //                   ind.text.toLowerCase() !== page.room_layout.toLowerCase()
  //               )
  //               .map((ind, i) => {
  //                 if (i === 0) {
  //                   return (
  //                     <div style={{ display: "flex", alignItems: "center" }}>
  //                       <a
  //                         onClick={register}
  //                         title="Sign in"
  //                         className="signout-footer"
  //                       >
  //                         <span className="sphinx">
  //                           <img src={Aretha} />
  //                         </span>
  //                       </a>
  //                       <Link href={ind.url}>
  //                         <span className="footer-item">
  //                           {ind.text.toUpperCase()}
  //                         </span>
  //                       </Link>
  //                     </div>
  //                   );
  //                 }
  //                 return (
  //                   <Link href={ind.url}>
  //                     <span className="footer-item">
  //                       {ind.text.toUpperCase()}
  //                     </span>
  //                   </Link>
  //                 );
  //               })}
  //         </div>
  //       )}
  //     </footer>
  //   );
}

export default Footer;
