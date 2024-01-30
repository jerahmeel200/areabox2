import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { FirebaseDatabase } from '../settings/firebase.js';

import {
  isUriImage,
  isUriGif,
  isUriAudio,
  isUriVideo,
  isUriPdf,
  getUrlBits,
  wordTrim,
  getTagsWithSymbAndSpace,
  getCommentTag
} from '../lib';
import axios from 'axios';
import {
  child,
  equalTo,
  off,
  onChildAdded,
  onValue,
  orderByChild,
  orderByKey,
  push,
  query as queryF,
  ref as refD,
  remove,
  set,
  setPriority,
  setWithPriority,
  update
} from 'firebase/database';
import { orderBy } from 'firebase/firestore';
import Perspective from 'perspective-api-client';

const global_chat_tag_min_len = 3;

// Initialize the Perspective API client
const perspective = new Perspective({
  apiKey: 'AIzaSyB0yJetNZuoOKRYTHCTkPZykIE6Ot3mxBY'
});

// Check if a message contains profanity
async function checkForProfanity(message) {
  console.log('message', message);
  const result = await perspective
    .analyze(message, { attributes: ['TOXICITY', 'PROFANITY'] })
    .catch((error) => {
      console.error('Error analyzing message:', error);
      return null;
    });
  console.log('result', result);

  if (result && result.attributeScores) {
    const toxicityScore = result.attributeScores.TOXICITY.summaryScore.value;
    const profanityScore = result.attributeScores.PROFANITY.summaryScore.value;
    console.log('toxicityScore', toxicityScore);
    console.log('profanityScore', profanityScore);

    return toxicityScore >= 0.7 || profanityScore >= 0.5; // Adjust the thresholds as needed
  }

  return false;
}

// handles creation of new messages and defered get room notifications

export default class NewPost extends Component {
  constructor(props) {
    super(props);

    const { user, room_key } = this.props;
    console.log('newPost const.', user);

    this.gChatRef = FirebaseDatabase;

    //rooms known to a user
    this.gRoomsRef_user = child(refD(this.gChatRef, 'users'), `${user}/rooms`); // this.gChatRef.ref("users").child(user + "/rooms");
    //all rooms
    this.gAllRoomsRef = refD(this.gChatRef, 'rooms'); // this.gChatRef.ref("rooms");

    // for bots, currently disabled
    //this.gQueueFbOut= gChatRef.child("queue/web/responses");
    //this.gQueueFbIn= gChatRef.child("queue/web/requests");

    //for simple export of all messages to third party
    //this.gExportRef= this.gChatRef.ref("export");

    this.sendMessageText = this.sendMessageText.bind(this);
    this.handleCommentToOriginalMsg =
      this.handleCommentToOriginalMsg.bind(this);
    this.cancelComment = this.cancelComment.bind(this);
    this.handleMessage = this.handleMessage.bind(this);
    this.handleTags = this.handleTags.bind(this);
    this.handleLinks = this.handleLinks.bind(this);

    this.state = {
      messageData: {},
      busy: false,
      lastText: ''
    };
  }

  componentWillReceiveProps(nextProps) {
    // console.log("newPost componentWillReceiveProps", nextProps, this.state)

    const { messageData, busy, lastText } = this.state;
    const { text, active, editKey, comment } = nextProps;
    if (!busy && active && lastText != text && text != '') {
      this.sendMessageText(text, { editKey, comment });
      this.setState({
        //busy: true,
        lastText: text
      });
    }
  }

  render() {
    //console.log("newPost render", this.props, this.state)
    //console.log( this.props)
    const { active } = this.props;
    const { messageData, busy } = this.state;

    if (!(active && !busy && Object.keys(messageData).length > 0)) return null;

    //maybe render only a preview of links,
    return (
      <>
        <div style={{ display: 'none' }}>
          <p>{messageData.text}</p>
          <p>
            {messageData.tags.map((tag) => (
              <span>#{tag}</span>
            ))}
          </p>
        </div>
      </>
    );
  }

  //DRAFT
  /*
  opts: {
    editKey // of the message being edited
  }
  */

  async sendMessageText(message, opts) {
    const { handleShowSnackbar } = this.props;

    console.log('PROPS', this.props);

    // Check if the message contains profanity
    const containsProfanity = await checkForProfanity(message);
    console.log('containsProfanity', containsProfanity);

    if (containsProfanity) {
      handleShowSnackbar();
      return;
    }
    console.log('newPost sendMessageText', message, opts);
    const { user, page } = this.props;
    let { room_key } = page;
    console.log('newPost page', page, room_key);
    let original_post_key = page.original_post_key;
    // let gMessagesRef = this.gChatRef.ref("chat").child(room_key);

    //new code
    let gMessagesRef = child(refD(this.gChatRef, 'chat'), room_key);
    //SAVE NEW/EDIT MSG TO FIREBASE
    var edited = opts && opts.editKey;
    if (message.trim) message = message.trim();

    //  gMessagesRef.child(opts.editKey) : gMessagesRef.push();
    var msg = edited ? child(gMessagesRef, opts.editKey) : push(gMessagesRef);
    var data = { name: user, text: message, html: null, cache_version: 28 };
    console.log('sendMessageText ', data);
    var comment = opts && opts.comment;
    var msg_key = edited ? opts.editKey : msg.key;

    if (comment) {
      data.comment = true;
      data.replyto_user = comment.user;
      //data.replyto_prio= gCommentOriginal.prio;
      data.replyto_key = comment.key;
      data.replyto_tag = comment.tag = getCommentTag(comment.key);
    }
    console.log('setWithPriority sendMessage');
    var t = new Date().getTime();
    if (edited) {
      data.edited = t;
      update(msg, data);
      // msg.update(data);
    } else
      set(msg, data).then(() => {
        console.log(data);
        return update(msg, { '.priority': t });
      });
    // setWithPriority(msg, data, t); //msg.setWithPriority(data, t);
    data.msg_key = msg.key; //msg.getKey();
    // also set time of msg write on /chat/room

    update(gMessagesRef, { '.priority': t });

    //setPriority(gMessagesRef, t); //gMessagesRef.setPriority(t);

    //update my room last read
    if (typeof gRoomsRef_user != 'undefined') {
      // var r = gRoomsRef_user.child(room_key);
      var r = child(gRoomsRef_user, room_key); // gRoomsRef_user.child(room_key);
      //   r.setPriority(t);
      //new code
      update(r, { '.priority': t });

      //setPriority(r, t);
    }
    console.log('handleTags');
    data.tags = this.handleTags(message, t, {
      sending: true,
      comment,
      original_post_key
    });
    this.handleMessage(msg_key, room_key);
    if (comment) {
      this.handleCommentToOriginalMsg(comment.key, user, room_key);
    }

    this.setState({
      messageData: data,
      busy: false
    });
    this.props.updatePost(data);
  }

  handleTags(message, priority, opts) {
    console.log('newPost handleTags');

    const { gChatRef } = this;
    const { user, page } = this.props;
    const { room_key } = page;
    console.log('newPost handleTags', room_key);
    var old_text = opts ? opts.old_text : 0;
    var comment = opts ? opts.comment : 0;
    var sending = opts ? opts.sending : 0;

    var tagsK = 'tags';
    var tags_sorted = 'tags-sorted';
    var tags = getTagsWithSymbAndSpace(message) || [];
    if (opts.original_post_key && !comment)
      comment = {
        key: opts.original_post_key,
        tag: getCommentTag(opts.original_post_key)
      };
    if (comment) {
      tagsK = 'comments';
      tags_sorted = 'comments-sorted';
    }
    console.log('tags', tags, comment);
    var tags_old = [];
    if (old_text) tags_old = old_text.toLowerCase().match(/\s#[\w]+(?=\s|$)/g);
    //http://stackoverflow.com/questions/25693456/get-hashtags-from-string-with-trim-spaces-and-new-lines
    // console.info(tags);

    if (comment && sending) {
      if (tags != null) tags.push(comment.tag);
      else tags = [comment.tag];
    }
    var i = 0;
    const chat_max_tags = 10;
    const tags_res = [];
    for (var key in tags) {
      /*if( i>=chat_max_tags) {
        sendMessageText("Too many tags, registered only "+global_chat_max_tags+" tags.");
        break;
      }*/

      // compare to old tags
      i++;
      var tag1 = tags[key].toLowerCase();
      var exists = inArray(tag1, tags_old);
      var tag = tag1.trim().substring(1); //removes #
      tags_res.push(tag);
      if (exists || tag.length < global_chat_tag_min_len) continue;
      var tag_detail = { room_key, msg_priority: priority };
      //   var tagRef = gChatRef.ref(tagsK + "/" + tag);

      //new code
      var tagRef = refD(gChatRef, tagsK + '/' + tag);

      console.log('tag setWithPriority');
      //   tagRef.push().setWithPriority(tag_detail, priority);
      console.log('it got here', tagRef, tagRef.key);
      set(push(tagRef), {
        ...tag_detail,
        '.priority': priority
      })
        .then((res) => console.log('response from update: ', res, res?.val()))
        .catch((err) => {
          console.log('error from update: ', err);
          set(tagRef, {
            ...tag_detail,
            '.priority': priority
          });
        });
      //setPriority(tag_detail, priority);
      //   var tagSortedRef = gChatRef.ref(tags_sorted + "/" + tag);

      //keep tags "ordered" with priority equal to child count
      //note not reading tagRef as it can have huge contents, read a sub-key
      //   tagSortedRef.child("count").once("value", function(snapshot) {

      //new code
      var tagSortedRef = refD(gChatRef, tags_sorted + '/' + tag);
      onValue(
        child(tagSortedRef, 'count'),
        function (snapshot) {
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
          //   tagSortedRef.child("count").set(count + 1);
          //   //TO TEST
          //   tagSortedRef.setPriority(count + 1);

          //new code
          set(child(tagSortedRef, 'count'), count + 1);
          //TO TEST
          setPriority(tagSortedRef, count + 1);
        },
        { onlyOnce: true }
      );
    }

    //remove tags deleted from text
    var i = 0;
    for (var key in tags_old) {
      if (i >= chat_max_tags) {
        break;
      }
      i++;
      var tag1 = tags_old[key].toLowerCase();
      var exists = inArray(tag1, tags) >= 0;

      var tag = tag1.substring(2); //removes #
      if (exists || tag.length < global_chat_tag_min_len) continue;
      //   gChatRef
      //     .child("tags")
      //     .child(tag)
      //     .equalTo(priority)
      //     .once("child_added", function(snapshot) {
      //       var data = snapshot.val();
      //       if (data != null) {
      //         snapshot.ref.remove();
      //       }
      //     });

      //new code

      var tagRef = child(refD(gChatRef, 'tags'), tag);
      var tagRefQuery = equalTo(orderByChild(tagRef), priority);
      onChildAdded(
        tagRefQuery,
        function (snapshot) {
          var data = snapshot.val();
          if (data != null) {
            remove(snapshot.ref); //snapshot.ref.remove();
          }
        },
        { onlyOnce: true }
      );

      var tagSortedRef = refD(gChatRef, tags_sorted); //gChatRef.ref(tags_sorted).child(tag);

      //   tagSortedRef.child("count").once("value", function(snapshot) {
      //new code
      onValue(
        child(tagSortedRef, 'count'),
        function (snapshot) {
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
          set(child(tagSortedRef, 'count'), count - 1);
          // tagSortedRef.child('count').set();
          //TO TEST
          setPriority(tagSortedRef, count - 1);
          // tagSortedRef.setPriority(count - 1);
        },
        {
          onlyOnce: true
        }
      );
    }
    return tags_res;
  } //handleTags

  handleMessage(msg_key, room_key) {
    console.log('newPost handleMessage');

    const { user } = this.props;
    const { gChatRef } = this;
    console.log('handleMessage ', msg_key, ' r=', room_key);
    var messagesRef = child(refD(gChatRef, 'chat'), room_key); // gChatRef.ref("chat").child(room_key);

    var mRef = queryF(messagesRef, orderByKey(), equalTo(msg_key)); // messagesRef.orderByKey().equalTo(msg_key)

    // once
    onChildAdded(
      mRef,
      (snapshot) => {
        // off(mRef); //mRef.off();
        let data = snapshot.val();
        console.log(data);
        var prio = data['.priority'] || snapshot.exportVal()['.priority']; //snapshot.priority;

        console.log('handleMessage 2 ', data);

        if (data.text) {
          //prevent users to hack with html
          var is_html = data.text.indexOf('<') >= 0;
          if (!is_html) {
            data = this.handleLinks(snapshot.key, data, messagesRef);
          }
          // data.time = data.edited || prio;

          update(child(messagesRef, msg_key), data); //messagesRef.child(msg_key).update(data);
          console.log('NewPost updated msg', data);
        }
      },
      { onlyOnce: true }
    ); //once
  } //handleMessage

  // async componentDidMount() {
  //   try {
  //     const metadata = await this.getMetadata();
  //     console.log("Metadata:", metadata);
  //   } catch (error) {
  //     console.error("Error fetching metadata:", error.message);
  //   }
  // }

  handleLinks(msg_key, data, messagesRef) {
    console.log('newPost handleLinks');

    const re1 = /\b(https?:\/\/[^\s\(\)\'\"\<\>]+)/gim;
    const re2 = /\s(www\.[^\s\(\)\'\"\<\>]+)/gim;
    const re3 = /^(www\.[^\s\(\)\'\"\<\>]+)/gim;

    const sites2embedRegex = {
      a: /(((http:\/\/)?(instagr\.am\/p\/.*|instagram\.com\/p\/.*|(www\.)?instagram\.com\/p\/.*))|(https:\/\/((www\.)?instagram\.com\/p\/.*)))/i,
      b: /((http:\/\/(.*\.twitch\.tv\/.*|twitch\.tv\/.*|livestream\.com\/.*|d\.tube\/.*|audioboom\.com\/posts\/.*|www\.audioboom\.com\/boos\/.*|audioboom\.com\/boos\/.*|boo\.fm\/b.*|.*\.geograph\.co\.uk\/.*|.*\.geograph\.org\.uk\/.*|.*\.geograph\.ie\/.*|.*\.wikimedia\.org\/.*|gty\.im\/.*|mathembed\.com\/.*|www\.nytimes\.com\/video\/[a-zA-Z0-9\-]+\/(\d+)\/|www\.nytimes\.com\/video\/\w+\/\w+\/(\d+)\/|[a-zA-Z0-9\-_]+\.simplecast\.com\/episodes\/[a-zA-Z0-9\-]+|embed\.simplecast\.com\/[a-zA-Z0-9\-]|simplecast\.com\/s\/[a-zA-Z0-9\-]|(www\.)?datawrapper\.dwcdn\.net\/.*|(www\.)?crowdranking\.com\/.*\/.*|(www\.)?edumedia-sciences\.com\/en\/media\/.*|roosterteeth\.com\/.*))|(https:\/\/(.*\.twitch\.tv\/.*|twitch\.tv\/.*|livestream\.com\/.*|d\.tube\/.*|audioboom\.com\/posts\/.*|.*\.twitter\.com\/.*|twitter\.com\/.*|twitter\.com\/.*\/status\/.*|twitter\.com\/.*\/moments\/.*|.*\.twitter\.com\/.*\/status\/.*|.*\.twitter\.com\/.*\/moments\/.*|(www\.)?reddit\.com\/.*|(www\.)?reddit\.com\/r\/.*|(www\.)?reddit\.com\/r\/.*\/comments\/.*\/.*|.*\.geograph\.co\.uk\/.*|.*\.geograph\.org\.uk\/.*|.*\.geograph\.ie\/.*|.*\.wikimedia\.org\/.*|gty\.im\/.*|mathembed\.com\/.*|www\.nytimes\.com\/video\/[a-zA-Z0-9\-]+\/(\d+)\/|www\.nytimes\.com\/video\/\w+\/\w+\/(\d+)\/|[a-zA-Z0-9\-_]+\.simplecast\.com\/episodes\/[a-zA-Z0-9\-]+|embed\.simplecast\.com\/[a-zA-Z0-9\-]|simplecast\.com\/s\/[a-zA-Z0-9\-]|(www\.)?datawrapper\.dwcdn\.net\/.*|(www\.)?crowdranking\.com\/.*\/.*|(www\.)?edumedia-sciences\.com\/en\/media\/.*|roosterteeth\.com\/.*)))/i,
      c: /((http:\/\/(.*\.deviantart\.com\/art\/.*|.*\.deviantart\.com\/gallery\/.*|.*\.deviantart\.com\/#\/.*|fav\.me\/.*|.*\.deviantart\.com|.*\.deviantart\.com\/gallery|.*\.deviantart\.com\/.*\/.*\.jpg|.*\.deviantart\.com\/.*\/.*\.gif|.*\.deviantart\.net\/.*\/.*\.jpg|.*\.deviantart\.net\/.*\/.*\.gif|gfycat\.com\/.*|issuu\.com\/.*\/docs\/.*|verse\.com\/stories\/.*|commaful\.com\/.*|rumble\.com\/.*|coub\.com\/view\/.*|coub\.com\/embed\/.*|streamable\.com\/.*|iheart\.com\/.*|.*nfb\.ca\/film\/.*|www\.vevo\.com\/watch\/.*|www\.vevo\.com\/video\/.*|(www)?\.mixcloud\.com\/.*|play\.radiopublic\.com\/.*|radiopublic\.com\/.*|www\.radiopublic\.com\/.*|(www\.)?fite\.tv\/watch\/.*|ifixit\.com\/.+\/.+\/.*|(www\.)?ora\.tv\/.+\/.+\/.*|(www\.)?me\.me\/i\/.*|(www\.)?reverbnation\.com\/.*|(www\.)?reverbnation\.com\/.*\/songs\/.*|(www\.)?ultimedia\.com\/default\/index\/videogeneric\/id\/.*|(www\.)?ultimedia\.com\/central\/video\/edit\/id\/.*\/topic_id\/.*|(www\.)?ultimedia\.com\/default\/index\/videogeneric\/id\/.*\/showtitle\/1\/viewnc\/1))|(https:\/\/(gfycat\.com\/.*|issuu\.com\/.*\/docs\/.*|verse\.com\/stories\/.*|commaful\.com\/.*|rumble\.com\/.*|coub\.com\/view\/.*|coub\.com\/embed\/.*|streamable\.com\/.*|iheart\.com\/.*|www\.vevo\.com\/watch\/.*|www\.vevo\.com\/video\/.*|(www)?\.mixcloud\.com\/.*|play\.radiopublic\.com\/.*|radiopublic\.com\/.*|www\.radiopublic\.com\/.*|(www\.)?fite\.tv\/watch\/.*|ifixit\.com\/.+\/.+\/.*|(www\.)?ora\.tv\/.+\/.+\/.*|(www\.)?me\.me\/i\/.*|(www\.)?reverbnation\.com\/.*|(www\.)?reverbnation\.com\/.*\/songs\/.*|(www\.)?ultimedia\.com\/default\/index\/videogeneric\/id\/.*|(www\.)?ultimedia\.com\/central\/video\/edit\/id\/.*\/topic_id\/.*|(www\.)?ultimedia\.com\/default\/index\/videogeneric\/id\/.*\/showtitle\/1\/viewnc\/1)))/i,
      d: /(((https?:\/\/)?((www\.)?flickr\.com\/photos\/.*|flic\.kr\/.*|img\.ly\/.*|giphy\.com\/gifs\/.*|gph\.is\/.*|media\.giphy\.com\/media\/.*|gist\.github\.com\/.*|(www\.)?slideshare\.net\/.*\/.*|(www\.)?slideshare\.net\/mobile\/.*\/.*|.*\.slideshare\.net\/.*\/.*|slidesha\.re\/.*|scribd\.com\/doc\/.*|(www\.)?scribd\.com\/doc\/.*|scribd\.com\/mobile\/documents\/.*|(www\.)?scribd\.com\/mobile\/documents\/.*|slidetosubscribe\.com\/.*|docdroid\.net\/.*|autodesk\.com\/.*|scrimba\.com\/.*|(www\.)?screencast\.com\/.*\/media\/.*|screencast\.com\/.*\/media\/.*|(www\.)?screencast\.com\/t\/.*|screencast\.com\/t\/.*|foursquare\.com\/.*|(www\.)?foursquare\.com\/.*|4sq\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|(www\.)?google\..*\/maps\/.*|google\..*\/maps\/.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|.*meetup\.com\/.*|meetu\.ps\/.*|(www\.)?wikimedia\.org\/wiki\/File.*|360\.io\/.*|jsfiddle\.net\/.*|jsbin\.com\/.*\/.*|jsbin\.com\/.*|codepen\.io\/pen\/.*|codepen\.io\/.*\/pen\/.*|codepen\.io\/.*\/pen\/.*|codesandbox\.io\/.*|codesandbox\.io\/.*|(www\.)?maprosoft\.com\/app\/map.*|app\.queezly\.com\/.*|ethfiddle\.com\/.*|glitch\.com\/.*|plnkr\.co\/.*|repl\.it\/.*|.*\.tiktok\.com\/.*|tiktok\.com\/.*|.*\.dailymotion\.com\/video\/.*|.*\.dailymotion\.com\/.*\/video\/.*|blip\.tv\/.*\/.*|.*\.blip\.tv\/.*\/.*|snappd\\.tv\/.*|animoto\.com\/play\/.*|video214\.com\/play\/.*|(www\.)?schooltube\.com\/video\/.*\/.*|cinema8\.com\/.*|xtracomedy\.com\/.*|vine\.co\/v\/.*|(www\.)?vine\.co\/v\/.*|goanimate\.com\/videos\/.*|(www\.)?hulu\.com\/watch.*|(www\.)?hulu\.com\/w\/.*|(www\.)?hulu\.com\/embed\/.*|hulu\.com\/watch.*|hulu\.com\/w\/.*|hulu\.tv\/.*|(www\.)?funnyordie\.com\/videos\/.*|(www\.)?funnyordie\.com\/m\/.*|funnyordie\.com\/videos\/.*|funnyordie\.com\/m\/.*|(www\.)?vimeo\.com\/groups\/.*\/videos\/.*|(www\.)?vimeo\.com\/.*|vimeo\.com\/groups\/.*\/videos\/.*|vimeo\.com\/.*|vimeo\.com\/m\/#\/.*|player\.vimeo\.com\/.*|(www\.)?ted\.com\/talks\/.*\.html.*|(www\.)?ted\.com\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/talks\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|wordpress\.tv\/.*\/.*\/.*\/.*\/|(www\.)?traileraddict\.com\/trailer\/.*|khanacademy\.org\/.*|(www\.)?khanacademy\.org\/.*|(www\.)?lynda\.com\/.*|lynda\.com\/.*|(www\.)?facebook\.com\/photo\.php.*|(www\.)?facebook\.com\/video\.php.*|(www\.)?facebook\.com\/.*\/posts\/.*|fb\.me\/.*|(www\.)?facebook\.com\/.*\/photos\/.*|(www\.)?facebook\.com\/.*\/videos\/.*|fb\.com|cnbc\.com\/id\/.*\?.*video.*|(www\.)?cnbc\.com\/id\/.*\?.*video.*|cnbc\.com\/id\/.*\/play\/1\/video\/.*|(www\.)?cnbc\.com\/id\/.*\/play\/1\/video\/.*|cnb\.cx\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|snd\.sc\/.*|open\.spotify\.com\/.*|spoti\.fi\/.*|play\.spotify\.com\/.*|audiomack\.com\/.*))|(https:\/\/((www\.)?flickr\.com\/photos\/.*|flic\.kr\/.*|giphy\.com\/gifs\/.*|gph\.is\/.*|media\.giphy\.com\/media\/.*|(www\.)?pexels\.com\/photo\/.*|gist\.github\.com\/.*|play\.kotlinlang\.org\/embed#.*|pl\.kotl\.in\/.*|(www\.)?slideshare\.net\/.*\/.*|(www\.)?slideshare\.net\/mobile\/.*\/.*|.*\.slideshare\.net\/.*\/.*|slidesha\.re\/.*|scribd\.com\/doc\/.*|(www\.)?scribd\.com\/doc\/.*|scribd\.com\/mobile\/documents\/.*|(www\.)?scribd\.com\/mobile\/documents\/.*|scribd\.com\/documents\/.*|(www\.)?scribd\.com\/documents\/.*|slidetosubscribe\.com\/.*|docdroid\.net\/.*|autodesk\.com\/.*|scrimba\.com\/.*|foursquare\.com\/.*|(www\.)?foursquare\.com\/.*|maps\.google\.com\/maps\?.*|maps\.google\.com\/\?.*|maps\.google\.com\/maps\/ms\?.*|(www\.)?google\..*\/maps\/.*|google\..*\/maps\/.*|tumblr\.com\/.*|.*\.tumblr\.com\/post\/.*|.*meetup\.com\/.*|meetu\.ps\/.*|(www\.)?wikimedia\.org\/wiki\/File.*|runkit\.com\/.*|formula-embed\.appspot\.com\/.*|(www\.)?maprosoft\.com\/app\/map.*|(www\.)?icloud\.com\/keynote\/.*|icloud\.com\/keynote\/.*|app\.queezly\.com\/.*|(www\.)?figma\.com\/file\/.*|(www\.)?figma\.com\/proto\/.*|ethfiddle\.com\/.*|glitch\.com\/.*|plnkr\.co\/.*|repl\.it\/.*|.*\.tiktok\.com\/.*|tiktok\.com\/.*|screen\.yahoo\.com\/.*\/.*|snappd\\.tv\/.*|animoto\.com\/play\/.*|video214\.com\/play\/.*|cinema8\.com\/.*|xtracomedy\.com\/.*|vine\.co\/v\/.*|(www\.)?vine\.co\/v\/.*|gifs\.com\/gif\/.*|(www\.)?gifs\.com\/gif\/.*|gifs\.com\/.*|(www\.)?gifs\.com\/.*|(www\.)?vimeo\.com\/.*|vimeo\.com\/.*|player\.vimeo\.com\/.*|(www\.)?ted\.com\/talks\/.*\.html.*|(www\.)?ted\.com\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/.*\.html.*|(www\.)?ted\.com\/index\.php\/talks\/lang\/.*\/.*\.html.*|(www\.)?ted\.com\/talks\/.*|yahoo\.com\/movies\/.*|.*\.yahoo\.com\/movies\/.*|khanacademy\.org\/.*|(www\.)?khanacademy\.org\/.*|lynda\.com\/.*|lynda\.com\/.*|(www\.)?facebook\.com\/photo\.php.*|(www\.)?facebook\.com\/video\.php.*|(www\.)?facebook\.com\/.*\/posts\/.*|fb\.me\/.*|(www\.)?facebook\.com\/.*\/photos\/.*|(www\.)?facebook\.com\/.*\/videos\/.*|(www\.)?facebook\.com\/events\/.*|.*\.facebook\.com\/.*|cnbc\.com\/id\/.*\?.*video.*|(www\.)?cnbc\.com\/id\/.*\?.*video.*|cnbc\.com\/id\/.*\/play\/1\/video\/.*|(www\.)?cnbc\.com\/id\/.*\/play\/1\/video\/.*|cnb\.cx\/.*|soundcloud\.com\/.*|soundcloud\.com\/.*\/.*|soundcloud\.com\/.*\/sets\/.*|soundcloud\.com\/groups\/.*|open\.spotify\.com\/.*|play\.spotify\.com\/.*|audiomack\.com\/.*)))/i
    };

    let embed = false;

    const links = [];
    let l = 0;

    let ll = data.text.match(re1);
    for (l in ll) links.push(ll[l]);
    ll = data.text.match(re2);
    for (l in ll) links.push(ll[l]);
    ll = data.text.match(re3);
    for (l in ll) links.push(ll[l]);

    if (links.length > 0) {
      data.link = links[0];
      embed = false;

      if (
        Object.keys(sites2embedRegex).some((regex) =>
          sites2embedRegex[regex].test(links[0])
        )
      ) {
        embed = true;
        data.embed = true;
      }

      if (embed === false && isUriImage(links[0])) {
        console.log('image confirmed');
        (async () => {
          const image = await saveMedia(links[0]);
          data.media = links[0];
          console.log('image with cors: ', image);
        })();
        console.log('image confirmed:', data);
      }

      if (embed === false && isUriGif(links[0])) {
        data.media = links[0];
      }

      if (embed === false && (isUriAudio(links[0]) || isUriVideo(links[0]))) {
        data.media = links[0];
      }

      if (embed === false && isUriPdf(links[0])) {
        data.media = links[0];
      }
    }

    function cache2fb(url, data0, embedResult, cached) {
      console.info('handleLinks ogp link', url, data0);
      let link_data = data0.indexOf ? {} : data0;
      let metadata = { img: 0, logo: 0, texts: 0, tit: getUrlBits(url) };
      data = Object.assign(data, metadata, link_data);

      //filter final urls from server api that are of /snap for cases where ogp failed
      if (data0.indexOf && data0.indexOf('.areabox.app/snap') > 0 && !embed) {
        data.img = data0;
      } else if (data0.success) {
        if (data0.title) data.tit = data0.title;
        if (!data.tit || data.tit.length == 0) {
          data.tit = getUrlBits(url); // this is a default phrase made from the words in the link
        }

        // logo I guess is currently not used
        // if (data0.logo && data0.logo != "") {
        //   data.logo = data0.logo;
        // }

        if (data0.img) {
          data.img = data0.img;
        }

        if (embed && embedResult) {
          data.embedHTML = embedResult;
        }

        if (data0.texts && data0.texts != '') {
          data.texts = wordTrim(data0.texts, data.img ? 200 : 500, '...');
        }

        // if dont have enough metadata about site then default to an image snap
        if (
          !(typeof data0.texts == 'string' || data0.texts instanceof String) &&
          !(typeof data0.img == 'string' || data0.img instanceof String) &&
          !embed
        ) {
          console.log('ogp not texts and img');
          data.img + url; //returns img or error
          data.text = 'https://uploads.areabox.app/snap/?u=' + url; //returns img or error
        }
      } else {
        // try a snapshot of the page
        if (!embed) {
          console.log('ogp not sucessful for ', url);
          data.img = 'https://uploads.areabox.app/snap/?u=' + url; //returns img or error
          // console.log("data",data.img)
        }
      }

      console.log('NewPost link data', data);
      // better do async update after links processed
      update(child(messagesRef, msg_key), data); //messagesRef.child(msg_key).update(data);
    } //fn

    var no_cache_fn = async function (url) {
      console.log('handleLinks no_cache_fn');
      try {
        if (embed) {
          console.log('embed');
          Promise.all([getMetadata(url), getEmbed(url)]).then(
            function (results) {
              console.log('Promise Results', results);
              const meta = results[0];
              const embedResult = results[1];
              console.log('metatags and embedresult', meta, embedResult);
              setTimeout(() => {
                cache2fb(url, meta, embedResult);
              }, 1000);
            }
          );
        } else {
          console.log('!embed');
          const meta = await getMetadata(url);
          cache2fb(url, meta);
        }
      } catch (error) {
        console.log('no_cache_fn ERROR', error.message);
        return error;
      }
    }; //no_cache_fn

    const getMetadata = async function (url) {
      console.log('Fetching metadata for', url);
      try {
        // http://localhost:8080/meta
        const result = await axios.get(
          `https://areabox-backend.onrender.com/meta?u=${url}`
        );
        console.log('metadataResult', result.data);

        return result.data;
      } catch (error) {
        console.log('metaError', error.message);
        throw error; // Rethrow the error to propagate it
      }
    };

    const getEmbed = async function (url) {
      try {
        const result = await axios.get(
          // http://localhost:8080/get-embed
          `https://areabox-backend.onrender.com/get-embed?link=${url}`
        );

        if (result.status === 200) {
          console.log('embed', result);
          return result.data.html;
        } else {
          return `<iframe src=${url} style={{ border: "0px #ffffff none" }} name="areaboi-embed" scrolling="no" frameborder="1" width="100%" height={"100%"} allowfullscreen></iframe>`;
        }
      } catch (error) {
        console.log('Embed thrown Error', error.message);
        return null;
      }
    }; //getEmbed

    async function saveMedia(url) {
      try {
        const result = await axios.post('http://localhost:8080/save-media', {
          image: url
        });
        console.log('returned result: ' + result);
        return result.data;
      } catch (error) {
        console.log('saveMedia ERROR', error.message);
        return error;
      }
    } //saveMedia

    console.log('handleLinks links', links);
    if (links.length > 0) no_cache_fn(links[0]);
    /*links.forEach((l) => {
      //TODO should integrate code to cache links
      //getCacheLink( msg_key, 0, fn, no_cache_fn, url, link_index);
      no_cache_fn( l, links[l] )
      // handle just one link as Post code is only ready for one link
    }*/
    return data;
  }

  handleCommentToOriginalMsg(msg_key, username, room_key) {
    let gMessagesRef = child(refD(this.gChatRef, 'chat'), room_key); //this.gChatRef.ref("chat").child(room_key);

    // gMessagesRef.child(msg_key).once("value", function(snap) {
    onValue(
      child(gMessagesRef, msg_key),
      function (snap) {
        if (snap.exists) {
          var data = snap.val();
          var priority = snap.priority;
          var nc = data.num_comments ? data.num_comments : 0;
          console.log('commenting on ', msg_key, ' nc ', nc);
          // gMessagesRef.child(msg_key).update({ num_comments: nc + 1 });
          //new code
          update(child(gMessagesRef, msg_key), { num_comments: nc + 1 });
        }
      },
      { onlyOnce: true }
    );
  }
  cancelComment() {
    console.log('newPost cancelComment');

    if (!this.gCommentTag) return;
    //$("#commentLabel").hide();
    this.gCommentTag = 0;
    this.gCommentOriginalFn = 0;
  }
} //class

NewPost.propTypes = {
  user: PropTypes.string.isRequired,
  page: PropTypes.object.isRequired,
  active: PropTypes.bool.isRequired,
  text: PropTypes.string.isRequired,
  updatePost: PropTypes.func.isRequired
};

//UTILITIES
function inArray(needle, haystack) {
  if (haystack.indexOf(needle) !== -1) {
    return true;
  } else {
    return false;
  }
}
