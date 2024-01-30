import React from 'react';
import Head from 'next/head';
// import { Head } from "next/document";
const MsgList = () => (
  <header className="layout-header">
    <Head>
      <meta
        name="viewport"
        content="initial-scale=1, maximum-scale=1, width=device-width, minimal-ui"
      />
      <meta httpEquiv="Pragma" content="no-cache" />
      {/* <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/4.7.0/css/font-awesome.min.css"
        integrity="sha256-eZrrJcwDc/3uDhsdt61sL2oOBY362qM3lon1gyExkL0="
        crossOrigin="anonymous"
      /> */}
      <style>{`
  @font-face{
    font-family: RobotoMono;
    src:url("static/fonts/Roboto_Mono/RobotoMono-Regular.ttf");
  }
  @font-face{
    font-family: RobotoMonoBold;
    src: url('static/fonts/Roboto_Mono/RobotoMono-Bold.ttf');
  }
  @font-face{
    font-family: Noto_Sans_JP;
    //src:url("static/fonts/Noto_Sans_JP/Noto_Sans_JP_Medium_500.otf")
    src:url('static/fonts/Noto_Sans_JP/NotoSanJP-Regular-Alphabetic.ttf');
    //src:url('static/fonts/Noto_Sans_JP/NotoSansJP-Bold-Alphabetic.eot');
  }
  @font-face{
    font-family: BarlowRegular;
    src: url("static/fonts/barlow/Barlow-Regular.ttf");
  }
  @font-face{
    font-family: BarlowExtraBold;
    src: url("static/fonts/barlow/Barlow-ExtraBold.ttf");
  }
  @font-face{
    font-family: BarlowBold;
    src: url("static/fonts/barlow/Barlow-Bold.ttf");
  }
  @font-face{
    font-family: ZillaSlabHighlight-Bold;
    src: url("static/fonts/ZillaSlabHighlight-Bold.ttf");
  }
  
  @font-face{
    font-family: Stolzl;
    src: url("static/fonts/Stolzl_Display_Medium.ttf");
 
  }
 

 

  * {
    box-sizing: border-box;
  }
  
  *:before,
  *:after {
    box-sizing: inherit;
  }

	html, body {
	 height: 100%;
	 font: 100%/1.5em "Open Sans";
         /*"Varela Round", sans-serif;*/
   margin:0px;
   scroll-behaviour: smooth;
	}
	#__next {
	  /*background-color:black;*/	
	  color: #efece5;/* white */
          // background-color: rgba(242, 220, 252, 0.1);/* black;*/
	  height:100%;
	}
	#__next > div {
	  height:100%;
	}
	#__next > div > div {
    color: black;
	  height:100%;
	}

        .layout-header { 
          display:none; 
          height:0px;
        }
        
        body {
          color: black;/* white */
          // background-color: rgba(242, 220, 252, 0.1);/* black;*/
	       margin: 0px auto;
        }

        a {
          text-decoration: none;
          cursor: pointer;
          word-wrap:break-word;         
          /*font-size:80%;*/
          color: white;  /*#ddd */
        }
        
        a .no_link {
          font-size:100% ;
        }

        .header {
    position: fixed;
	  z-index:9999;
    transition: top 0.3s;
	}
        
.hide-header {
  top: -58px;
}

.show-header {
  top: 0;
}

        /* FIXED-NAV-BAR */
      .fixed-nav-bar {
        z-index: 9999;
        height: 87px;                 
        border-bottom:1px solid #777;
	      font: 20px  "ScriberStencil", sans-serif; /* 120%/1.5em */
	      margin: 0px auto;	
        max-width: 768px;
        width: 100vw;
        min-width: 360px;
        }
        
        ol, ul {
          list-style: none outside none;
          padding: 0;
          margin: 0;
      }

      

      .add-channel {
        align-items: center;
      }

      .channel-icon {
        // width: 24px;
        // height: 24px;
        padding-top: 0.9rem;
        margin-left: 5px;
      }

      .channel-icon img {
        height: 40px !important;
        width: 40px !important;
      }

      /* New room creator styles */
      .newRoom-container {
        display: flex;
        flex-direction: column;
        background: #fcfcfb;
        border-radius: 0px !important;
        font-family: "Noto Sans Jp", Helvetica;
        min-width: 330px
        width: 97%;
        position: relative;
      }

      .newRoom-container--close {
        position: absolute;
        top: -18px;
        right: 0;
        font-size: 2rem;
        z-index: 2;
        color: black;
      }

      .newRoom-conversation {
        padding-top: 20px;
        margin-left: 6px;
        margin-right: 6px;
      }

      .newRoom-conversation--child {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 0.5rem;
        background: #ffffff;
        height: 4.375rem;
      }

      .newRoom-conversation--desc:before {
        content: "";
        position: absolute;
        border:  1px dotted rgba(255, 255, 255, 0.3);
        top: -0.25px;
        bottom: -0.25px;
        left: -0.25px;
        right: -0.25px;
      }

      .newRoom-conversation--desc {
        color: #ffffff;
        position: relative;
        font-size: 0.625rem;
        line-height: 12px;
        background: #000000;
        margin-top: 6px;
        padding: 2.3px;
        font-family: "Roboto Mono", Sans-serif
      }

      .newRoom-conversation--child > img {
        position: absolute;
        right: 2.5%;
        top: 25%;
        width: 35px;
      }

      .newRoom-conversation--input {
        border: 0.5px dotted #000; /* #c7c7c7; */
        font-size: 1.375rem;
        color: rgba(0,0,0,1);
        position: absolute;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        background: transparent;
        padding-left: 12px;
        padding-right: 38px;
      }

      .newRoom-conversation--input::placeholder {
        font-size: 1.375rem;
        color: rgba(0,0,0,0.5);
      }

      .newRoom-messaging {
        margin-top: 3.5rem;
        margin-left: 6px;
        margin-right: 6px;
      }

      .newRoom-messaging--child, 
      .newRoom-channel--child {
        display: flex;
        border-bottom: 1px solid #000; /* #8e8e8d; */
        color: #000000;
        height: 4.6875rem;
        position: relative;
        background: transparent;
      }

      .newRoom-messaging--child > img, 
      .newRoom-channel--child > img {
        margin-left: 7px;
        width: 32px;
      }

      .newRoom-messaging--subchild,
      .newRoom-channel--subchild {
        display: flex;
        flex-direction: column;
        justify-content: center;
        width: 205px;
        position:absolute;
        top:50%;
        left:50%;
        -webkit-transform:translate(-50%, -50%);
        transform:translate(-50%, -50%);
      }

      .newRoom-messaging--title, 
      .newRoom-channel--title {
        font-size: 1.125rem;
        line-height: 26px;
        padding: 0;
      }

      .newRoom-messaging--desc, 
      .newRoom-channel--desc  {
        font-size: 0.75rem;
        line-height: 17px;
        padding: 0;
      }

      .newRoom-channel {
        margin-top: 3.5rem;
        margin-left: 6px;
        margin-right: 6px;
        padding-bottom: 6px;
      }

      .newRoom-mini--container {
        padding-bottom: 6px;
        border: 1px solid #000; /* #8e8e8d; */
      }

      .newRoom-name {
        padding-top: 20px;
        margin-left: 6px;
        margin-right: 6px;
      }

      .newRoom-name--child {
        display: flex;
        position: relative;
        align-items: center;
        justify-content: space-between;
        padding: 0.8rem 0.5rem;
        background: #ffffff;
        height: 3.75rem;
        border: 0.5px solid #000;
      }

      // .newRoom-name--desc:before {
      //   content: "";
      //   position: absolute;
      //   border:  1px dotted rgba(255, 255, 255, 0.3);
      //   top: -0.25px;
      //   bottom: -0.25px;
      //   left: -0.25px;
      //   right: -0.25px;
      // }

      .newRoom-name--desc {
        display: flex;
        justify-content:space-between;
        color: #ffffff;
        position: relative;
        font-size: 0.625rem;
        line-height: 12px;
        background: #000000;
        height: 37px;
        padding: 2.3px;
        font-family: "Roboto Mono", Sans-serif
      }

      .newRoom-name--desc p {
        font-family: Roboto Mono;
      }

      .newRoom-name--desc img {
        margin-right: 8px;
      }

      .newRoom-name--child > img {
        position: absolute;
        right: 2.5%;
        top: 50%;
      }

      .newRoom-name--input {
        border: 0 solid transparent;
        font-size: 1rem;
        color: rgba(0,0,0,1);
        position: absolute;
        height: 38px;
        left: 0;
        right: 0;
        bottom: 0;
        width: 100%;
        background: transparent;
        padding-left: 12px;
        padding-right: 38px;
      }

      .newRoom-name--input::placeholder {
        color: rgba(0,0,0,0.5);
      }

      .newRoom-name--error {
        color: #FF1800;
        font-size: 0.625rem;
        position: absolute;
        right: 1.5%;
        top: 0;
      }

      .newRoom-name--title {
        font-weight: bold;
        font-size: 1.25rem;
        color: #FFFFFF;
        position: relative;
        margin-bottom: 17px;
      }

      .newRoom-name--title p {
        font-family: ScriberStencil, sans-serif;
        position: absolute;
        top: 5%;
        padding-left: 10px;
      }

      .newRoom-skip {
        font-family: "Roboto Mono", Helvetica, sans-serif;
        font-size: 0.625rem;
        color: #000;
      }

      .newRoom-skip span {
        display: flex;
        align-items: center;
        justify-content: center;
      }

      .newRoom-skip p {
        margin-left: 0 !important;
        margin-right: 0 !important;
      }

        #rooms_list {
           font: 1.1rem  "ScriberStencil", sans-serif;/*120%/1.5em*/
           display: flex;
           flex-direction: column;
           border: 0;
        }
        
        .rooms_item {
              
              padding-bottom: 3px;
              display: flex;
              align-items: center;
              height: 2.2rem;
              background-image: linear-gradient(to right, white 33%, rgba(255,255,255,0) 0%);
              background-position: bottom;
              background-size: 5px 1px;
              background-repeat: repeat-x;
        }

        .rooms_item:nth-child(1) {
          border: 1px solid rgba(255, 255, 255, 0.5);
        }

        .rooms_item:nth-child(2) {
          border-top: 0;
        }

        .rooms_item > span:nth-child(1) {
          margin-right: 3rem;
          // padding-left: 15px;
        }
        
        .rooms_item > span:nth-child(2) {
          padding-right: 10px;
          text-align: right;
          width: 100%;
          white-space: nowrap;
          overflow: hidden;
          text-overflow: ellipsis;
          resize: horizontal;
        }
        .rooms_item > span:nth-child(2) > a {
          color: white;
        }
        
        .rooms_item .rooms_notif {
          // height: 13px;
          // font-size: 42%;
          padding: 0 3px 3px 3px;
        }
        
        .rooms_item .rooms_notif {
          margin-left: 0 !important;
        }

        .rooms_item .rooms_notif img {
          // height: 15px;
        }

        .rooms_item .rooms_notif .unreadNotifc {
          padding-left: 6px;
        }


       /* .fixed-footer {
          position: fixed;
          bottom: 0;
          left: 0;
          z-index: 9999;
          opacity:1;            
          width: 100%;
          background-color: black;    
          display: table;
          border-top:1px solid #fff606;
        }*/
        
        .input-footer-closed {
          width: 100%;    
	      background-color: white;     
        }


	.profile { padding-top: 0px; }

	.avatarsList {
		display: inline-block;
	}

	.msg--input {
    width:100%;
    padding-bottom: 8px;
	}

  .msg--input > div:nth-child(1) {
    margin: 0 auto;
  }

        
        .input-div td:nth-child(2) {

        }
        
        .input-div-hint {
          text-align: left;
          margin:0 auto;
          width: 100%;
          height: 100%;
          text-size: small;
        }

	.cell-plus {
		width:20px !important;
	}


	.cell-add {
		border: 2px solid silver;
	}
	.cell-add-1 {
		width: 20px !important;
		border-right: none  !important;
	}
	.cell-add-2 {
		border-left: none  !important;
	}
	.cell-plus span {
		font-size:150%;
		font-weight:bold;
	}

	
	table {border-spacing: 0px;}
	table {border-collapse: collapse;}
	td    {padding: 0px;}
	textarea {
    resize: none;
    margin: 0;
    padding: 0;
	border:0;
	display:inline-block;
	vertical-align:middle;
	white-space:normal;
	line-height:1;

	}
	button {
	    background-color: transparent;
        cursor: pointer;
        border-radius: 0;	
        padding: 0;
	}

	button > img,
button > span {
  vertical-align: middle;
}
        
.input-div {
  position: relative;
  display: flex;
  flex-direction: column;
  padding: 0 0.05rem;
  width: 98%;
  margin: 2 auto;
}


#inputarea {
  align-items: center;
  display: flex;
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
   
   z-index: 5;
   width: 100%;
   height: 50px;
   margin-left: auto;
   -webkit-transition: all .3s ease;
   -moz-transition: all .3s ease;
   -o-transition: all .3s ease;
   -ms-transition: all .3s ease;
   transition: all .3s ease;
}

 #attacharea > .input_btn_container {
  flex: 1;
}


.input_btn {
  display: flex;
  align-items: center;
  position: relative;
  // border-top: 0;
  // border-right: 0;
  // border-left: 0;
  // border-bottom: 1px solid black;
  border:none;
  background-color: transparent;
  height: 2.3rem;
  font-size: 0.85rem;
  width: 100%;
  pointer-events: auto;
  font-family: "Noto Sans JP";
}

.input_btn > span {
  position:absolute;
  top:50%;
  left:50%;
  -webkit-transform:translate(-50%, -50%);
  transform:translate(-50%, -50%);
}

.input_btn_container {
  border: 1px solid #adacac;
  padding-bottom: 2px;
  pointer-events: none;
}

.input_btn_plus {
  font-size: 2.5rem;
  font-weight: bolder;
  padding-right: 0.3rem;
  flex: 1;
  transition: all .3s;
}

.input_btn_plus span {
  color: black;
}

.input_btn_icon {
  width: 26px;
  height: 26px;
  float: left;
}

.input_btn_icon:not(:nth-child(2)) {
  padding-left: 6px;
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
      /* padding-bottom: 8px; */
      border: 1px solid rgba(0, 0, 0, 0.3);
      font-family: "Noto Sans JP";
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

	.cell-msg-text {
		  border: 2px solid silver;
		padding-right: 10px;
	}
                
        .footer_btn {
          height: 100%;      
          vertical-align: middle;
          background-color: transparent;
          color: #FFF606 !important; /*blue 0da9ff*/
    		/*top: -22px;*/
    		position: relative;
    		color: white;
		// padding-left: 5px;
        }
        
  
        .header-div {
          position: absolute;
    	  top: 0px;
    	  z-index: 10;
	  width: 100% ;
	}



@media (hover:none), (hover:on-demand) { 
  /* custom css for "touch targets" */
  body {
        width: 100%;
  } 
  .header-div {
	
  }
  .messages {
  width: 100%;
  -webkit-overflow-scrolling: touch;
	// min-height:70%;
  margin-top: 4px;

  // height: 100%;
  // overflow: auto;
  // padding-bottom: 90px;
  }
  .desktop {
	display:none;
  } 
  .no_notif p a {
    max-width: 140px;
    text-overflow: ellipsis;
    display: inline-block;
    overflow: hidden;
    height: 20px;	
  }   
  #rooms_list {
	/*padding-top: 700px;*/
  }
}

@media (hover:hover) { 
  /* custom css for desktops */
  body {
        /*min-width: 500px;*/
	// max-width: 1024px;
  } 
 .header-div {
	/*min-width: 500px;*/
	// max-width: 1024px;
  }
  
  .fixed-nav-bar {
	/*min-width: 500px;*/
	// max-width: 1024px;
  }
  .mobile {
	display:none;
  }
  
   #rooms_list {
	/*padding-top: 500px;*/
  }
}
        
       
.main_header {
  width: 100vw;
  height: 60px;
  background-color: #fff606;
  position: relative;

  max-width: 768px;
  min-width: 360px;
}

  .tab-container {
  display: flex;
    // color: #000000;
    align-items: stretch;
    position: absolute;
    bottom: 0;
    right: 0;
  }

  .tab {
  background: #1505CC;
  border: 1px solid #ffffff;
  color: white;
  font-size: 12px;
  flex: 1;
  text-align: center;
  font-family: "Noto Sans JP";
  padding: 3px 7px;
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
          -webkit-transition: all .3s ease;
          -moz-transition: all .3s ease;
          -o-transition: all .3s ease;
          -ms-transition: all .3s ease;
          transition: all .3s ease;
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
           border: 1px solid #FFF606;
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
          border: 1px solid #FFF606;
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
  background-color: black;
  /*margin:0 auto;*/
  border-bottom:1px solid #777;          
  text-align: center;
  vertical-align: middle;
  border-top: 1px inset #777;
  display: flex;
  align-items: center;
  height:30px;
  position: relative;
  max-width: 768px;
  width: 100vw;
  min-width: 360px;
}


	.sub_header .notif {
          padding-left: 130px;
        }

	.sub_header a {
        }

	.unreadNotif {
	    font-size: 48%;
	    line-height: 0.5;
      display: inline-block; 
      height: 1.8rem;
      width: 3rem;	
      padding-top: 0;
    }

	  .unreadNotif div, .unreadMention-container {
      margin-top: 0px;	
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: space-between;
      height: 100%;
    }	

    .unreadMention-container {
      font-size: 48%;
      line-height: 0.5;
      height: 1.8rem;
      margin-top: 0px !important;
      width: 3rem;
      padding-top: 0;
    }

    .unreadMention-container .unreadNotifc {
      padding-left: 12px;
    }
    
	  .unreadBolt {
		  color:red;
	    /* scale svg */
	    
	    
	  }

	  .unreadBolt img, .unreadMention img {
	    /* scale svg */
	    
	  }

	  .unreadNotifc {
      display: inline-block !important;
      margin-top: -10px;
      font-weight:bold;
      font-family: 'Roboto Mono';
	   }

    .rooms_btn {
        white-space: nowrap; 
        overflow: hidden;
        text-overflow: ellipsis;
        margin: 0 auto;
        z-index:10;
      
        text-align: center;
        color:white;
        /* font-smooth: never !important; removed  on latest css standard
        -webkit-font-smoothing : none !important;  */

        position: absolute;
        right: 0;
        left: 0;
    }
	
    .signout {
      /*text-shadow: -5px 5px 5px #000;*/
      position:absolute;
      right:10px;
      top:60px;
      z-index:100;
      display:block;
      
    }
    .rooms_icon {
      /*text-shadow: -5px 5px 5px #000;*/
      position:absolute;
      right:18px;
      z-index:100;
      // display:block;
    }

/* Toggle Button */
.toggle-container {
  position:absolute;
		right:5px;
    top:53px;
    z-index: 100;
    display: flex;
    align-items: center;
    height: 50px;
}

.switch {
  position: relative;
  display: inline-block;
  width: 25px;
  height: 14px;
  transform: rotate(90deg);
  border: 1.5px solid #fff;
}

.switch input { 
  opacity: 0;
  width: 0;
  height: 0;
}

.slider {
  position: absolute;
  cursor: pointer;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background-color: #000;
  -webkit-transition: .4s;
  transition: .4s;
}

.slider:before {
  position: absolute;
  content: "";
  height: 11px;
  width: 11px;
  left: 0px;
  bottom: 0px;
  background-color: white;
  -webkit-transition: .2s;
  transition: .2s;
}

/*input:checked + .slider {
  background-color: transparent;
}

input:focus + .slider {
  box-shadow: 0 0 1px rgba(255, 247, 6, 0.596);
}*/

input:checked + .slider:before {
  -webkit-transform: translateX(11px);
  -ms-transform: translateX(11px);
  transform: translateX(11px);
}

.toggle-texts {
  font-family: 'Roboto Mono';
  text-align: left;
  display: flex;
  flex-direction: column;
}

.toggle-texts p {
  font-size: 0.6rem;
  color: rgba(255,255,255, 0.8);
  text-align: left;
  margin: 0; 
  padding: 2px;
}

	.signout span {
		opacity:1.0;
		/*background-color: black;*/
		/*font-weight:bold;*/
	}
	.signout img {
		width: 20px;
	}


	.signout-footer {
		z-index:100;
    display:inline-block;/*important for v-align*/
    font-family: "Noto Sans JP";
    font-weight: normal;		
	}

	.signout-footer span {
		opacity:1.0;
		/*background-color: black;*/
		font-size:60%;
	}
	.signout-footer img {
		width: 16px;
		margin: 0;
		vertical-align: middle;
		padding-top:2px;
	}

	.sub_header_footer {
    width:100%;
    // height:30px !important;
    margin:0 auto;
    vertical-align: middle;
  }

  @font-face {
    font-family: Stolzl Display;
    font-weight: bold;
    src: url("/public/Stolzl_Display_Medium.otf") format("opentype");
  }

  .mascot {
    font-weight: 500;
    font-size: 10px;
    text-align: center;
    font-family: Stolzl;
    font-style: normal;
    position: relative;
  }
  .mascot-div {
    z-index: 20;
    position: absolute;
    top: 0.1em;
    left: 12px;
    display: flex;
    flex-direction: column;
    align-items: center;
    cursor: pointer;
  }

  @media screen and (min-width: 40em) {
    .mascot-div {
      // margin: 0.4375em auto 0 1rem;
    }

    .tab-container {
      right: 0px;
    }
  }
  .mascot-div img[alt='areabox']{
    height: 40px;
    width: 40px;
  }  
  
        .footer {
	  /*font: 120%/1.5em "Open Sans", sans-serif;*/
    /* display:none; */
    
	}


	.chat-me {
	 display:none;
	}
	.msg-time {
	 display:none;
	}
        
        .maximize-post {
          position: absolute;
          top: 530pt;
	        /*bottom: 30px;*/
          right: 0;
          width:100%;
          height: 27pt;
          text-align: right;
          opacity: 0.6;
          animation-name: more-anim;
          animation-duration: 5s;
          font-weight: bold;   
          font-size: 25pt;   
	        /*display:none;*/ 
	        padding-bottom:0px;
        }

	#signin {
          animation-name: login-anim;
          animation-duration: 30s;
	  color: yellow;
	  text-shadow: 0 2px 2px green;
    font-weight:bold;
    font-family: "Noto Sans JP";
	  font-size:125%;
        }
	#signin:hover {
		text-shadow: 0 3px 3px green;
	}

	// .msg--me {
  //           margin-right: 10px !important;
	//        display: flex;
	//     // clear:both;	
  //       }
	

	.msg--them {
          margin-left: 10px !important;
	  justify-content: flex-end;
        }

        .maximize-button {
        //   display: inline;
        // float: right;
        width:10px;
        height: 10px;
        }

        .nameAva-container {
          display: flex;
          flex-direction: column;
          // margin-top: -25px;
          align-items: center;
        }

	.avatar {
	      display: flex;	
		/*width:100%;*/
		object-fit: scale-down;
      height: 30pt;
      margin-right: 2px;
        }
        
        .avatar-right {
          margin-left: 2px;
        }
  
       .messages-container > div:nth-child(1) {
          // background-color: rgba(242, 220, 252, 0.1);
          //padding-bottom: 1rem;
        }


        .msg {
          margin-bottom: auto;
          /*margin-left: auto;
          margin-right: auto;*/
          
        }

        .msg .msg-main {
          position: relative;
          margin: 0;
          text-overflow: ellipsis;
          
          overflow: hidden;
          
	        background-color: #1505cc;
          // width: calc(100% - 60px);
          // direction: rtl;
        }

        .msg blockquote:not(.date) {
          font-family: "Noto Sans JP";
        }

        .msg, .messages > .msg--me {
          display: flex;
          // align-items: center;
          width: inherit;
        }

      .messages > .msg--them {
        justify-content: flex-end;
      }

        msg.msg--me +
        msg.msg--them,
        msg.msg--them +
        msg.msg--me {
          margin-top: 1.3rem;
        }
        
        .msg--me:not(.msg--them) +
        .msg--me:not(.msg--them),
        .msg--them +
        .msg--them {
          margin-top: 10px;
        }

        .msg--me .maximize-post {
            /*background-color: #0099cc;*/
        }
        .msg--them .maximize-post {
            /*background-color: white;*/ /* #dd9951 */
        }

        .msg--me a {
           /* #b584e6; */
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
        
        .toolbar-post {
          background-color: #20093B;
          width:inherit;
          /*text-align: center;*/
          opacity: 0.95;
          animation-name: more-anim;
          animation-duration: 3s;
          font-weight: bold;  
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
    white-space: nowrap
  }
  .toolbar-text-container {
    display: flex;
    align-item: center;
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
		// color:#20093B; /* to hide react 0*/
  }
  .reactions {
    width: 60%;
    margin-left: 50px;
    margin-right: -10px;
    text-align: right;
  }
	.msg--me .toolbar-btns {
    		// width:60px;	
	}
	.msg--them .toolbar-btns {
		// width:80px;

	}
        .boxBtn{ 
	  width:15px;	
	  display: inline-block;	
	  vertical-align:middle;	
 	}
        
        .msg--me .toolbar-post {
       color: #ffffff;
       background-color: #0B0061;
        }
        .msg--them .toolbar-post {
       color: #ffffff;
       background-color: #20093B;
        }
        
        /*moves favicon to left and adds padding to content */
        .favicon {
          margin: 3px;
          display: block;
        }

        .tags-container {
          display: block;
        }

	     .msg-tag-link {
          margin-left: 5px;
          background: rgba(256, 256, 256, 0.2);
          padding: 0 1px;
          
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

      /* Based on https://stackoverflow.com/questions/2539207/how-to-change-the-strike-out-line-through-thickness-in-css */
      .strikeout {
        
        position: relative;
        &:after {
          content: "";
          left: -2px;
          margin-top: calc(0.125em / 2 * -1);
          position: absolute;
          right: 0.2rem;
          top: 50%;
        }
      }
      // .strikeout::after {
      //   //border-bottom: 0.1em solid white;
      //   content: "";
      //   left: -2px;
      //   margin-top: calc(0.125em / 2 * -1);
      //   position: absolute;
      //   right: 0.2rem;
      //   top: 50%;
      // }
	  
	  .center-img {
      display: block;
      margin-left: auto;
      margin-right: auto;    
      width: 100%;  
      hight: auto;
	  }
      
      /*Register*/
      ::-webkit-input-placeholder { /* Chrome/Opera/Safari */
        color: #777;
      }
      ::-moz-placeholder { /* Firefox 19+ */
        color: #777;
      }
      :-ms-input-placeholder { /* IE 10+ */
        color: #777;
      }
      :-moz-placeholder { /* Firefox 18- */
        color: #777;
      }
    

  
  p {
    margin: 0 auto;
    padding: 10px;
  }
  .header,.msg {
      /*display: flex;*/
  }

  .header {
      color: white;
      padding-right: 0;
  }

  .messages {
      // background-color: rgba(242, 220, 252, 0.1); /* #efece5; */ /* black */  
    /*flex: 1; */
    /*margin-bottom: 2.5em;*/
    margin-top: 8em;
    /*padding-top: 95px; for fixed header */
  }

  .strikeout {
        
    position: relative;
    // text-decoration: line-through;
    &::after {
      content: "------";
      left: -2px;
      margin-top: calc(0.125em / 2 * -1);
      position: absolute;
      right: 0.2rem;
      top: 0;
      font-weight: 700;
      color: crimson;
    }
  }
  // .strikeout::after {
  //   //border-bottom: 0.1em solid white;
  //   content: "";
  //   left: -2px;
  //   margin-top: calc(0.125em / 2 * -1);
  //   position: absolute;
  //   right: 0.2rem;
  //   top: 50%;
  // }
  
/*
  .messages div {
    clear: both;
  }
*/

  .timestamp {
    font-size: 0.8rem;
    font-weight: 600;
    display:table;
    margin:0 auto;
    position: sticky;
    background: rgba(255, 255, 255, 0.9);
    padding: 1px 4px;
  }

  .msg--date {
      margin-top: 0;
      font-size: 1em;
      font-weight: 400;
      text-align: center;
      background: #222;
      color: #727b80;
  }

  /* .strikethrough {
  //   text-decoration: line-through;
   } */

  blockquote {
      /*border-radius: .35em;*/
      position: relative;
      /*display: inline-block;
      max-height: 10em;
      overflow: hidden;           
      margin: 0;
      text-overflow:ellipsis;   
      max-height: 400pt;
      overflow: hidden;
      /*min-height: 4em;*/
      max-width: 80em;
      min-width: 15em;
      /*min-width: 20em; causes overflow on mobile */
      width: fit-content;
  }

  .msg-main > div:nth-child(1) {
          /*padding-left: 25px;*/
	      white-space: pre-wrap;
	    //  padding-bottom: 2em;
	 
  }

  .post-container {
    
    
  }

  .post-container   {
    
  }

  .post-container:hover {
    visibility: visible;
  }

  

  .post-container .date {
    font-weight: bolder;
  }

  .username-right {
    text-align: right;
  }

  .pin-container {
    margin-top: 0;
  }

  .pin-container span {
    margin-left: 3px;
  }

  .pinned {
    display: flex;
    align-items: center;
    margin-left: auto;
    color: rgba(32, 9, 59, 0.5) !important;
    position: absolute;
    left: 50%;
    right: 50%;
    font-family: "Roboto Mono";
    font-size: 0.85rem;
  }

  #demarcator-container {
    width: 100%;
    display: flex;
    justify-content: center;
  }

  .msg-main > div {
      display: inline-block;
      overflow: hidden;
      min-height: 1.5rem;
       padding: 0 0px 0.8rem 0px;
       direction: ltr;
       font-size: 0.875rem;
  }

  blockquote :not(:last-child) {
    /*width: fit-content; */  /*crashes mp3 player size */
	
  }

 
  blockquote > span {
    padding: 0px 5px 20px 5px;
	display:inline-block;
	 background-color: white;
  }	

  .input-footer-closed {
    padding-bottom: 0px !important;
  }
  .input-footer-opened {
    padding-bottom: 0px !important;
  }	
  .iframe-embeds {
    padding-bottom: 0px !important;
  }	

  .iframe-upload {
  height: 210pt;	
  width: 100%;
  overflow: hidden;
  }

  blockquote form table  {
    margin: 0px auto;
    width: 100%;
  }

  

  blockquote img.weblink {
      display: block;
      /*max-height: 12em;
      width: auto;*/
      /* width: 100%;
       max-height: 320pt; */;
      max-width: 100%;
      max-height: 100%;
      
      /*border-radius: .35em;*/
      // object-fit: scale-down;
      -webkit-filter:brightness(97%);
      -moz-filter:brightness(97%);
      filter: url(#brightness); /* required for FF */
      filter:brightness(97%);
  }

  blockquote a.weblink {
    color:black
  }

  audio {
    width: 250px;
  }

  // blockquote audio.weblink {
  //   width: 220px;
  // }

 /* to prevent text to wrap around images */ 
/*
  blockquote span {
	display:inline-block;
  }
*/

  blockquote video {
      float: left;
      max-width: 100%;
      height: auto;
      margin: 0.15em;
      border-radius: .35em;
  }
  blockquote .photopopup {
      float: left;
      max-width: 100%;
      height: auto;
      margin: 0.15em;
      border-radius: .35em;
  }
  blockquote .ejs-embed {
      float: left;
      max-width: 100%;
      height: auto;
      margin: 0.15em;
      border-radius: .35em;
  }

  blockquote .player-frame {
      float: left;
      margin: 0.15em;
      border-radius: .35em;
      width: 100%;
      height: 300pt;
  }

  .msg--them blockquote {
    /*background-color: white;*/ /* #dd9951 */
    color: #20093B !important;
  }

  .msg--me blockquote {
    /*background-color: white;*/ /*0099cc*/
    /*color: #0B0061;*/
  }
  
  .msg--them blockquote {
      order: -1;
  }

  .msg-comment blockquote {
    padding-left: 30px;
  }

  .tagsdiv {
    float: right;
  }

  .load-more {
    text-align: center;
  }
  .load-more a {
    color: black;
  }
	
  .loaded-last {
    display: none;
  }
  
  inputArea { margin:0 16 }

  /* Media Styles */
  .media {
    width: 100%;
  }
  /* Media Styles */
  .media-audio {
    min-width: 180px;
    height: 40px;
  }

  /* Embed Styles */

  #embed-container {
    width: 100%; 
    height: 100%;
  }

  #embed-container blockquote {
    margin-inline-start: 5px;
    margin-inline-end: 5px;
  }

  // #embed-container .twitter-tweet {
  //   width: 60%;
  // }
 
  #embed-container .instagram-media,
  #embed-container #instagram-embed-1 {
   width: 326px !important;
   height: 448.84px;
   overflow: hidden;
  }

  #embed-container .instagram-media,
  #embed-container #instagram-embed-1 {

  }
  
  iframe { 
      overflow: hidden; 
      border:0; 
      margin-top: 0.35em;
      width: 100%;
      height: 20rem;
   }
  .iframe-embeds { 
    height:1px; background-color:transparent; opacity:0; 
  }
  
  /*visibility: hidden; */
  // .solveEmbeds blockquote { 
  //   position: absolute;
  //   left: 0;
  //   top: 0;
  //   width: 100%;
  //   height: 100%;    
  // }
  

  /* Upload file style */
  .upload-file-container {
    width: 350px;
    height: 350px;
    position: relative;
    background: #000000;
    border: 0.5px dotted #FFFFFF;
    font-family: 'Noto Sans JP';
    text-align: center;
    padding: 15px;
  }
  
  .upload-header {
    font-size: 1.25rem;
    // text-align: center;
  }

  .upload-subheader {
    font-size: 0.75rem;
    margin-top: 0.75rem;
  }

  .uploadForm-container {
    margin: 0 auto;
    text-align: center;
  }
  
  form#uploadForm {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    height: 200px;
    margin-top: 3rem;
  }

  .upload-btn--container button {
    border: none;
  }

  .upload-btn--container button img {
    display: block;
    width: 20px;
    margin: 0 auto;
  }
  
  .filesZ-container {
    border: 1px solid #ffffff;
    padding-bottom: 5px;
    display: inline-block;
    margin-left: auto;
    margin-right: auto;
  }
  
  #file-input--label {
    border-top: 0;
    border-right: 0;
    border-left: 0;
    border-bottom: 1px solid #ffffff;
    background-color: transparent;
    font-size: 0.85rem;
    /* border: 1px solid #ffffff; */
    margin-top: 5px;
    padding: 3.5px;
    width: 100%;
    cursor: pointer;
    margin-left: auto;
    margin-right: auto;
    font-family: "Noto Sans JP", Arial, Helvetica, sans-serif;
  }
  
  .fileName {
    text-align: center;
    margin-left: auto;
    margin-right: auto;
    color: white;
    margin-top: 5px !important;
    font-size: 0.625rem;
    width: 170px;
    padding: 1px !important;
    overflow-wrap: break-word;
    word-wrap: break-word;
    hyphens: auto;
  }
  
  input[type=submit] {
    color: #FFF606;
    background: transparent;
    border: 0;
    cursor: pointer;
  }
  
  .upload-btn--container {
    display: flex;
    flex-direction: column;
    margin-top: 30px;
    font-family: 'Roboto Mono', Impact, Haettenschweiler, 'Arial Narrow Bold', sans-serif;
  }
  
  #upload-loading {
    text-align: center;
    height: 80px;
    margin-bottom: 10%;
    display:none;
  }

  .file-details {
    margin-left: 0;
    margin-right: 0;
  }

  .close-modal {
    position: absolute;
    top: 3px;
    right: 8px;
    color: white;
  }

  .close-modal img {
    width: 10px;
    height: 10px;
  }

  /* Record Audio Styles */
  .recorder-container {
    position: relative;
    width: 350px;
    height: 16rem;
    margin: 0 auto;
    background: #000000;
    border: 0.5px dotted #FFFFFF;
    padding: 15px;
  }

  .audio-react-recorder{
    text-align: center;
  }

  .recorder-container center {
    font-size: 1.25rem;
    font-family: "Noto Sans JP", Helvetica;
    color: white;
    padding-top: 20px;
  }

  .recorder-container canvas {
    margin: 2rem 0;
    padding: 0 10px;
  }

  .recorder-container--buttons {
    display: flex;
    justify-content: space-between;
    font-family: "Roboto Mono";
    font-size: 0.625rem;
    padding-left: 5px;
    padding-right: 5px;
  }

  .start-stop--container {
    display: grid;
    justify-items: center;
    cursor: pointer;
  }

  .footer_btn_close {
    margin-left: 30%;
    padding-left: 0 !important;
  }
  
  /* END */
  
        /* FROM AREABOI_WEB */
        .webtexts {
	        font-style: normal;
          font-size: 0.78rem;       
	        padding: 0 7px;
          display: inline-block;
        }

        .user-content {
          padding: 0 7px;
          font-size: 0.875rem;
        }

        div br {
          display: none;
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

        .card-link-title, .tit {
          margin: 4px;
          font-family: "Noto Sans JP Bold", sans-serif;
          font-weight: bolder;
          font-size: 0.78rem;
          line-height: 1.4;
        }

        .card-link {
          word-break: normal;     
          display: flex;
          flex-direction: column;
          min-width: 100%;       
        }

        .msg--me .card-link,
        .msg--them .card-link {
          font-size: 12.48px;
          font-weight: bolder;
        }

        
	/*.card-link :after { 
          content: ' .. '
        }
	*/

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

	/*profile*/
	.profile {
		
	}	
	.profile > .ptitle {
		font-size:120%;
	}

	.profile > p {
		width:300px;
	}
	.profile input {
		background-color:black;
		color: white;
		border: 1px solid #555;	
		padding: 0 5px;
		text-align: right;
		margin-left: 10px;
	}
	.profile img {
		border: 1px solid #555;	
		padding: 5px;
		text-align: right;
		margin-left: 10px;
	}
        
/* loading spinner on audio processing */
#loading {
  text-align: center;
  height: 80px;
  margin-top: -50px;
}

.loader {
  display: inline-block;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #fff;
  top: 50%;
  animation: loader 2s infinite ease;
   
}

.loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #fff;
  animation: loader-inner 2s infinite ease-in;
}

/* Posts loading animation */
.colorful-loader {
  display: block;
  margin: 0 auto;
  width: 30px;
  height: 30px;
  position: relative;
  border: 4px solid #000;
  top: 50%;
  animation: colorful-loader 2s infinite ease;
}

.colorful-loader-inner {
  vertical-align: top;
  display: inline-block;
  width: 100%;
  background-color: #000;
  animation: colorful-loader-inner 2s infinite ease-in;
}


@keyframes loader {
  0% {
    transform: rotate(0deg);
  }
  
  25% {
    transform: rotate(180deg);
  }
  
  50% {
    transform: rotate(180deg);
  }
  
  75% {
    transform: rotate(360deg);
  }
  
  100% {
    transform: rotate(360deg);
  }
}

@keyframes loader-inner {
  0% {
    height: 0%;
  }
  
  25% {
    height: 0%;
  }
  
  50% {
    height: 100%;
  }
  
  75% {
    height: 100%;
  }
  
  100% {
    height: 0%;
  }
}


@keyframes colorful-loader {
  0% {
    transform: rotate(0deg);
    border: 4px solid yellow;
  }
  
  25% {
    transform: rotate(180deg);
    border: 4px solid cyan;
  }
  
  50% {
    transform: rotate(180deg);
    border: 4px solid rgb(0,255,0);
  }
  
  75% {
    transform: rotate(360deg);
    border: 4px solid magenta;
  }
  
  100% {
    transform: rotate(360deg);
    border: 4px solid red;
  }
}

@keyframes colorful-loader-inner {
  0% {
    height: 0%;
    background: yellow;
  }
  
  25% {
    height: 0%;
    background: cyan;
  }
  
  50% {
    height: 100%;
    background: rgb(0,255,0);
  }
  
  75% {
    height: 100%;
    background: magenta;
  }
  
  100% {
    height: 0%;
    background: red;
  }
}

/* -------- Desktop Styles ------------ */
@media only screen and (min-width : 480px) {
  #embed-container .instagram-media,
  #embed-container #instagram-embed-1 {
   width: 438.7px !important;
   height: 599.8px;
  }

  #embed-container .twitter-tweet {
    width: 100%;
  }
}

/* Small Devices, Tablets */
@media only screen and (min-width : 768px) {
  #embed-container .instagram-media,
  #embed-container #instagram-embed-1 {
  //  width: 658px !important;
   width: 100% !important;
  //  height: 899.68px;
  height: 100%;
  }
}

/* ----------- Google Pixel ----------- */

/* Landscape */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 3) 
  and (orientation: landscape) {
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- Google Pixel 2 ----------- */

/* Landscape */
@media only screen 
  and (-webkit-min-device-pixel-ratio: 1.77) 
  and (orientation:landscape) {
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- Google Pixel 2 XL ----------- */

/* Landscape */
@media screen 
  and (min-device-width: 823px) 
  and (min-device-height: 411px) 
  and (-webkit-device-pixel-ratio: 3.5) 
  and (orientation: landscape) {
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- Google Pixel XL ----------- */

/* Landscape */
@media screen 
  and (device-width: 360px) 
  and (device-height: 640px) 
  and (-webkit-device-pixel-ratio: 4) 
  and (orientation: landscape) {
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}


/* ----------- iPhone 5, 5S, 5C and 5SE ----------- */

/* Landscape */
@media only screen 
  and (min-device-width: 320px) 
  and (max-device-width: 568px)
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) {
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- iPhone 6, 6S, 7 and 8 ----------- */

/* Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 667px) 
  and (-webkit-min-device-pixel-ratio: 2)
  and (orientation: landscape) { 
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- iPhone 6+, 7+ and 8+ ----------- */

/* Landscape */
@media only screen 
  and (min-device-width: 414px) 
  and (max-device-width: 736px) 
  and (-webkit-min-device-pixel-ratio: 3)
  and (orientation: landscape) { 
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- iPhone X ----------- */

/* Landscape */
@media only screen 
  and (min-device-width: 375px) 
  and (max-device-width: 812px) 
  and (-webkit-min-device-pixel-ratio: 3)
  and (orientation: landscape) { 
    .rooms_item > span:nth-child(2) {
      text-overflow: "";
      width: 80rem;
      overflow: visible;
    }
}

/* ----------- iPad ----------- */

@media only screen
and (min-device-width : 768px)
and (max-device-width : 1024px) { 
  .rooms_item > span:nth-child(2) {
    text-overflow: "";
    width: 80rem;
    overflow: visible;
  }
}


/* LAYOUTS */

.messages-container-cinema  {
    // flex: 1 !important;
    // flex-direction: column !important;
}

.messages-container-cinema div {
    // width: 250px !important;
    // display: inline-flex;
}


      `}</style>
    </Head>
  </header>
);

export default MsgList;
