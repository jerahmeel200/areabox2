import React, { useState, useEffect } from 'react';
import InputTrigger from '../reclibs/react-trigger';
// import firebase from "firebase";
import firebase from 'firebase/compat/app';
import {
  child,
  increment,
  onValue,
  push,
  ref as refD,
  set
} from 'firebase/database';
// import Tribute from 'react-tribute';

function useUSers(db) {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    let fbUsers = [];
    const userRef = refD(db, 'users'); // db.ref("users");
    onValue(
      userRef,
      (snapshot) =>
        snapshot.forEach((user) => {
          if (user.val().userName) {
            fbUsers.push({ key: user.key, userName: user.val().userName });
          }
          setUsers(fbUsers);
        }),
      { onlyOnce: false }
    );
    // userRef.once("value").then((snapshot) =>
    //   snapshot.forEach((user) => {
    //     if (user.val().userName) {
    //       fbUsers.push({ key: user.key, userName: user.val().userName });
    //     }
    //     setUsers(fbUsers);
    //   })
    // );
  }, []);
  return users;
}

const Mentions = ({
  children,
  textareaValue,
  setTextAreaValue,
  db,
  roomKey,
  currentUser
}) => {
  const [top, setTop] = useState(null);
  const [left, setLeft] = useState(null);
  const [showSuggestor, setShowSuggestor] = useState(false);
  const [text, setText] = useState(null);
  const [currentSelection, setCurrentSelection] = useState(0);
  const [startPosition, setStartPosition] = useState(null);
  const [mentionedUSer, setMentionedUser] = useState([]);

  const users = useUSers(db);

  useEffect(() => {
    const mentionsRef = refD(db, 'user-mentions'); // db.ref("user-mentions");
    const chatsRef = child(refD(db, 'chat'), roomKey); //db.ref("chat").child(roomKey);
    onValue(chatsRef, (data) => {
      if (mentionedUSer.length > 0) {
        return mentionedUSer.forEach((user) =>
          push(mentionsRef, {
            //mentionsRef.push({
            message_key: data.key,
            source_user: currentUser,
            target_user: user,
            room_key: roomKey,
            read: false,
            createdAt: firebase.database.ServerValue.TIMESTAMP
          })
        );
      }
      return null;
    });
    // chatsRef.on("child_changed", function(data) {
    //   if (mentionedUSer.length > 0) {
    //     return mentionedUSer.forEach((user) =>
    //       mentionsRef.push({
    //         message_key: data.key,
    //         source_user: currentUser,
    //         target_user: user,
    //         room_key: roomKey,
    //         read: false,
    //         createdAt: firebase.database.ServerValue.TIMESTAMP,
    //       })
    //     );
    //   }
    //   return null;
    // });

    onValue(mentionsRef, (data) => {
      const userMentioned = data.val()?.target_user;
      set(
        child(refD(db, `users/${userMentioned}/profile`), 'mentionCount'),
        increment(1)
      );
      // db.ref(`users/${userMentioned}/profile`)
      //   .child("mentionCount")
      //   .set(firebase.database.ServerValue.increment(1));
    });

    // mentionsRef.on("child_changed", function(data) {
    //   const userMentioned = data.val().target_user;
    //   db.ref(`users/${userMentioned}/profile`)
    //     .child("mentionCount")
    //     .set(firebase.database.ServerValue.increment(1));
    // });
  }, []);

  const toggleSuggestor = (metaInfo) => {
    const { hookType, cursor } = metaInfo;
    if (hookType === 'start') {
      setShowSuggestor(true);
      setLeft(cursor.left + 5);
      setTop(-(30 + cursor.top + cursor.height));
      setStartPosition(cursor.selectionStart);
    }

    if (hookType === 'cancel') {
      setShowSuggestor(false);
      setLeft(null);
      setTop(null);
      setStartPosition(null);
    }
  };

  const handleInput = (metaInfo) => setText(metaInfo.text);
  const endHandler = () => {
    console.log('Trigger ended');
  };
  const onKeyDown = (e) => {
    if (e.which === 40) {
      e.preventDefault();
      setCurrentSelection((currentSelection + 1) % users.length);
    }

    if (e.which === 38) {
      e.preventDefault();
      if (currentSelection < 0) return;
      setCurrentSelection((currentSelection - 1) % users.length);
    }

    if (e.which === 13) {
      // handleSuggestClick()
    }
  };

  const handleSuggestClick = (key) => {
    setCurrentSelection((currentSelection + 1) % users.length);
    const { userName } = users.find((u) => u.key === key);
    const newText = `${textareaValue.slice(
      0,
      startPosition - 1
    )}@${userName}${textareaValue.slice(
      startPosition + userName.length,
      textareaValue.length
    )}`;
    console.log('user key', key, userName);
    setShowSuggestor(false);
    setLeft(null);
    setTop(null);
    setText(null);
    setStartPosition(null);
    setTextAreaValue(newText);
    setMentionedUser([...mentionedUSer, key]);
    endHandler();
  };

  return (
    <div style={{ position: 'relative' }} onKeyDown={onKeyDown}>
      <InputTrigger
        trigger={{
          key: '@'
        }}
        onStart={(metadata) => toggleSuggestor(metadata)}
        onCancel={(metadata) => toggleSuggestor(metadata)}
        onType={(metadata) => handleInput(metadata)}
        endTrigger={(endHandler) => (endHandler = endHandler)}>
        {children}
      </InputTrigger>
      <div
        id="dropdown"
        style={{
          display: showSuggestor ? 'block' : 'none',
          top,
          left
        }}>
        {users
          .filter((user) => user.userName.toLowerCase().indexOf(text) !== -1)
          .map((user, index) => (
            <div
              className="username"
              onClick={() => handleSuggestClick(user.key)}
              key={user.key}
              style={{
                padding: '10px 20px',
                background: index === currentSelection ? '#eee' : ''
              }}>
              {user.userName}
            </div>
          ))}
      </div>

      <style jsx>
        {`
          #dropdown {
            position: absolute;
            min-width: 100px;
            max-height: 120px;
            background: white;
            z-index: 10;
            overflow-y: scroll;
            box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 4px;
          }
        `}
      </style>
    </div>
  );
};

export default Mentions;

// export default ({ children, textareaValue, setTextAreaValue, db }) => {
//   const [text, setText] = useState(null)
//   const [currentSelection, setCurrentSelection] = useState(0)
//   const [mentionedUSer, setMentionedUser] = useState([])
//   console.log({mentionedUSer})
//   const users = useUSers(db)

//   const options = {
//     values: users,
//     lookup: (user) => user.userName,
//     fillAttr: 'userName',
//     allowSpaces: true,
//   }

//   return (
//     <div>
//       <Tribute
//         options={options}
//       >
//         {children}
//       </Tribute>

//       <style jsx>{`
//         #dropdown {
//           position: absolute;
//           min-width: 100px;
//           max-height: 120px;
//           background: white;
//           z-index: 10;
//           overflow-y: scroll;
//           box-shadow: rgba(0, 0, 0, 0.4) 0px 1px 4px;
//         }
//         `}
//       </style>
//     </div>
//   )
// }
