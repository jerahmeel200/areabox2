import React, { Component } from 'react';
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import Head from 'next/head';
// import { Head } from "next/document";

import FirebaseDatabase from '../firebase.js';
import { auth } from '../../../../areaboi3/src/client/settings/firebase.js';

let gFbDatabase = 0;
const CLIENT_ID =
  '50702511384-2vfq2gsqj2ppd9miathd0vk2kucuod4f.apps.googleusercontent.com'; // for Google auth
const COTTER_KEY = 'ff5e431f-ad98-4ded-9abb-c1930ee6c807';

class Register extends Component {
  constructor(props) {
    super(props);
    this.state = { user: 0 };

    gFbDatabase = FirebaseDatabase(); //just to init the Fb
    //window.recaptchaVerifier = new firebase.auth.RecaptchaVerifier('recaptcha-container'); //??

    console.log('firebase.auth', typeof auth);
    //console.log( "RecaptchaVerifier", typeof(firebase.auth.RecaptchaVerifier) );
    this.signout = this.signout.bind(this);
    this.continueLogin = this.continueLogin().bind(this);
  }

  // Configure FirebaseUI.
  uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'popup',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      // TODO(developer): Remove the providers you don't need for your app.
      {
        provider: '', //firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        // Required to enable this provider in One-Tap Sign-up.
        authMethod: 'https://accounts.google.com',
        // Required to enable ID token credentials for this provider.
        clientId: CLIENT_ID
      }
      //firebase.auth.PhoneAuthProvider.PROVIDER_ID,
      //firebase.auth.FacebookAuthProvider.PROVIDER_ID,
      //firebase.auth.TwitterAuthProvider.PROVIDER_ID,
      //firebase.auth.GithubAuthProvider.PROVIDER_ID,
      /*{//does not work it loggs inbut areabox dont get notified
      		provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
      		//signInMethod: firebase.auth.EmailAuthProvider.EMAIL_LINK_SIGN_IN_METHOD //not worked need extra details, use password
    	  }*/
    ],
    callbacks: {
      // Avoid redirects after sign-in.
      signInSuccessWithAuthResult: () => false
    }
    // Terms of service url.
    //'tosUrl': 'https://www.google.com',
    /*
    'credentialHelper': CLIENT_ID && CLIENT_ID != 'YOUR_OAUTH_CLIENT_ID' ?
            firebaseui.CredentialHelper.GOOGLE_YOLO :
            firebaseui.CredentialHelper.ACCOUNT_CHOOSER_COM
    */
  };

  // Listen to the Firebase Auth state and set the local state.
  componentDidMount() {
    const { onRegisterFinish, show } = this.props;

    //firebase
    this.unregisterAuthObserver = auth.onAuthStateChanged((user) => {
      console.log('unregisterAuthObserver');
      if (user) {
        this.setState({ user: auth.currentUser.displayName });
        console.log(user);
      }
    });

    //cotter
    var config = {
      ApiKeyID: COTTER_KEY,
      //local  "d79ef67f-94f4-4d42-b7bf-5709d9fcd006"
      //femi   6f26bb08-ab95-4e26-9c5a-29ee26ad1054

      RedirectURL: 'https://areabox-chat-next9.firebaseapp.com/login',
      Type: 'PHONE', // EMAIL or PHONE
      CountryCode: ['+234', '+351', '+1'], // IT HAS TO BE AN ARRAY
      ContainerID: 'cotter-container-signup',
      IdentifierField: 'phoneNumber',
      SkipRedirectURL: true,
      OnSuccess: (payload) => {
        // SET Token Cookie/localstorage here
        console.log('clotter OnSuccess', payload);

        if (validateCotterToken(payload.token)) {
          console.log('Auth token to firebase');
          this.continueLogin(paylod.phoneNumber);
        } else console.log('Auth token invalid');
      },
      OnBegin: (payload) => {
        console.log('clotter onBegin', payload);
        return null;
      }
    };
    var cotter = new Cotter(config);
    console.log('cotter.app', cotter);
    cotter.showForm();
    console.log('cotter.app shows');
    document.getElementById('cotter-container-signup').style.height = '500px';
  }

  // Make sure we un-register Firebase observers when the component unmounts.
  componentWillUnmount() {
    this.unregisterAuthObserver();
  }

  signout() {
    firebase.auth().signOut();
    this.setState({ user: 0 });
  }

  render() {
    const { show } = this.props;
    const { user } = this.state;

    console.log('Register', this.state.user, show);

    return (
      <div>
        <Head>
          {/* <script
            src="https://js.cotter.app/lib/cotter.js"
            type="text/javascript"
          ></script> */}
        </Head>

        {user == 0 && (
          <div>
            <center>
              <p>Please sign-in:</p>
            </center>
            <StyledFirebaseAuth uiConfig={this.uiConfig} firebaseAuth={auth} />

            <div style={{ height: '400px', backgroundColor: '#eee' }}>
              <p>Alternate Phone SignIn in with Cotter.app</p>
              <div id="cotter-container-signup"></div>
            </div>
          </div>
        )}
        {user != 0 && (
          <div>
            <p>Welcome {user}! You are now signed-in!</p>
            <a onClick={this.signout}>«Sign-out«</a>
          </div>
        )}
      </div>
    );
  }
}

// // uiCallback={ui => ui.disableAutoSignIn()}

export default Register;
