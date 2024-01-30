import { useEffect, useRef, useState } from 'react';
import GeneralEnterButton from '../GeneralEnterButton';
import {
  sendTokenWithAfricasTalking,
  sendTokenWithMessageBird,
  verifyTokenWithTermii,
  sendTokenWithTermii,
  saveTransaction,
  verifyToken,
  generateOTP,
  format
} from '../../settings/services';
import { withdrawFromVirtualAccount } from '../../settings/kuda';
import { createPayout } from '../../settings/stripe';

export function CashOutKuda({ reset, userDet }) {
  const [step, setStep] = useState('');
  const [amount, setAmount] = useState(0.0);
  return (
    <>
      <div className="container">
        {!step && (
          <AcctDetails type={'kuda'} setStep={setStep} setAmount={setAmount} />
        )}
        {step === 'confirm' && (
          <Confirm
            reset={reset}
            amount={amount}
            type={'kuda'}
            userDet={userDet}
          />
        )}
      </div>
      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          font-family: "Roboto Mono";
          padding: 10px;
        }
      `}</style>
    </>
  );
}

export function CashOutUSDC({ reset, userDet, balance, usdcInNaira, usdcFee }) {
  const [step, setStep] = useState('account');
  const [amount, setAmount] = useState({ dollarAmount: '', nairaAmount: '' });

  return (
    <>
      <div className="container">
        {step === 'account' && (
          <div className="section">
            <div className="detail">
              <p>
                You may trade USDC for NAIRA or cash out into your DOLLAR bank
                account.
              </p>
              <div
                className="invite-btn"
                onClick={() => {
                  setStep('trade');
                }}>
                <img
                  src="static/img/wallet-trx/trade-icon.svg"
                  style={{ position: 'absolute', left: '30px' }}
                  alt="trade-icon"
                />
                <span>TRADE USD COIN</span>
                <img
                  src="static/img/transaction_icons/usdc-100.png"
                  style={{ position: 'absolute', right: '40px' }}
                  alt="usdc-logo"
                />
                <img
                  width="20"
                  height="20"
                  src="static/img/transaction_icons/noun_nairas_3138833.svg"
                  style={{
                    position: 'absolute',
                    right: '20px',
                    bottom: '-1px'
                  }}
                  alt="naira-logo"
                />
              </div>
            </div>
            <AcctDetails
              type={'usdc'}
              setStep={setStep}
              setAmount={setAmount}
            />
          </div>
        )}
        {step === 'trade' && (
          <TradeForNaira
            type={'usdc'}
            setStep={setStep}
            setAmount={setAmount}
            availableBalance={balance}
            usdcInNaira={usdcInNaira}
          />
        )}
        {step === 'confirm' && (
          <Confirm
            type={'usdc'}
            reset={reset}
            amount={amount}
            userDet={userDet}
            usdcFee={usdcFee}
          />
        )}
      </div>

      <style>{`
        .container {
          display: flex;
          flex-direction: column;
          font-family: "Roboto Mono";
          padding: 10px;
        }
        .section {
          position: relative;
        }
        .detail{
          display: flex;
          justify-content: flex-start;
          width:80%;
          flex-direction: column;
          margin: 4px auto;
        }
        .invite-btn {
          background-color: white;
          color: black;
          border: 1px solid black;
          border-bottom: 7px solid black;
          width: 100%;
          margin: 10px auto;
          height: 50px;
          font-size: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          cursor: pointer;
        }
      `}</style>
    </>
  );
}

function Confirm({ type, reset, amount, chosen, userDet, wallet, usdcFee }) {
  const partition = useRef(null);
  const [inp, setInp] = useState([]);
  const [token, setToken] = useState();
  const [generatedToken, setGeneratedToken] = useState();
  const [OTPMessage, setOTPMessage] = useState(null);
  const [transactionFee, setTransactionFee] = useState('0.00');
  const [message, setMessage] = useState('Withdraw Naira');

  // useEffect(() => {
  //   if (userDet.phoneNo) {
  //     // Termii approved countries
  //     if (
  //       userDet.phoneNo.countryCode === '+234' ||
  //       userDet.phoneNo.countryCode === '+254'
  //     ) {
  //       const termiiToken = sendTokenWithTermii(
  //         `${userDet?.phoneNo?.countryCode.substring(1)}${
  //           userDet?.phoneNo?.line
  //         }`,
  //         `${userDet?.phoneNo?.countryCode}`
  //       );

  //       termiiToken.then((res) => setToken(res));
  //     } else {
  //       generateOTP().then((res) => {
  //         setGeneratedToken(res)
  //         // Africa's talking approved countries
  //         if (
  //           userDet.phoneNo.countryCode === '+243' ||
  //           userDet.phoneNo.countryCode === '+267' ||
  //           userDet.phoneNo.countryCode === '+263' ||
  //           userDet.phoneNo.countryCode === '+264'
  //         ) {
  //           sendTokenWithAfricasTalking(
  //             `${userDet.phoneNo.countryCode}${userDet.phoneNo.line}`,
  //             res
  //           ).then((res) => console.log(res));

  //           // MessageBird approved countries
  //         } else if (
  //           userDet.phoneNo.countryCode === '+1' ||
  //           userDet.phoneNo.countryCode === '+61' ||
  //           userDet.phoneNo.countryCode === '+45' ||
  //           userDet.phoneNo.countryCode === '+60' ||
  //           userDet.phoneNo.countryCode === '+64' ||
  //           userDet.phoneNo.countryCode === '+44'
  //         ) {
  //           sendTokenWithMessageBird(
  //             `${userDet?.phoneNo?.countryCode.substring(1)}${
  //               userDet?.phoneNo?.line
  //             }`,
  //             res
  //           );
  //         }
  //       });
  //     }
  //   }
  // }, []);

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

  const send = () => {
    const withdraw = (resp) => {
      if (type === 'kuda') {
        async function executeTransaction() {
          try {
            const track = wallet.kuda.trackingRef;
            const kudaWithdrawal = await withdrawFromVirtualAccount(
              track,
              amount,
              message,
              transactionFee
            );
            if (kudaWithdrawal.data.message === 'Transaction Successful.') {
              saveTransaction(userDet.userName, 'withraw', 'kuda', '', amount);
            }
            reset();
          } catch (error) {
            console.error('Error executing transaction:', error);
          }
        }
        executeTransaction();
      } else if (type === 'usdc') {
        async function executeTransaction() {
          await createPayout(amount, 'USD')
            .then(() => {
              saveTransaction(userDet.userName, 'withraw', 'usdc', '', amount);
            })
            .catch((err) => console.log(err));
          reset();
        }
        executeTransaction();
      }
    };

    if (inp.length === 5) {
      // Termii approved countries
      if (
        userDet.phoneNo.countryCode === '+234' ||
        userDet.phoneNo.countryCode === '+254'
      ) {
        if (inp && token.pinId) {
          const tokenVerification = verifyTokenWithTermii(inp, token.pinId);
          tokenVerification
            .then((res) => {
              withdraw(res);
            })
            .catch((err) => console.log('error verifying token', err));
        } else {
          setOTPMessage('invalid code');
        }
        //  rest of countries not using Termii
      } else {
        verifyToken(generatedToken, inp)
          .then((res) => {
            withdraw(res);
          })
          .catch((err) => console.log('error verifying token', err));
      }
    }
  };

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
        {type === 'kuda' ? (
          <p className="section-head">
            You may cash out into your local NAIRA account
          </p>
        ) : type === 'circle' ? (
          <p className="section-head">
            You may trade USDC for NAIRA. The equivalent will be deposited into
            your Kuda Virtual Account.
          </p>
        ) : (
          type === 'celo' && (
            <p className="section-head">
              You may trade cUSD for NAIRA. The equivalent will be deposited
              into your Kuda Virtual Account.
            </p>
          )
        )}
        <div className="section">
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '100px',
                margin: '20px 0px',
                padding: '0 1rem'
              }}>
              {amount.dollarAmount && (
                <div className="info">
                  <span className="head">Dollar Amount</span>
                  <p>$ {format(amount.dollarAmount)}</p>
                </div>
              )}

              <div className="info">
                <span className="head">Message</span>
                {type === 'kuda' ? (
                  <p>{message}</p>
                ) : type === 'cusd' ? (
                  <p>cUSD to Naira</p>
                ) : (
                  type === 'usdc' && <p>USDC to Naira</p>
                )}
              </div>
            </div>
            <div
              style={{
                display: 'flex',
                justifyContent: 'space-between',
                flexDirection: 'column',
                height: '100px',
                margin: '20px 0px',
                padding: '0 1rem'
              }}>
              {amount.nairaAmount && (
                <div className="info">
                  <span className="head">Naira Amount</span>
                  <p>₦ {format(amount.nairaAmount)}</p>
                </div>
              )}
              <div className="info">
                <span className="head">Transaction Fee</span>
                {type === 'kuda' && <p>$ {transactionFee}</p>}
                {type === 'cusd' && <p>$ {transactionFee}</p>}
                {type === 'usdc' && (
                  <p>
                    ${' '}
                    {Number(usdcFee.network_fee) +
                      Number(usdcFee.transaction_fee)}
                  </p>
                )}
              </div>
            </div>
          </div>
        </div>
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
            {userDet?.phoneNo &&
              `${userDet?.phoneNo?.countryCode.substring(1)}-${
                userDet?.phoneNo?.line
              }`}
          </p>
          <p>{OTPMessage}</p>
          <div
            className="round-arrow-btn"
            style={{
              position: 'absolute',
              bottom: '-110px',
              left: '40%',
              background: 'black',
              borderRadius: '50%'
            }}>
            <GeneralEnterButton
              text={'Enter'}
              onButtonClick={send}
              type="button"
            />
          </div>
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
          padding: 0 1rem;
          font-size: 0.9rem;
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
          margin: 2rem 0;
        }
        .confirmation-input {
          width: 40px;
          height: 40px;
          border: solid yellow 1px;
          border-radius: 5px;
          color: black;
          text-align: center;
        }
        .round-arrow-btn {
          width: 60px;
          height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}

function TradeForNaira({
  type,
  setStep,
  setAmount,
  availableBalance,
  usdcInNaira
}) {
  const [inputValue, setInputValue] = useState('');
  const [totalNaira, setTotalNaira] = useState('');

  function handleSetMaxBalance() {
    setInputValue(availableBalance.toString());
  }
  async function tradeThenWithdraw() {
    setAmount({
      dollarAmount: inputValue,
      nairaAmount: totalNaira
    });
    setStep('confirm');
  }

  useEffect(() => {
    setTotalNaira((inputValue * usdcInNaira).toFixed(2));
  }, [inputValue]);

  return (
    <>
      <div className="section">
        <div
          style={{
            width: '90%',
            margin: 'auto',
            fontSize: '.6rem'
          }}>
          <p>
            You may trade {type === 'circle' && 'USDC'}
            {type === 'celo' && 'cUSD'} for NAIRA. The equivalent will be
            deposited into your Kuda Virtual Account
          </p>
        </div>
        <div className="detail">
          <div>
            <img
              src="static/img/transaction_icons/usdc-100.png"
              alt="usdc-logo"
            />
            <img
              width="20"
              height="20"
              src="static/img/transaction_icons/noun_nairas_3138833.svg"
              alt="naira-logo"
            />
          </div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '90%',
              alignItems: 'center',
              margin: '1rem 0'
            }}>
            <div>
              <div>
                <img src="static/img/grey-wallet.svg" />
                <span
                  style={{
                    color: 'rgba(0, 0, 0, 0.5)',
                    fontSize: '.75rem',
                    margin: '.5rem'
                  }}>
                  AVAILABLE
                </span>
              </div>
              <p>
                {availableBalance} {type === 'circle' && <span>USDC</span>}{' '}
                {type === 'celo' && <span>cUSD</span>}
              </p>
            </div>
            <div>
              <span>
                1 {type === 'circle' && <span>USDC</span>}{' '}
                {type === 'celo' && <span>cUSD</span>}
              </span>
              {' : '}
              <span>₦ {usdcInNaira ? usdcInNaira : 0.0}</span>
            </div>
          </div>
          <div
            style={{
              borderTop: 'dotted rgba(0, 0, 0, 0.4) 1px',
              width: '100%',
              margin: '1rem 0'
            }}></div>
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              width: '90%',
              alignItems: 'center'
            }}>
            <div
              style={{
                justifyContent: 'center',
                fontSize: '1rem'
              }}>
              <div>
                <input
                  style={{
                    width: '4rem',
                    height: '2rem',
                    border: 'none',
                    alignSelf: 'center',
                    outline: 'none'
                  }}
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  placeholder="0.00"
                  autoFocus
                />
                <span>|</span>
                {type === 'circle' && <span>USDC</span>}{' '}
                {type === 'celo' && <span>cUSD</span>}
              </div>
              <button
                style={{
                  border: 'none',
                  color: 'rgba(0, 0, 0, 0.5)',
                  fontSize: '.5rem'
                }}
                onClick={handleSetMaxBalance}>
                ENTER MAXIMUM
              </button>
            </div>
            <div
              style={{
                display: 'flex',
                alignItems: 'center'
              }}>
              <div
                style={{
                  textDecoration: 'underline',
                  fontSize: '.5rem',
                  margin: '.5rem'
                }}>
                TOTAL
              </div>
              <span>₦ {totalNaira}</span>
            </div>
          </div>
          <div
            className="round-arrow-btn"
            style={{
              position: 'absolute',
              bottom: '-110px',
              left: '40%',
              background: 'black',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
            <GeneralEnterButton
              text="Enter"
              onButtonClick={tradeThenWithdraw}
            />
          </div>
        </div>
      </div>
      <style jsx>
        {`
          .detail {
            display: flex;
            align-items: center;
            width: 90%;
            flex-direction: column;
            margin: 4px auto;
            color: black;
            padding: 1rem 0;
            background-color: white;
          }
          .section {
            position: relative;
          }
          .round-arrow-btn {
            width: 60px;
            height: 60px;
            display: flex;
            flex-direction: column;
            align-items: center;
            justify-content: center;
          }
        `}
      </style>
    </>
  );
}

function AcctDetails({ setStep, setAmount, type }) {
  const amount = useRef(null);
  function confirmWithdraw() {
    if (amount.current.value) {
      if (type === 'kuda') {
        setAmount({ dollarAmount: '', nairaAmount: amount.current.value });
      } else {
        setAmount({ dollarAmount: amount.current.value, nairaAmount: '' });
      }
      setStep('confirm');
    }
  }
  return (
    <>
      <div className="section">
        {type === 'kuda' && (
          <p className="detail">
            You may cash out into your local NAIRA account.
          </p>
        )}
        <div className="detail">
          <span className="label">Amount</span>
          <input
            className="info"
            ref={amount}
            placeholder="₦ will be deducted from your account"
          />
        </div>
        <div className="detail">
          <span className="label">Bank</span>
          <input className="info" placeholder="Your Bank" />
        </div>
        <div className="detail">
          <span className="label">Account Number</span>
          <input className="info" placeholder="0000000000000000" />
        </div>
        <div className="detail">
          <span className="label">Account Name</span>
          <input className="info" />
        </div>
        <div
          className="round-arrow-button"
          style={{
            position: 'absolute',
            bottom: '-110px',
            left: '40%',
            background: 'black',
            borderRadius: '50%',
            cursor: 'pointer'
          }}>
          <GeneralEnterButton text="Enter" onButtonClick={confirmWithdraw} />
        </div>
      </div>
      <style>{`
        input::placeholder {
          font-size: 0.5rem;
        }
        .section {
          position: relative;
        }
        .detail{
            display: flex;
            justify-content: flex-start;
            width:80%;
            flex-direction: column;
            margin: 4px auto;
        }
        .info{
            height: 50px;
            border: dotted black 1px;
            color: black;
            padding: 10px;
            font-family: 'Noto Sans JP';
            background: white;
        }
        .label{
            font-family: 'Roboto Mono';
            color: black;
            height: 23px;
            text-align: center;
            width: fit-content;
            padding: 0px 6px;
            background: white;
            border: black solid 1px;
            text-align: left;
            font-size:10px;
            font-weight:700;
        }
        .round-arrow-btn {
          width: 60px;
          height: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }
      `}</style>
    </>
  );
}
