import React from 'react';
import { connect } from 'react-redux';
import Head from 'next/head';
// import { Head } from "next/document";
import {
  NUM_MSGS,
  ACTION_NEXT_PAGE,
  default_state,
  reload_state,
  publicRoomKey,
  publicRoomTitle
} from '../../store';
import Info from './info';

import Layout from '../../layouts/MsgList'; // global styles (nextjs wiki)
import { FirebaseDatabase, auth } from '../../settings/firebase.js';
import Fuse from 'fuse.js';

import { getWordBits } from '../../components/IndexLib';
import lancasterStemmer from 'lancaster-stemmer';
import { formatTime } from '../../lib';
import { getCommentTag } from '../../lib/tagsLib';
import {
  onValue,
  ref as refD,
  query as queryF,
  orderByPriority,
  startAt,
  endAt,
  limitToLast,
  orderByChild,
  child,
  get
} from 'firebase/database';
import { onAuthStateChanged } from 'firebase/auth';
import Script from 'next/script';

const NUM_MSGS_TAGS = 2 * NUM_MSGS; // because there may be more instances unders tags due to the way messages are being auto updated or edited manually
const NUM_MSGS_SEARCH = NUM_MSGS * 4;

class AreaboxLandingPage extends React.Component {
  /*mapDispatchToProps(dispatch) {
    return {
      setRoomsList: function(gRoomsList) { dispatch({type: ACTION_SET_ROOMS_LIST,  payload:gRoomsList }) }
    }
  }*/

  //maybe this can be optimized not to require getnitialProps
  //https://medium.com/charlottes-digital-web/using-redux-in-next-js-with-hybrid-static-server-rendered-applications-a9939a94246a
  static async getInitialProps({ store, pathname, query, isServer }) {
    let state00 = default_state;
    var g_TAG = 0;

    state00.isServer = isServer;
    const gChatRef = FirebaseDatabase; //firebase.database()

    function result(data) {
      //data.posts.forEach( p => {console.log("result", p.key) })

      var payload = Object.assign({}, state00, data);
      let ss = store.dispatch({ type: ACTION_NEXT_PAGE, payload });
      //console.log("index new state", store.getState().posts )
      return {};
    }

    var tag = '';
    var search = '';
    var order = 0;
    if (query.tag && query.tag != '' && query.tag != '0') {
      tag = query.tag;
      console.log('q.tag ', tag);
    }
    if (query.s && query.s != '') {
      search = query.s;
      console.log('q.search ', search);
    }
    if (query.o && query.o != '') {
      order = query.o;
      console.log('q.order ', order);
      state00.recent = order == 't';
    }

    //if (process.browser && !search && !tag) {
    //    history.go(); //reloads to prevent back button issue
    //	//https://github.com/zeit/next.js/issues/3065
    //}

    state00.tag = tag;
    state00.searchWords = search;

    console.log('Areaboi2_online v1.3 getInitialProps default ', state00);
    console.log('server ', isServer);
    console.log('q ', query);

    let room = 0;
    let { page } = state00;

    if (query.rk) {
      room = {};
      room.key = query.rk;
      room.title = query.rt
        ? query.rt
        : room.key == publicRoomKey
        ? publicRoomTitle
        : 0;
      room.isPublic = false;
      console.log('q.room ', room);
    } else {
      room = state00.default_room;
    }

    let original_post_key = 0;
    if (query.k) {
      //maximized card with comments
      original_post_key = query.k;
      var tag = getCommentTag(query.k);
    }

    console.log('room ', room.key);

    var items = [];
    var last_key = 0;
    var item_room_key = 0;
    var gLatestPrio = 0;
    var TAG_REF = 0;
    var item_index = 0;
    var count = 0;
    var itemsIndex = [];
    var isPinned = false;

    //aux function for properties  ---------------------------------------------
    var populateItemProps = function (item, snap, calcWords) {
      item.key = snap.key;
      item.reactions = snap.reactions;
      item.user = item.name;
      let time =
        item.edited || snap.exportVal()['.priority'] || snap.val()['.priority'];
      item.time = time;
      item.num = item_index++;
      item.hhmm = '';
      item.edited_hhmm = '';
      if (time) {
        item.hhmm = formatTime(time);
      }
      if (item.edited) {
        // item.edited_hhmm = "edited: " + formatTime(item.edited);
        // item.edited_hhmm = "(edited)";
        item.edited_hhmm = formatTime(item.edited);
      }
      if (item.comment) {
        item.replyto_txt =
          item.replyto_user + ' (' + formatTime(item.replyto_prio) + ')';
      }
      if (calcWords) item.words = getWordBits(item);
      return item;
    };

    //aux Fn to process posts ---------------------------------------------
    const fn_for = (childSnapshot) => {
      console.log('fn_for', childSnapshot.key);
      var item = childSnapshot.val();
      if (!item || item == null) return;
      if (itemsIndex[childSnapshot.key]) {
        itemsIndex[childSnapshot.key].pinned = isPinned;
        console.log(childSnapshot.key, 'already in page for instance pinned');
        return;
      }

      // gets id of 2nd post
      if (count == NUM_MSGS - 2) last_key = childSnapshot.key;
      count++;

      gLatestPrio = childSnapshot.key;

      item.room_key = room.key;
      item.pinned = isPinned;

      item = populateItemProps(item, childSnapshot);
      items.push(item);
      itemsIndex[item.key] = item;
      console.log('added key', item.key);
    };

    // FN for messages of room ==================================================
    var msg_fn = function (dataSnapshot) {
      dataSnapshot.forEach(fn_for);

      if (room.pinned && page.n == 0) {
        console.log('pinned is', room.pinned);
        isPinned = true;
        room.pinned.forEach(fn_for);
      }

      console.log('room items # ', items.length);

      if (items.length > 0) items[items.length - 1].is_latest = true; // the latest

      page = Object.assign({}, page, {
        LastMsgKey:
          items.length >= NUM_MSGS && last_key != query.msg ? last_key : 0,
        room_key: room.key,
        room_title: room.title,
        room_tags: room.tags,
        gLatestPrio
      });

      const posts_data = {
        posts: items,
        lastUpdated: Date.now(),
        page
      };

      return result(posts_data);
    }; //msg_fn

    // aux FN to collect messages with tag ------------------------------------------------------
    var msg_fn_collect = function (dataSnapshot) {
      var room_key = dataSnapshot.ref.key;
      console.log('loaded msg for ', room_key);
      dataSnapshot.forEach((childSnapshot) => {
        var item = childSnapshot.val();
        if (!item || item == null) return;
        item.room_key = room_key;
        if (original_post_key) item.in_thread = true;

        item = populateItemProps(item, childSnapshot);

        item.tag = g_TAG;
        items.push(item);
        //if (items.length >= NUM_MSGS && TAG_REF) TAG_REF.off("child_added");
      });
      console.log('tag items # ', items.length);
      //console.log("items", items)
    }; //msg_fn_collect

    // this is main utility function to get nmsgs with some tag
    // can be filtered to a room / channel ==================================================
    var fn_get_tagged_msgs = function (dataSnapshot) {
      var p = 0;
      var p_size = 0;
      var last_key = 0;
      var fn_ref = dataSnapshot.ref;
      var room_title =
        g_TAG.indexOf('_commenttag') > 0 ? 'comments' : '#' + g_TAG;
      if (room.title) room_title = room.title + ' ' + room_title;

      //get data of original_post_key in case of maximized card
      if (original_post_key) {
        //console.log("original_post_key", original_post_key)
        p = new Promise((resolve) => {
          onValue(
            child(refD(gChatRef, 'chat'), `${room.key}/${original_post_key}`),
            (snapshot) => resolve(fn_for(snapshot)),
            { onlyOnce: false }
          ); //gChatRef.ref("chat").child(room.key).child(original_post_key).once("value").then(fn_for);
        });
        room_title = 'message and comments';
      }

      dataSnapshot.forEach((childSnapshot) => {
        console.log('found tagged msg ', childSnapshot.key);
        var data = childSnapshot.val();
        // gets id of 2nd post
        if (count == NUM_MSGS - 2) last_key = childSnapshot.key;
        count++;
        item_room_key = data.room_key;
        if (!query.rk || item_room_key == room.key) {
          // gets msgs with tag for a room, ie: filter the room with a tag
          var prio = data.msg_priority;

          p_size++;
          if (!p)
            // serialize promises for each, YES!
            p = new Promise((resolve) => {
              onValue(
                queryF(
                  child(refD(gChatRef, 'chat'), item_room_key),
                  orderByPriority(),
                  startAt(prio),
                  endAt(prio)
                ),
                (snapshot) => resolve(msg_fn_collect(snapshot)),
                { onlyOnce: false }
              );
            });
          //gChatRef.ref("chat").child(item_room_key).orderByPriority().startAt(prio).endAt(prio).once("value").then(msg_fn_collect);
          else
            p = p.then(
              () =>
                new Promise((resolve) => {
                  onValue(
                    queryF(
                      child(refD(gChatRef, 'chat'), item_room_key),
                      orderByPriority(),
                      startAt(prio),
                      endAt(prio)
                    ),
                    (snapshot) => resolve(msg_fn_collect(snapshot)),
                    { onlyOnce: false }
                  );
                })
              //gChatRef.ref("chat").child(item_room_key).orderByPriority().startAt(prio).endAt(prio).once("value").then(msg_fn_collect)
            );
        }
      }); // forEach
      if (p)
        return p.then(
          function () {
            console.log('have all promises');

            if (items.length == 0) {
              console.log(
                'fn_get_tagged_msgs retry get more tags before',
                last_key
              );
              if (last_key) {
                return new Promise((resolve) => {
                  onValue(
                    queryF(fn_ref, endAt(last_key), limitToLast(NUM_MSGS_TAGS)),
                    (snapshot) => resolve(fn_get_tagged_msgs(snapshot)),
                    { onlyOnce: false }
                  );
                });
                //fn_ref.orderByKey().endAt(last_key).limitToLast(NUM_MSGS_TAGS).once("value").then(fn_get_tagged_msgs);
                //get more tagged messages
              }
              //if no posts
              else {
                console.log('No posts found for tag');
                return null; //TODO maybe then return all (removes tag filter)
                //return gChatRef.ref("chat").child(room.key).limitToLast(NUM_MSGS).once("value").then(msg_fn);
              }
            }

            page = Object.assign({}, page, {
              LastMsgKey:
                p_size >= NUM_MSGS_TAGS && last_key != query.msg ? last_key : 0,
              room_key: room.key,
              room_title,
              room_tags: room.tags
            });

            const posts_data = {
              posts: items,
              lastUpdated: Date.now(),
              page
            };
            if (original_post_key)
              posts_data.page.original_post_key = original_post_key;

            return result(posts_data);
          }.bind(this)
        );
      // p.then
      else {
        page = Object.assign({}, page, {
          n: 0,
          LastMsgKey: 0,
          room_key: room.key,
          room_title,
          room_tags: room.tags
        });

        const posts_data = {
          posts: [],
          lastUpdated: Date.now(),
          page
        };
        return result(posts_data);
      }
    }.bind(this); // function fn_get_tagged_msgs

    // This is aux FN for get messages for a search of words ----------------------------------------------
    var msg_fn_collect_words = function (dataSnapshot) {
      console.log('msg_fn_collect_words');
      //https://stackoverflow.com/questions/35879695/promise-all-with-firebase-datasnapshot-foreach
      var reads = [];

      dataSnapshot.forEach((childSnapshot) => {
        console.log('msg_fn_collect_words foreach');
        var p1 = true;
        if (!childSnapshot.exists()) {
          console.log('not exists in words index');
        } else {
          var key = childSnapshot.key;
          console.log('msg_fn_collect_words each', key);
          p1 = new Promise((resolve) => {
            //gChatRef.ref("export").child(key).once("value")
            onValue(
              child(refD(gChatRef, 'export'), key),

              function (snap) {
                if (!snap.exists()) {
                  console.log('not exists in export');
                  resolve(true);
                }
                console.log('msg_fn_collect_words export', key);
                var data = snap.val();
                var room_key = data.room_key;
                //return gChatRef
                onValue(
                  child(refD(gChatRef, 'chat'), `${room_key}/${key}`),
                  function (snap2) {
                    if (!snap2.exists()) {
                      console.log('not exists in chat');
                      resolve(true);
                    }
                    var item = snap2.val();
                    //item.key = key
                    item.room_key = room_key;
                    item = populateItemProps(item, snap2, true);
                    items.push(item);
                    console.log('found in index', snap2.key);
                    resolve(true);
                  }
                ); //once
              }
            ); //once
          });
        }
        console.log('reads', reads);
        reads.push(p1);
      }); //snapshot
      resolve(Promise.all(reads));
    };

    // This is main FN for get messages for a search of words ==================================================
    this.fn_get_msgs_of_index = function (search) {
      let words = search.split(' ');
      let filtered = {};
      words.forEach((w) => {
        w = w.trim();
        w = lancasterStemmer(w);
        if (w.length > 1) {
          filtered[w.toLowerCase()] = 1;
        }
      });

      var p = 0;
      Object.keys(filtered).forEach((word) => {
        console.log('search word', word);

        if (!p)
          // serialize promises for each, YES!
          p = new Promise((resolve) => {
            onValue(
              child(refD(gChatRef, 'words'), word),
              (snapshot) => resolve(msg_fn_collect_words(snapshot)),
              { onlyOnce: false }
            );
          });
        //gChatRef.ref("words").child(word).once("value").then(msg_fn_collect_words);
        else
          p = p.then(
            () =>
              new Promise((resolve) => {
                onValue(
                  child(refD(gChatRef, 'words'), word),
                  (snapshot) => resolve(msg_fn_collect_words(snapshot)),
                  { onlyOnce: false }
                );
              })
          );
      }); // forEach

      console.log('promises', p);
      if (p)
        return p.then(
          function () {
            console.log('have all promises');

            var options = {
              keys: [
                {
                  name: 'words',
                  weight: 0.8
                },
                {
                  name: 'html',
                  weight: 0.2
                }
              ],
              shouldSort: true,
              threshold: 0.9, //bacause fb already filterd results with any of the words
              location: 0,
              distance: 100,
              //maxPatternLength: 32,//links
              minMatchCharLength: 2
            };

            //remove duplicates
            var items0 = {};
            items.forEach((it) => {
              items0[it.key] = it;
            });
            items = Object.values(items0);

            var fuse = new Fuse(items, options);
            items = fuse.search(search);

            //sort by recent
            if (state00.recent) {
              items.sort(function (a, b) {
                return a.time - b.time;
              });

              items.forEach((so) => {
                console.log('sorted', so.hhmm);
              });
            }

            items = items.slice(0, NUM_MSGS_SEARCH);
            if (!order) items = items.reverse();
            //set a key according to the order for react to follow
            var item_num = 0;
            if (state00.recent) {
              items.forEach((it) => {
                it.num = item_num++;
                //console.log( "Index post num", it.num, it.key)
              });
            }
            //console.log( "res", items)

            page = Object.assign({}, page, {
              LastMsgKey: 0,
              room_key: items.length > 0 ? items[0].room_key : '',
              room_title: search,
              room_tags: room.tags
            });

            const posts_data = {
              posts: items,
              lastUpdated: Date.now(),
              page
            };
            return result(posts_data);
          }.bind(this)
        );
      else {
        console.log('no promisses');
        page = Object.assign({}, page, {
          n: 0,
          LastMsgKey: 0,
          room_key: 0
        });
        const posts_data = {
          posts: [],
          lastUpdated: Date.now(),
          page
        };
        return result(posts_data);
      }
    }.bind(this); // function fn_get_msgs_of_index

    // FN to get channels related to current channel ------------------------------------------------
    this.getRelatedChannels = function (gChatRef, layout) {
      console.log('getRelatedChannels');
      return new Promise((resolve) => {
        if (!layout) {
          console.log('index getRelatedChannels []');
          resolve({});
        }

        console.log('index getRelatedChannels', layout);
        const ref = refD(gChatRef, 'featured/' + layout); //gChatRef.ref("featured/" + layout);

        return new Promise((resolver) => {
          onValue(
            queryF(ref, orderByChild('n')), //ref.orderByChild("n").once("value")
            function (dataSnapshot) {
              const channels = [];
              var p = 0;

              dataSnapshot.forEach((childSnapshot) => {
                const item = childSnapshot.val();
                item.key = childSnapshot.key;

                const fn = (snap) => {
                  const c = snap.val();
                  if (!c) return false;
                  item.tags = c.tags;
                  item.title = c.title;
                  channels.push(item);
                  return true;
                };

                if (!item.is_private) {
                  if (!p)
                    // serialize promises for each, YES!
                    p = new Promise((resolve) => {
                      onValue(
                        child(refD(gChatRef, 'rooms'), item.key),
                        (snapshot) => resolve(fn(snapshot)),
                        { onlyOnce: false }
                      );
                    });
                  //gChatRef.ref("rooms").child(item.key).once("value").then(fn);
                  else
                    p = p.then(
                      () =>
                        new Promise((resolve) => {
                          onValue(
                            child(refD(gChatRef, 'rooms'), item.key),
                            (snapshot) => resolve(fn(snapshot)),
                            { onlyOnce: false }
                          );
                        })
                    );
                } // if private
              }); //end dataSnapshot.foreach

              if (p)
                resolver(
                  p.then(() => {
                    //return
                    console.log('getRelatedChannels result', channels);
                    resolve(channels);
                  })
                );
            },
            { onlyOnce: false }
          );
        }); //dataSnapshot
      }); //promise
    }.bind(this); //getRelatedChannels

    // ==========================================================================================
    // Start actual processing using the FNs above
    // ==========================================================================================

    if (!tag && !search) {
      console.log('open room ', room.key);
      console.log('init items # ', items.length);

      const gMessagesRef = child(refD(gChatRef, 'chat'), room.key); //gChatRef.ref("chat").child(room.key);
      let ref = gMessagesRef;
      if (query.page && query.page == 'next') {
        if (query.msg && query.msg.length > 2) {
          ref = queryF(ref, orderByKey(), endAt(query.msg));
          console.log('will end at ', query.msg);
          page.n++;
        } else page.n = 1;
      } else page.n = 1;

      var getRelatedChannels = this.getRelatedChannels;

      //new: get title,tags of current room and pinned post
      return onValue(
        child(refD(gChatRef, 'rooms'), room.key), //gChatRef.ref("rooms").child(room.key).once("value")
        function (snapshot) {
          var val = snapshot.val();
          if (val && val.title) room.title = val.title;
          if (val.metro) {
            //filters messages that are comments, todo: verify that original order time is mantained
            ref = queryF(
              ref,
              orderByChild('replyto_key'),
              startAt(null),
              endAt(null)
            );
          }
          if (val.layout) {
            page.room_layout = val.layout;
          }
          if (val && val.tags) room.tags = val.tags;

          // get related channels
          return getRelatedChannels(gChatRef, page.room_layout).then(
            (related_channels) => {
              page.relatedChannels = related_channels;
              //console.log( "related_channels = ", related_channels)

              if (val && val.pinned) {
                const pinned = Object.keys(val.pinned)[0];
                return new Promise((resolve) => {
                  const pinnedQuery = queryF(
                    child(refD(gChatRef, 'chat'), `${room.key}/${pinned}`)
                  );
                  const messagesQuery = queryF(ref, limitToLast(NUM_MSGS));

                  Promise.all([
                    get(pinnedQuery).then((snapshotp) => snapshotp),
                    get(messagesQuery).then((snapshotm) => msg_fn(snapshotm))
                  ]).then(([pins, messages]) => {
                    room.pinned = [pins];
                    resolve(messages);
                  });
                });
              } //pinned

              const messagesQuery = queryF(ref, limitToLast(NUM_MSGS));
              return get(messagesQuery)
                .then((snapshotm) => msg_fn(snapshotm))
                .then((messages) => {
                  messages;
                });
            }
          ); //getRelatedChannels
        }
      ); //snapshot
    } else if (tag) {
      // with tag
      var tags = 'tags';
      console.log('process tag', tag);

      var adding_comment = tag.endsWith('_commenttag');
      if (adding_comment) {
        tags = 'comments';
        tag = tag.toLowerCase().trim();
        if (tag.indexOf('#') == 0) tag = tag.substring(1);
      }
      var tagsRef = refD(gChatRef, tags); //gChatRef.ref(tags);
      var ref = child(tagsRef, tag); //tagsRef.child(tag);
      if (query.msg && query.msg.length > 2) {
        ref = queryF(ref, orderByKey(), endAt(query.msg)); //ref.orderByKey().endAt(query.msg);
        console.log('will end at ', query.msg);
        page.n++;
      } else page.n = 1;
      console.log('ref path', tags, tag);
      TAG_REF = ref;
      g_TAG = tag;
      var getRelatedChannels = this.getRelatedChannels;

      if (!room.key)
        return new Promise((resolve) => {
          onValue(queryF(ref, limitToLast(NUM_MSGS_TAGS)), (snapshot) =>
            resolve(fn_get_tagged_msgs(snapshot))
          );
        }); //ref.limitToLast(NUM_MSGS_TAGS).once("value").then(fn_get_tagged_msgs);

      //new: get title,tags of current room and pinned post
      return new Promise((resolve) => {
        onValue(child(refD(gChatRef, 'rooms'), room.key), (snapshot) => {
          console.log('line 760 logging snapshot: ', snapshot);
          var val = snapshot.val();
          console.log(val);
          if (val && val.title) room.title = val.title;
          if (val.metro) {
            //filters messages that are comments, todo: verify that original order time is mantained
            ref = queryF(
              ref,
              orderByChild('replyto_key'),
              startAt(null),
              endAt(null)
            );
          }
          if (val.layout) {
            page.room_layout = val.layout;
          }
          if (val && val.tags) room.tags = val.tags;

          const relatedChannels = getRelatedChannels(
            gChatRef,
            page.room_layout
          ).then((related_channels) => {
            page.relatedChannels = related_channels;
            console.log('related_channels = ', related_channels);
            const messagesQuery = queryF(ref, limitToLast(NUM_MSGS_TAGS));
            if (val && val.pinned) {
              const pinned = Object.keys(val.pinned)[0];
              return new Promise((resolve) => {
                const pinnedQuery = child(
                  child(refD(gChatRef, 'chat'), room.key),
                  pinned
                );
                Promise.all([
                  new Promise((resolver) =>
                    onValue(pinnedQuery, (snapshot) => resolver(snapshot))
                  ),
                  new Promise((resolver) =>
                    onValue(messagesQuery, (snapshot) =>
                      resolver(fn_get_tagged_msgs(snapshot))
                    )
                  )
                ]).then(([pins, messages]) => {
                  room.pinned = [pins];
                  console.log(messages, 'final');
                  resolve(messages);
                });
              });
            }
            //end pinned
            return new Promise((resolver) => {
              onValue(messagesQuery, (snapshot) => {
                console.log(snapshot);
                resolver(fn_get_tagged_msgs(snapshot));
              });
            });
          });
          resolve(relatedChannels);
        });

        // end get title,tags of current room
      });
    } //end if tag
    else if (search) {
      // Query msgs by search field
      var refname = 'words';
      console.log('process search', search);

      return this.fn_get_msgs_of_index(search);
    }

    console.log('Houston we have a problem.');
    // getInitialProps must return a Promise or converts result into one
  } //getInitialProps
  ///////////////////////////////////////////////////////////////////////////////

  constructor(props) {
    super(props);
    //if( !props.isServer) return;

    console.log('Areaboi2_online constructor ');
    //this.sendMessageText = this.sendMessageText.bind(this)
    this.tagResults = this.tagResults.bind(this);
    this.getComments = this.getComments.bind(this);
    this.loggedIn = this.loggedIn.bind(this);
    this.notLoggedIn = this.notLoggedIn.bind(this);
    this.state = { loggedIn: -1, userInfo: null, props: props };
  }

  componentDidMount() {
    window.tagResults = this.tagResults; //exports the function for use with fb .html referencing areaboi V1 Js lib
    window.getComments = this.getComments; //same as above
    window.loggedIn = this.loggedIn;
    window.notLoggedIn = this.notLoggedIn;

    // on refresh was the user logged in?
    //https://stackoverflow.com/questions/32253413/how-do-i-keep-a-user-logged-into-a-firebase-app-after-refresh
    if (!this.gChatRef) {
      console.log('componentDidMount initing Fb for client use');
      this.gChatRef = FirebaseDatabase;
    }
    console.log('componentDidMount Fb ok');
    onAuthStateChanged(auth, function (authData) {
      //this.gChatRef.theFirebaseLib.auth().onAuthStateChanged(function(authData) {
      if (authData) {
        console.log('User ' + authData.uid + ' is logged in ');
        console.log('authData ', authData);
        console.log(
          'isAnonymous ',
          authData.isAnonymous ? authData.isAnonymous : '?'
        );

        window.loggedIn(authData);
      } else {
        console.log('User is logged out');
        window.notLoggedIn();
      }
    });
  }

  loggedIn(userInfo) {
    this.setState({ loggedIn: 1, userInfo });
  }

  notLoggedIn() {
    this.setState({ loggedIn: 0 });
  }

  componentWillUnmount() {
    //any clean up and GC for client side
  }

  render() {
    const { loggedIn, userInfo } = this.state;

    return (
      <>
        <div>
          <Layout />
          <Head>
            <Script
              async
              src="https://platform.twitter.com/widgets.js"
              strategy="beforeInteractive" // 'beforeInteractive' strategy for better performance
            />
          </Head>
          <Info {...this.props} loggedIn={loggedIn} userInfo={userInfo} />
        </div>
        <style jsx>{`
          div {
            width: 100vw;
            min-width: 360px;
            max-width: 768px;
            margin: 0 auto;
          }
        `}</style>
      </>
    );
  }

  tagResults(tag) {
    //for client
    console.log('tagResults', tag);
    window.top.location = '?tag=' + tag;
  }

  getComments(msg_key) {
    //for client
    var tag = getCommentTag(msg_key);
    this.tagResults(tag);
  }
} //class

//redux
export default connect((state) => state)(AreaboxLandingPage); //, AreaboxChat.mapDispatchToProps
