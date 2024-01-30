let Firebase = import('firebase');

let firebase_config = {
  apiKey: '1a4YRriMpIrX8xNEmAMel0G4PFRlqcGIQfSDOtsU',
  authDomain: 'radiant-fire-9060.firebaseapp.com',
  databaseURL: 'https://radiant-fire-9060.firebaseio.com'
};

export default function () {
  return Firebase.then((firebase) => {
    return firebase.initializeApp(firebase_config, 'Areaboi_' + Date.now());
  }).catch((err) => {
    console.log('could not load firebase lib ', err);
    return null;
  });
}
