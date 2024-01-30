// import React, { useState } from "react";
// import Link from "next/link";
// import { useRouter } from "next/router";
// import { useSelector, useDispatch } from "react-redux";
// import ToggleButton from "../ToggleButton";
// import Areabox from "../../assets/imgs/AreaBox.png";
// // import RegisterIconSvg from "../../assets/svgComponents/RegisterIconSvg";
// // import ViewChannelsSvg from "../../assets/svgComponents/nicons/ViewChannelsSvg";
// // import HeadPhoneSvg from "../../assets/svgComponents/HeadPhoneSvg";
// import CinematicSvg from "../../assets/svgComponents/CinematicSvg";
// import GraduationSvg from "../../assets/svgComponents/GraduationSvg";

function Header() {
  //   let goSearchElem = 0;
  //   let searchField = 0;
  //   const [headerVisible, setHeaderVisible] = useState(true);
  //   const [searchTimeout, setSearchTimeout] = useState(null);
  //   const [searchWords, setSearchWords] = useState("");
  //   const [isSearchBoxOpen, setIsSearchBoxOpen] = useState(false);
  //   const [inputActivated, setInputActivated] = useState(false);
  //   const [goSearchLink, setGoSearchLink] = useState("index");
  //   const [searchText, setSearchText] = useState("");
  //   const [initialMessage, setInitialMessage] = useState("");
  //   const [commenting, setCommenting] = useState(false);
  //   const [editing, setEditing] = useState(false);
  //   const [editKey, setEditKey] = useState(0);
  //   const [no_input, setNo_input] = useState(false);
  //   const [layout, setLayout] = useState("default");
  //   const [page, setPage] = useState({
  //     room_key: "forsale",
  //     room_name: "Forsale",
  //     room_title: "forsale",
  //   });
  //   const [registered, setRegistered] = useState(false);
  //   const [registering, setRegistering] = useState(false);
  //   const [gRoomsList, setGRoomsList] = useState(null);
  //   const [num_unread, setNum_unread] = useState(0);
  //   const [isSearchPage, setIsSearchPage] = useState(false);
  //   const [modalRoomsOpened, setModalRoomsOpened] = useState(false);
  //   const [modalNewRoomOpened, setModalNewRoomsOpened] = useState(false);
  //   const [userDetails, setUserDetails] = useState(null);
  //   const [wallet, setWallet] = useState(null);
  //   const [passport, setPassport] = useState(null);
  //   const [showProfile, setShowProfile] = useState(false);
  //   const [isChecked, setIsChecked] = useState(false);
  //   const styles_subheader =
  //     registered && gRoomsList != null && num_unread > 0
  //       ? "sub_header notif"
  //       : "sub_header no_notif";
  //   console.log("asyncApp v01.097 no_input", no_input, layout, page);
  //   let footFirst = registered
  //     ? { text: "my channels", url: "/" }
  //     : { text: "SIGN UP", url: "" };
  //   let foot = [
  //     footFirst,
  //     { text: "metro", url: "/metro" },
  //     { text: "radio", url: "?rk=Radio" },
  //     { text: "school", url: "?rk=basicSchool" },
  //     { text: "cinema", url: "?rk=Cinema" },
  //   ];
  //   const goHome = () => {
  //     window.top.location = "/";
  //   };
  //   const showHeader = () => {
  //     setHeaderVisible(true);
  //   };
  //   const hideHeader = () => {
  //     setHeaderVisible(true);
  //   };
  //   const openSearchBox = () => {
  //     if (isSearchBoxOpen) {
  //       document.getElementById("searchForm").submit();
  //       return;
  //     }
  //     setIsSearchBoxOpen(true);
  //     searchField.focus();
  //   };
  //   const closeSearchBox = () => {
  //     setIsSearchBoxOpen(false);
  //     searchField.blur();
  //   };
  //   const activateInput = (e) => {
  //     console.log("activateInput");
  //     setInputActivated(true);
  //     setEditing(false);
  //     setEditKey(0);
  //     setCommenting(false);
  //   };
  //   const deActivateInput = (e) => {
  //     console.log("disable inputActivated");
  //     setInputActivated(false);
  //     setEditing(false);
  //     setInitialMessage("");
  //     setCommenting(false);
  //   };
  //   const goToMetro = () => {
  //     window.top.location = "/metro";
  //   };
  //   const openModalRooms = () => {
  //     setModalRoomsOpened(true);
  //     setModalNewRoomsOpened(false);
  //     setModalProfileOpened(false);
  //     console.log("openModalRooms state change", modalRoomsOpened);
  //   };
  //   const handleToggle = () => {
  //     //this.setState({ isChecked: !this.state.isChecked }) //no time to propagate state since handleSearch reloads
  //     handleSearch(0, searchWords, isChecked);
  //   };
  //   const handleSearch = (event, words, isChecked1) => {
  //     if (searchTimeout) clearTimeout(searchTimeout);
  //     const isCheckedd = isChecked1 ? isChecked1 : isChecked;
  //     if (event) event.preventDefault();
  //     var goSearchLink = `/?s=${
  //       words || this.searchField ? this.searchField.value : ""
  //     }${isCheckedd ? "&o=t" : ""}`;
  //     console.log("handleSearch", goSearchLink);
  //     this.setState({ goSearchLink });
  //     if (this.goSearchElem)
  //       this.searchTimeout = setTimeout(
  //         function() {
  //           this.goSearchElem.click();
  //         }.bind(this),
  //         1000
  //       );
  //     return false;
  //   };
  //   const handleRightHeadIcon = (P, reg, roomList, search) => {
  //     console.log("checking registered", reg);
  //     let viewChannels = { height: "15px", width: "15px" };
  //     let p = P.toLowerCase();
  //     if (p === "radio") {
  //       return (
  //         <a onClick={openModalRooms} title="Rooms" className="rooms_icon">
  //           <span>
  //             {/* <HeadPhoneSvg className={view_channels} style={viewChannels} /> */}
  //             {/* <Image
  //               className="view_channels"
  //               src="static/img/headphone.svg"
  //               style={viewChannels}
  //             /> */}
  //           </span>
  //         </a>
  //       );
  //     } else if (p === "cinema") {
  //       return (
  //         <a
  //           onClick={openModalRooms}
  //           title="Rooms"
  //           className="rooms_icon"
  //           style={viewChannels}
  //         >
  //           <span>
  //             {/* <img
  //               className="view_channels"
  //               src="static/img/cinematic.svg"
  //               style={viewChannels}
  //             /> */}
  //             <CinematicSvg className={view_channels} style={viewChannels} />
  //           </span>
  //         </a>
  //       );
  //     } else if (p === "basicschool") {
  //       return (
  //         <a
  //           onClick={openModalRooms}
  //           title="Rooms"
  //           className="rooms_icon"
  //           style={viewChannels}
  //         >
  //           <span>
  //             {/* <img
  //               className="view_channels"
  //               src="static/img/graduation.svg"
  //             /> */}
  //             <GraduationSvg className={view_channels} style={viewChannels} />
  //           </span>
  //         </a>
  //       );
  //     } else {
  //       return handleRoomiconSearchToggle(reg, roomList, search);
  //     }
  //   };
  //   // handles conditional rendering of toggle button or rooms list icon
  //   const handleRoomiconSearchToggle = (Registered, gRoomsList, searchPage) => {
  //     const key = `${Registered}-${gRoomsList != null}-${searchPage}`;
  //     return (
  //       <React.Fragment>
  //         {
  //           {
  //             "true-false-true": (
  //               <div className="toggle-container">
  //                 <ToggleButton
  //                   isChecked={isChecked}
  //                   handleToggle={() => handleToggle()}
  //                 />
  //                 <div className="toggle-texts">
  //                   <p
  //                     className="toggle-text--recent"
  //                     style={{
  //                       color: isChecked ? "white" : "rgba(255,255,255, 0.8)",
  //                     }}
  //                   >
  //                     Recent
  //                   </p>
  //                   <p
  //                     className="toggle-text--relevant"
  //                     style={{
  //                       color: isChecked ? "white" : "rgba(255,255,255, 0.8)",
  //                     }}
  //                   >
  //                     Relevant
  //                   </p>
  //                 </div>
  //               </div>
  //             ),
  //             "true-true-false": (
  //               <a onClick={openModalRooms} title="Rooms" className="rooms_icon">
  //                 <span>
  //                   {/* <img
  //                     className="view_channels"
  //                     src="static/img/nicons/view-channels.svg"
  //                   /> */}
  //                   <viewChannelsSvg
  //                     className={"view_channels"}
  //                     style={{ height: "15px", width: "15px" }}
  //                   />
  //                 </span>
  //               </a>
  //             ),
  //             "false-false-false": (
  //               <a onClick={openModalRooms} title="Rooms" className="rooms_icon">
  //                 <span>
  //                   {/* <img
  //                     className="view_channels"
  //                     src="static/img/nicons/view-channels.svg"
  //                   /> */}
  //                   <ViewChannelsSvg
  //                     className={"view_channels"}
  //                     style={{ height: "15px", width: "15px" }}
  //                   />
  //                 </span>
  //               </a>
  //             ),
  //             "false-false-true": (
  //               <div className="toggle-container">
  //                 <ToggleButton
  //                   isChecked={isChecked}
  //                   handleToggle={() => handleToggle()}
  //                 />
  //                 <div className="toggle-texts">
  //                   <p
  //                     className="toggle-text--recent"
  //                     style={{
  //                       color: !isChecked ? "white" : "rgba(255,255,255, 0.8)",
  //                     }}
  //                   >
  //                     Recent
  //                   </p>
  //                   <p
  //                     className="toggle-text--relevant"
  //                     style={{
  //                       color: isChecked ? "white" : "rgba(255,255,255, 0.8)",
  //                     }}
  //                   >
  //                     Relevant
  //                   </p>
  //                 </div>
  //               </div>
  //             ),
  //           }[key]
  //         }
  //       </React.Fragment>
  //     );
  //   };
  //   const hideAll = () => {
  //     console.log("hide profile");
  //     setShowProfile(false);
  //     setWallet(false);
  //     setPassport(false);
  //     setUserDetails(false);
  //   };
  //   return (
  //     <>
  //       <header
  //         className={`header contact ${
  //           headerVisible ? "show-header" : "hide-header"
  //         }`}
  //         // onClick={this.deActivateInput}
  //       >
  //         <div className="fixed-nav-bar">
  //           <div className="mascot-div" onClick={goHome}>
  //             <img
  //               className="messagepage-mascot"
  //               src={Areabox}
  //               alt="areabox"
  //               style={{ height: "40px", width: "40px" }}
  //             />
  //             {/* <img
  //             className="mascot"
  //             src="../static/img/areabox_logo.svg"
  //           ></img> */}
  //             <h4 className="mascot">AREABOX</h4>
  //           </div>
  //           <div className="header-div">
  //             <section className="main_header">
  //               <form
  //                 className={`searchbox-container ${
  //                   isSearchBoxOpen ? "open-searchbox" : ""
  //                 }`}
  //                 id="searchForm"
  //                 onSubmit={handleSearch}
  //               >
  //                 <div className="searchbox">
  //                   <Link legacyBehavior href={goSearchLink}>
  //                     <a ref={(e) => (goSearchElem = e)}>
  //                       {" "}
  //                       <i className="search-icon">
  //                         <img
  //                           src="../static/img/Search.png"
  //                           width="18px"
  //                           height="18px"
  //                           alt="search icon"
  //                         />
  //                       </i>{" "}
  //                     </a>
  //                   </Link>
  //                   <input
  //                     className="search-field"
  //                     type="text"
  //                     name="search"
  //                     ref={(field) => (searchField = field)}
  //                     id="searchField"
  //                     onChange={handleSearch}
  //                   />
  //                   <i
  //                     onClick={closeSearchBox}
  //                     className="fa fa-times"
  //                     aria-hidden="true"
  //                   ></i>
  //                 </div>
  //               </form>
  //               <div className="tab-container">
  //                 <a
  //                   className="tab"
  //                   onClick={inputActivated ? deActivateInput : activateInput}
  //                 >
  //                   Message
  //                 </a>
  //                 <a className="tab" onClick={openSearchBox}>
  //                   Search
  //                 </a>
  //                 <a className="tab" onClick={goToMetro}>
  //                   Discover
  //                 </a>
  //               </div>
  //             </section>
  //             {!registering && !userDetails && (
  //               <section className={styles_subheader}>
  //                 <div className="unreadNotif">
  //                   {/* {this.handleNotifLensToggle(
  //                   registered,
  //                   gRoomsList,
  //                   num_unread,
  //                   this.state.isSearchPage,
  //                   addRoomModalOpen
  //                 ) */}
  //                   <div>
  //                     <span className="unreadBolt">
  //                       <svg
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         xmlnsXlink="http://www.w3.org/1999/xlink"
  //                         version="1.1"
  //                         x="0px"
  //                         y="0px"
  //                         viewBox="0 0 100 125"
  //                         xmlSpace="preserve"
  //                         fill="yellow"
  //                         width="35px"
  //                         height="35px"
  //                       >
  //                         <g>
  //                           <path d="M49.3,17h3.8c4,0,8,0.1,12,0.3c1.6,0.1,3.2,0.2,4.8,0.4c1.3,0.2,2.7,0.2,4,0.5c2.6,0.6,5,1.8,7,3.6   c2.8,2.6,4.7,6.2,4.9,10.1c0.1,1.5,0.4,3,0.5,4.5c0.3,3,0.4,6.1,0.5,9.2c0,0.1,0,0.2,0,0.4v2c-0.1,0.7-0.1,1.3-0.1,2   c0,1.6-0.1,3.2-0.3,4.8c-0.2,2-0.5,4-0.7,6c-0.4,3.7-2.3,7.3-5.1,9.8c-2.7,2.4-6.2,3.7-9.7,3.8c1.7,1.2,3.3,2.6,4.7,4.1   c0.4,0.4,0.8,0.8,1.1,1.4c0.5,0.9,0.5,2,0.1,2.9c-0.4,0.9-1.1,1.5-2,1.9c-1,0.4-2.2,0.2-3.1-0.3c-0.6-0.4-0.9-0.9-1.4-1.4   c-2.6-2.6-5.7-4.7-9-6.1c-5.1-2.2-11-2.8-16.4-1.5c-2.7,0.6-5.2,1.7-7.5,3.2c-2,1.2-3.8,2.7-5.4,4.5c-0.4,0.4-0.6,0.8-1,1.1   c-1,0.8-2.4,1-3.5,0.5c-0.9-0.4-1.7-1.2-1.9-2.2c-0.3-1-0.1-2.2,0.6-3c1.5-1.9,3.3-3.5,5.2-4.9c-1.8-0.1-3.6-0.5-5.3-1.2   c-2.5-1.1-4.7-2.8-6.3-5c-1.6-2.2-2.7-4.8-2.9-7.6c-0.1-0.8-0.2-1.5-0.3-2.3c-0.3-1.8-0.4-3.6-0.5-5.3c-0.2-3-0.2-5.9-0.2-8.9   c0-3.2,0.2-6.4,0.6-9.6c0.1-1,0.3-2,0.4-3c0.3-3.5,2-6.9,4.5-9.3c2.2-2.2,5-3.6,8-4.2c0.9-0.2,1.9-0.2,2.8-0.3   c2.4-0.3,4.8-0.5,7.2-0.6C42.5,17.1,45.9,17.1,49.3,17 M45.2,24c-2.4,0-4.7,0.1-7.1,0.2c-1.7,0.1-3.5,0.2-5.2,0.5   c-1,0.1-2.1,0.1-3.1,0.4c-1.4,0.3-2.7,1.1-3.7,2c-1.5,1.4-2.4,3.3-2.6,5.3c-0.1,1.5-0.4,3-0.6,4.5c-0.3,3.1-0.4,6.3-0.4,9.5   c0,4,0.2,8,0.8,11.9c0.2,1,0.2,2.1,0.4,3.2c0.3,1.2,0.9,2.3,1.7,3.3c1.5,1.8,3.8,2.9,6.1,2.9c12.9,0,25.8,0,38.7,0   c1.5,0,2.9-0.3,4.2-1.1c2-1.1,3.5-3,4-5.2c0.2-0.8,0.3-1.7,0.4-2.6c0.2-1.3,0.4-2.7,0.5-4c0.3-3.1,0.4-6.3,0.3-9.5   c-0.1-3.6-0.2-7.2-0.7-10.7c-0.1-0.7-0.2-1.5-0.2-2.2c-0.1-1.1-0.4-2.2-0.9-3.1c-1.1-2.1-3.1-3.6-5.4-4.2c-0.6-0.2-1.2-0.2-1.8-0.3   c-1.2-0.1-2.3-0.3-3.5-0.4c-3.5-0.3-7.1-0.4-10.6-0.5C52.8,23.9,49,23.9,45.2,24z" />
  //                           <path d="M43.5,36.5c3.8-0.2,7.7-0.2,11.5-0.1c2,0,4,0.1,6,0.3c0.7,0.1,1.4,0.1,2.2,0.3c0.4,1.5,0.4,3.1,0.5,4.6   c0.1,2.3,0.1,4.6,0,6.8c-0.1,1.5-0.2,3-0.5,4.4C61.3,53,59.5,53,57.6,53c-3,0-6,0-9-0.1c-0.8,0-1.6-0.1-2.3-0.2   c-2.4,1.8-4.7,3.6-7.1,5.4c0-0.2,0-0.5,0-0.7c-0.3-3.8-0.3-7.7-0.3-11.5c0-3,0-6,0.3-9.1C40.6,36.7,42,36.6,43.5,36.5z" />
  //                         </g>
  //                       </svg>
  //                     </span>
  //                   </div>
  //                 </div>
  //                 {registered && (
  //                   <a
  //                     onClick={openModalRooms}
  //                     style={
  //                       isSearchPage || addRoomModalOpen
  //                         ? {
  //                             margin: "0",
  //                             paddingLeft: "46px",
  //                             textAlign: "left",
  //                           }
  //                         : { margin: "0 auto" }
  //                     }
  //                     className="rooms_btn"
  //                     title="Rooms"
  //                   >
  //                     {addRoomModalOpen ? "Add a new channel" : page.room_title}
  //                   </a>
  //                 )}
  //                 {!registered && (
  //                   <Link legacyBehavior href="/Rooms">
  //                     <a
  //                       style={
  //                         isSearchPage
  //                           ? {
  //                               margin: "0",
  //                               paddingLeft: "46px",
  //                               textAlign: "left",
  //                             }
  //                           : { margin: "0 auto" }
  //                       }
  //                       className="rooms_btn"
  //                       title="Rooms"
  //                     >
  //                       {console.log("right", page.room_title)}
  //                       {page.room_title}
  //                     </a>
  //                   </Link>
  //                 )}
  //                 {handleRightHeadIcon(
  //                   (page.room_key = "for-sale"),
  //                   registered,
  //                   gRoomsList,
  //                   isSearchPage
  //                 )}
  //               </section>
  //             )}
  //             {registering && !userDetails && (
  //               <section className={styles_subheader}>
  //                 {registered && (
  //                   <a
  //                     onClick={openModalRooms}
  //                     style={
  //                       isSearchPage || addRoomModalOpen
  //                         ? {
  //                             margin: "0",
  //                             paddingLeft: "46px",
  //                             textAlign: "left",
  //                           }
  //                         : { margin: "0 auto" }
  //                     }
  //                     className="rooms_btn"
  //                     title="Rooms"
  //                   >
  //                     {
  //                       //addRoomModalOpen ? "Add a new channel" : page.room_title
  //                     }
  //                   </a>
  //                 )}
  //                 {!registered && (
  //                   <Link legacyBehavior href="/Rooms">
  //                     <a
  //                       style={
  //                         isSearchPage
  //                           ? {
  //                               margin: "0",
  //                               paddingLeft: "46px",
  //                               textAlign: "left",
  //                             }
  //                           : { margin: "0 auto" }
  //                       }
  //                       className="rooms_btn"
  //                       title="Rooms"
  //                     >
  //                       {console.log("right", page.room_title)}
  //                       {
  //                         //page.room_title
  //                       }
  //                       REGISTER
  //                     </a>
  //                   </Link>
  //                 )}
  //                 <a
  //                   onClick={openModalRooms}
  //                   title="Rooms"
  //                   className="rooms_icon"
  //                 >
  //                   <span>
  //                     {/* <img
  //                       className="view_channels"
  //                       src="static/img/register-icon.svg"
  //                       style={{height:"15px", width:"15px"}}
  //                     /> */}
  //                     {/* <RegisterIconSvg
  //                       width={"15px"}
  //                       height={"15px"}
  //                       className={"view_channels"}
  //                     /> */}
  //                   </span>
  //                 </a>
  //               </section>
  //             )}
  //             {userDetails && (
  //               <section className={styles_subheader}>
  //                 <div className="unreadNotif" onClick={hideAll}>
  //                   <div
  //                     style={{
  //                       height: "100%",
  //                       display: "flex",
  //                       justifyContent: "center",
  //                       alignItems: "center",
  //                     }}
  //                   >
  //                     <span className="unreadBolt">
  //                       <svg
  //                         width="19"
  //                         height="18"
  //                         viewBox="0 0 19 18"
  //                         fill="yellow"
  //                         xmlns="http://www.w3.org/2000/svg"
  //                         style={{
  //                           fill: "white",
  //                           width: "19px",
  //                           height: "19px",
  //                           cursor: "pointer",
  //                         }}
  //                       >
  //                         <path d="M15.4878 11.9763L11.0802 11.9763V12.5272C11.0802 13.4455 10.5905 14.3025 9.73342 14.6698C8.87639 15.0983 7.89693 14.9759 7.16233 14.425L2.02014 10.5071C1.95892 10.6295 1.95892 10.8132 1.95892 10.9968C1.95892 11.4866 2.14257 11.9151 2.50987 12.1599L9.67221 17.6694C10.1007 18.0367 10.7129 18.0979 11.2638 17.8531C11.7536 17.6082 12.1209 17.1185 12.1209 16.5063V15.5269C12.1209 15.2208 12.3657 14.9759 12.6718 14.9759L17.4467 14.9759C18.2425 14.9759 18.9159 14.3025 18.9159 13.5067V8.42573C18.9159 7.75235 18.4874 7.2014 17.8752 7.01775V9.52763C17.9364 10.9356 16.8345 11.9763 15.4878 11.9763Z" />
  //                         <path d="M7.7745 0.345098L0.612165 5.85459C0.244866 6.16067 0 6.58919 0 7.0177C0 7.50743 0.18365 7.93595 0.612165 8.18082L7.7745 13.6903C8.20302 14.0576 8.81518 14.1188 9.36613 13.874C9.85586 13.6291 10.2232 13.1394 10.2232 12.5272V11.5477C10.2232 11.2416 10.468 10.9968 10.7741 10.9968L15.549 10.9968C16.3448 10.9968 17.0182 10.3234 17.0182 9.52758V4.44661C17.0182 3.65079 16.3448 2.97741 15.549 2.97741L10.7129 2.97741C10.4068 2.97741 10.1619 2.73254 10.1619 2.42646V1.447C10.1619 0.896048 9.85586 0.345098 9.30491 0.100232C8.81518 -0.0834179 8.20302 -0.0222015 7.7745 0.345098Z" />
  //                       </svg>
  //                     </span>
  //                   </div>
  //                 </div>
  //                 {registered && (
  //                   <a
  //                     onClick={openModalRooms}
  //                     style={
  //                       isSearchPage || addRoomModalOpen
  //                         ? {
  //                             margin: "0",
  //                             paddingLeft: "46px",
  //                             textAlign: "left",
  //                           }
  //                         : { margin: "0 auto" }
  //                     }
  //                     className="rooms_btn"
  //                     title="Rooms"
  //                   >
  //                     {passport && !showProfile && "PASSPORT"}
  //                     {wallet && "WALLET"}
  //                     {showProfile && "PROFILE"}
  //                   </a>
  //                 )}
  //               </section>
  //             )}
  //           </div>
  //         </div>
  //       </header>
  //     </>
  //   );
}

export default Header;
