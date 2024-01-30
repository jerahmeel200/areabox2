const firebase = require('firebase/app');
require('firebase/auth');
require('firebase/database');

// to get these settings:
// on Firebase console click on Overview settings icon, then on "add Firebase to your web app"
const firebase_config = {
  apiKey: 'AIzaSyD62f6UAhPWZArs9Nn37Vpz81I6y-NARyo',
  authDomain: 'areabox-chat.firebaseapp.com',
  databaseURL: 'https://areabox-chat.firebaseio.com',
  projectId: 'areabox-chat'
  //storageBucket: "areabox-chat.appspot.com", //not used it still uses uploads project
  //messagingSenderId: "654163414128" //not used
};

console.log('firebase.js ', firebase_config.databaseURL);

//export default firebase.initializeApp(firebase_config, "Areaboi_"+Date.now())

export default () => {
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

    /*
    //https://firebase.google.com/docs/auth/web/auth-state-persistence
        firebase.auth().setPersistence(firebase.auth.Auth.Persistence.LOCAL)
      .then(function() {
        console.log("setPersistence ")
        var provider = new firebase.auth.PhoneAuthProvider();
        return firebase.auth().signInWithRedirect(provider);
      })
      .catch(function(error) {
        // Handle Errors here.
        var errorCode = error.code;
        var errorMessage = error.message;
              console.log("error setPersistence: ", errorCode, errorMessage )
        });
    */

    return res;
  } else {
    return firebase.database();
  }
};
