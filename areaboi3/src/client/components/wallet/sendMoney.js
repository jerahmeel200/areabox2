import { useState, useRef, useEffect } from 'react';
import loadProfiles from '../../settings/loadProfiles';
// import { sendCelo } from "../../settings/celo";
import temp from '../../settings/celo';
import {
  sendToken,
  verifyToken,
  saveTransaction,
  generateOTP
} from '../../settings/services';
import {
  accountDetails,
  getBankList,
  transactionRecipient
} from '../../settings/kuda';
import { checkTransferStatus, getMaticBalance } from '../../settings/circle';

const { sendCelo } = temp();
export function SendMoneyKuda({ reset, selected, userDet, saleInfo }) {
  const [step, setStep] = useState('user');
  const [user, setUser] = useState({ profile: selected });
  const [TX, setTX] = useState({ amount: undefined, msg: undefined });
  useEffect(() => {
    if (saleInfo) {
      console.log(saleInfo);
      setUser({ profile: saleInfo.user.profile });
      setTX({
        amount: saleInfo.price,
        msg: saleInfo.title
      });
      setStep('send');
    }
  }, []);
  return (
    <>
      {step === 'user' && (
        <SelectContact
          setStep={setStep}
          userDet={userDet}
          setUser={setUser}
          user={user}
        />
      )}
      {step == 'send' && (
        <Send
          setStep={setStep}
          setTX={setTX}
          chosen={user}
          saleInfo={saleInfo}
        />
      )}
      {step === 'confirm' && (
        <Confirm
          type="kuda"
          reset={reset}
          tx={TX}
          userDet={userDet}
          chosen={user}
          saleInfo={saleInfo}
        />
      )}
    </>
  );
}

export function SendMoneyCelo({ reset, selected, userDet, balance }) {
  const [step, setStep] = useState('user');
  const [TX, setTX] = useState({ amount: undefined, msg: undefined });
  const [user, setUser] = useState({ profile: selected });

  return (
    <>
      {step === 'user' && (
        <SelectContact
          setStep={setStep}
          setUser={setUser}
          user={user}
          userDet={userDet}
        />
      )}
      {step == 'send' && (
        <Send setStep={setStep} setTX={setTX} chosen={user} max={balance} />
      )}
      {step === 'confirm' && (
        <Confirm
          type={'celo'}
          reset={reset}
          tx={TX}
          chosen={user}
          userDet={userDet}
        />
      )}
    </>
  );
}

export function SendMoneyCircle({ userDet, selected, balance, reset }) {
  const [step, setStep] = useState('user');
  const [TX, setTX] = useState({ amount: undefined, msg: undefined });
  const [user, setUser] = useState({ profile: selected });

  useEffect(() => {
    setUser({ profile: selected });
    console.log(selected);
  }, []);

  return (
    <>
      {step === 'user' && (
        <SelectContact
          setStep={setStep}
          setUser={setUser}
          user={user}
          userDet={userDet}
        />
      )}
      {step == 'send' && (
        <Send setStep={setStep} setTX={setTX} chosen={user} max={balance} />
      )}
      {step === 'confirm' && (
        <Confirm
          type={'circle'}
          reset={reset}
          tx={TX}
          chosen={user}
          userDet={userDet}
        />
      )}
    </>
  );
}

export function SendMoney({ userDet, selected, balance, reset }) {
  const [step, setStep] = useState('user');
  const [TX, setTX] = useState({ amount: undefined, msg: undefined });
  const [user, setUser] = useState({ profile: selected });

  return (
    <>
      {step === 'user' && (
        <SelectContact
          setStep={setStep}
          setUser={setUser}
          user={user}
          userDet={userDet}
        />
      )}
      {step == 'send' && (
        <Send setStep={setStep} setTX={setTX} chosen={user} max={balance} />
      )}
      {step === 'confirm' && (
        <Confirm
          type={'circle'}
          reset={reset}
          tx={TX}
          chosen={user}
          userDet={userDet}
        />
      )}
    </>
  );
}

export function SelectContact(props) {
  const { setStep, setUser, userDet } = props;
  const [inp, setInp] = useState('');
  const [profiles, setProfiles] = useState([]);
  const first6Profiles = profiles.slice(0, 6);
  const [expandedProfile, setExpandedProfile] = useState(false);

  function selected(chosen) {
    setUser(chosen);
    setStep('send');
  }
  function nextScreen() {
    setStep('send');
  }
  function handleInput(e) {
    setInp(e.target.value);
  }
  useEffect(() => {
    loadProfiles(userDet, setProfiles);
  }, []);

  return (
    <>
      <div className="container">
        <div className="section">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              marginBottom: '2rem',
              alignItems: 'center'
            }}>
            <p
              className="section-head"
              style={{
                color: 'yellow'
              }}>
              Send to contact
            </p>
            <div onClick={() => setExpandedProfile(!expandedProfile)}>
              <img src="static/img/expand.svg" alt="expand" />
            </div>
          </div>
          {expandedProfile ? (
            <ul
              style={{
                height: '10rem',
                overflow: 'scroll'
              }}>
              {profiles.map((user) => {
                return (
                  <li
                    style={{
                      padding: '1rem',
                      cursor: 'pointer',
                      borderTop: 'dotted grey 1px'
                    }}
                    onClick={() => selected(user)}
                    key={user.profile.userName}>
                    <img
                      className="grid-img"
                      src={`static/img/ARISTOS/${user.profile.aristo}.png`}
                    />{' '}
                    <span>@{user.profile.userName}</span>
                  </li>
                );
              })}
            </ul>
          ) : (
            <div className="grid-cont">
              {first6Profiles.map((user) => {
                return (
                  <div
                    className="grid-item"
                    style={{ cursor: 'pointer' }}
                    onClick={() => selected(user)}
                    key={user.profile.userName}>
                    <img
                      className="grid-img"
                      src={`static/img/ARISTOS/${user.profile.aristo}.png`}
                    />
                    <span>@{user.profile.userName}</span>
                  </div>
                );
              })}
            </div>
          )}
        </div>
        <div className="section">
          <p className="section-head">Send to contact from your address book</p>
          <div className="form-control">
            <span className="label">Phone Number</span>
            <input
              type="number"
              onInput={(e) => handleInput(e)}
              value={inp}
              placeholder="An invite will be sent to this number"
            />
          </div>
          <div
            onClick={() => nextScreen()}
            className="round-arrow-btn"
            style={{
              position: 'absolute',
              bottom: '-110px',
              left: '40%',
              background: 'black',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
            <svg
              className="green-arrow"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.1992 6.76692L10.7143 0.281955C10.5451 0.112782 10.2632 0 9.9812 0C9.41729 0 8.96617 0.451128 8.96617 1.01504V2.76316C8.96617 2.81955 8.90978 2.93233 8.79699 2.93233H1.01504C0.451128 2.93233 0 3.38346 0 3.94737V11.0526C0 11.6165 0.451128 12.0677 1.01504 12.0677H8.79699C8.85338 12.0677 8.96617 12.1241 8.96617 12.2368V13.985C8.96617 14.5489 9.41729 15 9.9812 15C10.2632 15 10.4887 14.8872 10.7143 14.718L17.1992 8.23308C17.3684 8.06391 17.4812 7.78196 17.4812 7.5C17.4812 7.21805 17.3684 6.99248 17.1992 6.76692Z"
                fill="#66F6FF"
              />
            </svg>
            <h3
              style={{ color: '#66F6FF', fontSize: '12px' }}
              className="enter">
              Enter
            </h3>
          </div>
        </div>
      </div>
      <style jsx>{`
        input::placeholder {
          color: red;
          font-size: 0.5rem;
          padding-left: 0.5rem;
        }
        p {
          color: white;
          padding: 0px;
          margin: 0px;
        }
        .container {
          display: flex;
          flex-direction: column;
          font-family: 'Roboto Mono';
          padding: 10px;
        }
        .grid-cont {
          display: grid;
          grid-template: 1fr 1fr/ 1fr 1fr 1fr;
          height: 10rem;
        }
        .grid-item {
          display: flex;
          flex-direction: column;
          align-items: center;
        }
        .grid-item span {
          font-size: 8px;
        }
        .grid-img {
          width: 19px;
          height: 25px;
        }
        .section {
          position: relative;
        }
        .section-head {
          font-family: 'Noto Sans JP';
          font-size: 12px;
          padding: 10px 0px;
        }
        .form-control {
          display: flex;
          justify-content: flex-start;
          display: flex;
          flex-direction: column;
        }
        .label {
          color: black;
          height: 23px;
          text-align: center;
          width: 120px;
          padding: 0px 6px;
          background: white;
          border: black solid 1px;
          text-align: left;
        }
        input {
          width: 100%;
          height: 50px;
          border: dotted black 1px;
          color: black;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          /* display: none; <- Crashes Chrome on hover */
          -webkit-appearance: none;
          margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }

        input[type='number'] {
          -moz-appearance: textfield; /* Firefox */
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

function Send(props) {
  const { setStep, setTX, chosen, max, type, saleInfo } = props;
  const amount = useRef(null);
  const msg = useRef(null);
  function sendTX(e) {
    if (amount.current.value && msg.current.value) {
      setTX({ amount: amount.current.value, msg: msg.current.value });
      setStep('confirm');
    }
  }
  return (
    <>
      <div className="container">
        <p className="section-head">Send cash to:</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '20px 0px'
            }}>
            <img
              src={`static/img/ARISTOS/${
                saleInfo
                  ? saleInfo.user?.profile?.aristo
                  : chosen.profile.aristo
              }.png`}
              className="user-aristo"
            />
            <p>
              @
              {saleInfo
                ? saleInfo.user?.profile?.userName
                : chosen.profile.userName}
            </p>
          </div>
          {saleInfo && (
            <div
              style={{
                marginTop: '1rem'
              }}>
              <p>{saleInfo ? saleInfo.user?.profile?.repScore : ''}</p>
              <img
                src="static/img/baby_sphinx.png"
                style={{ width: '30px', height: '24px' }}
              />
            </div>
          )}
        </div>

        <div className="section">
          <div className="form-control">
            <span className="label">Amount</span>
            {saleInfo ? (
              <textarea
                style={{
                  fontSize: '.6rem',
                  color: 'red',
                  padding: '.2rem'
                }}
                rows={3}
                type="text"
                ref={amount}
                defaultValue={
                  saleInfo
                    ? `₦${saleInfo.price} will be deducted from your account and held in deposit. You may release the payment when you receive the item.`
                    : null
                }
              />
            ) : (
              <input type="number" ref={amount} max={max ? max : 500} />
            )}
          </div>
          <div
            className="form-control"
            style={{
              position: 'relative'
            }}>
            <span className="label">Add a note</span>
            <span
              style={{
                position: 'absolute',
                color: 'red',
                fontSize: '.5rem',
                top: '1.5rem',
                left: '.5rem'
              }}>
              What's this for?
            </span>
            {saleInfo ? (
              <input
                type="text"
                ref={msg}
                value={saleInfo ? `${saleInfo.title}` : null}
              />
            ) : (
              <input type="text" ref={msg} />
            )}
          </div>
          <div
            onClick={(e) => sendTX(e)}
            className="round-arrow-btn"
            style={{
              position: 'absolute',
              bottom: '-110px',
              left: '40%',
              background: 'black',
              borderRadius: '50%'
            }}>
            <svg
              className="green-arrow"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.1992 6.76692L10.7143 0.281955C10.5451 0.112782 10.2632 0 9.9812 0C9.41729 0 8.96617 0.451128 8.96617 1.01504V2.76316C8.96617 2.81955 8.90978 2.93233 8.79699 2.93233H1.01504C0.451128 2.93233 0 3.38346 0 3.94737V11.0526C0 11.6165 0.451128 12.0677 1.01504 12.0677H8.79699C8.85338 12.0677 8.96617 12.1241 8.96617 12.2368V13.985C8.96617 14.5489 9.41729 15 9.9812 15C10.2632 15 10.4887 14.8872 10.7143 14.718L17.1992 8.23308C17.3684 8.06391 17.4812 7.78196 17.4812 7.5C17.4812 7.21805 17.3684 6.99248 17.1992 6.76692Z"
                fill="#66F6FF"
              />
            </svg>
            <h3
              style={{ color: '#66F6FF', fontSize: '12px' }}
              className="enter">
              Enter
            </h3>
          </div>
        </div>
      </div>
      <style jsx>{`
        p {
          color: white;
          padding: 0px;
          margin: 0px;
        }
        .container {
          display: flex;
          flex-direction: column;
          font-family: 'Roboto Mono';
          padding: 10px;
        }
        .section {
          position: relative;
        }
        .user-aristo {
          width: 30px;
          height: 40px;
          margin: 4px auto;
        }
        .form-control {
          display: flex;
          justify-content: flex-start;
          font-family: 'Roboto Mono';
          display: flex;
          flex-direction: column;
          margin-bottom: 30px;
        }
        .label {
          font-family: 'Roboto Mono';
          color: black;
          height: 23px;
          text-align: center;
          width: 120px;
          padding: 0px 6px;
          background: white;
          border: black solid 1px;
          text-align: left;
          font-size: 10px;
          font-weight: 700;
        }
        input {
          width: 100%;
          height: 50px;
          border: dotted black 1px;
          color: black;
        }
        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          /* display: none; <- Crashes Chrome on hover */
          -webkit-appearance: none;
          margin: 0; /* <-- Apparently some margin are still there even though it's hidden */
        }

        input[type='number'] {
          -moz-appearance: textfield; /* Firefox */
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

function Confirm({ type, reset, tx, chosen, userDet, wallet, saleInfo }) {
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
      const phone = `${userDet.phoneNo.countryCode}${userDet.phoneNo.line}`;
      setToken(otp);
      sendToken(phone, token)
        .then((res) => console.log(res))
        .catch((err) => console.log('error sending token', err));
    }
  }, []);

  const send = () => {
    if (inp.length === 5) {
      verifyToken(token, inp)
        .then((resp) => {
          if (type === 'celo') {
            console.log(resp);
            sendCelo()
              .then((res) =>
                res
                  .sendCelo(
                    wallet.celo.celoKey,
                    chosen.wallet.celo.celoKey,
                    tx.amount
                  )
                  .then((res) => {
                    saveTransaction(
                      userDet.userName,
                      'send',
                      'cUSD',
                      chosen.profile.userName,
                      tx.amount
                    );
                    saveTransaction(
                      chosen.profile.userName,
                      'recieve',
                      'cUSD',
                      '',
                      userDet.userName,
                      tx.amount
                    );
                    reset();
                  })
              )
              .catch((err) => console.log(err));
          } else if (type === 'kuda') {
            async function executeTransaction() {
              let receivingAccount = '';
              if (saleInfo) {
                receivingAccount = await accountDetails(
                  saleInfo.user.wallet.kuda.trackingRef
                );
              } else {
                receivingAccount = await accountDetails(
                  chosen.wallet.kuda.trackingRef
                );
              }
              try {
                // Get the bank list
                const bankList = await getBankList();
                // Confirm transaction recipient
                const track = wallet.kuda.trackingRef;
                const beneficiaryAccountNumber = receivingAccount;
                const beneficiaryBankCode = bankList.data.banks[0].bankCode;
                const isRequestFromVirtualAccount = true;
                const transactionRecipientResult = await transactionRecipient(
                  track,
                  beneficiaryAccountNumber,
                  beneficiaryBankCode,
                  isRequestFromVirtualAccount
                );
                // Send Kuda transaction
                const beneficiaryAccount =
                  receivingAccount.data.account.accountNumber;
                const amount = saleInfo.price;
                const narration = saleInfo.title;
                const beneficiaryName = `${receivingAccount.data.account[0].firstName} ${receivingAccount.data.account[0].lastName}`;
                const senderName = `${kuda[0]?.firstName} ${kuda[0]?.lastName}`;
                const nameEnquiryId = transactionRecipientResult.NameEnquiryId;

                const sendKudaResult = await sendKuda(
                  track,
                  beneficiaryAccount,
                  amount,
                  narration,
                  beneficiaryBankCode,
                  beneficiaryName,
                  senderName,
                  nameEnquiryId
                );
                console.log('Send Kuda Result:', sendKudaResult);
                // All steps completed successfully
                saveTransaction(
                  userDet.userName,
                  'send',
                  'cUSD',
                  chosen.profile.userName,
                  tx.amount
                );
                saveTransaction(
                  chosen.profile.userName,
                  'recieve',
                  'cUSD',
                  '',
                  userDet.userName,
                  tx.amount
                );
                reset();
              } catch (error) {
                console.error('Error executing transaction:', error);
              }
            }
            executeTransaction();
          } else if (type === 'circle') {
            const transferUSDC = async () => {
              const tokenBalance = await getMaticBalance(
                wallet.circle.wallets[0].id
              );
              const tokenTransfer = await transferToken(
                chosen.wallet.circle.wallets[0].address,
                tokenBalance.data.tokenBalances[0].id,
                wallet.circle.wallets[0].id,
                tx.amount
              );
              const status = checkTransferStatus(tokenTransfer.id);
              if (status.transaction.state === 'COMPLETE') {
                saveTransaction(
                  userDet.userName,
                  'send',
                  'USDC',
                  chosen.profile.userName,
                  tx.amount
                );
                saveTransaction(
                  chosen.profile.userName,
                  'recieve',
                  'USDC',
                  '',
                  userDet.userName,
                  tx.amount
                );
                reset();
              }
            };
            transferUSDC();
          }
        })
        .catch((err) => console.log('error verifying token', err));
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
        <p className="section-head">Send cash to:</p>
        <div
          style={{
            display: 'flex',
            justifyContent: 'center'
          }}>
          <div
            style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              margin: '20px 0px'
            }}>
            <img
              src={`static/img/ARISTOS/${
                saleInfo ? saleInfo.user.profile.aristo : chosen.profile.aristo
              }.png`}
              className="user-aristo"
            />
            <p>
              @
              {saleInfo
                ? saleInfo.user.profile.userName
                : chosen.profile.userName}
            </p>
          </div>
          {saleInfo && (
            <div
              style={{
                marginTop: '1rem'
              }}>
              <p>{saleInfo ? saleInfo.user.profile.repScore : ''}</p>
              <img
                src="static/img/baby_sphinx.png"
                style={{ width: '30px', height: '24px' }}
              />
            </div>
          )}
        </div>
        <div className="section">
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              margin: '20px 0px'
            }}>
            <div className="info">
              <span className="head">Amount</span>
              <>
                {type === 'kuda' && (
                  <p>₦{saleInfo ? saleInfo.price : format(tx.amount)}</p>
                )}
                {type === 'celo' && <p>${format(tx.amount)}</p>}
              </>
            </div>
            <div className="info">
              <span className="head">Transaction Fee</span>
              {type === 'kuda' && <p>₦10.00</p>}
              {type === 'celo' && <p>$0.00</p>}
            </div>
          </div>
          <div className="info">
            <span className="head">Message</span>
            <p>{saleInfo ? `${saleInfo.title}` : tx.msg}</p>
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
          <div
            onClick={() => send()}
            className="round-arrow-btn"
            style={{
              position: 'absolute',
              bottom: '-110px',
              left: '40%',
              background: 'black',
              borderRadius: '50%',
              cursor: 'pointer'
            }}>
            <svg
              className="green-arrow"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.1992 6.76692L10.7143 0.281955C10.5451 0.112782 10.2632 0 9.9812 0C9.41729 0 8.96617 0.451128 8.96617 1.01504V2.76316C8.96617 2.81955 8.90978 2.93233 8.79699 2.93233H1.01504C0.451128 2.93233 0 3.38346 0 3.94737V11.0526C0 11.6165 0.451128 12.0677 1.01504 12.0677H8.79699C8.85338 12.0677 8.96617 12.1241 8.96617 12.2368V13.985C8.96617 14.5489 9.41729 15 9.9812 15C10.2632 15 10.4887 14.8872 10.7143 14.718L17.1992 8.23308C17.3684 8.06391 17.4812 7.78196 17.4812 7.5C17.4812 7.21805 17.3684 6.99248 17.1992 6.76692Z"
                fill="#66F6FF"
              />
            </svg>
            <h3
              style={{ color: '#66F6FF', fontSize: '12px' }}
              className="enter">
              Enter
            </h3>
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

function format(no) {
  const formatter = new Intl.NumberFormat();
  return formatter.format(no);
}
