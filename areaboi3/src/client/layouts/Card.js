import React from 'react';
import Head from 'next/head';
// import { Head } from "next/document";

export default () => (
  <header className="layout-header">
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1, maximum-scale=1, width=device-width, minimal-ui"
      />
      {/* <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0="
        crossOrigin="anonymous"
      /> */}
      <style>{`
        body {
          color: white;
          background-color: rgba(32, 9, 59, 0.1);
          overflow-x:hidden;
          margin:0;
        }

        .layout-header { 
          display:none; 
          height:0px;
        }
        
        .app-container {
          display: flex;
          flex-direction: column;
          height: 100vh;
        }
  
        .app-container > * {
          flex: 1 1 auto;
        }

        .app-container > section {
          padding-top: 6.3em;
        }

        a {
          text-decoration: none;
          cursor: pointer;
          word-wrap:break-word;         
          font-size:80%;
          color: #ffffaa;
        }

        iframe {
          width:100%; 
          height:100%;
        }

        blockquote{
          width:100%; 
        } 

        #demarcator-container {
          width: 100%;
          display: flex;
          justify-content: center;
        }

        #demarcator-container img {
          width: 15px;
        }

        .sub-button {
          border: 0.5px dotted #FFFFFF;
          font-size: 0.625rem;
          margin-left: 13px;
          text-align: center;
          padding: 4px;
        }

        .tit {
          margin: 4px !important;
          font-family: "Noto Sans JP Bold", sans-serif;
          font-weight: bolder;
          line-height: 1.4;
          /* font-size: 0.875rem; */
          font-size: 0.78rem !important;
        }
      
        .msg--them {
          margin-left: 10px !important;
          justify-content: flex-end;
        }
      
        .avatar-right {
          margin-left: 2px;
        }
      
        .avatar-right {
          margin-left: 2px;
        }
      
       .messages > .msg--them {
          justify-content: flex-end;
        }
      
        .msg--me a {
          color: #0B0061;
        }

        .msg--me .webtexts {
          color: #4233B5;
        }
      
        .msg--them a {
          color: #20093B;
        }

        .msg--them .webtexts {
          color: #5D3189;
        }
      
        .msg--me > a {
          max-width:50px;
        }

        .msg--them > a {
            max-width:50px;
        }
        
        .boxBtn { 
          width:15px;	
          display: inline-block;	
          vertical-align:middle;	
        }
        
      .msg--me blockquote {
        color: #0B0061;
      }
      
      .msg--them blockquote {
        color: #20093B !important;
      }
      
        .msg--me .toolbar-post {
          color: #ffffff;
          background-color: #0B0061;
        }
      
        .msg--them .toolbar-post {
          color: #ffffff;
          background-color: #20093B;
        }
        
        .favicon {
          margin: 3px;
          display: block;
        }
      
       .msg-tag-link {
          margin-left: 7.5px;
          background: rgba(11, 0, 97, 0.15);
          padding: 0 1px;
          font-size: 0.8rem;
          font-weight: bolder; 
          height: 1.19rem;
        }
      
        @keyframes more-anim {
          from {opacity: 0;}
          to {opacity:0.6; }
        }
      
      @keyframes login-anim {
          from {opacity: 0;}
          to {opacity:1; }
        }
        
      .date {
        font-size:0.6rem;
        padding-right:5px; 
        font-family: 'Roboto Mono' !important;
      }

      .strikeout {
        line-height: 1em;
        position: relative;
      }
      
      .strikeout::after {
        border-bottom: 0.1em solid white;
        content: "";
        left: -2px;
        margin-top: calc(0.125em / 2 * -1);
        position: absolute;
        right: 0.2rem;
        top: 50%;
      }
      
      .center-img {
      display: block;
      margin-left: auto;
      margin-right: auto;    
      width: 100%;  
      hight: auto;
      }

        #card-iframe {
          height: inherit;
        }
  
  html, body {
    // height: 100%;
    // font: 100%/1.5em "Varela Round", sans-serif;
  }

  blockquote {
      margin: 0;
      max-width: 100%;
  }	

  blockquote div.weblink-container {
    margin: 0 0.2em;
  }
  
  blockquote img {
      max-height: 90%;
      width: auto;
      margin: 0.15em;
	    max-width:100%;	
  }
  blockquote video {
      max-height: 90%;
      width: auto;
      margin: 0.15em;
  }
  blockquote .photopopup {
      max-height: 90%;
      width: auto;
      margin: 0.15em;
  }
  blockquote .ejs-embed {
      max-height: 90%;
      width: auto;
      margin: 0.15em;
  }

  .msg-time {
    display:none;
  }
  .chat-me {
    display:none;
  }

  
  
        /* FROM AREABOI_WEB */
        //* Card styles */
        .tit {
          margin: 4px !important;
          font-family: "Noto Sans JP Bold", sans-serif;
          font-weight: bolder;
          line-height: 1.4;
          font-size: 0.875rem;
        }

        .webtexts {
	        font-style: normal;
          font-size: 0.78rem !important;       
	        padding: 0 7px;
          display: inline-block;
        }

        .user-content {
          margin: 0 5px;
          font-size: 0.75rem;
        }
        
        div br {
          display: inline;
        }

        .weblogo {
          -webkit-user-select: none !important; 
          cursor: -webkit-zoom-in !important;
          /*max-width:33% !important; 
          max-height:100px !important;*/
          max-width: 100% !important;
          overflow: hidden;
          -moz-border-radius: 5px;
          -webkit-border-radius: 5px;
          border-radius: 5px; 
          -khtml-border-radius: 5px; 
          display: block;
        }
        /* embedjs */
        iframe {
          border-width:0;
        }

        .ejs-video-desc{
          font-size:small;
        }

        .ejs-video-stats{
          visibility: hidden;
        }
        
        .grey-link {
          word-break: break-all;
          visibility: hidden;
          content:' ';
          display: none;
        }
        .card-link {
          word-break: break-all;        
          max-height: fit-content;
          overflow: hidden;
          text-overflow: ellipsis;                    
        }
        .card-link :after { 
          content: ' .. '
        }
        .photopopup {
          max-height: 10em;
          overflow: hidden;
        }
        .photopopup :after { 
          content: '<hr>'
        }
        .ejs-embed {
          max-height: 10em;
          overflow: hidden;
        }
        .ejs-embed :after { 
          content: '<hr>'
        }
      `}</style>
    </Head>
  </header>
);
