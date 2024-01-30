import React, { useContext, useState } from 'react';
import PropTypes from 'prop-types';
import { Card, Button, CardHeader, FormInput } from 'shards-react';
import { withRouter, Redirect } from 'react-router-dom';

import { auth } from '../../firebase';
import { AuthContext } from '../../context/Context';
import {
  GoogleAuthProvider,
  browserSessionPersistence,
  getAdditionalUserInfo,
  signInWithPhoneNumber,
  setPersistence,
  onAuthStateChanged,
  signInWithPopup
} from 'firebase/auth';
import { child, onValue, ref as refD } from 'firebase/database';
// import { store } from "../../flux/store";
import { useStore } from 'react-redux';
import Register from './Register';
// import { useAuth } from "../../../../../src/client/context/auth";
// const phoneAuth = useAuth()
const googleBtn = {
  padding: '12px 18px',
  margin: ' 0 0 50px 0',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  fontSize: '16px'
};

const googleBtnImg = {
  width: '16px',
  height: '16px',
  padding: '0',
  margin: '0 5px',
  verticalAlign: 'middle'
};

const LoginPage = ({ history, title }) => {
  // const store = useStore();
  const [error, setErrors] = useState('');
  const { user, setUser, setLoggedIn, isLoggedIn, is2FA } =
    useContext(AuthContext);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [verificationId, setVerificationId] = useState('');
  const [OTP, setOTP] = useState('');
  const [phoneCode, setPhoneCode] = useState('+234');

  // user = true;

  const handlePhoneNumberChange = (e) => {
    setPhoneNumber(e.target.value);
  };

  // const getOTP = async (e) => {
  //   e.preventDefault();
  //   if (phoneNumber) {
  //     const res = await requestOTP(`${phoneCode}${phoneNumber}`);
  //     if (res instanceof Error) {
  //       console.log(res.message);
  //       console.log(`${phoneCode}${phoneNumber}`);
  //       setPhoneNumberError("Invalid Number");
  //     } else {
  //       setIsPhoneValid(res);
  //     }
  //   } else {
  //     setPhoneNumberError("Invalid Phone Number!");
  //   }
  // };

  // const requestOTP = async (phoneNumber) => {
  //   if (!phoneNumber) {
  //     return new Error("Missing Phone number");
  //   }
  //   phone(phoneNumber);
  //   let useVerifier = verifier;
  //   if (!useVerifier) {
  //     useVerifier = new RecaptchaVerifier(
  //       "areaboi-capture-field",
  //       {
  //         size: "invisible",
  //         callback: (response) => {
  //           // reCAPTCHA solved, allow signInWithPhoneNumber.
  //         },
  //       },
  //       auth
  //     );
  //     setVerifier(useVerifier);
  //   }

  //   try {
  //     const confirmationResult = await signInWithPhoneNumber(
  //       auth,
  //       phoneNumber,
  //       useVerifier
  //     );
  //     setOtpConfirmation(confirmationResult);
  //     return true;
  //   } catch (error) {
  //     return new Error(error);
  //   }
  // };

  // const checkOTP = async (e) => {
  //   e.preventDefault();
  //   const res = await verifyOTP(OTP);
  //   if (res instanceof Error) {
  //     setOTPError("Invalid Verification Code!");
  //   } else {
  //     setOTPError(null);
  //     setIsPhoneValid(res);
  //     console.log("afterotp", res);
  //     console.log("afterotpuser", res.user);
  //     onRegisterFinish(res, res.user);
  //     if (res.user) {
  //       let signedUp = res.user.metadata.lastSignInTime;
  //       let creation = res.user.metadata.creationTime;
  //       if (signedUp !== creation) {
  //         changeReg();
  //         onRegisterFinish(res.user, {
  //           userName: auth.currentUser.displayName,
  //           busStop: "",
  //           firebaseRef: FirebaseDatabase,
  //         });
  //       } else {
  //         signUp();
  //       }
  //     }
  //   }
  // };

  // const verifyOTP = async (code) => {
  //   if (code.length !== 6 || !otpConfirmation) {
  //     return new Error("Invalid OTP code");
  //   }

  //   try {
  //     const res = await otpConfirmation.confirm(code);
  //     setOtpConfirmation(null);
  //     setVerifier(null);
  //     return res;
  //   } catch (error) {
  //     setOtpConfirmation(null);
  //     return new Error(error);
  //   }
  // };

  onAuthStateChanged(auth, (user) => {
    if (user) {
      console.log('User logged in:', user);
      // Perform any necessary actions after user login state change
    } else {
      console.log('User logged out');
      // Perform any necessary actions after user logout state change
    }
  });

  const signInWithGoogle = () => {
    const provider = new GoogleAuthProvider(); //new authInit.GoogleAuthProvider();
    setPersistence(auth, browserSessionPersistence) //firebase.auth().setPersistence(authInit.Auth.Persistence.SESSION)
      .then(() => {
        signInWithPopup(auth, provider) //auth.signInWithPopup(provider)
          .then((res) => {
            const username = getAdditionalUserInfo(res).profile.name; //res.additionalUserInfo.profile.name;
            onValue(child(refD('users'), `${username}`), (snapshot) => {
              //database.ref("users").child(`${username}`).once("value", snapshot => {
              if (snapshot.exists) {
                setUser(snapshot.val());
                setTimeout(() => {
                  setLoggedIn(true);
                  history.push('/add-new-post');
                }, 0);
              }
            });
          })
          .catch((e) => setErrors(e.message));
      });
  };

  return (
    <>
      {is2FA && user ? (
        <Redirect to={{ pathname: '/add-new-post' }} />
      ) : (
        <Card style={{ maxWidth: '500px' }} className="mb-3 ml-auto mr-auto">
          <span>{error}</span>
          <CardHeader className="border-bottom ml-auto mr-auto">
            <img
              src={require('./../../images/avatars/areaboi.png')}
              alt="areaboi logo"
            />
          </CardHeader>
          {/* <div className="p-3 d-flex justify-content-center">
            <Button
              theme="secondary"
              onClick={() => signInWithGoogle()}
              style={googleBtn}
            >
              <img
                src="https://upload.wikimedia.org/wikipedia/commons/5/53/Google_%22G%22_Logo.svg"
                alt="logo"
                style={googleBtnImg}
              />
              Login With Google
            </Button>
          </div> */}
          <div className="p-3 d-flex justify-content-center">
            <Register history={history} />
            {/* <FormInput onChange={handlePhoneNumberChange} placeholder="Enter phone number" />{" "}
            <button onClick={getOTP}>Send OTP</button>
            <br />
            <label htmlFor="otp">OTP:</label>
            <input
              type="text"
              id="otp"
              value={otp}
              onChange={handleOTPChange}
            />
            <button onClick={handleVerifyOTP}>Verify OTP</button> */}
          </div>
        </Card>
      )}
    </>
  );
};

LoginPage.propTypes = {
  /**
   * The component's title.
   */
  title: PropTypes.string
};

LoginPage.defaultProps = {
  title: 'Login'
};

export default withRouter(LoginPage);
