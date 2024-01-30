import React, { useContext, useEffect, useState } from 'react';
import PhoneCodeSelect from '../Select/PhoneCode';
// import firebase from "firebase/compat/app";
import {
  child,
  get,
  getDatabase,
  onValue,
  ref as refD,
  update
} from 'firebase/database';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber,
  getAuth
} from 'firebase/auth';
import axios from 'axios';
import { AuthContext } from '../../context/Context';
import { database, auth } from '../../firebase';
export function Register({ history }) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneCode, setPhoneCode] = useState('+234');
  const [OTP, setOTP] = useState('');
  const [qrOTP, setQrOTP] = useState('');
  const [OTPError, setOTPError] = useState(null);
  const [QROTPError, setQROTPError] = useState(null);
  const [userQR, setUserQR] = useState(null);
  const [verifier, setVerifier] = useState(null);
  const [validateOtp, setValidateOtp] = useState(null);
  const [qrcode, setQrcode] = useState('');
  const [multiFactorVerification, setMultiFactorVerification] = useState(false);
  const [otpConfirmation, setOtpConfirmation] = useState(null);
  // const [user, setUser] = useState();
  const { setLoggedIn, loggedIn, setUser, user, setIs2FA } =
    useContext(AuthContext);
  const url =
    'https://us-central1-areabox-chat.cloudfunctions.net/admin/areaboi_qr_code';
  // const history = useHistory()
  //authentication service directly from firebase withour the app
  //   const auth = getAuth();
  auth.useDeviceLanguage();
  //   const database = getDatabase();   grgerffv gbgv
  const getOTP = async (e) => {
    e.preventDefault();
    if (phoneNumber) {
      const res = await requestOTP(`${phoneCode}${phoneNumber}`);
      if (res instanceof Error) {
        setPhoneNumberError('Invalid Number');
      } else {
        setIsPhoneValid(res);
      }
    } else {
      setPhoneNumberError('Invalid Phone Number!');
    }
  };

  const requestOTP = async (phoneNumber) => {
    if (!phoneNumber) {
      return new Error('Missing Phone number');
    }
    // phone(phoneNumber);
    let useVerifier = verifier;
    if (!useVerifier) {
      useVerifier = new RecaptchaVerifier(
        'areaboi-capture-field',
        {
          size: 'invisible',
          callback: (response) => {
            // reCAPTCHA solved, allow signInWithPhoneNumber.
          }
        },
        auth
      );
      setVerifier(useVerifier);
    }

    try {
      const confirmationResult = await signInWithPhoneNumber(
        auth,
        phoneNumber,
        useVerifier
      );
      setOtpConfirmation(confirmationResult);
      return true;
    } catch (error) {
      return new Error(error);
    }
  };

  const getUserByUid = (uid) => {
    const userData = get(child(getDatabase(), `users/${uid}`)).then(
      (snapshot) => {
        //
        if (snapshot.exists()) {
          return snapshot.val();
        } else {
          return null; // User not found
        }
      }
    );

    return userData;
    // const snapshot = await onValue(userRef);
  };

  // const userTest =  {
  //     "profile": {
  //       "address": {
  //         "boundingbox": [
  //           "5.096667",
  //           "5.136667",
  //           "7.513333",
  //           "7.553333"
  //         ],
  //         "class": "place",
  //         "display_name": "Umu Aja, Obi Ngwa, Abia State, Nigeria",
  //         "icon": "https://nominatim.openstreetmap.org/ui/mapicons/poi_place_village.p.20.png",
  //         "importance": 0.48500000000000004,
  //         "lat": "5.116667",
  //         "licence": "Data © OpenStreetMap contributors, ODbL 1.0. https://osm.org/copyright",
  //         "lon": "7.533333",
  //         "osm_id": 501497427,
  //         "osm_type": "node",
  //         "place_id": 3755678,
  //         "type": "village"
  //       },
  //       "aristo": 2,
  //       "celoKey": "0x7638d2cd59e8dd99568ab2ac54f466458494f872bbb2df74dd6d4e48cedbcf22",
  //       "phoneNo": "+2349045769460",
  //       "userName": "SmartDemo"
  //     },
  //     "userName": "SmartDemo"
  //   }

  const verifyOTP = async (code) => {
    if (code.length !== 6 || !otpConfirmation) {
      return new Error('Invalid OTP code');
    }

    try {
      const res = await otpConfirmation.confirm(code);
      setOtpConfirmation(null);
      setVerifier(null);
      return res;
    } catch (error) {
      setOtpConfirmation(null);
      return new Error(error);
    }
  };

  const axiosCofig = {
    url: 'https://us-central1-areabox-chat.cloudfunctions.net/admin/areaboi_qr_code',
    method: 'POST'
  };

  // const testDemo = async () => {
  //   const res = await axios.post('https://us-central1-areabox-chat.cloudfunctions.net/admin/verify_otp', {user: userTest, code: "400902"})
  //
  // }

  const signUserOut = () => {
    setOTPError('Access denied');
    localStorage.setItem('auth', null);
    setTimeout(() => {
      auth
        .signOut()
        .then(function () {
          setLoggedIn(false);
          setUser();

          setQROTPError('Invalid code');
          setPhoneNumberError('Access denied');
        })
        .catch(function (error) {});
    }, 5000);
  };

  const checkQROTP = async (e) => {
    e.preventDefault();
    axios
      .post(
        'https://us-central1-areabox-chat.cloudfunctions.net/admin/verify_auth_otp',
        { user: userQR, code: qrOTP }
      )
      .then((res) => {
        if (res.data === true) {
          let exp = new Date();
          exp.setDate(exp.getDate() + 14);
          exp = exp.getTime();

          localStorage.setItem(
            'auth',
            JSON.stringify({ is2fa: true, exp: exp })
          );

          setIs2FA(true);
          history.push('/add-new-post');
        }
      })
      .catch((err) => {
        setQrOTP('');
        setMultiFactorVerification(false);
        signUserOut();
      });
  };
  const validateAuth = async (e) => {
    e.preventDefault();
    axios
      .post(
        'https://us-central1-areabox-chat.cloudfunctions.net/admin/validate_otp',
        { user: user, code: validateOtp }
      )
      .then((res) => {
        if (res.data === true) {
          let exp = new Date();
          exp.setDate(exp.getDate() + 14);
          exp = exp.getTime();

          localStorage.setItem(
            'auth',
            JSON.stringify({ is2fa: true, exp: exp })
          );

          setIs2FA(true);
          history.push('/add-new-post');
        }
      })
      .catch((err) => {
        setQrOTP('');
        setMultiFactorVerification(false);
        signUserOut();
      });
  };

  const checkOTP = async (e) => {
    e.preventDefault();
    const res = await verifyOTP(OTP);
    // axiosCofig
    if (res instanceof Error) {
      setOTPError('Invalid Verification Code!');
    } else {
      setOTPError(null);
      setIsPhoneValid(res);
      get(
        child(
          refD(database, 'users'),
          res.user.displayName || res.user.uid || res.user.userName
        )
      ).then((snapshot) => {
        if (
          snapshot.val() === null ||
          !snapshot.val()?.role ||
          snapshot.val()?.role === 'USER'
        ) {
          signUserOut();
        } else {
          //
          setMultiFactorVerification(true);
          const userData = snapshot.val();

          //
          if (!userData.auth || !userData.auth.mfaEnabled) {
            axios
              .post(axiosCofig.url, { user: snapshot.val() })
              .then((response) => {
                setQrcode(response.data.otpauth_url);
                get(child(refD(database, 'users'), `${user.userName}`)).then(
                  (response) => {
                    setUserQR(response.val());
                  }
                );
              })
              .catch((error) => {});
          }
        }
      });
    }
  };

  return (
    <>
      <div className={isPhoneValid ? 'hideGetOTP' : 'getOTP'}>
        <form onSubmit={(e) => getOTP(e)} className="phoneForm">
          {phoneNumberError && <p className="error">{phoneNumberError}</p>}
          <div className="phone">
            <PhoneCodeSelect onSelect={setPhoneCode} />
            <input
              className="phoneNumber"
              type="text"
              onChange={({ target: { value } }) => setPhoneNumber(value)}
              autoFocus
            />
          </div>
          <button type="submit" className="OTPButton">
            Phone Number
            <div className="yellowArrow">
              <img src="../static/img/yellow-arrow.svg" alt="arrow" />
            </div>
          </button>
          <p className="prompt">
            We will send a message to this number with a verification code
          </p>

          <div id="areaboi-capture-field"></div>
        </form>
      </div>
      {isPhoneValid && (
        <form
          className={multiFactorVerification ? 'hideGetOTP' : 'verifyOTP'}
          onSubmit={(e) => checkOTP(e)}>
          {OTPError && <p className="error">{OTPError}</p>}
          <input
            value={OTP}
            onChange={({ target: { value } }) => setOTP(value)}
            placeholder="OTP"
            className="otpInput"
            autoFocus
          />
          <button type="submit" className="OTPButton">
            Verification Code
            <div className="yellowArrow">
              <img src="static/img/yellow-arrow.svg" alt="arrow" />
            </div>
          </button>
        </form>
      )}
      {multiFactorVerification && (
        <form
          className="verifyOTP"
          onSubmit={(e) => (qrcode ? checkQROTP(e) : validateAuth(e))}>
          {QROTPError && <p className="error">{QROTPError}</p>}
          {qrcode ? (
            <>
              <small style={{ textAlign: 'center' }}>
                SCAN WITH YOUR AUTHENTICATOR APP
              </small>
              <img src={qrcode} />
              <input
                value={qrOTP}
                onChange={({ target: { value } }) => setQrOTP(value)}
                placeholder="Authentication code"
                className="otpInput"
                autoFocus
              />
              <button type="submit" className="OTPButton">
                Send Code
                <div className="yellowArrow">
                  <img src="static/img/yellow-arrow.svg" alt="arrow" />
                </div>
              </button>
            </>
          ) : (
            <>
              <small style={{ textAlign: 'center' }}>VALIDATE 2FA OTP</small>
              <input
                value={validateOtp}
                onChange={({ target: { value } }) => setValidateOtp(value)}
                placeholder="Authentication code"
                className="otpInput"
                autoFocus
              />
              <button type="submit" className="OTPButton">
                Validate OTP
                <div className="yellowArrow">
                  <img src="static/img/yellow-arrow.svg" alt="arrow" />
                </div>
              </button>
            </>
          )}
        </form>
      )}
      <style jsx>
        {`
          .getOTP {
            width: 360px;
            display: flex;
            margin-top: 5rem;
            align-items: center;
            flex-direction: column;
            text-align: center;
          }

          .hideGetOTP {
            display: none;
          }

          .phoneForm {
            width: 90%;
          }

          .phone {
            display: flex;
            margin-left: 1rem;
          }

          .phoneNumber {
            width: 79.5%;
            border: 1px solid black;
            border-left: none;
            padding: 1rem;
            outline: none;
            background-color: white;
          }

          .error {
            position: absolute;
            color: red;
            right: 2.5rem;
            top: 9rem;
            font-size: 0.8rem;
          }

          .verifyOTP {
            width: 360px;
            height: 80vh;
            display: flex;
            margin-top: 5rem;
            align-items: center;
            flex-direction: column;
            text-align: center;
            position: relative;
          }

          .otpInput {
            border: 1px solid black;
            width: 90%;
            padding: 1.06rem;
          }

          .OTPButton {
            padding: 0.75rem;
            background-color: black;
            color: white;
            width: 90%;
          }

          .yellowArrow {
            display: inline;
            float: right;
          }

          .prompt {
            font-size: 0.7rem;
          }

          .google {
            background-color: white;
            outline: none;
            border: 1px solid black;
            margin: 4rem;
            width: 80%;
            padding: 0.5rem;
            display: flex;
            justify-content: center;
            align-items: center;
            position: relative;
          }

          .google > img {
            position: absolute;
            left: 2rem;
          }

          .google:hover {
            cursor: pointer;
          }

          .look {
            background-color: white;
            border: 1.5px solid black;
            padding: 0.5rem 0;
            width: 60%;
            color: black;
            box-shadow: 0 5px 0px -1.5px black;
            position: relative;
            display: flex;
            align-items: center;
            justify-content: center;
          }

          .look > span {
            font-weight: bolder;
          }

          .look span > a {
            text-decoration: none;
            color: black;
          }

          .look > img {
            position: absolute;
            left: 1rem;
          }
        `}
      </style>
    </>
  );
}

export default Register;
