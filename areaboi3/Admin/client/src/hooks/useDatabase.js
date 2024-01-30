import {
  child,
  equalTo,
  off,
  onChildAdded,
  orderByKey,
  push,
  query,
  ref as refD,
  setPriority,
  setWithPriority,
  update
} from 'firebase/database';
import { database } from '../firebase';

const useDatabase = () => {
  const saveDocument = (
    roomKey,
    { title, content, movieCID, userName },
    roomLength,
    writes,
    callback
  ) => {
    const user = `Areaboi ${userName}`;
    console.log('Save Document', roomKey, title, content, movieCID);
    const chatsRef = child(refD(database, 'chat'), roomKey); //database.ref('chat').child(roomKey);

    const newPublish = push(chatsRef); //chatsRef.push()
    const msgKey = newPublish.key;
    const data =
      roomKey === 'Cinema'
        ? {
            cache_version: 28,
            name: user,
            tit: title,
            title,
            video: movieCID,
            room_key: roomKey
          }
        : {
            cache_version: 28,
            name: user,
            tit: title,
            embedHTML: content,
            room_key: roomKey
          };

    const t = Date.now();
    setWithPriority(newPublish, data, t); //newPublish.setWithPriority(data, t)
    setPriority(chatsRef, t); //chatsRef.setPriority(t)
    update(child(chatsRef, msgKey), data); //chatsRef.child(msgKey).update(data);

    const orderedChatsRef = query(chatsRef, orderByKey(), equalTo(msgKey)); //chatsRef.orderByKey().equalTo(msgKey);
    onChildAdded(
      orderedChatsRef,
      (snapshot) => {
        //orderedChatsRef.once("child_added", snapshot => {
        off(orderedChatsRef); //orderedChatsRef.off();
        let dataSnap = snapshot.val();
        dataSnap.time =
          snapshot.exportVal()['.priority'] || snapshot['.priority']; //snapshot.getPriority();
        update(child(chatsRef, msgKey), dataSnap); //chatsRef.child(msgKey).update(dataSnap);
      },
      { onlyOnce: true }
    );

    if (roomLength === writes) {
      setTimeout(() => {
        callback();
      }, 2000);
    }
  };

  return { saveDocument };
};

export default useDatabase;
