// import React, { useState, useRef, useCallback, useEffect } from 'react';
// import { useContractKit } from '@celo-tools/use-contractkit';
// import { useStep } from 'react-hooks-helper';

// import { gAvatars, getAvatarUrl } from '../../settings/avatars.js'
// import WalletBoard1 from './WalletBoard1';

// const defaultBalance = {
//   celo: '',
//   cusd: '',
// };

// const UserProfile = ({
//   closeModal, myProfile, selectAvatar,
//   setAvatar, changeAvatar, handleNickname,
//   nicknameRef, nickname, editNickname,
//   changeNickname, next
//    }) => {
//   return (
//     <>
//       <section className="profile-body">
//         <div className="profile-head">
//           <div className="profile-head--child profile-avatar">
//             <img onClick={selectAvatar} src={getAvatarUrl(myProfile.avatar)} width="23.98px" height="30px" />
//             <div className="profile-avatar--wallet" onClick={next}>
//               <img src="../../static/img/wallet-icon.svg" width="20px" height="20px" />
//               <p>My Wallet</p>
//             </div>
//           </div>
//           <div className="profile-head--child profile-username">
//             <div className="profile-name">
//               <img src="../../static/img/barcode.svg" width="20px" height="20px" />
//               <div className="profile-name--content">
//                 <p className="profile-name--username" name="nickname" onClick={handleNickname}>
//                   {nickname}
//                 </p>

//                 <p className="profile-name--about">Dealer in all things psychotropic</p>
//               </div>
//             </div>

//             <div className="profile-approval">
//               <img src="../../static/img/user-approval-icon.svg" />
//               <p className="profile-approval--status">APPROVED (10+)</p>
//             </div>

//           </div>
//           <div className="profile-head--child profile-address">
//             <p>Chemist Bus Stop, Mission Street, GRA, Ikeja</p>
//           </div>
//           <div className="profile-head--child profile-socials">
//             <img src="../../static/img/facebook.svg" />
//             <img src="../../static/img/twitter.svg" />
//             <img src="../../static/img/instagram.svg" />
//           </div>
//         </div>

//         {changeAvatar &&
//           <div className="profile">
//             <p>Pick new avatar:</p>
//             {Object.keys(gAvatars).map((key) =>
//               <div key={key} className="avatarsList">
//                 <p>
//                   <a onClick={() => setAvatar(key)}><img src={getAvatarUrl(key)} /></a>
//                 </p>
//               </div>
//             )}
//           </div>
//         }

//         {editNickname &&
//           <div className="profile-name--username-editorContainer">
//             <span style={{ textAlign: 'right', padding: '5px', position: 'absolute', right: '0px', cursor: 'pointer', zIndex: 5 }} onClick={handleNickname}>✕</span>
//             <label htmlFor="nickname">Edit Nickname</label>
//             <input className="profile-name--username-editor" id="nickname" name="nickname" value={nickname} onChange={changeNickname} ref={nicknameRef} />
//           </div>
//         }

//         <div className="profile-details">
//           {/* <div className="profile-detail">
//             <span className="profile-detail--title">More About Me</span>
//             <div className="profile-detail--content">
//               <p>On the night I was born, Lord I swear the moon turned a fire-red.</p>
//             </div>
//           </div> */}
//           <div className="profile-detail">
//             <span className="profile-detail--title">My Channels</span>
//             <div className="profile-detail--content profile-user--channels">
//               <p>[Lobotomy]</p>
//               <p>[Aso Ebi]</p>
//               <p>[Psycotropics]</p>
//             </div>
//             {/* <span className="profile-user-channel--comments">Comments (54)</span> */}
//           </div>
//           <div className="profile-detail">
//             <span className="profile-detail--title">My Area</span>
//             <div className="profile-detail--content profile-user--fanOf">
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="16px" height="20px" />  <p>@peanutbutter</p></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-a.svg" width="16px" height="20px" />  <p>@JoyJoy</p></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/04-a.svg" width="16px" height="20px" />  <p>@somethingother</p></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-a.svg" width="16px" height="20px" />  <p>@millibilli</p></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-b.svg" width="16px" height="20px" />  <p>@MCpako</p></span>
//               <span className="profile-fan--detail"><p>+12 others</p></span>
//             </div>
//           </div>
//           <div className="profile-detail">
//             <span className="profile-detail--title">My Favorite Things</span>
//             <div className="profile-detail--content profile-user--favouriteThings">
//               <span className="profile-user--favouriteThing"><img src="../../static/img/profile-books.png" width="15px" height="15px" />  <p>Things Fall Apart, Flintstones</p></span>
//               <span className="profile-user--favouriteThing"><img src="../../static/img/profile-film.png" width="15px" height="15px" />  <p>The Matrix</p></span>
//               <span className="profile-user--favouriteThing"><img src="../../static/img/profile-music.png" width="15px" height="15px" />  <p>Jazz + HipHop</p></span>
//             </div>
//           </div>
//           <div className="profile-detail">
//             <span className="profile-detail--title">Something Else</span>
//             <div className="profile-detail--content profile-user--somethingElse">
//               <p>I used to be a real human being.</p>
//             </div>
//           </div>
//           {/* <div className="profile-detail">
//             <span className="profile-detail--title">My Area</span>
//             <div className="profile-detail--content profile-user--peopleInArea">
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/04-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/04-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-b.svg" width="13.75px" height="20px" /></span>

//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-c.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/04-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-c.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/04-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-b.svg" width="13.75px" height="20px" /></span>

//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/04-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/01-c.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/05-b.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/02-a.svg" width="13.75px" height="20px" /></span>
//               <span className="profile-fan--detail"><img src="../../static/img/pins_svg/03-a.svg" width="13.75px" height="20px" /></span>
//             </div>
//           </div> */}
//         </div>

//       </section>

//       <style jsx>{`
//          body, html {
//           height: 100%;
//         }

//         p {
//           margin: 0;
//           padding: 0;
//         }

//         .rooms_icon {
//           top: 62px;
//         }

//         .user-profile--text {
//           color: white;
//           display: flex;
//           align-items: center;
//         }

//         .profile-body {
//           display: grid;
//           background: rgba(255, 255, 255, 1);
//           overflow-y: auto;
//         }

//         .profile-head {
//           display: grid;
//           grid-template-columns: 5.57rem 1fr 25%;
//           grid-template-rows: minmax(38px, 60px) auto;
//           border: 4px solid #000000;
//           margin-bottom: 22px;
//           font-size: 0.625rem;
//         }

//         .profile-avatar {
//           grid-column: 1;
//           grid-row: 1 / span 3;
//           border-right: 4px solid #000000;

//           display: grid;
//           place-items: center;
//           text-align: center;
//           align-content: space-between;
//           padding: 2px 0;
//         }

//         .profile-avatar--wallet {
//           cursor: pointer;
//         }

//         .profile-avatar--wallet p {
//           font-family: 'Roboto Mono', sans-serif;
//         }

//         .profile-name--content {
//           padding-left: 5px;
//         }

//         .profile-username {
//           grid-column: 2 / span 2;
//           grid-row: 1;
//           border-bottom: 4px solid #000000;
//           min-height: 39px;

//           display: flex;
//           justify-content: space-between;
//           padding: 8px 4px 12px 4px;
//         }

//         .profile-name {
//           display: flex;
//           align-items: center;
//           justify-content: flex
//         }

//         .profile-name img {
//           margin-right: 3px;
//         }

//         .wallet-connect--container {
//           margin-bottom: 22px;
//           display: flex;
//           align-items: center;
//           justify-content: center;
//         }

//         .wallet-connect--btn {
//           padding: 4px 8px;
//           background: transparent;
//           border: 1px solid rgba(0, 0, 0, 0.6);
//         }

//         .profile-name--username-editorContainer {
//           text-align: center;
//           justify-content: center;
//           margin-bottom: 22px;
//           position: relative;
//           font-family: 'Noto Sans JP Bold', sans-serif;
//         }

//         .profile-name--username-editorContainer label {
//           display: block;
//           font-weight: bold;
//           /* display: inline-block; */
//           position: relative;
//           min-width: 2em;
//           min-height: 1.4em;
//         }

//         .profile-name--username-editor {
//           display: block;
//           color: black;
//           border: 1px solid rgba(0, 0, 0, 0.3);
//           padding: 3px;
//           margin-left: auto;
//           margin-right: auto;
//         }

//         .profile-name--username {
//           font-family: 'Noto Sans JP Bold', sans-serif;
//           font-weight: bold;
//           font-size: 1.25rem;
//         }

//         .profile-name--about {
//           font-size: 0.5rem;
//           font-family: 'Noto Sans JP', sans-serif;
//         }

//         .profile-approval {
//           font-family: 'Roboto Mono', Helvetica;
//           font-size: 0.5rem;
//           text-align: center;
//         }

//         .profile-address {
//           grid-column: 2;
//           grid-row: 3;
//           height: 100%;
//           font-family: 'Noto Sans JP', sans-serif;
//           border-right: 4px solid #000000;
//         }

//         .profile-address p {
//           padding: 2px;
//         }

//         .profile-socials {
//           grid-column: 3;
//           grid-row: 3;

//           display: flex;
//           place-items: center;
//           justify-content: space-evenly;
//           height: 100%;
//         }

//         .profile-details {
//           display: grid;
//         }

//         .profile-detail {
//           border-top: 2px dotted #000000;
//           border-left: 2px dotted #000000;
//           border-right: 2px dotted #000000;
//           min-height: 77px;
//           position: relative;
//         }

//         .profile-detail:last-child {
//           border-bottom: 2px dotted #000000;
//         }

//         .profile-detail--title,
//         .profile-user-channel--comments {
//           font-family: 'Noto Sans JP Bold', sans-serif;
//           font-weight: bold;
//           font-size: 0.625rem;
//           padding: 3px;
//         }

//         .profile-user-channel--comments {
//           position: absolute;
//           top: 0;
//           right: 0;
//         }

//         .profile-detail--content {
//           margin: 2px 50px;
//           font-family: Roboto Mono;
//           font-size: 0.625rem;
//         }

//         .profile-detail--content > p {
//           text-align: left !important;
//         }

//         .profile-user--fanOf {
//           display: grid;
//           grid-gap: 10px;
//           grid-template-columns: repeat(3, 1fr);
//           margin: 2px 30px;
//         }

//         .profile-fan--detail,
//         .profile-user--favouriteThing {
//           display: flex;
//           align-items: center;
//         }

//         .profile-fan--detail img {
//           margin-right: 3px;
//         }

//         .profile-user--favouriteThing img {
//           margin: 5px;
//         }

//         .profile-user--somethingElse {
//           margin: 15px 40px;
//         }

//         .profile-user--somethingElse p {
//           text-align: center;
//         }

//         .profile-user--peopleInArea {
//           display: flex;
//           flex-wrap: wrap;
//         }
//         `}
//       </style>
//     </>
//   )
// }

// const Profile = ({ nickname: nicknameProp, closeModal, myProfile, selectAvatar, setAvatar, changeAvatar, profileRef, onLogout }) => {
//   const [nickname, setNickname] = useState(nicknameProp);
//   const [editNickname, setEditNickname] = useState(false);
//   const [balance, setBalance] = useState(defaultBalance);
//   const [sending, setSending] = useState(false);
//   const {
//     index,
//     navigation: { previous, next }
//   } = useStep({ steps: 2 });
//   const {
//     kit,
//     address,
//     network,
//     updateNetwork,
//     openModal,
//     destroy,
//     send,
//   } = useContractKit();
//   const nicknameRef = useRef(null);

//   const handleNickname = () => {
//     setEditNickname(!editNickname)
//   }

//   const changeNickname = () => {
//     const n = nicknameRef.current.value;
//     setNickname(n);
//     profileRef.update({ nickname: n })
//   }

//   const handleConnect = () => {
//     // Close user profile profile cos celo modal opens behind it
//     closeModal();
//     // Open celo modal
//     openModal();
//   }

//   const fetchBalances = useCallback(async () => {
//     if (!address) {
//       setBalance(defaultBalance);
//       return;
//     }

//     const [goldToken, stableToken] = await Promise.all([
//       kit.contracts.getGoldToken(),
//       kit.contracts.getStableToken(),
//     ]);
//     const [celo, cusd] = await Promise.all([
//       goldToken.balanceOf(address).then((x) => x.toString()),
//       stableToken.balanceOf(address).then((x) => x.toString()),
//     ]);
//     setBalance({
//       celo,
//       cusd,
//     });
//   }, [address]);

//   useEffect(() => {
//     fetchBalances();
//   }, [fetchBalances]);

//   return (
//     <>
//     <div style={{ width: '100%', display: 'flex', justifyContent: 'flex-end' }}>
//     <span style={{ textAlign: 'right', padding: '3px', cursor: 'pointer', color: '#ffffff', fontWeight: '900' }} onClick={closeModal}>✕</span>
//     </div>

//     {index === 0 &&
//       <UserProfile
//         next={next}
//         nickname={nickname}
//         myProfile={myProfile}
//         setAvatar={setAvatar}
//         closeModal={closeModal}
//         profileRef={profileRef}
//         nicknameRef={nicknameRef}
//         nicknameProp={nicknameProp}
//         selectAvatar={selectAvatar}
//         changeAvatar={changeAvatar}
//         editNickname={editNickname}
//         changeNickname={changeNickname}
//         handleConnect={handleConnect}
//         handleNickname={handleNickname}
//       />
//       }
//       {index === 1 &&
//         <WalletBoard1
//          next={next}
//          send={send}
//          address={address}
//          balance={balance}
//          destroy={destroy}
//          onLogout={onLogout}
//          nickname={nickname}
//          myProfile={myProfile}
//          handleConnect={handleConnect}
//        />
//       }
//     </>
//   );
// }

// export default Profile;
