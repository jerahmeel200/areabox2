const express = require('express');
const functions = require('firebase-functions');
const bodyParser = require('body-parser');

const buffer = require('buffer');
const tweetnacl = require('tweetnacl');

// Import Admin SDK
var admin = require('firebase-admin');

//https://firebase.google.com/docs/auth/admin/create-custom-tokens#letting_the_admin_sdk_discover_a_service_account
admin.initializeApp();

//var db = admin.database();
/*
	admin.initializeApp({
  	 credential: admin.credential.cert(SERVICE_ACCOUNT),
 	 databaseURL: "https://areabox-chat-next9.firebaseio.com"
});*/

//https://firebase.google.com/docs/auth/admin/create-custom-tokens
/*admin.initializeApp({
  serviceAccountId: 'firebase-adminsdk-96mzq@areabox-chat.iam.gserviceaccount.com',
});*/

const app = express();

app.use(bodyParser.json(), function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'https://chat.areabox.tv');
  /*
	res.setHeader('Access-Control-Allow-Methods', 'GET, POST'); //, OPTIONS, PUT, PATCH, DELETE 
	res.setHeader('Access-Control-Allow-Headers', 'Origin,X-Requested-With,content-type, Authorization, Accept'); 
	res.setHeader('Access-Control-Allow-Credentials', true); 
*/
  //https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS
  res.setHeader('Access-Control-Allow-Methods', 'POST, GET, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'X-PINGOTHER, Content-Type');
  res.setHeader('Access-Control-Max-Age', '86400');
  res.setHeader('Vary', 'Accept-Encoding, Origin');

  if ('OPTIONS' === req.method) {
    res.send(204);
  } else {
    next();
  }
});

// dummy response for testing only
app.get('/ping', (req, res) => res.send('Upload server listening!'));

app.post('/login', function (request, response) {
  if (request.body) {
    console.log(request.body); // your JSON, firebase does parse
    let opts = request.body;
    validateCotterToken(opts.token);

    let uid = opts.phoneNumber;

    //need config firebase IAM
    //https://console.developers.google.com/apis/api/iam.googleapis.com/overview?project=areabox-chat-next9

    admin
      .auth()
      .createCustomToken(uid, opts)
      .then(function (customToken) {
        /*firebase.auth().signInWithCustomToken(customToken).catch( function(error) {
  	  		console.log( "signInWithCustomToken", error.code, error.message);
		});*/

        response.contentType('application/json');
        response.charset = 'utf-8';
        response.writeHead(200);
        response.write(
          JSON.stringify({ token: customToken, phoneNumber: opts.phoneNumber }),
          (encoding = 'utf8')
        );
        response.end();
      })
      .catch(function (error) {
        console.log('Error creating custom token:', error);
      });
  } else console.log('login no body');
});

//https://docs.cotter.app/verify-email-and-phone-number/validating-cotters-token#example
function validateCotterToken(token) {
  if (token.receiver != 'ff5e431f-ad98-4ded-9abb-c1930ee6c807') return false;
  var message = `${token.identifier}${token.identifier_type}${token.receiver}${token.expire_at}`;
  var pubKey = 'qqOaiQGjGsxBMgI5rdAasaACRiJthOqadmefjY5mS/c=';
  var signature = token.signature;

  const messageUint8 = new Uint8Array(buffer.Buffer.from(message, 'utf8'));
  const signatureUint8 = new Uint8Array(
    buffer.Buffer.from(signature, 'base64')
  );
  const pubKeyUint8 = new Uint8Array(buffer.Buffer.from(pubKey, 'base64'));

  return tweetnacl.sign.detached.verify(
    messageUint8,
    signatureUint8,
    pubKeyUint8
  );
}

// firebase registry of apps
const upload_app = functions.https.onRequest(app);

module.exports = {
  upload_app
};
