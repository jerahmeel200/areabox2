const firebase = require('firebase');
//const natural= require('natural');
//const snowball= require('node-snowball')
const lancasterStemmer = require('lancaster-stemmer');
const stop_words =
  // require("./stop-words.js");

  {
    words: [
      'i',
      'me',
      'my',
      'myself',
      'we',
      'our',
      'ours',
      'ourselves',
      'you',
      'your',
      'yours',
      'yourself',
      'yourselves',
      'he',
      'him',
      'his',
      'himself',
      'she',
      'her',
      'hers',
      'herself',
      'it',
      'its',
      'itself',
      'they',
      'them',
      'their',
      'theirs',
      'themselves',
      'what',
      'which',
      'who',
      'whom',
      'this',
      'that',
      'these',
      'those',
      'am',
      'is',
      'are',
      'was',
      'were',
      'be',
      'been',
      'being',
      'have',
      'has',
      'had',
      'having',
      'do',
      'does',
      'did',
      'doing',
      'a',
      'an',
      'the',
      'and',
      'but',
      'if',
      'or',
      'because',
      'as',
      'until',
      'while',
      'of',
      'at',
      'by',
      'for',
      'with',
      'about',
      'against',
      'between',
      'into',
      'through',
      'during',
      'before',
      'after',
      'above',
      'below',
      'to',
      'from',
      'up',
      'down',
      'in',
      'out',
      'on',
      'off',
      'over',
      'under',
      'again',
      'further',
      'then',
      'once',
      'here',
      'there',
      'when',
      'where',
      'why',
      'how',
      'all',
      'any',
      'both',
      'each',
      'few',
      'more',
      'most',
      'other',
      'some',
      'such',
      'no',
      'nor',
      'not',
      'only',
      'own',
      'same',
      'so',
      'than',
      'too',
      'very',
      's',
      't',
      'can',
      'will',
      'just',
      'don',
      'should',
      'now'
    ]
  };

const firebase_config = {
  apiKey: 'AIzaSyCNb7QMCoi_fewELFOmQAUQbVS3_uUYtfE',
  authDomain: 'radiant-fire-9060.firebaseapp.com',
  databaseURL: 'https://radiant-fire-9060.firebaseio.com',
  projectId: 'radiant-fire-9060',
  storageBucket: 'radiant-fire-9060.appspot.com',
  messagingSenderId: '50702511384'
};

console.log('firebase.js ', firebase_config.databaseURL);

function firebase_database() {
  let hasBeenInitialized = false;
  let firebaseApps = firebase.apps;
  for (let i = 0; i < firebaseApps.length; i++) {
    console.log('app name', firebaseApps[i].name);
    if (firebaseApps[i].name == '[DEFAULT]') {
      hasBeenInitialized = true;
    }
  }
  console.log('hasBeenInitialized', hasBeenInitialized);
  if (!hasBeenInitialized) {
    let app = firebase.initializeApp(firebase_config);
    let res = app.database();
    res.theFirebaseLib = firebase;

    return res;
  } else {
    return firebase.database();
  }
}

//MAIN
//console.log(stop_words.words)

let gChatRef = firebase_database();
const ref = gChatRef.ref('export'); //.limitToFirst(100)
//doint query on export since keys there already identify the room
const ref_index = gChatRef.ref('words');
console.log('processing chat');
return ref.on('child_added', function (snap) {
  //console.log("room", snap.key )
  //snap.ref.on("child_added", function(snap2)
  const msg = snap.val();
  let txt = msg.text;
  let doPrint = false;
  if (typeof txt == 'undefined') return;

  if (msg.html && msg.html.indexOf) txt = msg.html;

  //try {
  if (typeof txt != 'string') {
    doPrint = true;
    console.log('problem with msg ', msg.text, txt);
    txt = msg.text;
    if (typeof txt != 'string')
      // tipicaly is a areabus array result
      txt = JSON.stringify(txt);
  }

  txt = getWordBits(txt, msg.text);
  /* 
	  stop_words.words.forEach( st => { 
		txt= replaceAll( txt, " "+st+" ", " ") 
	  })
	  */
  //txt= replaceAll( txt, "  ", " ")
  let words = txt.split(' ');

  if (doPrint) {
    console.log('----------');
    console.log('MSG', msg.text);
    console.log(' ');
    console.log('HTML', msg.html);
    console.log(' ');
    //console.log( "THEN", txt )
    console.log('WORDS');
  }
  //this removes duplicates and does stemming
  let filtered = {};
  words.forEach((w) => {
    //reduce the owrd to root
    w = w.trim();
    w = w.toLowerCase();
    //if( doPrint) console.log("w", w)
    //w= natural.PorterStemmer.stem(w)
    //w= snowball.stemword(w)
    w = lancasterStemmer(w);
    if (w.length > 1 && !stop_words.words.includes(w)) {
      //if( doPrint) console.log("stem", w)
      filtered[w] = 1;
    }
  });
  // save words to firebase index
  Object.keys(filtered).forEach((w) => {
    if (doPrint) console.log('set words/', w, snap.key);
    ref_index.child(w).child(snap.key).set(1);
  });

  //} catch( e) { console.log( "PROBLEM with msg HTML",  msg.text, "TEXT", txt) }
});

function stripTags(s) {
  // Rule to remove inline CSS.
  return (
    s
      .replace(/<style[^>]*>.*<\/style>/gm, '')
      // Rule to remove all opening, closing and orphan HTML tags.
      .replace(/<[^>]+>/gm, '')
      // Rule to remove leading spaces and repeated CR/LF.
      .replace(/([\r\n]+ +)+/gm, '')
  );
}

// get text from a posted link
function getWordBits(text, ori) {
  var bits = text;

  bits = bits.replace(/google.com/gi, ' ');
  bits = bits.replace(/youtube.com\/watch/gi, ' ');
  bits = bits.replace(/youtube.com\/embed/gi, ' ');
  bits = bits.replace(/giphy.com\/embed/gi, ' ');
  bits = bits.replace(/[a-zA-Z]+=+"[a-zA-Z0-9:;\.\s\(\)\-\,]+"/gi, ' ');
  bits = bits.replace(/[a-zA-Z]+=+'[a-zA-Z0-9:;\.\s\(\)\-\,]+'/gi, ' ');
  bits = bits.replace(/iframe/gi, ' ');
  bits = bits.replace(/allowFullScreen/gi, ' ');
  bits = bits.replace(/onclick/gi, ' ');
  bits = bits.replace(/quot/gi, ' ');
  bits = bits.replace(/jpg/gi, ' ');
  bits = bits.replace(/png/gi, ' ');
  bits = bits.replace(/tagResults/gi, ' ');
  bits = bits.replace(/https/gi, ' ');
  bits = bits.replace(/amp/gi, ' ');
  bits = bits.replace(/html/gi, ' ');
  bits = bits.replace(/\<br\>/gi, ' ');
  bits = bits.replace(/http/gi, ' ');
  bits = bits.replace(/href/gi, ' ');
  bits = bits.replace(/img/gi, ' ');
  bits = bits.replace(/src/gi, ' ');
  bits = bits.replace(/favicons\?domain/gi, ' ');
  bits = bits.replace(/span/gi, ' ');
  bits = bits.replace(/div/gi, ' ');
  bits = bits.replace(/[a-zA-Z_]+=[a-zA-Z_0-9\%]+/gi, ' ');
  bits = bits.replace(/[a-zA-Z_]+="[a-zA-Z_0-9\%]+"/gi, ' ');

  bits = bits.replace(/\%20/gim, ' ');
  bits = bits.replace(/\%2F/gim, ' ');
  bits = bits.replace(/www\./gim, '');
  bits = bits.replace(/\.com/gim, '');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/[^a-z0-9\/]+/gim, ' ');
  bits = bits.replace(/\s+/gim, ' ');
  bits = bits.replace(/\/\//gim, ' ');
  bits = bits.replace(/\//gim, ' ');
  bits = bits.replace(/\s+/gim, ' ');

  //https://stackoverflow.com/questions/41588708/regex-match-any-word-with-numbers
  bits = bits.replace(/\S*\d+\S*/gi, ' ');

  return bits;
}

function replaceAll(str, de, para) {
  var pos = str.indexOf(de);
  while (pos > -1) {
    str = str.replace(de, para);
    pos = str.indexOf(de);
  }
  return str;
}
