import React, { useState } from 'react';
import PhoneCodeSelect from './Select/PhoneCode';
import {
  GoogleAuthProvider,
  signInWithPopup,
  RecaptchaVerifier,
  signInWithPhoneNumber
} from 'firebase/auth';
import { auth } from '../settings/firebase';

export function Register({
  onRegisterFinish,
  changeReg,
  signUp,
  phone,
  firebase
}) {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [phoneNumberError, setPhoneNumberError] = useState(null);
  const [isPhoneValid, setIsPhoneValid] = useState(false);
  const [phoneCode, setPhoneCode] = useState('+234');
  const [OTP, setOTP] = useState('');
  const [OTPError, setOTPError] = useState(null);
  const [verifier, setVerifier] = useState(null);
  const [otpConfirmation, setOtpConfirmation] = useState(null);

  auth.useDeviceLanguage();

  let phoneFunction = (code, number) => {
    console.log(`${code}${number}`);
  };

  const getOTP = async (e) => {
    e.preventDefault();
    if (phoneNumber) {
      const res = await requestOTP(`${phoneCode}${phoneNumber}`);
      if (res instanceof Error) {
        setPhoneNumberError(
          res.message.match(/\(auth\/([^)]+)\)/)[1].replace(/-/g, ' ')
        );
      } else {
        setIsPhoneValid(res);
      }
    } else {
      setPhoneNumberError('Invalid Phone Number!');
    }
    phoneFunction(phoneCode, phoneNumber);
  };

  const requestOTP = async (phoneNumber) => {
    if (!phoneNumber) {
      return new Error('Missing Phone number');
    }

    let useVerifier = verifier;
    if (!useVerifier) {
      useVerifier = new RecaptchaVerifier(
        'areaboi-capture-field',
        {
          size: 'invisible'
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
  const checkOTP = async (e) => {
    e.preventDefault();
    const res = await verifyOTP(OTP);
    if (res instanceof Error) {
      setOTPError('Invalid Verification Code!');
    } else {
      setOTPError(null);
      setIsPhoneValid(res);
      if (res.user) {
        const userName =
          res.user.displayName || res.user.email || res.user.phoneNumber;
        const userOpts = {
          userName,
          firebaseRef: firebase
        };
        onRegisterFinish(res.user, userOpts);
        if (userOpts.firebaseRef) {
          if (
            res.user.metadata.lastSignInTime !== res.user.metadata.creationTime
          ) {
            changeReg();
            onRegisterFinish(res.user, {
              userName,
              firebaseRef: firebase
            });
          } else {
            signUp();
          }
        }
      }
    }
  };

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

  const signInWithGoogle = async () => {
    const provider = new GoogleAuthProvider();

    signInWithPopup(auth, provider)
      .then((result) => {
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        setUser(result.user);
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        const email = error.customData.email;
        const credential = GoogleAuthProvider.credentialFromError(error);
        console.log(errorCode, errorMessage, email, credential);
      });
  };

  const googlePopup = async () => {
    await signInWithGoogle();
  };

  return (
    <>
      <div className={isPhoneValid ? 'hideGetOTP' : 'getOTP'}>
        <form onSubmit={getOTP} className="phoneForm">
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
        <button type="button" className="google" onClick={googlePopup}>
          <img src="static/img/glogo.svg" alt="glogo" />
          <span>Sign in with Google</span>
        </button>
        <div className="look">
          <img src="static/img/black-pacman-2.svg" alt="2" />
          <span>
            <a href="/metro">Look Around</a>
          </span>
        </div>
      </div>
      {isPhoneValid && (
        <form
          className="verifyOTP"
          onSubmit={async (e) => {
            e.preventDefault();
            const res = await checkOTP(e, OTP);
            if (res instanceof Error) {
              setOTPError('Invalid Verification Code!');
            } else {
              setOTPError(null);
              // OTP is valid, navigate to sign-up page
              signUp();
            }
          }}>
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
      <style jsx>
        {`
          .getOTP {
            width: 100vw;
            max-width: 768px;
            min-width: 360px;
            display: flex;
            margin-top: 10rem;
            align-items: center;
            flex-direction: column;
            text-align: center;
          }

          .hideGetOTP {
            display: none;
          }

          .phoneForm {
            width: 100%;
            position: relative;
            display: flex;
            flex-direction: column;
            align-items: center;
          }

          .phone {
            display: flex;
            width: 90%;
          }

          .phoneNumber {
            width: 100%;
            border: 1px solid black;
            border-left: none;
            padding: 1rem;
            outline: none;
            background-color: white;
          }

          .error {
            position: absolute;
            color: red;
            right: 1.5rem;
            top: -2rem;
            font-size: 0.8rem;
          }

          .verifyOTP {
            width: 100vw;
            max-width: 768px;
            min-width: 360px;
            height: 80vh;
            display: flex;
            margin-top: 10rem;
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
            font-size: 0.67rem;
          }

          .google {
            background-color: white;
            outline: none;
            border: 1px solid black;
            margin: 4rem 0;
            width: 90%;
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
