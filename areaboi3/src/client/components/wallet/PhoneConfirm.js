import { useEffect, useRef, useState } from 'react';
import { sendToken, verifyToken } from '../../settings/services';

export function PhoneConfirm(props) {
  const { userDet } = props;
  const partition = useRef(null);
  const [inp, setInp] = useState([]);
  const [token, setToken] = useState();

  useEffect(() => {
    let inputs = Array.from(partition.current.querySelectorAll('input'));
    if (inp.length > 0) {
      inputs[inp.length - 1].focus();
    }

    inputs.forEach((each, i) => {
      if (inp[i]) {
        each.value = inp[i];
      } else {
        each.value = '';
      }
    });
  }, [inp]);
  useEffect(() => {
    if (userDet.phoneNo) {
      const otp = generateOTP();
      const phone = `${viewUser.phoneNo.countryCode}${viewUser.phoneNo.line}`;
      setToken(otp);
      sendToken(phone, token).then((res) => console.log(res));
    }
  }, []);

  if (inp.length === 5) {
    verifyToken(token, inp)
      .then(() => {
        //
      })
      .catch((err) => console.log('error verifying token', err));
  }

  function handleInput(e) {
    const inputs = partition.current.querySelectorAll('input');
    if (e.key === 'Backspace' && inp.length > 0) {
      let arr = inp;
      arr.pop();
      setInp(arr);
      inputs[inp.length].focus();
      console.log('backspace', arr);
    } else if (inp.length < 6 && e.key.length < 2) {
      setInp([...inp, e.key]);
      inputs[inp.length].focus();
    }
  }
  return (
    <>
      <div className="container">
        <div
          className="section"
          style={{
            margin: '20px 0px',
            textAlign: 'center',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-evenly',
            height: '120px'
          }}>
          <p style={{ fontSize: '12px' }}>Confirm Transaction</p>
          <div
            className="inputs"
            onKeyDown={(e) => handleInput(e)}
            ref={partition}>
            <input className="confirmation-input" type="text" maxLength="1" />
            <input className="confirmation-input" type="text" maxLength="1" />
            <input className="confirmation-input" type="text" maxLength="1" />
            <input className="confirmation-input" type="text" maxLength="1" />
            <input className="confirmation-input" type="text" maxLength="1" />
          </div>
          <p style={{ fontSize: '10px', color: 'yellow' }}>
            Please enter the code we sent to{' '}
            {userDet?.phoneNo
              ? `${userDet?.phoneNo?.countryCode.substring(1)}-${
                  userDet?.phoneNo?.line
                }`
              : '234-8098790338'}
          </p>
        </div>
      </div>
      <style jsx>{`
        p {
          color: white;
          margin: 0px;
          padding: 0px;
        }
        .container {
          display: flex;
          flex-direction: column;
          font-family: 'Roboto Mono';
          padding: 10px;
        }
        .user-aristo {
          width: 29px;
          height: 40px;
        }
        .section {
          position: relative;
        }
        .section-head {
          font-family: 'Noto Sans JP';
        }
        .head {
          font-size: 10px;
        }
        .info {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
        }
        .info p {
          font-family: 'Noto Sans JP';
          font-size: 12px;
        }
        .inputs {
          display: flex;
          justify-content: space-evenly;
        }
        .confirmation-input {
          width: 40px;
          height: 40px;
          border: solid yellow 1px;
          border-radius: 5px;
          color: black;
          text-align: center;
        }
      `}</style>
    </>
  );
}
