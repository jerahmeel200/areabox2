const admin = require('firebase-admin');
const functions = require('firebase-functions');
const next = require('next');

const bodyParser = require('body-parser');
const messagebird = require('messagebird').initClient(
  '2v7Ty0ikHV3hPAJ6PgQcl7l5b'
);

const express = require('express');
const server = express();
const basicAuth = require('basic-auth');

const buffer = require('buffer');
const tweetnacl = require('tweetnacl');
const oembetter = require('oembetter')();
const urls = require('url');

const sharp = require('sharp');
const { Storage } = require('@google-cloud/storage');
const multer = require('multer');
const { fileParser } = require('express-multipart-file-parser');
const fs = require('fs');
// const os = require("os");
// const path = require('path');
const crypto = require('crypto');
const util = require('util');
const qs = require('querystring');
const mime = require('mime-types');
const urlExists = require('url-exists');
const tmp = require('tmp');
global.atob = require('atob');
const cors = require('cors');

// Celo
const Web3 = require('web3');
const ContractKit = require('@celo/contractkit');

// Init a new kit, connected to the alfajores testnet
const web3 = new Web3('https://alfajores-forno.celo-testnet.org');
const kit = ContractKit.newKitFromWeb3(web3);

const ETHEREUM_DERIVATION_PATH = "m/44'/60'/0'/0";
const CELO_DERIVATION_PATH = "m/44'/52752'/0'/0";

// Web scraping
const metascraper = require('metascraper')([
  require('metascraper-description')(),
  require('metascraper-image')(),
  require('metascraper-title')()
]);
const axios = require('axios');

//http://expressjs.com/en/resources/middleware/cors.html#simple-usage-enable-all-cors-requests
var corsOptions = {
  origin: 'https://chat.areabox.tv',
  optionsSuccessStatus: 200 // some legacy browsers (IE11, various SmartTVs) choke on 204
};

// Setup the Mux SDK
// const MUX_TOKEN_ID = "0918afa5-80d8-4221-bbdf-b06d334726f6";
// const MUX_TOKEN_SECRET = "f6oN9WJaNa0aMh/giOZ5LwTOLQ1Dw6xxT8EWtdN8rfiII9Ptu/k2RnifyY1glyjZfgRLAaYLB3z"
// const Mux = require('@mux/mux-node');
// const { Video } = new Mux(MUX_TOKEN_ID || process.env.MUX_TOKEN_ID, MUX_TOKEN_SECRET || process.env.MUX_TOKEN_SECRET);

// Cloud Storage and Admin Details
const projectId = 'areabox-chat';
const bucketName = `${projectId}.appspot.com`;
const keyFileName = './areabox-chat-e63f7e047acb.json';
// const serviceAccount = require('../../service_account.json');
const embedEndpoints = [
  { domain: 'spotify.com', endpoint: 'https://embed.spotify.com/oembed/' },
  { domain: 'soundcloud.com', endpoint: 'https://soundcloud.com/oembed' },
  {
    domain: 'dailymotion.com',
    endpoint: 'https://www.dailymotion.com/services/oembed'
  },
  { domain: 'animoto.com', endpoint: 'http://animoto.com/oembeds/create' },
  { domain: 'vimeo.com', endpoint: 'https://vimeo.com/api/oembed.json' },
  { domain: 'audiomack.com', endpoint: 'https://audiomack.com/oembed' },
  {
    domain: 'ethfiddle.com',
    endpoint: 'https://ethfiddle.com/services/oembed/'
  },
  { domain: 'flickr.com', endpoint: 'https://www.flickr.com/services/oembed/' },
  {
    domain: 'funnyordie.com',
    endpoint: 'http://www.funnyordie.com/oembed.json'
  },
  { domain: 'codepen.io', endpoint: 'https://codepen.io/api/oembed' },
  { domain: 'codesandbox.io', endpoint: 'https://codesandbox.io/oembed' },
  { domain: 'repl.it', endpoint: 'https://repl.it/data/oembed' },
  {
    domain: 'slideshare.net',
    endpoint: 'http://www.slideshare.net/api/oembed/2'
  },
  {
    domain: 'ted.com',
    endpoint: 'https://www.ted.com/services/v1/oembed.json'
  },
  { domain: 'tiktok.com', endpoint: 'https://www.tiktok.com/oembed' },
  { domain: 'd.tube', endpoint: 'https://api.d.tube/oembed' },
  {
    domain: 'audioboom.com',
    endpoint: 'https://audioboom.com/publishing/oembed/v4.json'
  },
  { domain: 'livestream.com', endpoint: 'https://livestream.com/oembed' },
  { domain: 'twitch.tv', endpoint: 'https://api.twitch.tv/v5/oembed' },
  { domain: 'twitter.com', endpoint: 'https://publish.twitter.com/oembed' },
  {
    domain: 'gettyimages.com',
    endpoint: 'http://embed.gettyimages.com/oembed'
  },
  { domain: 'reddit.com', endpoint: 'https://www.reddit.com/oembed' },
  { domain: 'mathembed.com', endpoint: 'http://mathembed.com/oembed' },
  { domain: 'scribd.com', endpoint: 'http://www.scribd.com/services/oembed/' },
  { domain: 'docdroid.net', endpoint: 'https://www.docdroid.net/api/oembed' },
  { domain: 'issuu.com', endpoint: 'https://issuu.com/oembed' },
  { domain: 'gfycat.com', endpoint: 'https://api.gfycat.com/v1/oembed' },
  {
    domain: 'streamable.com',
    endpoint: 'https://api.streamable.com/oembed.json'
  },
  { domain: 'coub.com', endpoint: 'http://coub.com/api/oembed.json' },
  { domain: 'commaful.com', endpoint: 'https://commaful.com/api/oembed/' },
  { domain: 'verse.com', endpoint: 'http://verse.com/services/oembed/' },
  { domain: 'nfb.ca', endpoint: 'http://www.nfb.ca/remote/services/oembed/' },
  { domain: 'mixcloud.com', endpoint: 'https://www.mixcloud.com/oembed/' },
  {
    domain: 'radiopublic.com',
    endpoint: 'https://oembed.radiopublic.com/oembed'
  },
  { domain: 'vevo.com', endpoint: 'https://www.vevo.com/oembed' },
  { domain: 'iheart.com', endpoint: 'https://www.iheart.com/oembed' },
  {
    domain: 'rumble.com',
    endpoint: 'https://rumble.com/api/Media/oembed.json'
  },
  {
    domain: 'deviantart.com',
    endpoint: 'http://backend.deviantart.com/oembed'
  },
  {
    domain: 'nytimes.com',
    endpoint: 'https://www.nytimes.com/svc/oembed/json/'
  },
  { domain: 'simplecast.com', endpoint: 'https://simplecast.com/oembed' },
  { domain: 'fite.tv', endpoint: 'https://www.fite.tv/oembed' },
  { domain: 'ifixit.com', endpoint: 'http://www.ifixit.com/api/doc/embed' },
  { domain: 'ora.tv', endpoint: 'https://www.ora.tv/oembed/*?format=json' },
  { domain: 'me.me', endpoint: 'https://me.me/oembed' },
  {
    domain: 'reverbnation.com',
    endpoint: 'https://www.reverbnation.com/oembed'
  },
  {
    domain: 'datawrapper.de',
    endpoint: 'https://api.datawrapper.de/v3/oembed/'
  },
  {
    domain: 'crowdranking.com',
    endpoint: 'http://crowdranking.com/api/oembed.json'
  },
  {
    domain: 'ultimedia.com',
    endpoint: 'https://www.ultimedia.com/api/search/oembed'
  },
  {
    domain: 'edumedia-sciences.com',
    endpoint: 'https://www.edumedia-sciences.com/oembed.json'
  },
  { domain: 'roosterteeth.com', endpoint: 'https://roosterteeth.com/oembed' }
];

admin.initializeApp();
// {
//   credential: admin.credential.cert(serviceAccount),
//   databaseURL: "https://areabox-chat.firebaseio.com"
//

// const db = admin.database();

const storage = new Storage({
  projectId,
  keyFileName
});

const bucket = storage.bucket(bucketName);

// NEXTJS APP
const port = process.env.PORT || 3000;
const dev = process.env.NODE_ENV !== 'production';
// const origin = dev ? 'http://localhost:3000' : 'https://chat.areabox.tv'
const app = next({
  dev,
  // the absolute directory from the package.json file that initialises this module
  // IE: the absolute path from the root of the Cloud Function
  conf: { distDir: 'dist/client' }
});
const handle = app.getRequestHandler();

//based on
//https://github.com/zeit/next.js/blob/canary/examples/custom-server-express/server.js

app.prepare().then(() => {
  //https://expressjs.com/en/resources/middleware.html
  server.use(express.json());

  server.use(cors(corsOptions), function (req, res, next) {
    //console.log("process.env",process.env)
    // *** IMPORTANT NOTE *** dont forget to reset this to 'areabox.tv' for security
    res.setHeader('Access-Control-Allow-Origin', '*'); //'*' local media/link testing dont work anyway

    res.setHeader('Access-Control-Allow-Credentials', 'true');
    res.setHeader(
      'Access-Control-Allow-Methods',
      'GET,HEAD,OPTIONS,POST,PUT,DELETE'
    );
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method'
    );
    if (req.method === 'OPTIONS') {
      return res.status(200).end();
    }
    next();
  });

  server.use(express.urlencoded({ extended: false }));

  server.post('/login', function (request, response) {
    if (request.body) {
      console.log('server.js request.body', request.body); // your JSON, firebase does parse
      let opts = request.body;
      validateCotterToken(opts.token);

      //need config firebase IAM
      //https://console.developers.google.com/apis/api/iam.googleapis.com/overview?project=areabox-chat-next9
      let additionalClaims = {
        phoneNumber: opts.phoneNumber
      };
      admin
        .auth()
        .createCustomToken(opts.phoneNumber, additionalClaims)
        .then(function (customToken) {
          console.log('server.js created custom token');
          response.contentType('application/json');
          response.charset = 'utf-8';
          response.writeHead(200);
          //https://stackoverflow.com/questions/27253150/json-stringify-to-utf-8
          response.write(
            JSON.stringify({
              token: customToken,
              phoneNumber: opts.phoneNumber
            })
          );
          response.end();
        })
        .catch(function (error) {
          console.log('Error creating custom token:', error);
        });
    } else console.log('server.js login no body');
  }); //get

  //*************
  // UPLOAD APP *
  //*************

  server.use(
    fileParser({
      rawBodyOptions: {
        limit: '10mb'
      },
      busboyOptions: {
        limits: {
          fields: 2
        }
      }
    })
  );

  server.post('/upload', (req, res) => {
    if (!req.files[0]) {
      console.log('File not detected');
      res.status(400).send('No file uploaded');
      return;
    }

    const { originalname, mimetype, buffer } = req.files[0];

    uploadFile(originalname, mimetype, buffer, res, 0, 0);
  });

  server.post('/save-media', async (req, res) => {
    let { image } = req.body;
    try {
      let resizedImage = await resizeImage(image);
      return res.status(200).json(resizedImage);
    } catch (error) {
      console.log(error.message);
      return res.status(400).send(error.message);
    }
  });

  // ***********
  // AUDIO APP *
  // ***********

  server.post('/audio', (req, res) => {
    const { ext } = req.query;
    const { audiofile } = req.body;
    const originalname = `audio.${ext}`;

    getAudio(audiofile, originalname, ext, res);
  });

  // ***********
  // META ROUTE *
  // ***********
  server.get('/meta', async (req, res) => {
    try {
      let { u } = req.query;
      u = decodeURI(u);
      u = Object.keys(qs.parse(u))[0];

      // async function wait(ms) {
      //   return new Promise(resolve => {
      //     setTimeout(resolve, ms);
      //   });
      // }

      if (!u) {
        return res.status(200).send('No query');
      }

      // avoid odd err connect ECONNREFUSED 127.0.0.1:80
      if (u.trimLeft().indexOf('http') < 0) u = 'https://' + u;

      const url = u;
      const meta = {};
      const { data: html } = await axios(u);
      const metadata = await metascraper({ html, url });
      // await wait(10000);
      if (metadata) {
        const { title, image, description } = metadata;
        if (title) meta.title = title;
        if (image) {
          let resizedImage = await resizeImage(image);
          meta.img = resizedImage;
        }
        if (description) meta.texts = description;
        meta.success = true;
      }

      return res.status(200).json(meta);
    } catch (err) {
      console.log('meta error', err);
      res.status(500).send(err.message);
    }
  });

  //************
  // GET EMBED *
  //************
  server.get('/get-embed', (req, res) => {
    let { link } = req.query;
    console.log('EMBED QUERY LINK', link);
    if (link) {
      link = decodeURI(link);
      link = Object.keys(qs.parse(link))[0];
      console.log('Embed Deco-Parsed Link', link);
      if (link.trimLeft().indexOf('http') < 0) {
        link = `https://${link}`;
      }

      const allowedEndpoints = [
        ...oembetter.suggestedEndpoints,
        ...embedEndpoints
      ];
      oembetter.endpoints(allowedEndpoints);

      // oembetter.whitelist(oembetter.suggestedWhitelist);
      // { maxwidth: 380, maxheight: 380 }

      oembetter.fetch(link, (err, response) => {
        if (!err) {
          const html = response.html;
          return res.status(200).json({
            html
          });
        } else {
          console.log('EMBED ERROR', err.message);
          return res.status(400).send('No Embed HTML');
        }
      });
    } else {
      return null;
    }
  });

  server.post('/create-wallet', async (req, res) => {
    try {
      const account = kit.connection.web3.eth.accounts.create();
      res.status(201).json({ prvKey: account.privateKey });
    } catch (error) {
      res.status(500).send(error.message);
    }
  });

  // removing index from slash becaause of change in nextjs
  server.get('/cinema1', (req, res) => {
    return app.render(req, res, '/index', { rk: 'Cinema', ...req.query });
  });

  server.all('*', (req, res) => {
    return handle(req, res);
  });
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

function uploadFile(originalname, mimetype, buffer, res, filepath, cleanup) {
  const theMime = mime.lookup(originalname);
  let newFileName = '';
  let blobStream;

  (async () => {
    let file = 0;
    if (filepath) {
      const digest = await getDigest(filepath);
      newFileName = digest + '.' + mime.extension(theMime);
      const storagePath = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;
      const isurlExists = util.promisify(urlExists);
      const isExists = await isurlExists(storagePath);
      if (isExists) {
        return res.status(200).json({
          message: 'File uploaded already!',
          storagePath
        });
      }
      file = fs.createReadStream(filepath);
    } else {
      newFileName = `${Date.now()}_${originalname}`;
      newFileName = newFileName.replace(/[^\w.]+/g, '_');
    }

    const blob = bucket.file(newFileName);

    blobStream = blob.createWriteStream({
      metadata: {
        contentType: mimetype ? mimetype : theMime
      }
    });

    filepath ? file.pipe(blobStream) : null;

    blobStream.on('error', (err) => {
      console.log('Blobstream error', err.message);
      return res.status(500).send(err.message);
    });

    blobStream.on('finish', () => {
      const storageUrl = `https://storage.googleapis.com/${bucket.name}/${blob.name}`;

      blob.makePublic().then(() => {
        return res.status(200).json({
          message: 'File uploaded successfully',
          storageUrl
        });
      });
      if (cleanup) cleanup();
    });

    buffer ? blobStream.end(buffer) : null;
  })();
}

function getAudio(b64string, originalname, ext, res) {
  //var audio = Buffer.from(b64string, 'base64');
  const audio = dataURItoABuffer(b64string, `media/${ext}`);
  console.log('dataURItoABuffer Audio', audio);

  const tmpobj = tmp.fileSync();
  const writer = fs.createWriteStream('', { fd: tmpobj.fd });

  writer.write(Buffer.from(audio));

  writer.on('error', (err) => console.log('getAudio Error', err));

  writer.on('finish', function () {
    uploadFile(originalname, 0, 0, res, tmpobj.name, () =>
      tmpobj.removeCallback()
    );
  });

  writer.end();
}

// https://gist.github.com/fupslot/5015897
// https://www.npmjs.com/package/blob
function dataURItoABuffer(dataURI) {
  // convert base64 to raw binary data held in a string
  // doesn't handle URLEncoded DataURIs - see SO answer #6850276 for code that does this
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

const getDigest = (filepath) => {
  return new Promise((resolve, reject) => {
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
};

function resizeImage(imgUrl) {
  return new Promise((resolve, reject) => {
    axios({
      method: 'get',
      url: imgUrl,
      responseType: 'stream'
    })
      .then((response) => {
        let transformer = sharp().resize({ height: 350 }).png();

        //clip url for filename until ? or #
        const urlId = imgUrl.replace(/((\?|#).*)?$/, '');
        // const linkId = crypto.createHash('sha1').update(imgUrl).digest("hex");

        // let ref = admin.database().ref('card').child(`links/${linkId}`)
        // ref.on("value", function (snapshot) {
        //   if (snapshot.exists()) {
        //     const link = snapshot.val().url
        //     resolve(link)
        //     return;
        //   } else {
        let newFileName = `${Date.now()}_${urlId}`;
        newFileName = newFileName.replace(/[^\w.]+/g, '_');

        const blob = bucket.file(newFileName);
        const blobstream = blob.createWriteStream({
          resumable: false,
          validation: false,
          gzip: true,
          contentType: 'auto',
          metadata: {
            'Cache-Control': 'public, max-age=31536000'
          }
        });
        console.log('image successfully converted to: ', blobstream);
        response.data
          .pipe(transformer)
          .pipe(blobstream)
          .on('error', (error) => {
            reject(error);
          })
          .on('finish', () => {
            console.log('image converted successfully');
            const storageUrl = `https://storage.googleapis.com/${bucket.name}/${newFileName}`;
            // ref.set({ url: storageUrl });
            resolve(storageUrl);
          });
        // }
      })
      .catch((err) => {
        reject('Image transfer error. ', err);
      });
  });
}
console.log('resizeImage');

//***********
// RESIZE APP *
//***********
//     //clip url for filename until ? or #
//     var urlid = url.replace(/((\?|#).*)?$/, '');   /* hashes and query strings ----^  */
//     var urlfbid = crypto.createHash('sha1').update(url).digest("hex");
//     var ref = db.ref(`snap/links/${urlfbid}`);
//     // is it on firebase db
//     ref.on("value", function (snapshot) {
//       if (snapshot.exists()) {
//         var link = snapshot.val().url
//         console.log("cached redirect", link)
//         res.redirect(link)
//         return;
//       } else {
//         console.log("not cached ");
//         let newFileName = (`${Date.now()}_${urlid}.png`);
//         newFileName = newFileName.replace(/[^\w.]+/g, "_");   //   /[^a-zA-Z0-9]+/g works but replaces dots too
//         const filepath = path.join(os.tmpdir(), newFileName);
//         (async () => {
//           // const browser = await puppeteer.launch({ args: ['--no-sandbox', '--disable-setuid-sandbox'] });
//           // const page = await browser.newPage();
//           // await page.goto(url);
//           // await page.screenshot({ path: filepath });
//           // await browser.close();
//           const link = await uploadFile(filepath, 0, newFileName, res, false, 0, true);
//           //save to firebase db
//           console.log("caching", link)
//           ref = db.ref("snap");
//           var urlRef = ref.child(`links/${urlfbid}`);
//           urlRef.set({ url: link });
//           console.log("cached")
//           res.redirect(link)
//         })();
//       }
//     }); //not cached
//   }
// )

//***********
// INTEGRATION OF MESSAGE_BIRD *
//***********

server.post('/send-sms', (req, res) => {
  const { recipient, message } = req.body;

  const params = {
    originator: '12072808077',
    recipients: [recipient],
    body: message
  };

  messagebird.messages.create(params, (err, response) => {
    if (err) {
      console.error(err);
      res.status(500).json({ error: err.errors[0].description });
    } else {
      console.log(response);
      res.status(200).json(response);
    }
  });
});

//Using existing Express apps
//https://firebase.google.com/docs/functions/http-events
exports.nextjs = functions.https.onRequest(server);
