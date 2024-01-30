import React, { useState, useRef } from 'react';
import Link from 'next/link';

const header = (props) => {
  const [isSearchBoxOpen, setSearchBoxOpen] = useState(false);

  const searchField = useRef(null);

  const openSearchBox = () => {
    if (isSearchBoxOpen) {
      document.getElementById('searchForm').submit();
      return;
    }
    setSearchBoxOpen(true);
    searchField.current.focus();
  };
  const closeSearchBox = () => {
    setSearchBoxOpen(false);
    searchField.current.blur();
  };
  return (
    <>
      <header className="header">
        <div className="fixed-nav-bar">
          <div className="header-div">
            <section className="main_header">
              <Link href="/">
                <div className="mascot-div">
                  <img src="/static/img/wordmark.svg" alt="areabox" />
                </div>
              </Link>
              <form
                action="/index"
                className={`searchbox-container ${
                  isSearchBoxOpen ? 'open-searchbox' : ''
                }`}
                id="searchForm">
                <div className="searchbox">
                  <a>
                    {' '}
                    <i className="search-icon">
                      <img
                        src="../static/img/Search.png"
                        width="18px"
                        height="18px"
                        alt="search icon"
                      />
                    </i>{' '}
                  </a>
                  <input
                    className="search-field"
                    type="text"
                    name="s"
                    id="searchField"
                    ref={searchField}
                  />
                  <i
                    onClick={closeSearchBox}
                    className="fa fa-times"
                    aria-hidden="true"></i>
                </div>
              </form>
              <div className="tab-container">
                <a href="/" className="tab">
                  Message
                </a>
                <a className="tab" onClick={openSearchBox}>
                  Search
                </a>
                <a href="/metro" className="tab">
                  Discover
                </a>
              </div>
            </section>
            <section className="sub_header notif">{props.subHeader}</section>
            {/* } */}
          </div>
        </div>
      </header>
      <style jsx global>
        {`
          * {
            box-sizing: border-box;
          }

          *:before,
          *:after {
            box-sizing: inherit;
          }

          .header {
            position: fixed;
            top: 0;
            z-index: 9999;
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            transition: top 0.3s;
          }

          /* FIXED-NAV-BAR */
          .fixed-nav-bar {
            z-index: 9999;
            width: 100vw;
            font:
              20px 'ScriberStencil',
              sans-serif; /* 120%/1.5em */
            height: 90px;
          }

          .main_header {
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            height: 60px;
            background-color: #fff606;
            position: relative;
          }

          .tab-container {
            display: flex;
            // color: #000000;
            align-items: stretch;
            position: absolute;
            bottom: 0;
            right: 0px;
          }

          .tab {
            background: #1505cc;
            border: 1px solid #ffffff;
            color: white;
            font-size: 12px;
            flex: 1;
            text-align: center;
            font-family: Noto Sans JP;
            height: 24px;
            width: 64px;
            border-right: none;
          }

          .tab a {
            width: 100%;
            height: 100%;
          }

          .tab:hover {
            color: #cacacf;
          }

          input {
            margin: 0;
            padding: 0;
            border: 0;
            border-radius: 0;
          }

          .searchbox-container {
            position: absolute;
            top: 0;
            right: 0;
            width: 50%;
            height: 50%;
            -webkit-transition: all 0.3s ease;
            -moz-transition: all 0.3s ease;
            -o-transition: all 0.3s ease;
            -ms-transition: all 0.3s ease;
            transition: all 0.3s ease;
            transform: translateX(100%);
            opacity: 0;
          }

          .open-searchbox {
            transform: translateX(0);
            opacity: 1;
          }

          .searchbox {
            position: relative;
            display: flex;
            align-items: center;
            border: 1px solid #fff606;
          }

          .search-icon {
            position: absolute;
            top: 50%;
            right: auto;
            left: 0.3em;
            pointer-events: none;
            margin-top: -12px;
            vertical-align: bottom;
            padding-right: 8px;
          }

          .search-field {
            background: rgba(0, 0, 0, 0.6);
            height: 2rem;
            padding-left: 2.2rem;
            border: 1px solid #fff606;
            width: 100%;
            color: white;
          }

          .fa {
            font-size: 0.8rem;
          }

          .input_btn .fa {
            font-size: 1.5rem;
          }

          .fa-times {
            position: absolute;
            right: 5%;
          }

          .close-search {
            font-size: 0.5rem;
          }

          .sub_header {
            position: relative;
            margin: 0 auto;
            background-color: black;
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            height: 30px;
            border-bottom: 1px solid #777;
            /*text-align: center;*/
            vertical-align: middle;
            border-top: 1px inset #777;
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 1rem;
          }
          .title {
            color: white;
            font-family: 'ScriberStencil', sans-serif;
            font-size: 14px;
            text-align: center;
          }
          .sub_header .notif {
            padding-left: 130px;
            background-color: red;
          }

          .sub_header a {
            padding: 0.3rem 5px 0;
            margin-top: 2px;
          }
          .unreadNotif {
            font-size: 48%;
            line-height: 0.5;
            display: block;
            height: 1.8rem;
            margin-top: 0px !important;
            margin-left: 5px !important;
            width: 3rem;
            padding-top: 0;
          }

          .unreadNotif div {
            margin-top: 0px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: space-between;
            height: 100%;
          }

          .unreadBolt {
            color: red;
            /* scale svg */
            display: inline-block !important;
            height: 15px !important;
            padding-left: 10px;
            padding-bottom: 0.5rem;
          }

          .unreadBolt img {
            /* scale svg */
            width: 18px !important;
          }

          .unreadNotifc {
            display: inline-block !important;
            margin-top: -10px;
            font-weight: bold;
            font-family: 'Roboto Mono';
          }

          .rooms_btn {
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
            width: 18.75rem;
            margin: 0 auto;
            z-index: 10;
            text-align: center;
            color: white;
            /* font-smooth: never !important; removed  on latest css standard
      -webkit-font-smoothing : none !important;  */
            position: absolute;
            right: 0;
            left: 0;
            font-size: 1.25rem;
          }

          .rooms_icon {
            /*text-shadow: -5px 5px 5px #000;*/
            color: white;
            position: absolute;
            right: 18px;
            top: 51px;
            z-index: 100;
            display: flex;
            align-items: center;
          }

          .rooms_icon span {
            display: flex;
            align-items: center;
          }

          .rooms_icon span:nth-child(1) {
            font-size: 0.625rem !important;
            font-weight: normal !important;
          }

          @font-face {
            font-family: Stolzl Display;
            font-weight: bold;
            src: url('/public/Stolzl_Display_Medium.otf') format('opentype');
          }

          .mascot-text {
            margin-top: 2em;
            font-weight: 500;
            font-size: 18px;
            // text-align: center;
            font-family: stolzl;

            font-style: normal;
          }

          .mascot-div {
            z-index: 20;
            position: absolute;
            left: 12px;
            top: 0.1em;
            display: flex;
            flex-direction: column;
            align-items: center;
            cursor: pointer;
          }

          // @media screen and (min-width: 40em) {
          //   .mascot-div {
          //     margin: 0.4375em auto 0 1rem;
          //   }

          //   .tab-container {
          //     right: 0px;
          //   }
          // }
          .mascot-div img[alt='areabox'] {
            height: 80px;
            width: 80px;
          }
          .header-div {
            position: sticky;
            top: 0px;
            z-index: 10;
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            margin: 0 auto;
          }
        `}
      </style>
    </>
  );
};

export default header;
