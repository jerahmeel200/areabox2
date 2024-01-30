import { createAccount } from '../../settings/kuda';
import {
  StripeOnrampElement,
  getCryptoQuotes,
  stripeAccount
} from '../../settings/stripe';
import { useState, useRef } from 'react';
import QRCode from 'react-qr-code';
import { ref as refD, update } from 'firebase/database';
import CurrencyConverter from '../CurrencyConverter';
import { PhoneConfirm } from './PhoneConfirm';
import { multiCurrencyBalanceAccount, wiseProfile } from '../../settings/wise';
import GeneralEnterButton from '../GeneralEnterButton';

export function AddMoneyKudaBottom({ kudaInfo }) {
  const [choice, setChoice] = useState('');
  return (
    <>
      <div
        style={{ display: 'flex', flexDirection: 'column', marginTop: '9px' }}>
        {!choice && (
          <>
            <div className="action" onClick={() => setChoice('bank_transfer')}>
              <div className="left">
                <h3>Bank Transfer</h3>
                <p>From bank app or internet banking</p>
              </div>
              <div className="right">{'>'}</div>
            </div>
            <div className="action">
              <div className="left">
                <h3>USSD</h3>
                <p>With your other bank's USSD code</p>
              </div>
              <div className="right">{'>'}</div>
            </div>
            <div className="action">
              <div className="left">
                <h3>Card</h3>
                <p>Add money with a debit card</p>
              </div>
              <div className="right">{'>'}</div>
            </div>
          </>
        )}
        {choice === 'bank_transfer' && <KudaAcctDetails kudaInfo={kudaInfo} />}
      </div>
      <style jsx>{`
        .action {
          background: white;
          color: black;
          margin: 3px auto;
          display: flex;
          justify-content: space-between;
          align-items: center;
          border: dotted 1px black;
          font-family: 'Noto Sans JP';
          width: 280px;
          height: 40px;
          font-weight: 700;
          padding: 3px;
        }
        .action h3 {
          font-size: 12px;
        }
        .action p {
          font-size: 8px;
          padding: 0px;
          margin: 0px;
        }
        .left {
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: space-evenly;
        }
      `}</style>
    </>
  );
}
export function CreateBankAccount({ firebase, userName, reset, profilePhone }) {
  const [phone, setPhone] = useState(null);
  const [email, setEmail] = useState(null);
  const [lastName, setLastName] = useState(null);
  const [firstName, setFirstName] = useState(null);
  const [dob, setDob] = useState(null);
  const [address, setAddress] = useState({
    line1: null,
    line2: null,
    city: null,
    state: null,
    postalCode: null
  });
  const [step, setStep] = useState('bio');
  const [formError, setFormError] = useState('');

  const phoneNo = useRef(null);

  async function create() {
    if (
      phone.length > 0 &&
      email.length > 0 &&
      lastName.length > 0 &&
      firstName.length > 0 &&
      dob.length > 0 &&
      address.line1 &&
      address.line2 &&
      address.city &&
      address.postalCode &&
      address.state
    ) {
      const walletRef = refD(firebase, `users/${userName}/wallet`);
      if (profilePhone.countryCode === '+234') {
        const kudaAccount = await createAccount(
          email,
          phone,
          firstName,
          lastName
        );
        if (kudaAccount) {
          update(walletRef, {
            kuda: kudaAccount
          });
        } else {
          console.log('error on kuda account creation');
        }
        await stripeAccount(
          'NG',
          'NGN',
          firstName,
          lastName,
          email,
          `${profilePhone.countryCode}${profilePhone.line}`,
          dob,
          address
        )
          .then((stripeAccount) => update(walletRef, { stripe: stripeAccount }))
          .catch((err) => {
            console.log('error on stripe account creation', err);
          });
      } else {
        const profile = await wiseProfile(firstName, lastName, dob, phone);
        const multiCurrencyAccount = await multiCurrencyBalanceAccount(
          profile.id
        );
        if (profile && multiCurrencyAccount) {
          update(walletRef, {
            wise: {
              profile,
              account: multiCurrencyAccount
            }
          });
        } else {
          console.log('error on wise account creation');
        }
      }
      reset();
    } else {
      setFormError('All fields not filled!');
    }
  }
  function confirmPhone() {
    let storedNumber = `${profilePhone.countryCode}${profilePhone.line}`;
    let format = storedNumber.toString().replace('+234', '0');
    let entered = phoneNo.current.value;
    if (entered.startsWith('+234')) {
      entered = entered.toString().replace('+234', '0');
    }
    if (
      entered === `${profilePhone.countryCode}${profilePhone.line}` ||
      entered === format
    ) {
      setPhone(entered);
    }
  }
  const handleFormChange = () => {
    if (step === 'bio') {
      if (email || lastName || firstName || dob) {
        setFormError('');
        setStep('address');
      } else {
        setFormError('All fields not filled!');
      }
    } else if (step === 'address') {
      setFormError('');
      setStep('bio');
    }
  };
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <span
          style={{
            fontFamily: "'Noto Sans JP'",
            fontSize: '12px',
            padding: '3px 2rem'
          }}>
          Confirm a few details to start using your wallet.
        </span>
        {!phone && (
          <>
            <div className="form-control">
              <span className="label">Phone Number</span>
              <div className="input-div">
                {phoneNo?.current?.value.length > 9 && (
                  <span
                    style={{
                      fontFamily: 'RobotoMono',
                      color: '#FF1800',
                      fontSize: '10px',
                      fontWeight: '400'
                    }}>
                    Does not match number used to signup!
                  </span>
                )}
                <input
                  type="text"
                  onChange={() => confirmPhone()}
                  ref={phoneNo}
                  autoFocus
                />
              </div>
            </div>
            <span
              style={{
                fontFamily: "'Noto Sans JP'",
                fontSize: '13px',
                padding: '3px 2rem'
              }}>
              All notifications will be sent to this number
            </span>
          </>
        )}

        {phone && (
          <>
            {step !== 'address' && (
              <>
                <div className="form-control">
                  <span className="label">Email Address</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) => setEmail(value)}
                    autoFocus
                  />
                </div>
                <div className="form-control">
                  <span className="label">Last Name</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) => setLastName(value)}
                  />
                </div>
                <div className="form-control">
                  <span className="label">First Name</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) => setFirstName(value)}
                  />
                </div>
                <div className="form-control">
                  <span className="label">DOB</span>
                  <input
                    type="date"
                    onChange={({ target: { value } }) => setDob(value)}
                  />
                </div>
              </>
            )}
            {step === 'bio' && (
              <div className="button-container">
                <button onClick={handleFormChange}>address</button>
              </div>
            )}
            {step === 'address' && (
              <div className="button-container">
                <button onClick={handleFormChange}>bio</button>
              </div>
            )}
            {step === 'address' && (
              <>
                <div className="form-control">
                  <span className="label">Address Line 1</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) =>
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        line1: value
                      }))
                    }
                    placeholder="street, PO Box, or company name"
                    autoFocus
                  />
                </div>
                <div className="form-control">
                  <span className="label">Address Line 2</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) =>
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        line2: value
                      }))
                    }
                    placeholder="apartment, suite, or building"
                  />
                </div>
                <div className="form-control">
                  <span className="label">City</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) =>
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        city: value
                      }))
                    }
                  />
                </div>
                <div className="form-control">
                  <span className="label">Postal Code</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) =>
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        postalCode: value
                      }))
                    }
                  />
                </div>
                <div className="form-control">
                  <span className="label">State</span>
                  <input
                    type="text"
                    onChange={({ target: { value } }) =>
                      setAddress((prevAddress) => ({
                        ...prevAddress,
                        state: value
                      }))
                    }
                  />
                </div>
              </>
            )}
            {formError && (
              <span
                style={{
                  fontFamily: 'RobotoMono',
                  color: '#FF1800',
                  fontSize: '10px',
                  fontWeight: '400'
                }}>
                {formError}
              </span>
            )}
          </>
        )}
      </div>

      <div
        className="round-arrow-btn"
        style={{
          position: 'absolute',
          top: '70vh',
          left: '0',
          right: '0',
          margin: '0 auto'
        }}>
        <GeneralEnterButton
          text={'Enter'}
          type={'button'}
          onButtonClick={create}
        />
      </div>
      <style jsx>{`
        .form-control {
          display: flex;
          justify-content: flex-start;
          font-family: 'Roboto Mono';
          display: flex;
          flex-direction: column;
          margin: 4px auto;
          width: 90%;
        }
        .label {
          color: black;
          height: 23px;
          text-align: center;
          width: fit-content;
          padding: 0px 6px;
          background: white;
          border: black solid 1px;
          text-align: left;
        }
        .input-div {
          border: dotted black 1px;
        }
        .input-div input {
          border: none;
        }
        input {
          width: 100%;
          height: 50px;
          border: dotted black 1px;
          color: black;
        }
        .round-arrow-btn {
          height: 60px;
          width: 60px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          display: flex;
        }
      `}</style>
    </>
  );
}
function KudaAcctDetails(props) {
  const { kudaInfo } = props;

  return (
    <>
      <>
        {kudaInfo && (
          <div className="detail">
            <small>Your Kuda Virtual Account is ready!</small>
            <small>You may now send NAIRA to your account.</small>
          </div>
        )}
        <div className="detail">
          <span className="label">Bank</span>
          <div className="info">Kuda Microfinance Bank</div>
        </div>
        <div className="detail">
          <span className="label">Account Number</span>
          <div className="info">{kudaInfo[0]?.accountNumber}</div>
        </div>
        <div className="detail">
          <span className="label">Account Name</span>
          <div className="info">{`${kudaInfo[0]?.firstName} ${kudaInfo[0]?.lastName}`}</div>
        </div>
      </>
      <style>{`
        .detail{
            display: flex;
            justify-content: flex-start;
            width: 80%;
            display: flex;
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
        `}</style>
    </>
  );
}
export function AddCryptoBottom({ crypto }) {
  function copyAddress(e) {
    const txtArea = e.target;
    txtArea.select();
    navigator.clipboard
      .writeText(txtArea.value)
      .then(() => {
        console.log('copied successfully');
      })
      .catch(() => {
        console.log('error copying');
      });
    const tap = txtArea.parentElement.querySelector('.tap');
    tap.textContent = 'copied!';
    tap.style.color = 'red';
    setTimeout(() => {
      tap.textContent = 'Tap to copy';
      tap.style.color = 'rgba(0, 0, 0, 0.4)';
    }, 3000);
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'column' }}>
        <p
          style={{
            margin: '10px',
            padding: '0px',
            fontSize: '12px',
            fontFamily: "'Noto Sans JP'"
          }}>
          Send only cUSD to this address. Sending any other token to this
          address may result in loss of your funds.
        </p>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}>
          <QRCode value={crypto} size={70} />
        </div>

        <div className="detail">
          <span className="label">Account Address</span>
          <textarea
            className="info"
            readOnly
            onClick={(e) => copyAddress(e)}
            defaultValue={crypto}></textarea>
          <span
            className="tap"
            style={{
              color: 'rgba(0, 0, 0, 0.4)',
              position: 'absolute',
              right: '7px',
              bottom: '1px'
            }}>
            Tap to copy
          </span>
        </div>
      </div>
      <style jsx>{`
        .detail {
          display: flex;
          justify-content: flex-start;
          position: relative;
          display: flex;
          flex-direction: column;
          margin: 10px auto;
          width: 80%;
        }
        .info {
          width: 100%;
          min-height: 50px;
          border: dotted black 1px;
          color: black;
          padding: 10px;
          font-family: 'Roboto Mono';
          background: white;
          overflow-wrap: break-word;
          resize: none;
          font-size: 16px;
          font-weight: 400;
        }
        .label {
          font-family: 'Roboto Mono';
          color: black;
          height: 23px;
          text-align: center;
          width: fit-content;
          padding: 0px 6px;
          background: white;
          border: black solid 1px;
          text-align: left;
        }
      `}</style>
    </>
  );
}
export function OnrampUSDC({ wallet, kudaBalance, viewUser }) {
  let [fromAccount, setFromAccount] = useState(null);
  let [amount, setAmount] = useState('');
  let [exchangeRate, setExchangeRate] = useState('');
  let [fundsError, setFundsError] = useState('');
  let [step, setStep] = useState('');
  let [USDCAmount, setUSDCAmount] = useState('0.00');
  let [totalUSDCAmount, setTotalUSDCAmount] = useState('0.00');
  let [transactionFee, setTransactionFee] = useState('0.00');

  const handleAmountChange = (convertedAmount, exchageRate) => {
    setAmount(convertedAmount);
    setExchangeRate(exchageRate);
  };

  const handleOnramp = async () => {
    if (amount < kudaBalance) {
      setFundsError('Naira no reach!');
    } else {
      setStep('quotes');
      if (step === 'quotes') {
        setStep('confirm');
      }
      if (step === 'confirm') {
        setStep('onramp');
      }
      setFundsError('');
      const quotes = await getCryptoQuotes(amount);
      const transactionFeeMonetary = Number(
        quotes.destination_network_quotes.polygon[0].fees
          .transaction_fee_monetary
      );
      const networkFeeMonetary = Number(
        quotes.destination_network_quotes.polygon[0].fees.network_fee_monetary
      );
      const totalFeeMonetary = transactionFeeMonetary + networkFeeMonetary;
      setUSDCAmount(quotes.source_amount);
      setTransactionFee(totalFeeMonetary.toFixed(2));
      setTotalUSDCAmount(
        quotes.destination_network_quotes.polygon[0].source_total_amount
      );
    }
  };
  return (
    <>
      {step === 'onramp' && (
        <StripeOnrampElement wallet={wallet} amount={amount} />
      )}
      {step !== 'onramp' && (
        <>
          <CurrencyConverter
            onAmountChange={handleAmountChange}
            fundsError={fundsError}
          />
          <div
            style={{
              display: 'flex',
              borderTop: 'dotted rgba(256, 256, 256, 0.4) 1px',
              padding: '1rem 0',
              justifyContent: 'space-around'
            }}>
            <label>
              <small>Pay with</small>
            </label>
            <select
              onChange={(e) => {
                setFromAccount(e.target.value);
              }}
              style={{
                color: 'white',
                backgroundColor: 'black',
                fontSize: '.5rem'
              }}
              defaultValue="naira">
              <option value="naira">NAIRA BALANCE</option>
              <option value="debit">DEBIT CARD</option>
            </select>
            <img
              src={`static/img/transaction_icons/stripe_logo.svg`}
              alt="stripe_logo"
            />
          </div>
          {step === 'quotes' && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 1rem',
                  fontSize: '.6rem'
                }}>
                <div
                  style={{
                    display: 'flex',

                    flexDirection: 'column'
                  }}>
                  <span>Amount in USDC</span>
                  <span>Transaction Fee</span>
                </div>
                <div
                  style={{
                    display: 'flex',

                    flexDirection: 'column'
                  }}>
                  <span>$ {USDCAmount} USDC</span>
                  <span>$ {transactionFee} USD</span>
                </div>
              </div>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 1rem',
                  fontSize: '.6rem',
                  alignItems: 'center',
                  borderTop: 'dotted rgba(256, 256, 256, 0.4) 1px'
                }}>
                <small>TOTAL</small>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>$ {totalUSDCAmount} USDC</span>
                  <span style={{ color: '#8e8e8e' }}>
                    ₦ {(exchangeRate * totalUSDCAmount).toFixed(2)}
                  </span>
                </div>
              </div>
            </>
          )}
          {step === 'confirm' && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 1rem',
                  fontSize: '.6rem',
                  alignItems: 'center',
                  borderTop: 'dotted rgba(256, 256, 256, 0.4) 1px'
                }}>
                <small>TOTAL</small>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>$ {totalUSDCAmount} USDC</span>
                  <span style={{ color: '#8e8e8e' }}>
                    ₦ {(exchangeRate * totalUSDCAmount).toFixed(2)}
                  </span>
                </div>
              </div>
              {/* <PhoneConfirm userDet={viewUser} /> */}
            </>
          )}

          {step === 'confirmed' && (
            <>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  padding: '0 1rem',
                  fontSize: '.6rem',
                  alignItems: 'center',
                  borderTop: 'dotted rgba(256, 256, 256, 0.4) 1px'
                }}>
                <small>TOTAL</small>
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <span>$ {totalUSDCAmount} USDC</span>
                  <span style={{ color: '#8e8e8e' }}>
                    ₦ {(exchangeRate * totalUSDCAmount).toFixed(2)}
                  </span>
                </div>
              </div>
              <span
                style={{
                  color: 'yellow'
                }}>
                <img src={`static/img/yellowcheck.svg`} />
                DONE!
              </span>
            </>
          )}
          {step !== 'confirmed' && (
            <div
              style={{
                height: '60px',
                width: '60px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'absolute',
                top: '60vh',
                left: '140px',
                background: 'black',
                borderRadius: '50%'
              }}>
              <GeneralEnterButton
                text={'Pay'}
                type={'button'}
                onButtonClick={handleOnramp}
              />
            </div>
          )}
        </>
      )}
    </>
  );
}
