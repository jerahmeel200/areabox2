const functions = require('firebase-functions');
const admin = require('firebase-admin');
const basicAuth = require('basic-auth');
const cors = require('cors');
const Mux = require('@mux/mux-node');
const express = require('express');
const RssFeedEmitter = require('rss-feed-emitter');
const axios = require('axios');
const path = require('path');
const fs = require('fs');
const FormData = require('form-data');
const { fileParser } = require('express-multipart-file-parser');
const crypto = require('crypto');
// const {base32lib: base32}  = require('base32lib')
const util = require('util');
const qrcode = require('qrcode');
const logger = require('firebase-functions/logger');
const { ref, update } = 'firebase/database';
// import { https } from 'firebase-functions';
const OTPAuth = require('otpauth');
const { encode } = require('hi-base32');
const { database } = './firebase';

const { getDatabase } = require('firebase-admin/database');

const app = express();
// const firebaseApp = initializeApp(firebaseConfig);
// const db = getDatabase(app);
const serviceAccount = require('./service_account.json');
const { onRequest, region } = require('firebase-functions/v1/https');
const port = process.env.PORT || 3006;
const dev = process.env.NODE_ENV !== 'production';
const origin = dev ? `${port}` : 'https://areabox-admin.firebaseapp.com';

const corsOptions = {
  origin: true,
  optionsSuccessStatus: 200
};

// Setup the Mux SDK
const MUX_TOKEN_ID = '0918afa5-80d8-4221-bbdf-b06d334726f6';
const MUX_TOKEN_SECRET =
  'f6oN9WJaNa0aMh/giOZ5LwTOLQ1Dw6xxT8EWtdN8rfiII9Ptu/k2RnifyY1glyjZfgRLAaYLB3z';
const { Video } = new Mux(
  MUX_TOKEN_ID || process.env.MUX_TOKEN_ID,
  MUX_TOKEN_SECRET || process.env.MUX_TOKEN_SECRET
);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: 'https://areabox-chat.firebaseio.com'
});

const db = admin.firestore();
const realTimeDb = getDatabase();

if (!dev) {
  app.use(express.static('client/build'));
}
app.use(cors(corsOptions), function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader(
    'Access-Control-Allow-Methods',
    'GET,HEAD,OPTIONS,POST,PUT,DELETE'
  );
  res.setHeader(
    'Access-Control-Allow-Headers',
    'Origin,Cache-Control,Accept,X-Access-Token ,X-Requested-With, Content-Type, Access-Control-Request-Method'
  );
  // res.setHeader(("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, authorization"))
  // if (req.method === "OPTIONS") {
  //   return res.status(200).end();
  // }
  next();
});
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
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

// ***************
// MUX STREAMS   *
// ***************

let STREAM = {};
// Authentication Configuration
// const webhookUser = {
//   name: 'muxer', //TODO
//   pass: 'muxology', //TODO
// };
// const streamsRef = db.ref('streams');

// Mux Authentication Middleware
// const auth = (req, res, next) => {
//   function unauthorized(res) {
//     res.set('WWW-Authenticate', 'Basic realm=Authorization Required');
//     return res.send(401);
//   };
//   const user = basicAuth(req);
//   if (!user || !user.name || !user.pass) {
//     return unauthorized(res);
//   };
//   if (user.name === webhookUser.name && user.pass === webhookUser.pass) {
//     return next();
//   } else {
//     return unauthorized(res);
//   };
// };

// Creates a new Live Stream so we can get a Stream Key
const createLiveStream = async () => {
  // Create a new Live Stream!
  return await Video.LiveStreams.create({
    playback_policy: 'public',
    reconnect_window: 10,
    new_asset_settings: { playback_policy: 'public' }
  });
};

// Find a public playback ID and returns the first...
const getPlaybackId = (stream) => stream['playback_ids'][0].id;

// Gets a trimmed public stream details from a stream for use on the client side
const publicStreamDetails = (stream) => ({
  status: stream.status,
  playbackId: getPlaybackId(stream),
  recentAssets: stream['recent_asset_ids']
});

// Get the current live stream and its state for bootstrapping the app
app.get('/stream', async (req, res) => {
  try {
    const stream = await Video.LiveStreams.get(STREAM.id);
    res.status(200).json(publicStreamDetails(stream));
  } catch (error) {
    console.log('GET STREAM ERROR', error.message);
    return res.status(500).send(error.message);
  }
});

app.post('/create-stream', async (req, res) => {
  try {
    const stream = await createLiveStream();
    console.log('CREATED STREAM', stream);

    //store the stream into the database
    // admin.database().ref('streams').child(`${stream.id}`).set(stream)

    res.json({
      id: stream.id,
      playbackId: getPlaybackId(stream),
      streamKey: stream.stream_key,
      status: 'idle',
      created_at: stream.created_at
    });
  } catch (error) {
    console.log('CREATED STREAM ERROR', error.message);
    return res.status(500).send(error.message);
  }
});

// API to get all LiveStreams
app.get('/liveStreams', async (req, res) => {
  try {
    const liveStreams = await Video.LiveStreams.list();
    res.status(200).json(liveStreams);
  } catch (error) {
    console.log('All Streams Error', error.message);
    return res.status(500).send(error.message);
  }
});

// API which Returns the 5 most recent VOD assets made from our Live Stream
app.get('/recent', async (req, res) => {
  const recentAssetIds = STREAM['recent_asset_ids'] || [];
  try {
    // For each VOD asset we know about, get the details from Mux Video
    const assets = await Promise.all(
      recentAssetIds
        .reverse()
        .slice(0, 5)
        .map((assetId) =>
          Video.Assets.get(assetId).then((asset) => {
            return {
              playbackId: getPlaybackId(asset),
              status: asset.status,
              createdAt: asset.created_at
            };
          })
        )
    );
    res.status(200).json(assets);
  } catch (error) {
    console.log('GET RECENT STREAM ERROR', error.message);
    return res.status(503).send(error.message);
  }
});

// Listens for callbacks from Mux
app.post('/mux-hook', function (req, res) {
  // app.post('/mux-hook', auth, function (req, res) {
  // const streamId = req.body.data.id;
  const docRef = db.collection('streams').doc('current');

  docRef.update({
    status: req.body.data.status
  });

  res.status(200).send('Hurray');
});

app.get('/get-feeds', (req, res) => {
  const { url } = req.query;

  const feeder = new RssFeedEmitter();
  feeder.add({
    url: [url],
    refresh: 60000
  });

  const feeds = [];

  feeder.on('new-item', function (item) {
    feeds.push({
      title: item.title,
      link: item.link,
      date: item.date,
      summary: item.summary
    });
  });

  try {
    setTimeout(() => {
      res.status(200).json(feeds);
    }, 3500);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post('/pin-file', async (req, res) => {
  const { fileMetadata } = req.body;
  const pinataApiKey = '2435dd48663b5b61c372';
  const pinataSecretApiKey =
    'bdf7b0425474558cc057489eaa27b03152dfc9c97afc35e70afb1bb71af109b4';

  if (!req.files[0]) {
    console.log('File not detected');
    res.status(400).send('No file uploaded');
    return;
  }

  const { originalname, mimetype, buffer } = req.files[0];

  try {
    const data = await pinFileToIPFS(
      pinataApiKey,
      pinataSecretApiKey,
      originalname,
      fileMetadata
    );
    return res.status(201).json(data);
  } catch (error) {
    console.error(error);
    return res.status(400).send(error);
  }
});

function pinFileToIPFS(
  pinataApiKey,
  pinataSecretApiKey,
  filename,
  fileMetadata
) {
  return new Promise((resolve, reject) => {
    const url = `https://api.pinata.cloud/pinning/pinFileToIPFS`;

    //we gather a local file for this example, but any valid readStream source will work here.
    let data = new FormData();

    // const filePath = path.join(__dirname, "/areaboi.png");
    data.append('file', fs.createReadStream(filePath));

    //You'll need to make sure that the metadata is in the form of a JSON object that's been convered to a string
    //metadata is optional
    const metadata = JSON.stringify({
      name: filename,
      keyvalues: fileMetadata
    });
    data.append('pinataMetadata', metadata);

    //pinataOptions are optional
    const pinataOptions = JSON.stringify({
      cidVersion: 0,
      customPinPolicy: {
        regions: [
          {
            id: 'FRA1',
            desiredReplicationCount: 1
          },
          {
            id: 'NYC1',
            desiredReplicationCount: 2
          }
        ]
      }
    });
    data.append('pinataOptions', pinataOptions);

    return axios
      .post(url, data, {
        maxContentLength: 'Infinity', //this is needed to prevent axios from erroring out with large files
        headers: {
          'Content-Type': `multipart/form-data; boundary=${data._boundary}`,
          pinata_api_key: pinataApiKey,
          pinata_secret_api_key: pinataSecretApiKey
        }
      })
      .then(function (response) {
        resolve(response.data);
      })
      .catch(function (error) {
        console.log(error.message);
        reject(error.message);
      });
  });
}

// FUNCTIONS FOR GENERATION OF OTP

const generateRandomBase32 = () => {
  const buffer = crypto.randomBytes(15);
  const base32 = encode(buffer).replace(/=/g, '').substring(0, 24);
  return base32;
};

app.post('/validate_otp', async (req, res) => {
  try {
    const { code: token, user } = req.body;
    // const user = req.bod;

    const message = "Token is invalid or user doesn't exist";
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }
    let totp = new OTPAuth.TOTP({
      issuer: 'AreaBox',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: user.auth.mfaSecret
    });

    let delta = totp.validate({ token, window: 1 });

    if (delta === null) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }

    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});

app.post('/verify_auth_otp', async (req, res) => {
  try {
    const token = req.body.code;

    const user = req.body.user;
    const message = "Token is invalid or user doesn't exist";
    if (!user) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }

    let totp = new OTPAuth.TOTP({
      issuer: 'AreaBox',
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: user.auth.mfaSecret
    });

    let delta = totp.validate({ token });

    if (delta === null) {
      return res.status(401).json({
        status: 'fail',
        message
      });
    }

    await realTimeDb.ref(`/users/${user.userName}`).child('auth').update({
      mfaEnabled: true
    });

    res.status(200).json(true);
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
});
app.post('/areaboi_qr_code', async (req, res) => {
  // cors(async (req, res) => {

  // async (req: Request, res: Response) => {
  try {
    // const { user_id } = req.body;

    const user = req.body.user;

    if (!user) {
      return res.status(404).json({
        status: 'fail',
        message: 'No user with that email exists'
      });
    }

    const base32_secret = generateRandomBase32();

    let totp = new OTPAuth.TOTP({
      issuer: `AreaBox:${user.userName}`,
      algorithm: 'SHA1',
      digits: 6,
      period: 30,
      secret: base32_secret
    });

    let otpauth_url = totp.toString();

    await realTimeDb.ref(`/users/${user.userName}`).child('auth').update({
      // mfaSecret: user.auth.mfaSecret,
      // otp_auth_url: otpauth_url,
      mfaSecret: base32_secret
    });

    // prisma.user.update({
    //   where: { id: user_id },
    //   data: {
    //   },
    // });

    res.status(200).json({
      // base32: base32_secret,
      otpauth_url: await qrcode.toDataURL(otpauth_url)
    });
  } catch (error) {
    res.status(500).json({
      status: 'error',
      message: error.message
    });
  }
  // };

  // ///////////////////////////////////////////////////////
  // let user = req.body.user;

  // // const authUser = firebaseAuth().currentUser();

  // // user.mfaEnabled = false;
  // // For security, we no longer show the QR code after is verified
  // if (user?.auth?.mfaEnabled) return res.status(404).end();

  // // if (!user?.auth?.mfaSecret) {
  //   // generate unique secret for user
  //   // this secret will be used to check the verification code sent by user
  //   // const buffer = base32.encode(generateRandomSecretKey()); //randomBytes(256, (err, buff) => buff.toString('hex')); // uuidv4(); //util.promisify(crypto.randomBytes)(14);
  //   logger.info(base32.encode(await util.promisify(crypto.randomBytes)(14)).toString().replace(/=/g, ''))
  //   const userSecret = base32.encode(await util.promisify(crypto.randomBytes)(14))
  //   user = {
  //     ...user,
  //     auth: {
  //       mfaSecret: userSecret
  //     }
  //   }
  //   // user["auth"]["mfSecret"] = //base32lib.encode(buffer, "rfc4648");
  //   // update(child(ref(`/users/${user.userName}`), "auth"), mfaSecret: user.auth.mfaSecret,)
  //   await realTimeDb
  //   .ref(`/users/${user.userName}`)
  //   .child("auth")
  //   .update({
  //     mfaSecret: user.auth.mfaSecret,
  //   });
  //   // }`), {
  //     // });
  //     // user = user;
  //     // }
  //     logger.info(user.auth.mfaSecret, (`${user.auth.mfaSecret}`).replace(/=/g, ''), `${user.auth.mfaSecret.toString().replace(/=/g, '')}`);

  // const issuer = "AreaBox";
  // const algorithm = "SHA1";
  // const digits = "6";
  // const period = "30";
  // const otpType = "totp";
  // const configUri = `otpauth://${otpType}/${issuer}:${user.userName}?algorithm=${algorithm}&digits=${digits}&period=${period}&issuer=${issuer}&secret=${user.auth.mfaSecret.toString().replace(/=/g, '')}`;

  // res.setHeader("Content-Type", "text/json");

  // const otpauth = await qrcode.toDataURL(configUri);
  // res.json({ data: otpauth });
});

// image resizing
// function resizeImage(imgUrl) {
//   return new Promise((resolve, reject) => {
//     axios({
//       method: 'get',
//       url: imgUrl,
//       responseType: 'stream'
//     })
//       .then((response) => {
//         let transformer = sharp()
//           .resize({ height: 350 })
//           .png();

//         //clip url for filename until ? or #
//         const urlId = imgUrl.replace(/((\?|#).*)?$/, '');
//         // const linkId = crypto.createHash('sha1').update(imgUrl).digest("hex");

//         // let ref = admin.database().ref('card').child(`links/${linkId}`)
//         // ref.on("value", function (snapshot) {
//         //   if (snapshot.exists()) {
//         //     const link = snapshot.val().url
//         //     resolve(link)
//         //     return;
//         //   } else {
//         let newFileName = (`${Date.now()}_${urlId}`);
//         newFileName = newFileName.replace(/[^\w.]+/g, "_");

//         const blob = bucket.file(newFileName);
//         const blobstream = blob.createWriteStream({
//           resumable: false,
//           validation: false,
//           gzip: true,
//           contentType: "auto",
//           metadata: {
//             'Cache-Control': 'public, max-age=31536000'
//           }
//         })
//         console.log("image successfully converted to: ", blobstream );
//         response.data.pipe(transformer).pipe(blobstream)
//           .on('error', (error) => {
//             reject(error)
//           })
//           .on('finish', () => {
//             console.log("image converted successfully");
//             const storageUrl = `https://storage.googleapis.com/${bucket.name}/${newFileName}`
//             // ref.set({ url: storageUrl });
//             resolve(storageUrl)
//           });
//         // }
//       })
//       .catch(err => {
//         reject("Image transfer error. ", err);
//       });
//   })
// }

// app.post("/save-media", async (req, res) => {
//   let { image } = req.body;
//     try {
//       let resizedImage = await resizeImage(image)
//       return res.status(200).json(resizedImage);
//     } catch (error) {
//       console.log(error.message)
//       return res.status(400).send(error.message)
//     }
// })
// "chat/" + channel_id + "/" + post.key + "/reactions/" + emoji.name;

// app.listen(port, () => console.log(`> Server running on port ${port}`))
exports.admin = onRequest(app);

// FUNCTIONS
