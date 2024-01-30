//consts
var gCacheVersion = 28; //20200326; 27;//20190327
var chat_max_tags = 10;

var sites2iframe = [];
var sites2embed = [];

const sites2embedRegex = {
  a: /(((http:\/\/)?(instagr\.am\/p\/.*|instagram\.com\/p\/.*|(www\.)?instagram\.com\/p\/.*))|(https:\/\/((www\.)?instagram\.com\/p\/.*)))/i,
  b: /(((http:\/\/)?(lean-data-science\.com\/.*))|((https:\/\/)?(lean-data-science\.com\/.*)))/i,
  c: /(((http:\/\/)?(.*imgur\.com\/.*))|((https:\/\/)?(.*imgur\.com\/.*)))/i,
  d: /(((https?:\/\/)?((www\.)?flickr\.com\/photos\/.*|flic\.kr\/.*|img\.ly\/.*|giphy\.com\/gifs\/.*|gph\.is\/.*|media\.giphy\.com\/media\/.*|gist\.github\.com\/.*|play\.kotlinlang\.org\/embed#.*pl\.kotl\.in\/.*|(www\.)?slideshare\.net\/.*\/.*|(www\.)?slideshare\.net\/mobile\/.*\/.*|.*\.slideshare\.net\/.*\/.*|slidesha\.re\/.*|scribd\.com\/doc\/.*|(www\.)?scribd\.com\/doc\/.*|scribd\.com\/mobile\/documents\/.*|(www\.)?scribd\.com\/mobile\/documents\/.*|slidetosubscribe\.com\/.*|docdroid\.net\/.*|autodesk\.com\/.*|scrimba\.com\/.*|(www\.)?screencast\.com\/.*\/media\/.*|screencast\.com\/.*\/media\/.*|(www\.)?screencast\.com\/t\/.*|screencast\.com\/t\/.*|foursquare\.com\/.*|(www\.)?foursquare\.com\/.*|4sq\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|(www\.)?google\..*\/maps\/.*|google\..*\/maps\/.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|.*meetup\.com\/.*|meetu\.ps\/.*|(www\.)?wikimedia\.org\/wiki\/File.*|360\.io\/.*|jsfiddle\.net\/.*|runkit\.com\/.*|jsbin\.com\/.*\/.*|jsbin\.com\/.*|codepen\.io\/.*\/pen\/.*|codepen\.io\/.*\/pen\/.*|codesandbox\.io\/.*|codesandbox\.io\/.*|formula-embedappspot\.com\/.*|(www\.)?maprosoft\.com\/app\/map.*|app\.queezly\.com\/.*|(www\.)?figma\.com\/file\/.*|(www\.)?figma\.com\/proto\/.*|ethfiddle\.com\/.*|glitch\.com\/.*|plnkr\.co\/.*|repl\.it\/.*|.*\.tiktok\.com\/.*|tiktok\.com\/.*|.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*|blip\.tv\/.*\/.*|.*\.blip\.tv\/.*\/.*|snappd\\.tv\/.*|animoto\.com\/play\/.*|video214\.com\/play\/.*|(www\.)?schooltube\.com\/video\/.*\/.*|cinema8\.com\/.*|xtracomedy\.com\/.*|vine\.co\/v\/.*|(www\.)?vine\.co\/v\/.*|goanimate\.com\/videos\/.*|(www\.)?hulu\.com\/watch.*|(www\.)?hulu\.com\/w\/.*|(www\.)?hulu\.com\/embed\/.*|hulu\.com\/watch.*|hulu\.com\/w\/.*|hulu\.tv\/.*|(www\.)?funnyordie\.com\/videos\/.*|(www\.)?funnyordie\.com\/m\/.*|funnyordie\.com\/videos\/.*|funnyordie\.com\/m\/.*|(www\.)?vimeo\.com\/groups\/.*\/videos\/.*|(www\.)?vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*|(www\.)?ted\.com\/talks\/.*\.html.*|(www\.)?ted\.com\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/talks\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|wordpress\.tv\/.*\/.*\/.*\/.*\/|(www\.)?traileraddict\.com\/trailer\/.*|(www\.)?traileraddict\.com\/clip\/.*|(www\.)?traileraddict\.com\/poster\/.*|khanacademy\.org\/.*|(www\.)?khanacademy\.org\/.*|(www\.)?lynda\.com\/.*|lynda\.com\/.*|(www\.)?facebook\.com\/photo\.php.*|(www\.)?facebook\.com\/video\.php.*|(www\.)?facebook\.com\/.*\/posts\/.*|fb\.me\/.*|(www\.)?facebook\.com\/.*\/photos\/.*|(www\.)?facebook\.com\/.*\/videos\/.*|fb\.com|cnbc\.com\/id\/.*\?.*video.*|(www\.)?cnbc\.com\/id\/.*\?.*video.*|cnbc\.com\/id\/.*\/play\/1\/video\/.*|(www\.)?cnbc\.com\/id\/.*\/play\/1\/video\/.*|cnb\.cx\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*|open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*|audiomack\.com\/.*))|(https:\/\/((www\.)?flickr\.com\/photos\/.*|flic\.kr\/.*|giphy\.com\/gifs\/.*|gph\.is\/.*|media\.giphy\.com\/media\/.*|(www\.)?pexels\.com\/photo\/.*|gist\.github\.com\/.*|play\.kotlinlang\.org\/embed#.*|pl\.kotl\.in\/.*|(www\.)?slideshare\.net\/.*\/.*|(www\.)?slideshare\.net\/mobile\/.*\/.*|.*\.slideshare\.net\/.*\/.*|slidesha\.re\/.*|scribd\.com\/doc\/.*|(www\.)?scribd\.com\/doc\/.*|scribd\.com\/mobile\/documents\/.*|(www\.)?scribd\.com\/mobile\/documents\/.*|scribd\.com\/documents\/.*|(www\.)?scribd\.com\/documents\/.*|slidetosubscribe\.com\/.*|docdroid\.net\/.*|autodesk\.com\/.*|scrimba\.com\/.*|foursquare\.com\/.*|(www\.)?foursquare\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|(www\.)?google\..*\/maps\/.*|google\..*\/maps\/.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|.*meetup\.com\/.*|meetu\.ps\/.*|(www\.)?wikimedia\.org\/wiki\/File.*|runkit\.com\/.*|formula-embed\.appspot\.com\/.*|(www\.)?maprosoft\.com\/app\/map.*|(www\.)?icloud\.com\/keynote\/.*|icloud\.com\/keynote\/.*|app\.queezly\.com\/.*|(www\.)?figma\.com\/file\/.*|(www\.)?figma\.com\/proto\/.*|ethfiddle\.com\/.*|glitch\.com\/.*|plnkr\.co\/.*|repl\.it\/.*|.*\.tiktok\.com\/.*|tiktok\.com\/.*|screen\.yahoo\.com\/.*\/.*|snappd\\.tv\/.*|animoto\.com\/play\/.*|video214\.com\/play\/.*|cinema8\.com\/.*|xtracomedy\.com\/.*|vine\.co\/v\/.*|(www\.)?vine\.co\/v\/.*|gifs\.com\/gif\/.*|(www\.)?gifs\.com\/gif\/.*|gifs\.com\/.*|(www\.)?gifs\.com\/.*|(www\.)?vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*|(www\.)?ted\.com\/talks\/.*\.html.*|(www\.)?ted\.com\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/talks\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|khanacademy\.org\/.*|(www\.)?khanacademy\.org\/.*|lynda\.com\/.*|lynda\.com\/.*|(www\.)?facebook\.com\/photo\.php.*|(www\.)?facebook\.com\/video\.php.*|(www\.)?facebook\.com\/.*\/posts\/.*|fb\.me\/.*|(www\.)?facebook\.com\/.*\/photos\/.*|(www\.)?facebook\.com\/.*\/videos\/.*|(www\.)?facebook\.com\/events\/.*|cnbc\.com\/id\/.*\?.*video.*|(www\.)?cnbc\.com\/id\/.*\?.*video.*|cnbc\.com\/id\/.*\/play\/1\/video\/.*|(www\.)?cnbc\.com\/id\/.*\/play\/1\/video\/.*|cnb\.cx\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|open\.spotify\.com\/.*|play\.spotify\.com\/.*|audiomack\.com\/.*)))/i
};
console.log('chat-lib availiable');
/*[
  "youtube.com", "youtu.be", "vimeo.com", "vine.com", "ustream.com", "liveleak.com", "dailymotion.com",
  "spotify.com", "soundcloud.com", 
  "maps.google.com", "google.com/maps",
  "instagram.com", 
  //"flickr.com", bad robot
  "twitter.com",
  //"github.com", bad robot
  "jsfidle", "codepen", "jsbin", "ideone", "plunker"
  ];
*/

//vars
var gChatRef = null;
var gRoomsRef_user = null;
var gAllRoomsRef = null;
var room = { title: '' };

var chat_tag_min_len = 3;
var gCommentOriginalFn = 0;
var gCommentOriginal = {};
var gCommentTag = 0;
var gReplyingToBot = false;

var phantomBusy = false;

var anonymousUser = 'anonymous';
var userName = anonymousUser;

//room unread notif
var gCurrentRoomsRef_user = null;
var gRoomsList = {};
var MAX_ROOMS = 99; // just to limit list size on screens
var gCurrentRoomsRef_all = null;

// See https://firebase.google.com/docs/web/setup#project_setup for how to
// auto-generate this config
//v3 samples
//https://github.com/firebase/quickstart-js/blob/master/database/scripts/main.js
var fb_config = {
  apiKey: 'AIzaSyD62f6UAhPWZArs9Nn37Vpz81I6y-NARyo',
  authDomain: 'areabox-chat.firebaseapp.com',
  databaseURL: 'https://areabox-chat.firebaseio.com',
  projectId: 'areabox-chat'
};

function initChatLib(room_key, userName0) {
  room.key = room_key;
  firebase.initializeApp(fb_config);

  gChatRef = firebase.database().ref();
  gMessagesRef = gChatRef.child('chat').child(room.key);
  gPreviewRef = gChatRef.child('link_preview').child(room.key);
  userName = userName0;

  if (
    gRoomsRef_user == null &&
    userName != anonymousUser &&
    typeof userName != 'undefined'
  )
    gRoomsRef_user = gChatRef.child('users/' + userName + '/rooms');
  if (gAllRoomsRef == null) gAllRoomsRef = gChatRef.child('rooms');

  gLinksRef = gChatRef.child('friendly_links');
  gQueueFbOut = gChatRef.child('queue/web/responses');
  gQueueFbIn = gChatRef.child('queue/web/requests');
  gExportRef = gChatRef.child('export');
  window.linkCount = 0;

  initChatLibForUSer(userName0);
  if (parent.iframeLoaded)
    setTimeout(function () {
      parent.iframeLoaded();
    }, 100);

  return gChatRef;
}

function initChatLibForUSer(userName0) {
  userName = userName0;

  if (gRoomsRef_user == null && userName != anonymousUser)
    gRoomsRef_user = gChatRef.child('users/' + userName + '/rooms');
  if (gAllRoomsRef == null) gAllRoomsRef = gChatRef.child('rooms');

  addRooms(); //2018-08-17 so that get room unread notifications
}

// ROOM UNREAD NOTIFICATIONS

function addRooms() {
  // add rooms to list
  gRoomsList = {};
  if (gCurrentRoomsRef_user == null) {
    //console.info( "addRooms");

    var list = 0;
    //list only rooms the user has reference (and last read time)
    var fn = function (snapshot) {
      var data = snapshot.val();
      var key = data.key ? data.key : snapshot.key; //snapshot.key is new way for sms app
      var t = snapshot.exportVal()['.priority'] || snapshot['.priority']; //last time read

      gAllRoomsRef.child(key).once('value', function (snap2) {
        if (snap2.exists) {
          var data2 = snap2.val();
          list = addRoom(data2, list, t);
        } else {
          //is old private room before sms changes, snapshot contains room details
          var data2 = { key: data.key, title: data.title, is_private: true };
          console.log('setWithPriority addRooms');
          snap2.ref.setWithPriority(data2, t);
          data2.priority = t;
          list = addRoom(data2, list, t);
        }
      });
    };

    var fn2 = function (snapshot) {
      var data = snapshot.val();
      var key = data.key ? data.key : snapshot.key; //snapshot.key is new way for sms app
      var t = snapshot.exportVal()['.priority'] || snapshot['.priority']; //last time read

      gAllRoomsRef.child(key).once('value', function (snap2) {
        if (snap2.exists) {
          var data2 = snap2.val();
          list = addRoom(data2, list, 0);
        } else {
          //is old private room before sms changes, snapshot contains room details
          var data2 = { key: data.key, title: data.title, is_private: true };
          console.log('setWithPriority addRooms');
          snap2.ref.setWithPriority(data2, t);
          data2.priority = t;
          list = addRoom(data2, list, 0);
        }
      });
    };

    // add user rooms (private, invites and known public rooms)
    gCurrentRoomsRef_user = gRoomsRef_user
      .limitToFirst(MAX_ROOMS)
      .on('child_added', fn);
    setTimeout(function () {
      gCurrentRoomsRef_all = gAllRoomsRef
        .limitToFirst(MAX_ROOMS)
        .on('child_added', fn2);
    }, 3000);
    //gCurrentRoomsRef_user_moved= gRoomsRef_user.limit(MAX_PRIV_ROOMS).on('child_moved', fn);
  }
}

function addRoom(data, list, t) {
  if (gRoomsList[data.key]) return; //duplicate
  //console.info( "addRoom ", data.key, data.title, data.priority, room.key);

  if (!gRoomsList[data.key]) {
    gRoomsList[data.key] = data;
    gRoomsList[data.key].num_unread = 0;
  }
  if (t > 0) gRoomsList[data.key].priority = t;
  //console.log("addroom+ ", gRoomsList[data.key],  data.key!=room.key)

  if (data.key != room.key) {
    // listen for counts of msgs only on other rooms, not this room as it would render data unsorted
    //if( t==0) /* public only */
    getRoomNotifications(data.key);
  } else {
    markRoomAsRead(); // initial room
  }
  // fixes rooms with empty title on room tabs
  //...removed
  return list;
}

//gets messages count for a room
function getRoomNotifications(key) {
  if (!gRoomsList[key]) return; //avoid bug 2014-12-03
  //console.log( "getRoomNotifications", gRoomsList[key].priority);
  if (!gRoomsList[key].priority) gRoomsList[key].priority = 0;

  gChatRef
    .child('chat')
    .child(key)
    .orderByPriority()
    .startAt(gRoomsList[key].priority)
    .limitToLast(99)
    .on('child_added', function (snapshot) {
      gRoomsList[key].num_unread++;
    });
}

// the last time the user read the room msgs is in the users's room reference:
function markRoomAsRead() {
  var t = new Date().getTime();
  console.log('markRoomAsRead0', room.key, t);

  gRoomsRef_user.child(room.key).setWithPriority(false, t);

  if (!gRoomsList[room.key]) gRoomsList[room.key] = {};

  gRoomsList[room.key].priority = t;
  gRoomsList[room.key].num_unread = 0;
}

// END ROOM UNREAD NOTIFICATIONS

function formatTime(time) {
  date = new Date(time);
  var local_date = new Date(
    date.getTime() + date.getTimezoneOffset() /*mins*/ * 60000
  );
  var hours = local_date.getHours();
  var minutes = local_date.getMinutes();
  if (hours < 10) {
    hours = '0' + hours;
  }
  if (minutes < 10) {
    minutes = '0' + minutes;
  }
  var hhmm = hours + ':' + minutes;
  var now = new Date();
  // different day?
  if (now.toLocaleDateString() != date.toLocaleDateString()) {
    var yyyy = '';
    if (local_date.getFullYear() != now.getFullYear())
      yyyy = local_date.getFullYear() + '/';
    hhmm =
      yyyy +
      (local_date.getMonth() + 1) +
      '/' +
      local_date.getDate() +
      ' ' +
      hhmm;
  }
  return hhmm;
}

function handleLinks(html, msg_key, data, other_pages) {
  var cache_version = data.cache_version ? data.cache_version : 0;
  if (data.html) {
    //&& cache_version>=gCacheVersion)
    exportMsgIfNotExists(msg_key, data.html, data.text);
    return data; //cached already
  } else if (data.bot_data) {
    return {
      html: html,
      is_float: false,
      is_chat_card: true,
      is_media: false,
      is_link: false
    };
  }
  window.linkCount++;
  var is_float = false;
  var is_chat_card = false;
  var is_media = false;
  var is_site = false;

  var screen = '$1';
  var screen0 = '';
  var html0 = html.toLowerCase() + ' '; //space is for image links capture
  //html0= stripTags(html0); // handle only links in text elements

  var is_float = false;
  // is it a common html media that can play inside webpage ?
  // 2018 snap previes of images too, for smaller size
  /*if( html0.indexOf(".gif ")>0 || html0.indexOf(".png ")>0 || html0.indexOf(".jpg ")>0 || html0.indexOf(".jpeg ")>0
    || html0.indexOf(".tiff ")>0 || html0.indexOf(".svg ")>0 || html0.indexOf(".webp ")>0) {
		screen= "<img class='weblink markup-media' src='DAJSHGFHJAFG$1THFIVXKIWXZ'/>";
		is_float= true;
	} 
	else*/

  if (
    html0.indexOf('.mp4') > 0 ||
    html0.indexOf('.ogv') > 0 ||
    html0.indexOf('.webm') > 0 ||
    html0.indexOf('.3gp') > 0 ||
    html0.indexOf('.flv') > 0
  ) {
    screen =
      "<video class='weblink markup-media' controls><source src='DAJSHGFHJAFG$1' /></video>";
    is_float = true;
    is_media = true;
  } else if (
    html0.indexOf('.mp3') > 0 ||
    html0.indexOf('.ogg') > 0 ||
    html0.indexOf('.wav') > 0 ||
    html0.indexOf('.mpga') > 0
  ) {
    screen0 =
      "<audio  class='weblink' controls><source src='DAJSHGFHJAFG$1' /></audio>";
    screen = '<small>open in new window</small>'; // " \u2197";
    is_float = true;
    is_media = true;
  }
  if (screen == '$1' && screen0 == '') {
    // 2015-09 get snapshots of links
    screen0 =
      '<a id="clara' +
      window.linkCount +
      '" class="photopopup" target="snapshot" href="DAJSHGFHJAFG$1"><img class="favicon" src="//www.google.com/s2/favicons?domain=DAJSHGFHJAFG$1" /><span id="missy' +
      window.linkCount +
      '" class="grey-link">$1</span></a>';
    //alt="snapshot" title="see website snapshot"
    screen =
      "<div id='dalek" +
      window.linkCount +
      "' class='card-link link-busy'>DAJSHGFHJAFG$1</div>";
    is_site = true;
  }
  var link_class = is_float ? 'media-float' : 'media-link';

  //Create placeholders for each link to be handled, allows separation of load of phantom and embed
  var s = '<!--$1-->';
  var phantom_features = 0;
  //case 1
  var r =
    screen0 +
    "<a class='" +
    link_class +
    "' title='open in new window' target='_blank' ref='nofollow' href='DAJSHGFHJAFG$1'>" +
    screen +
    '</a>';
  var html2 = html.replace(/\b(https?:\/\/[^\s\(\)\'\"\<\>]+)/gim, s);
  if (html2.length != html.length) {
    phantom_features = { type: 1, r: r, is_site: is_site };
    is_chat_card = true;
  }

  //case 2
  r =
    screen0 +
    "<a class='" +
    link_class +
    "' title='open in new window' target='_blank' ref='nofollow' href='DAJSHGFHJAFG//$1'>" +
    screen +
    '</a>';
  var html3 = html2.replace(/\s(www\.[^\s\(\)\'\"\<\>]+)/gim, s);
  if (html3.length != html2.length) {
    phantom_features = { type: 2, r: r, is_site: is_site };
    is_chat_card = true;
  }

  //case 3
  r =
    screen0 +
    "<a class='" +
    link_class +
    "' title='open in new window' target='_blank' ref='nofollow' href='http://$1'>" +
    screen +
    '</a>';
  var html4 = html3.replace(/^(www\.[^\s\(\)\'\"\<\>]+)/gim, s);
  if (html4.length != html3.length) {
    phantom_features = { type: 3, r: r, is_site: is_site };
    is_chat_card = true;
  }
  if (!is_chat_card) is_site = false;

  //get links but hide some from embed
  reg = new RegExp('<!--(.*?)-->', 'igm');
  var result;
  phantom_features.link = [];
  var html5 = html4;
  var i = 1;
  var link0 = 0;
  while ((result = reg.exec(html4))) {
    //console.log(result);
    var link = result[1];
    if (!link0) link0 = link;
    var embed = false;

    const res = Object.keys(sites2embedRegex).map((regex) =>
      sites2embedRegex[regex].test(link)
    );

    if (res.some((x) => x === true)) {
      embed = true;
      break;
    }

    if (embed) {
      html5 = replaceAll(html5, '<!--' + link + '-->', link);
    } else if (link.indexOf('youtu.be') >= 0) {
      var videoId = getYoutubeId(link);
      var iframeMarkup =
        '<iframe width="100%" height="350pt" src="//www.youtube.com/embed/' +
        videoId +
        '" frameborder="0" allowfullscreen></iframe>';
      html5 = replaceAll(html5, '<!--' + link + '-->', iframeMarkup);
      is_media = true;
    } else {
      html5 = replaceAll(html5, link, '??' + i++ + '??');
      phantom_features.link.push(link);
    }
    console.log('phantom_features.link', phantom_features.link);
  }

  handlePhantoms(
    window.linkCount,
    msg_key,
    html5,
    phantom_features,
    data,
    is_media
  );
  if (!data.contents && !is_site) data.contents = data.text;
  var flags = {
    is_float: is_float,
    is_chat_card: is_chat_card,
    is_media: false,
    is_link: is_site,
    link: link0
  };
  data = $.extend(flags, data);
  /*console.log( "handleLinks flags", flags);*/
  setFbMsgFlags(msg_key, flags);
  flags.html = html5;
  return flags;
}

//https://stackoverflow.com/questions/21607808/convert-a-youtube-video-url-to-embed-code
function getYoutubeId(url) {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);

  if (match && match[2].length == 11) {
    return match[2];
  } else {
    return 'error';
  }
}

function getYoutubeId2(url) {
  var regExp =
    /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match = url.match(regExp);
  var regExp2 =
    /^.*(youtube.com\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
  var match2 = url.match(regExp2);

  if (match && match[2].length == 11) {
    return match[2];
  } else if (match2 && match2[2].length == 11) {
    return match2[2];
  } else {
    return 'error';
  }
}

function handleTagsDisplay(message, data) {
  console.log('handleTagsDisplay', message);
  var res = ' ' + message;
  //var tags= message.match(/#[\w]+(?=\s|$|\.|,)/g);
  var tags = res.match(/\s#[\w]+/g);
  //http://stackoverflow.com/questions/25693456/get-hashtags-from-string-with-trim-spaces-and-new-lines
  //console.info(tags);
  var i = 0;
  data.tags = [];
  for (var key in tags) {
    var tag1 = tags[key];
    var tag = tag1.substring(2); //removes #
    if (tag.length < chat_tag_min_len) continue;
    var tag2 = '&#35;' + tag;
    res = res.replace(
      tag1,
      "<a class='msg-tag-link' onclick='tagResults(\"" +
        tag.toLowerCase() +
        '",-1)\'>' +
        tag2 +
        '</a>'
    );
    i++;
    data.tags.push(tag);
  }
  return res;
}

// depend of handleLinks

function setFbMsgCache(msg_key, final_result, data) {
  console.log('setFbMsgCache', msg_key, final_result, data);
  data = $.extend({ html: final_result, cache_version: gCacheVersion }, data);
  gMessagesRef.child(msg_key).update(data);
  exportMsg(msg_key, final_result, data);
}

function exportMsgIfNotExists(msg_key, final_result, data) {
  gExportRef.child(msg_key).once('value', function (snapshot) {
    var exists = snapshot.val() !== null;
    if (!exists) exportMsg(msg_key, final_result, data);
  });
}

function exportMsg(msg_key, final_result, data) {
  var o = { room_key: room.key, html: final_result };
  if (data.text) {
    o.text = data.text;
  }
  if (data.title) {
    o.title = data.title;
  } else if (data.text) {
    o.title = wordTrim(getUrlBits(data.text), 160, '...');
  }
  //console.info("export ", o);
  gExportRef.child(msg_key).update(o);
}

function stripTags(s) {
  //return s.replace(/<\/?[^>]+(>|$)/g, "");
  return $('<div>' + s + '</div>').text();
}

function setFbMsgFlags(msg_key, flags) {
  gMessagesRef.child(msg_key).update(flags);
}

// EMBED / PHANTOM RELATED

function handlePhantoms(
  linkCount,
  msg_key,
  txt,
  phantom_features,
  data,
  is_media
) {
  console.log('handlePhantoms');
  var x = new EmbedJS({
    input: txt,
    googleAuthKey: 'AIzaSyDQrDNnhGmxdSqpWCVzlj83S7NgVIbQPw0',
    tweetsEmbed: true,
    tweetOptions: {
      maxWidth: 250
    },
    vineOptions: {
      maxWidth: null,
      type: 'simple',
      responsive: false,
      width: 250,
      height: 560
    },
    inlineEmbed: 'all',
    link: true, //create <a> or not
    linkOptions: { target: 'blank' }
    //,excludeEmbed : ['flickr','github','image'] // use phantom better flickr preview, github was not working
  });
  var is_site = false;
  var fn = function (result, input) {
    //if( result != input ) {
    //}
    if (phantom_features) {
      for (var i = 0; i < phantom_features.link.length; i++) {
        result = replaceAll(
          result,
          '<!--??' + (i + 1) + '??-->',
          phantom_features.r
        );
        if (phantom_features.type == 1) {
          result = replaceAll(result, 'DAJSHGFHJAFG', '');
        } else if (phantom_features.type == 2) {
          result = replaceAll(result, 'DAJSHGFHJAFG', 'http://');
        } else if (phantom_features.type == 3) {
          result = replaceAll(result, 'DAJSHGFHJAFG', 'http://');
        }
        result = replaceAll(result, '$1', phantom_features.link[i]);
        if (phantom_features.is_site) {
          setTimerHandleLinkSnapShot(linkCount, msg_key, false, i, 0, data);
          is_site = true;
        }
      }
    }
    result = handle_thumbnails(result);
    // if using showMessage from chat.js:
    //var messageElement= $("#TXT"+msg_key);
    // with single message in iframe
    var messageElement = $('.chat-msg');
    var final_result = handleTagsDisplay(result, data);
    //if( !is_media) messageElement.append( final_result);    //2019 fixed: This probably duplicated content
    if (!is_media) messageElement.html(final_result); //but without it there is no preview

    if (!is_site) {
      //commented for mp3 to work
      console.log('handlePhantoms !site final_result', final_result);
      setFbMsgCache(msg_key, final_result, data);
      updatePost(final_result, msg_key, is_media, data);
    } //else setTimeout( function() { updatePost(final_result); }, 1000 );
    // else the setTimerHandleLinkSnapShot handles updatePost
  };
  if (x) x.text(fn);
  else fn(txt);
}

function updatePost(html, msg_key, is_site, data) {
  console.log('chatLib updatePost');
  //if( typeof( html)=="undefined" ) {
  var e = $('.chat-msg');
  //if( !e || e==null || !(e[0].text)) return;
  html = e.html(); //e.text()
  //}
  //if has internet update can reload, else fb syncs later
  var ref2 = gChatRef.child('.info/connected');
  ref2.on('value', function (connectedSnap) {
    if (!(connectedSnap.val() === true)) {
      setTimeout(function () {
        window.parent.updatePost(html, false, msg_key, is_site, data);
      }, 5000);
      ref2.off(); //stop listen when internet is back
    } else {
      window.parent.updatePost(html, true, msg_key, is_site, data);
    }
  });
}

function handle_thumbnails(html) {
  var XYZ = 'THFIVXKIWXZ';
  html0 = replaceAll(html, XYZ, '');
  if (html0.length === html.length) return html0;
  //return html0;

  var pos = html.indexOf(XYZ);
  if (pos <= 0) return html;
  var str2 = html.substring(0, pos);
  var apos = str2.lastIndexOf("'");
  var lnk = str2.substring(apos + 1);
  console.info(lnk);
  var ext_pos = lnk.lastIndexOf('.');
  var ext = lnk.substring(ext_pos);
  //console.info( ext);
  //2018 commnented
  /*if( ext.toLowerCase().indexOf(".jpg")!=0 && ext.toLowerCase().indexOf(".jpeg")!=0 
		&& ext.toLowerCase().indexOf(".png")!=0 ) return html0;
	*/
  var name_pos0 = lnk.lastIndexOf('/');
  var name_pos = lnk.substring(name_pos0);
  console.info(name_pos);

  var lnk2 = 'https://uploads.areabox.tv/snap/?u=' + encodeURIComponent(lnk);

  html = replaceAll(html, lnk + XYZ, lnk2);
  return handle_thumbnails(html);
}

// replaces a link with an image of the page and also metadata attributes (ogp)
// this was written in classic JS and uses timers and jquery.ajax instead of latest JS async / promises
function setTimerHandleLinkSnapShot(
  i,
  msg_key,
  titlesOnly,
  link_index,
  times,
  meta
) {
  //getCacheLinkPreview(msg_key);
  console.log('setTimerHandleLinkSnapShot0');
  if (times > 10) return; // do nothing

  if ($('#dalek' + i).length) {
    console.log('setTimerHandleLinkSnapShot');

    var url = $('#clara' + i).attr('href');
    exportMsgLinkIfNotExists(msg_key, url, link_index);

    var tit_alt = getUrlBits(url);
    meta.link = url;

    var iframed = false;
    for (k in sites2iframe) {
      if (url.indexOf(sites2iframe[k]) >= 0) {
        iframed = true;
        break;
      }
    }

    if (typeof url == 'undefined') return url;
    if ($('#dalek' + i).hasClass('link-busy')) {
      $('#missy' + i).hide();
      $('#dalek' + i).html(`<span class='card-link-title'>${tit_alt}</span>`);
      $('#dalek' + i).removeClass('link-busy');
    }

    //this function runs after a call to server api for OGP client scrapping of a website
    //expects this result form /ogp into data0
    //{
    // "success": true,
    // "title": "website title as in OGP og:title",
    // "img": "website main image as in OGP og:title, this can be an array and 1st image is used",
    // "texts": "some lines describing the site or main paragraph, as in OGP og:description",
    // "logo": "optional website image logo like the google logo",
    // "data": {} //Object with the full set of OGP properties
    // //as in section Results JSON of https://www.npmjs.com/package/open-graph-scraper
    //}
    var fn = function (data0, cached) {
      console.info('setTimerHandleLinkSnapShot fn', data0);
      phantomBusy = false;
      var data = { img: 0, logo: 0, texts: 0, tit: tit_alt };
      data = $.extend(meta, data);

      //filter final urls from server api that are of /snap for cases where ogp failed
      if (data0.indexOf && data0.indexOf('.areabox.tv/snap') > 0) {
        data.img = data0;
      } else if (data0.success) {
        if (data0.title) data.tit = data0.title;
        if (!data.tit || data.tit.length == 0) {
          data.tit = tit_alt; // this is a default phrase made from the words in the link
        }
        $('#missy' + i).hide();
        $('#dalek' + i).html(
          `<span class='card-link-title'>${stripTags(data.tit)}</span>`
        );

        // logo I guess is currently not used
        if (data0.logo && data0.logo != '') {
          data.logo = data0.logo;
          $('#dalek' + i).prepend(
            $("<img class='weblogo' src='" + data.logo + "' />")
          );
        }

        if (data0.img) {
          // if( Array.isArray( data0.img) && data0.img.length>0 ) data0.img= data0.img[0]
          // if( data0.img && (typeof data0.img == 'string' || data0.img instanceof String))
          data.img = data0.img;
        }
        if (data0.data.ogVideo) {
          if (Array.isArray(data0.data.ogVideo))
            data0.data.ogVideo = data0.data.ogVideo[0];
          if (
            data0.data.ogVideo &&
            (typeof data0.data.ogVideo.url == 'string' ||
              data0.data.ogVideo.url instanceof String)
          )
            data.video = data0.data.ogVideo.url;
        }

        if (data0.data.twitterPlayer && data0.data.twitterPlayer.url)
          data.player = data0.data.twitterPlayer.url;

        if (data0.texts && data0.texts != '') {
          data.texts = data0.texts;
          var texts = wordTrim(data.texts, data.img ? 200 : 500, '...');
          $('#dalek' + i).after($("<span class='webtexts'>").html(texts)); //"<br/>"+texts+"<br/>"
        }

        // if dont have enough metadata about site then default to an image snap
        if (
          !(typeof data0.texts == 'string' || data0.texts instanceof String) &&
          !(typeof data0.img == 'string' || data0.img instanceof String)
        ) {
          console.log('ogp not texts and img');
          data.img = 'https://uploads.areabox.tv/snap/?u=' + url; //returns img or error
        }
      } else {
        // try a snapshot of the page
        console.log('ogp not sucessful for ', url);
        data.img = 'https://uploads.areabox.tv/snap/?u=' + url; //returns img or error
      }

      if (data.player && data.player != '')
        $('#dalek' + i).append(
          "<iframe class='player-frame' src='" + data.player + "' />"
        );
      else if (iframed)
        $('#dalek' + i).append(
          "<iframe class='player-frame' src='" + url + "' />"
        );
      else if (data.video && data.video != '')
        $('#dalek' + i).append(
          "<video class='weblink markup-media' controls><source src='" +
            data.video +
            "' /></video>"
        );
      else if (data.img && data.img != '')
        $('#dalek' + i).append(
          $("<img class='weblink' src='" + data.img + "' />")
        );

      meta.iframed = iframed;

      //the link previews in firebase are still written but not used since the new react project
      //but could be improved to use that cache again (getCacheLinkPreview)
      if (!cached) {
        setCacheLinkPreview(
          msg_key,
          data.tit,
          data.logo,
          data.texts,
          data.img,
          url,
          link_index
        );
      }
      // the result json is cached into firebase so later is ready
      // in current model since it will have .html atribute then is known to nbe cached (handleLinks)
      //this also continues processing on React using updatePost
      console.log('setCacheEntireMsg updatePost');
      setCacheEntireMsg(msg_key, data, true);
    };

    var no_cache_fn = function (url) {
      phantomBusy = true; //this was to control the number of concurrent requests when phantom was used (before puppeteer)
      $.ajax({
        url: 'https://chat.areabox.tv/meta/?u=' + url,
        //url: "https://localhost/ogp/?u="+url,
        dataType: 'json',
        //data: data,
        success: fn,
        error: function (jqXHR, textStatus, errorThrown) {
          phantomBusy = false;
          var url1 = 'https://uploads.areabox.tv/snap/?u=' + url; //returns img or error
          fn(url1);
        }
      });
    };

    if (!phantomBusy) {
      getCacheLinkPreview(msg_key, 0, fn, no_cache_fn, url, link_index);
    } else {
      setTimeout(function () {
        setTimerHandleLinkSnapShot(
          i,
          msg_key,
          titlesOnly,
          link_index,
          times + 1,
          meta
        );
      }, 5000);
    } //busy
  } //dalek
  else {
    setTimeout(function () {
      setTimerHandleLinkSnapShot(
        i,
        msg_key,
        titlesOnly,
        link_index,
        times + 1,
        meta
      );
    }, 5000);
  }
}

function exportMsgLinkIfNotExists(msg_key, url, link_index) {
  gExportRef
    .child(msg_key + '/links/' + link_index)
    .once('value', function (snapshot) {
      var exists = snapshot.val() !== null;
      if (!exists) exportMsgLink(msg_key, url, link_index);
    });
}

function exportMsgLink(msg_key, url, link_index) {
  gExportRef.child(msg_key + '/links/' + link_index).set(url);
}

// get text from a posted link
function getUrlBits(url) {
  var s0 = url.indexOf('//');
  if (s0 < 0) s0 = 0;
  var bits = url.substring(s0);
  var q0 = bits.indexOf('?');
  if (q0 > 0) bits = bits.substring(0, q0);
  bits = bits.replace(/\%20/gim, ' ');
  bits = bits.replace(/www\./gim, '');
  bits = bits.replace(/\.com/gim, '');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/[^a-z0-9\/]+/gim, ' ');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/\/\//gim, ' ');
  bits = bits.replace(/\//gim, ' / ');
  return bits;
}

//http://stackoverflow.com/questions/5454235/javascript-shorten-string-without-cutting-words
function wordTrim(value, length, overflowSuffix) {
  if (value.length <= length) return value;
  var strAry = value.split(' ');
  var retLen = strAry[0].length;
  for (var i = 1; i < strAry.length; i++) {
    if (retLen == length || retLen + strAry[i].length + 1 > length) break;
    retLen += strAry[i].length + 1;
  }
  return strAry.slice(0, i).join(' ') + (overflowSuffix || '');
}

// caches preview details of link to firebase
function setCacheLinkPreview(msg_key, tit, logo, texts, img, url, link_index) {
  var link_key = link_index;
  var o = {};
  o[link_key] = { tit: tit, logo: logo, texts: texts, img: img, url: url };
  console.log('setCacheLinkPreview', msg_key, o);

  gPreviewRef.child(msg_key).update(o);
  // set time of preview cache
  var t = new Date().getTime();
  gMessagesRef.child(msg_key).update({ preview: t });
}

function setCacheEntireMsg(msg_key, data, is_site) {
  //var messageElement= $("#TXT"+msg_key);
  // with single message in iframe
  var messageElement = $('.chat-msg');
  console.log('setCacheEntireMsg get contents', data);
  data.contents = stripLinks(data.text); //messageElement.text()
  var html = messageElement.html();
  setFbMsgCache(msg_key, html, data);
  updatePost(html, msg_key, is_site, data);
}

// gets preview details of link
function getCacheLinkPreview(
  msg_key,
  index,
  on_success,
  on_failure,
  url,
  link_index
) {
  on_failure(url);
}

function getCacheLinkPreview2017(
  msg_key,
  index,
  on_success,
  on_failure,
  url,
  link_index
) {
  var outdated_cache = false;
  gMessagesRef.child(msg_key).once('value', function (snap) {
    if (snap.exists) {
      var data = snap.val();
      if (data.edited && data.preview && data.preview < data.edited)
        outdated_cache = true;

      gPreviewRef.child(msg_key).once('value', function (snap) {
        if (snap.exists) {
          console.log('getCacheLinkPreview exist');
          var data = snap.val();
          //console.info( data);
          var k = link_index;
          var cached = true;
          if (data[k] && !outdated_cache) on_success(data[k], cached);
          else if (k == 0 && data['link_key'] && !outdated_cache)
            // the old attribute name
            on_success(data['link_key'], cached);
          else on_failure(url);
        } else {
          console.log('getCacheLinkPreview not exist');
          on_failure(url);
        }
      });
    }
  });
}

// RELATED TO WRITE NEW POSTS

function handleTags(message, priority, opts) {
  var old_text = opts ? opts.old_text : 0;
  var adding_comment = opts ? opts.adding_comment : 0;
  var sending = opts ? opts.sending : 0;

  var tagsK = 'tags';
  var tags_sorted = 'tags-sorted';
  if (adding_comment) {
    tagsK = 'comments';
    tags_sorted = 'comments-sorted';
  }
  message = ' ' + message;
  var tags = message.match(/\s#[\w]+(?=\s|$)/g);
  var tags_old = [];
  if (old_text) tags_old = old_text.toLowerCase().match(/\s#[\w]+(?=\s|$)/g);
  //http://stackoverflow.com/questions/25693456/get-hashtags-from-string-with-trim-spaces-and-new-lines
  //console.info(tags);
  var i = 0;
  if (gCommentTag && sending) {
    if (tags != null) tags.push(gCommentTag);
    else tags = [gCommentTag];
    gCommentOriginalFn(message);
    cancelComment();
  }

  for (var key in tags) {
    if (i >= chat_max_tags) {
      sendMessageText(
        'Too many tags, registered only ' + chat_max_tags + ' tags.'
      );
      break;
    }
    i++;
    var tag1 = tags[key].toLowerCase();
    var exists = $.inArray(tag1, tags_old) >= 0;

    var tag = tag1.trim().substring(1); //removes #
    if (exists || tag.length < chat_tag_min_len) continue;
    var tag_detail = { room_key: room.key, msg_priority: priority };
    var tagRef = gChatRef.child(tagsK + '/' + tag);
    //if( tagRef==null){
    //	tagRef.set(0);
    //}
    console.log('tag setWithPriority');
    tagRef.push().setWithPriority(tag_detail, priority);
    var tagSortedRef = gChatRef.child(tags_sorted + '/' + tag);
    //if( tagSortedRef==null ){
    //	tagSortedRef.set(0);
    //}
    //keep tags "ordered" with priority equal to child count
    //note we do not read tagRef as it can have huge contents, read a sub-key
    tagSortedRef.child('count').once('value', function (snapshot) {
      var data = snapshot.val();
      var count = 0;
      if (data == null) {
        count = 0;
      } else {
        var count = parseInt(data);
        if (isNaN(count)) {
          count = 0;
        }
      }
      tagSortedRef.child('count').set(count + 1);
      //TO TEST
      tagSortedRef.setPriority(count + 1);
    });
  }
  //remove tags deleted from text
  var i = 0;
  for (var key in tags_old) {
    if (i >= chat_max_tags) {
      break;
    }
    i++;
    var tag1 = tags_old[key].toLowerCase();
    var exists = $.inArray(tag1, tags) >= 0;

    var tag = tag1.substring(2); //removes #
    if (exists || tag.length < chat_tag_min_len) continue;
    if (tag.indexOf('test') < 0) continue;
    gChatRef
      .child('tags')
      .child(tag)
      .equalTo(priority)
      .once('child_added', function (snapshot) {
        //orderByPriority().
        var data = snapshot.val();
        if (data != null) {
          //console.info(snapshot.ref.toString());
          snapshot.ref.remove();
        }
      });

    var tagSortedRef = gChatRef.child(tags_sorted).child(tag);

    tagSortedRef.child('count').once('value', function (snapshot) {
      var data = snapshot.val();
      var count = 0;
      if (data == null) {
        count = 0;
      } else {
        var count = parseInt(data);
        if (isNaN(count)) {
          count = 0;
        }
      }
      tagSortedRef.child('count').set(count - 1);
      //TO TEST
      tagSortedRef.setPriority(count - 1);
    });
  }
}

function msgComment(msg_key, username) {
  gMessagesRef.child(msg_key).once('value', function (snap) {
    if (snap.exists) {
      var data = snap.val();
      var priority = snap.exportVal()['.priority'] || snapshot['.priority'];
      gCommentTag = '#' + getCommentTag(msg_key);
      var nc = data.num_comments ? data.num_comments : 0;
      //fn once comment is done
      gCommentOriginalFn = function () {
        console.log(
          'commenting on ',
          msg_key,
          ' tag ',
          gCommentTag,
          ' nc ',
          nc
        );
        gMessagesRef.child(msg_key).update({ num_comments: nc + 1 });
        //add tag to original msg
        if (nc == 0)
          handleTags(gCommentTag, priority, { adding_comment: true });
        //updateMessage(msg_key); //TODO? display updated msg
      };
      gCommentOriginal = { user: username, prio: priority };
    }
  });
}

function cancelComment() {
  if (!gCommentTag) return;
  //$("#commentLabel").hide();
  gCommentTag = 0;
  gCommentOriginalFn = 0;
}

function emailToId(email) {
  email = replaceAll(email, '@', '_');
  email = replaceAll(email, '.', '_');
  email = replaceAll(email, ' ', '_');
  return email;
}

function replaceAll(str, de, para) {
  var pos = str.indexOf(de);
  while (pos > -1) {
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return str;
}

function getCommentTag(msg_key) {
  return toValidTag(msg_key + '_commenttag');
}
function toValidTag(s) {
  var r = s.replace(/\W+/g, '_');
  return r;
}

function stripLinks(text) {
  var s = ' ';
  var txt = text;
  txt = txt.replace(/\b(https?:\/\/[^\s\(\)\'\"\<\>]+)/gim, s);
  txt = txt.replace(/\s(www\.[^\s\(\)\'\"\<\>]+)/gim, s);
  txt = txt.replace(/\s(www\.[^\s\(\)\'\"\<\>]+)/gim, s);
  return txt;
}
