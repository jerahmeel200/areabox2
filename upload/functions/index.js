const functions = require('firebase-functions');

const express = require('express');
const multer = require('multer');
const fs = require('fs');
//var B2 = require('easy-backblaze');
//var crypto = require('crypto');
const path = require('path');

//var b2 = new B2('c123615cf6be', '00148a5f731ead2888299a29cf1e336f36bc6c1f52');
const tmp = require('tmp');
const os = require('os');

const Busboy = require('busboy');

const firebase = require('firebase');
const googleStorage = require('@google-cloud/storage');
const mime = require('mime-types');
//const urlo= require('url')
const puppeteer = require('puppeteer');
var crypto = require('crypto');
var urlExists0 = require('url-exists');
const util = require('util');

//audio
global.atob = require('atob');
//const busboy = require('connect-busboy');

// Import Admin SDK
var admin = require('firebase-admin');
admin.initializeApp();
var db = admin.database();

// for OGP
var ogs = require('open-graph-scraper');

import { Buffer } from 'buffer';
import { sign } from 'tweetnacl';
import admin from 'firebase-admin';

// MAIN
const app = express();
app.use(express.json());

app.use(function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*'); //*** TESTING ONLY *** change to https://chat.areabox.tv

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

// *************
// UPLOAD APP  *
// *************

//https://stackoverflow.com/questions/31530200/node-multer-unexpected-field
var upload = multer({ dest: os.tmpdir() });

/** Permissible loading a single file, 
    the value of the attribute "name" in the form of "recfile". **/

const storage = googleStorage(); //from deploy config
const bucket = storage.bucket('uploads-485d4');

//https://github.com/expressjs/multer
app.post('/upload', upload.single('recfile'), function (req, res) {
  //console.log(req.body);

  /*
  var opts= JSON.parse(req.body);
  if( !opts.user) {
	  res.set(500);
	  res.end();
	  return;
  }
  */

  /** When using the "single"
      data come in "req.file" regardless of the attribute "name". **/
  if (req.file) {
    // local or not having FB upload issues
    var tmp_path = req.file.path;
    uploadFile(tmp_path, 0, req.file.originalname, res, true);
  } else {
    // FB upload issues
    //https://stackoverflow.com/questions/47242340/how-to-perform-an-http-file-upload-using-express-on-cloud-functions-for-firebase

    const busboy = new Busboy({ headers: req.headers });
    // This object will accumulate all the uploaded files, keyed by their name
    //var hash = crypto.createHash('sha1'); //md5

    // This callback will be invoked for each file uploaded
    busboy.on('file', (fieldname, file, filename, encoding, mimetype) => {
      console.log(
        `File [${fieldname}] filename: ${filename}, encoding: ${encoding}, mimetype: ${mimetype}`
      );
      // Note that os.tmpdir() is an in-memory file system, so should only
      // be used for files small enough to fit in memory.
      const filepath = path.join(os.tmpdir(), filename);
      console.log(`Saving '${fieldname}' to ${filepath}`);
      let stream = fs.createWriteStream(filepath);
      //uploadFile(0, file, `${filename}_${Date.now()}`, res, true);

      file.on('data', function (data) {
        console.log('File [' + fieldname + '] got ' + data.length + ' bytes');
        stream.write(data);
        //hash.update(data, 'utf8')
      });
      file.on('end', function () {
        console.log('File [' + fieldname + '] Finished');
        stream.end();
        uploadFile(filepath, 0, filename, res, true);
      });
    });

    // This callback will be invoked after all uploaded files are saved.
    busboy.on('finish', () => {});

    // The raw bytes of the upload will be in req.rawBody.  Send it to busboy, and get
    // a callback when it's finished.

    if (req.rawBody) {
      busboy.end(req.rawBody);
    } else {
      req.pipe(busboy);
    }
  }
});

function uploadFile(
  tmp_path,
  file,
  originalname,
  res,
  isframe,
  cleanup,
  redirect
) {
  //console.log("index:uploadFile 01");
  let prom = new Promise((resolve, reject) => {
    uploadImageToStorage(file, tmp_path, originalname)
      .then((url) => {
        console.log('index:uploadFile 02', url, isframe);

        if (isframe) {
          res.contentType('text/html');
          res.charset = 'utf-8';
          res.writeHead(200);
          //res.write("<html><script>parent.uploaded('"+url+"')</script></html>", encoding='utf8')
          res.write(
            "<html><script>parent.postMessage('" +
              url +
              "','https://chat.areabox.tv')</script></html>"
          );
          res.end();
        } else if (redirect) {
          //nothing
        } else {
          console.log('set text plain');
          res.contentType('text/plain');
          res.charset = 'utf-8';
          res.writeHead(200);
          res.write(url, (encoding = 'utf8'));
          res.end();
          console.log('uploaded audio url', url);
          if (cleanup) cleanup();
        }
        resolve(url);
      })
      .catch((error) => {
        res.set(500);
        console.error(error);
        reject(0);
      });
  }); //promise
  return prom;
}

/**
 * Upload the image file to Google Storage
 * @param {File} file object that will be uploaded to Google Storage
 */
//https://medium.com/@stardusteric/nodejs-with-firebase-storage-c6ddcf131ceb
const uploadImageToStorage = (file, filepath, fname) => {
  let newFileName = 0;
  const theMime = mime.lookup(fname);

  let prom = new Promise((resolve, reject) => {
    (async () => {
      let file1 = 0;
      if (!file) {
        console.log('using tmp file', filepath);

        const digest = await getDigest(filepath);
        newFileName = digest + '.' + mime.extension(theMime);
        //console.log('using digest', digest);
        const urlExists = util.promisify(urlExists0);
        //console.log('urlExists', urlExists);
        const storage_path = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;
        let isExists = await urlExists(storage_path); // true
        //console.log('url exists', isExists);
        if (isExists) {
          resolve(storage_path);
          return;
        }
        //console.log('newFileName', newFileName);

        file1 = fs.createReadStream(filepath);
      } else {
        //console.log('using input file param');
        //buffer= file.buffer;
        file1 = file;
        newFileName = `${Date.now()}_${fname}`;
        newFileName = newFileName.replace(/[^\w.]+/g, '_'); //   /[^a-zA-Z0-9]+/g works but replaces dots too
      }
      if (!newFileName) {
        reject('error checking cache');
        return;
      }

      let fileUpload = bucket.file(newFileName); //a blob

      const blobStream = fileUpload.createWriteStream({
        metadata: {
          contentType: theMime
        }
      });

      file1.pipe(blobStream);

      blobStream.on('error', (error) => {
        reject(
          'Something is wrong! Unable to upload at the moment, err= ' +
            JSON.stringify(error)
        );
      });

      blobStream.on('finish', () => {
        // The public URL can be used to directly access the file via HTTP.

        const url = `https://storage.googleapis.com/${bucket.name}/${fileUpload.name}`;
        //or if not public then with token https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${fileUpload.name}?alt=media&token=from json object of prev url
        resolve(url);
      });
      //blobStream.end(buffer);
    })(); //async
  }); //promise
  return prom;
};

// ***********
// AUDIO APP *
// ***********

// for diferent subdomains
//https://isamatov.com/node-js-busboy-reading-both-file-and-text-form-parameters/
app.post('/audio', function (req, res) {
  //upload.none() //busboy({ immediate: true }),
  console.log('any audio b64?');
  const ext = req.param('ext');
  const originalname = 'audio.' + ext;

  var b64string = 0;
  //console.log( req.body)
  //if( req.body.recfile) //from multer
  //  getAudio(req.body.recfile, originalname, ext)
  //else
  {
    //for firebase
    //https://stackoverflow.com/questions/47242340/how-to-perform-an-http-file-upload-using-express-on-cloud-functions-for-firebase
    const busboy = new Busboy({ headers: req.headers });

    //console.log( "busboy", req.busboy)

    let formData = new Map();
    //https://stackoverflow.com/questions/49526142/get-field-value-from-form-with-busboy
    busboy.on('field', (fieldname, value) => {
      //req.body[fieldname] = value
      console.log('got body param', fieldname);
      formData.set(fieldname, value);
    });
    busboy.on('finish', function () {
      getAudio(formData.get('recfile'), originalname, ext, res);
    });
    if (req.rawBody) {
      busboy.end(req.rawBody);
    } else {
      req.pipe(busboy);
    }
    //https://www.npmjs.com/package/busboy#readme
  }
  //res.end()
});

function getAudio(b64string, originalname, ext, res) {
  //var audio = Buffer.from(b64string, 'base64');
  var audio = dataURItoABuffer(b64string, 'media/' + ext);

  var tmpobj = tmp.fileSync();
  //console.log('File: ', tmpobj.name);
  //console.log('Filedescriptor: ', tmpobj.fd);
  var writer = fs.createWriteStream('', { fd: tmpobj.fd });
  //https://nodejs.org/api/fs.html#fs_fs_createwritestream_path_options

  writer.write(new Buffer(audio));

  writer.on('error', function (err) {
    console.log('app.post audio', err);
  });
  writer.on('finish', function () {
    uploadFile(tmpobj.name, 0, originalname, res, true, function () {
      tmpobj.removeCallback();
    });
  });

  writer.end();
}

// https://gist.github.com/fupslot/5015897
// https://www.npmjs.com/package/blob
function dataURItoABuffer(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
  console.log('dataURI', dataURI);

  var byteString = atob(dataURI.split(',')[1]);

  // separate out the mime component
  var mimeString = dataURI.split(',')[0].split(':')[1].split(';')[0];
  console.log('dataURItoBlob mime', mimeString);

  // write the bytes of the string to an ArrayBuffer
  var ab = new ArrayBuffer(byteString.length);
  var ia = new Uint8Array(ab);
  for (var i = 0; i < byteString.length; i++) {
    ia[i] = byteString.charCodeAt(i);
  }

  return ab;
}

// for same domain if using xmlhttprequest :
/*
app.post('/audio', function (req, res) {
   console.log("any audio?")	
   const ext= req.param('ext');
    //console.log("audio", req.read());
	
	const originalname= 'audio.'+ext
	//create tmp file to use for upload	
	tmp.file(function (err, path, fd, cleanup) {
		if (err) throw err;
		console.log("tmp_path", path, originalname);
		
		req.on('readable', function(){  
  			console.log("readable ", bin.length)	
			const bin= req.read()
			if( bin == null ) return;
			console.log("len ", bin.length)
			fs.appendFile(path, bin);		
		});	
		req.on('end', function() {
			console.log("end ", bin.length)	
			uploadFile(path, 0, originalname, res, false, cleanup);	
			//next();
		});
	});

	console.log("uploading...");  
});
*/

const getDigest = (filepath) => {
  let prom = new Promise((resolve, reject) => {
    var fd = fs.createReadStream(filepath);
    var hash = crypto.createHash('sha1');
    hash.setEncoding('hex');
    fd.on('end', function () {
      hash.end();
      resolve(hash.read()); // the desired sha1sum
    });
    // read all file and pipe it (write it) to the hash object
    fd.pipe(hash);
  });
  return prom;
};

//***********
// SNAP APP *
//***********

app.get('/snap', function (req, res) {
  var url = req.param('u');
  if (!url) {
    console.log('no param');
    res.contentType('text/plain');
    res.charset = 'utf-8';
    res.writeHead(200);
    res.write('no params', (encoding = 'utf8'));
    res.end();
  }
  console.log('snap ', url);

  //clip url for filename until ? or #
  var urlid = url.replace(
    /((\?|#).*)?$/,
    ''
  ); /* hashes and query strings ----^  */
  var urlfbid = crypto.createHash('sha1').update(url).digest('hex');

  var ref = db.ref(`snap/links/${urlfbid}`);

  // is it on firebase db
  ref.on('value', function (snapshot) {
    if (snapshot.exists()) {
      var link = snapshot.val().url;
      console.log('cached redirect', link);
      res.redirect(link);
      return;
    } else {
      console.log('not cached ');

      let newFileName = `${Date.now()}_${urlid}.png`;
      newFileName = newFileName.replace(/[^\w.]+/g, '_'); //   /[^a-zA-Z0-9]+/g works but replaces dots too
      const filepath = path.join(os.tmpdir(), newFileName);

      //console.log("filepath ", filepath)

      (async () => {
        const browser = await puppeteer.launch({
          args: ['--no-sandbox', '--disable-setuid-sandbox']
        });
        const page = await browser.newPage();
        await page.goto(url);
        await page.screenshot({ path: filepath });
        await browser.close();
        const link = await uploadFile(
          filepath,
          0,
          newFileName,
          res,
          false,
          0,
          true
        );

        //save to firebase db
        console.log('caching', link);
        ref = db.ref('snap');
        var urlRef = ref.child(`links/${urlfbid}`);
        urlRef.set({ url: link });
        console.log('cached');

        res.redirect(link);
      })();
    }
  }); //not cached
});

//************
// OGP APP   *
//************

app.get('/ogp', function (req, res) {
  var url = req.param('u');
  if (!url) {
    console.log('no param');
    res.contentType('text/plain');
    res.charset = 'utf-8';
    res.writeHead(200);
    res.write('no params', (encoding = 'utf8'));
    res.end();
  }
  console.log('ogp ', url);

  var options = {
    url: url,
    timeout: 10000,
    encoding: 'utf8',
    //'blacklist': ['youtube.com'],
    headers: { 'accept-language': 'en' }
  };
  ogs(options)
    .then(function (r) {
      console.log('ogp result:', r);
      if (r.success && r.data) {
        if (r.data.ogTitle) r.title = r.data.ogTitle;
        if (r.data.ogImage) r.img = r.data.ogImage;
        if (r.data.ogDescription) r.texts = r.data.ogDescription;
      }
      res.contentType('application/json');
      res.charset = 'utf-8';
      res.writeHead(200);
      res.write(JSON.stringify(r), (encoding = 'utf8'));
      res.end();
    })
    .catch(function (error) {
      console.log('ogp error:', error);
      res.status(500).send(error);
    });
});

app.use(express.bodyParser());

app.post('/login', function (request, response) {
  if (request.body) {
    console.log(request.body); // your JSON, firebase does parse
    let opts = request.body;
    validateCotterToken(opts);
    admin.initializeApp({
      credential: admin.credential.cert(service_account),
      databaseURL: 'https://areabox-chat-next9.firebaseio.com'
    });

    let uid = opts.phoneNumber;

    admin
      .auth()
      .createCustomToken(uid, opts)
      .then(function (customToken) {
        firebase
          .auth()
          .signInWithCustomToken(customToken)
          .catch(function (error) {
            console.log('signInWithCustomToken', error.code, error.message);
          });
      })
      .catch(function (error) {
        console.log('Error creating custom token:', error);
      });
  } else console.log('login no body');
});
function validateCotterToken(token) {
  if (token.receiver != COTTER_KEY) return false;
  var message = `${token.identifier}${token.identifier_type}${token.receiver}${token.expire_at}`;
  var pubKey = 'qqOaiQGjGsxBMgI5rdAasaACRiJthOqadmefjY5mS/c=';
  var signature = token.signature;

  const messageUint8 = new Uint8Array(Buffer.from(message, 'utf8'));
  const signatureUint8 = new Uint8Array(Buffer.from(signature, 'base64'));
  const pubKeyUint8 = new Uint8Array(Buffer.from(pubKey, 'base64'));

  return sign.detached.verify(messageUint8, signatureUint8, pubKeyUint8);
}

// dummy response for testing only
app.get('/upload', (req, res) => res.send('Upload server listening!'));

// firebase registry of apps
const upload_app = functions.https.onRequest(app);

module.exports = {
  upload_app
};
