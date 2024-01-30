//requires chatLib.js
//consts

//vars
var gChatRef = null;
var is_latest_post = false;
var inited = false;
var room_key = 0;

// required INIT function used by post.html?r=room_key&u=user
function init() {
  room_key = getQueryVariable('r');
  user = getQueryVariable('u');
  gChatRef = initChatLib(room_key, user);
}

//handles and writes a new message to firebase, used in components/AsyncApp
function new_text(newPostText, opts) {
  if (newPostText) sendMessageText(newPostText, opts);
}

//if message input is canceled does some cleanup
function resetMessage() {
  console.log('resetMessage');
  cancelComment();
}

// ** for notifications see getNumMsgsUnread after following section **

//AUX FUNCTIONS :
//---------------------------------------

//used by init
//http://stackoverflow.com/questions/2090551/parse-query-string-in-javascript
function getQueryVariable(variable) {
  var query = window.location.search.substring(1);
  var vars = query.split('&');
  for (var i = 0; i < vars.length; i++) {
    var pair = vars[i].split('=');
    if (decodeURIComponent(pair[0]) == variable) {
      return decodeURIComponent(pair[1]);
    }
  }
  return 0;
}

//ays function used by new_text above
function handleMessage(msg_key, room_key) {
  //prio, room_title, unindent
  console.log('post.js handleMessage ', msg_key, ' r=', room_key);
  var messagesRef = gChatRef.child('chat').child(room_key);

  // startAt ( somePriority) to get msgs from Tag
  var theRef = messagesRef.orderByKey().equalTo(msg_key); // from tag and on

  var messageList = $('#tagMessages');
  messageList.empty();

  theRef.once('child_added', function (snapshot) {
    //GET DATA
    var data = snapshot.val();
    var prio = snapshot.exportVal()['.priority'] || snapshot['.priority'];
    //console.log(data);

    if (!data.text) return;
    var username = data.name || anonymousUser;
    var message = data.text;
    //prevent users to hack with html
    var is_html = message.indexOf('<') >= 0;
    if (!is_html) {
      message = handleTagsDisplay(message, data);
      message = handleLinks(message, snapshot.key, data, true).html;
    }
    // handle date and time
    var time = prio;
    var hhmm = '';
    if (time) {
      var hhmm = formatTime(time);
    }

    //style My Msgs differently
    if (username == userName) {
      //my messages
      style = 'chat-me';
    } else style = 'chat-username';

    //CREATE ELEMENTS MESSAGE
    var messageElement = $("<div class='chat-msg'>");
    var nameElement = $("<span class='" + style + "'></span>");
    var timeElement = $("<span class='msg-time'></span>");
    nameElement.text(username + ' '); //.click( viewProfile);
    timeElement.text(hhmm + ' ');
    if (is_html) messageElement.text(message);
    else {
      messageElement.html(message);
    }
    messageElement.prepend(timeElement);
    messageElement.prepend(nameElement);

    //console.log("post.js msg has comment?");
    if (data.comment) {
      var rp = data.replyto_user + ' (' + formatTime(data.replyto_prio) + ')';
      var fn = function () {
        tagResults(data.replyto_tag);
      };
      timeElement.append(
        ' in reply to ',
        $("<a class='msg-comm-link'>" + rp + '</a>').click(fn)
      );
    }

    //ADD MESSAGE to screen
    messageList.append(messageElement);
  });

  if (is_latest_post) markRoomAsRead();
}

// markRoomAsRead now in chatLib.js

// aux function used by new_text
function sendMessageText(message, opts, bot_user) {
  if (!gMessagesRef) {
    console.log('sendMessageText fail. not ready');
    return;
  } // not ready
  //SAVE NEW/EDIT MSG TO FIREBASE
  var edited = opts && opts.editKey;
  if ($.isArray(message)) message = message.join('\n');
  //dbg( message);
  if (message.trim) message = message.trim();
  var t = new Date().getTime();
  var msg =
    opts && opts.editKey
      ? gMessagesRef.child(opts.editKey)
      : gMessagesRef.push();
  var t = new Date().getTime();
  var user = bot_user ? bot_user : userName;
  var data = { name: user, text: message, html: 0 };
  console.log('sendMessageText ', data);
  var adding_comment = gCommentOriginalFn ? true : false;
  var msg_key = edited ? opts.editKey : msg.key; //new A2
  if (edited) {
    //new 2018-1
    //var msgEnotify= gMessagesRef.push();
    //msgEnotify.setWithPriority( {test}, t );
  }

  if (adding_comment) {
    data.comment = true;
    data.replyto_user = gCommentOriginal.user;
    data.replyto_prio = gCommentOriginal.prio;
    data.replyto_tag = gCommentTag.substring(1).toLowerCase();
  }
  if (opts && opts.bot_data) {
    data.bot_data = opts.bot_data;
  }
  console.log('setWithPriority sendMessage');
  if (edited) {
    data.edited = t;
    msg.update(data);
  } else msg.setWithPriority(data, t);
  // also set time of msg write on /chat/room
  gMessagesRef.setPriority(t);

  //update my room last read
  if (gRoomsRef_user) {
    var r = gRoomsRef_user.child(room.key);
    r.setPriority(t);
  }
  console.log('handleTags');
  handleTags(message, t, { sending: true, adding_comment: adding_comment });
  console.log('handleTags done');
  var req_key = 0;
  if (message.indexOf('@') == 0 || message.indexOf('Areaboi') == 0) {
    //|| gReplyingToBot
    if (message.indexOf('@') == 0) message = message.substring(1);
    var req = gQueueFbIn.push();
    req_key = req.key;
    dbg('req=' + req_key);
    req.set({ uid: userId, request: message }, function (err) {
      if (err != null) dbg(err);
    });
    //.child( req.key).limitToLast(1)
    gQueueFbOut //.orderByKey().equalTo(req_key)
      .on('child_added', function (snap2) {
        //
        if (snap2.key != req_key) return;
        var res = snap2.val();
        console.log('response ', res);
        //if( res==null) return; // not available yet, use for "on value"
        var props = {};
        if (res.data && res.uid == userId) {
          //record specific data of bot areabus for later use
          if (res.service == 'areabus') {
            var bot_data = {};
            if (res.data.route) {
              bot_data = res.data;
              //if( !bot_data.type) // TODO: type should be in given by firebase / bot
              bot_data.type = 'route';
            } else if ($.isArray(res.data.message)) {
              // TODO:improve this Type test
              bot_data = res.data;
              bot_data.type = 'select';
            }
            props.bot_data = bot_data;
          }
          sendMessageText(
            res.data.message
              ? res.data.message
              : res.error
              ? res.error
              : 'Could not find a solution',
            props,
            areaboi_bot
          );
          gReplyingToBot = true;
        }
        if (res.error && res.uid == userId) {
          sendMessageText(res.error, {}, areaboi_bot);
          gReplyingToBot = false;
        }
        //deletes responses for this user
        /*gQueueFbOut.equalTo(userId).on( 'child_added', function (snap3) {
        snap3.ref.remove();  
      });
      */
        snap2.ref.off(); //found what we were looking for, stop listening for child_added
        //snap2.ref.remove();
      });
  }
  gReplyingToBot = false;

  handleMessage(msg_key, room_key);
}

function tagResults(tag) {
  console.log('tagResults', tag);
  window.top.location = '?tag=' + tag;
}

//not used
function getComments(msg_key) {
  var tag = getCommentTag(msg_key);
  tagResults(tag);
}

//END AUX FUNCTIONS

// UNREAD NOTIF
// gets unread notifications of rooms
function getNumMsgsUnread(room_key) {
  if (!gRoomsList[room_key]) return -1; //1+  //chatLib
  //console.log("post.js getNumMsgsUnread2", room_key, gRoomsList[room_key], gRoomsList[room_key].num_unread );

  return gRoomsList[room_key].num_unread;
}

// END UNREAD NOTIF
