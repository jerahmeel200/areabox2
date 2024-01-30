import React, { useState, useEffect } from 'react';
import { database, auth } from '../firebase';
import useStateCallback from '../helpers/useStateCallback';
import { onAuthStateChanged } from 'firebase/auth';
import { child, onValue, ref as refD } from 'firebase/database';

const FirebaseContext = React.createContext(null);
export const AuthContext = React.createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState();
  const [currentDate, setCurrentDate] = useState(0);
  const [exp, setExp] = useState(0);
  const [is2FA, setIs2FA] = useState(false);
  // const [user, setUser] = useStateCallback()
  const [loadingAuthState, setLoadingAuthState] = useState(true);
  const readSession = () => {
    let exp = new Date();
    // exp.setDate(exp);
    exp = exp.getTime();

    onAuthStateChanged(auth, (user) => {
      const localAuth = JSON.parse(localStorage.getItem('auth'));
      //auth.onAuthStateChanged((user) => {
      if (user) {
        const username = user.displayName;
        // setIs2FA(true)
        onValue(
          child(refD(database, 'users'), `${username}`),
          (snapshot) => {
            //database.ref('users').child(`${username}`).once('value', (snapshot) => {
            if (snapshot.exists) {
              setUser(snapshot.val());
              setLoggedIn(true);
            }
            if (localAuth !== null) {
              setIs2FA(snapshot.val() && localAuth.exp > exp);
            }
          },
          { onlyOnce: true }
        );
      }
    });
  };
  // setUser(true)
  useEffect(() => {
    readSession();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        user,
        setUser,
        setLoggedIn,
        is2FA,
        setIs2FA
        // loadingAuthState
      }}>
      {children}
    </AuthContext.Provider>
  );
};

// export const withFirebase = Component => props => (
//   <FirebaseContext.Consumer>
//     {firebase => <Component {...props} firebase={firebase} />}
//   </FirebaseContext.Consumer>
// );

export default FirebaseContext;
