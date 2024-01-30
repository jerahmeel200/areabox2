import { useRef, useState, useEffect } from 'react';
import Web3 from 'web3';
import { newKitFromWeb3 } from '@celo/contractkit';
import { create } from 'ipfs-http-client';
import Passport from './passport';
import { auth as authF } from '../settings/firebase.js';
import { saveTransaction } from '../settings/services';
import { child, get, ref as refD, set, update } from 'firebase/database';
import { updateProfile } from 'firebase/auth';
import getConfig from 'next/config';
import { useHistory } from 'react-router-dom';

const { publicRuntimeConfig } = getConfig();
const apiUrl = publicRuntimeConfig.apiUrl;

const privateKey =
  '0xa54a803d8c7438af005e01309fcc3e94d214cfa72e6399547e48b9e0775e8093';
const aristosContract = require('../../smart-contracts/build/contracts/Aristos.json');

//const web3 = new Web3('https://alfajores-forno.celo-testnet.org')
const projectId = process.env.IPFS_PROJECT_ID;
const projectSecret = process.env.IPFS_PROJECT_SECRET;
const auth =
  'Basic ' + Buffer.from(projectId + ':' + projectSecret).toString('base64');

//ipfs initialization
const ipfsClient = create({
  host: 'ipfs.infura.io',
  port: 5001,
  protocol: 'https',
  headers: {
    authorization: auth
  }
});

const [cryptoAddress, key] = celo();
export default function SignUp({
  onRegisterFinish,
  changeReg,
  phoneNo,
  firebase
}) {
  const history = useHistory();
  const ipfsBaseUrl = 'https://ipfs.infura.io/ipfs/';

  const [username, setUsername] = useState('');
  const [address, setAddress] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [web3, setWeb3] = useState(
    new Web3('https://alfajores-forno.celo-testnet.org')
  );
  const [client, setClient] = useState(newKitFromWeb3(web3));
  const [confirm, setConfirm] = useState(false);
  const [complete, setComplete] = useState(false);
  const [aristoPos, setAristoPos] = useState(1);
  const [allUsernames, setAllUsernames] = useState([]);

  const avatarRef = useRef();
  const userNameRef = useRef(null);
  const addressRef = useRef(null);
  const suggestionsRef = useRef(null);
  const [profileError, setProfileError] = useState(null);

  useEffect(() => {
    let web = new Web3('https://alfajores-forno.celo-testnet.org');
    setWeb3(web);
    setClient(newKitFromWeb3(web));
    const fetchAllUsernames = async () => {
      const usernamesRef = refD(firebase, 'users');

      try {
        const snapshot = await get(usernamesRef);
        const usernames = [];
        snapshot.forEach((childSnapshot) => {
          if (childSnapshot.exists) {
            const username = childSnapshot.child('userName').val();
            const userNameInProfile = childSnapshot
              .child('profile')
              .child('userName')
              .val();
            if (username !== null) {
              usernames.push(username.toLowerCase());
            }
            if (userNameInProfile !== null) {
              usernames.push(userNameInProfile.toLowerCase());
            }
          }
        });
        setAllUsernames(usernames);
      } catch (error) {
        console.error('Error fetching usernames:', error);
      }
    };
    fetchAllUsernames();
  }, []);

  async function initContract() {
    const networkId = await web3.eth.net.getId();

    const network = aristosContract.networks[networkId];

    let instance = new web3.eth.Contract(
      aristosContract.abi,
      network && network.address
    );
    return instance;
  }
  async function mint(tokenMetaDataURI, privateKey) {
    //add private key to sign transaction
    client.connection.addAccount(privateKey);

    const account = web3.eth.accounts.privateKeyToAccount(
      '0xa54a803d8c7438af005e01309fcc3e94d214cfa72e6399547e48b9e0775e8093'
    );
    //encode transaction
    let initInstance = await initContract().catch((err) => console.log(err));

    let transactionObj =
      await initInstance.methods.createAristos(tokenMetaDataURI);

    //send transaction
    let transaction = await client
      .sendTransactionObject(transactionObj, { from: account.address })
      .catch((err) => {
        console.log(err);
      });

    let receipt = await transaction.waitReceipt();

    let aristoRef = refD(firebase, `users/${username}/aristo`); // line
    await update(aristoRef, {
      aristoReceipt: receipt
    });

    saveTransaction(username, 'mint', 'aristo', '', 'Areabox', 1);
  }

  function location(e, setSuggestions, suggestionsRef) {
    let input = e.target.value;
    let regex = /[*, ]/g;
    let formatted = input.replace(regex, '+');

    if (input.length >= 3) {
      setTimeout(() => {
        fetch(
          `https://nominatim.openstreetmap.org/search?q=${formatted}&format=json`
        )
          .then((res) => {
            if (!res.ok) {
              setProfileError('Location Not Found!');
              throw new Error(res.status);
            }
            setProfileError('');
            return res.json();
          })
          .then((sugg) => {
            if (sugg.length === 0) {
              setProfileError('Location Not Found!');
              suggestionsRef.current.style.display = 'none';
              setSuggestions([]);
            } else {
              setProfileError('');
              suggestionsRef.current.style.display = 'block';
              setSuggestions(sugg);
            }
          })
          .catch((err) => console.log(err));
      }, 5000);
    } else {
      setProfileError('');
      suggestionsRef.current.style.display = 'none';
      setSuggestions([]);
    }
  }
  function select(e, suggestions, setAddress) {
    let ind = e.target.dataset.index;
    let obj = suggestions[ind];
    setAddress(obj);
  }
  const startMintingProcess = async (buffer) => {
    try {
      let image = await ipfsClient.add(buffer, { pin: true });
      let imageURI = ipfsBaseUrl + image.path;

      let metaData = {
        name: `aristo ${aristoPos}`,
        description: 'Aristo from areabox',
        image: imageURI
      };
      let addedMetaData = await ipfsClient.add(JSON.stringify(metaData));
      let tokenMetaDataURI = ipfsBaseUrl + addedMetaData.path;

      let aristo = refD(firebase, `users/${username}/aristo`);
      await set(aristo, {
        aristoMetaDataURI: tokenMetaDataURI,
        aristoMetaData: metaData
      });

      mint(tokenMetaDataURI, privateKey);
      setComplete(true);
    } catch (err) {
      console.log('ipfs error', err);
    }
  };
  const getImageBuffer = () => {
    let avatar = avatarRef.current;

    let canvas = document.createElement('canvas');
    canvas.width = avatar.naturalWidth;
    canvas.height = avatar.naturalHeight;

    let ctx = canvas.getContext('2d');
    ctx.drawImage(avatar, 0, 0);

    let dataUrl = canvas.toDataURL('image/png');

    return Buffer(dataUrl.split(',')[1], 'base64');
  };

  const addState = async (stateChange, ref) => {
    let content = ref.current.value;
    if (ref === userNameRef) {
      const usernameExists = checkUsernameExists(content);
      if (usernameExists) {
        setProfileError('Name already exists!');
        return;
      } else {
        setProfileError(null);
      }
    }
    stateChange(content);
  };

  const checkUsernameExists = (username) => {
    const usernameLower = username.toLowerCase();
    const userExists = allUsernames.includes(usernameLower);
    return userExists;
  };

  async function signUpComplete() {
    let buffer = getImageBuffer();
    let user = authF.currentUser;
    await updateProfile(user, {
      displayName: username
    });

    let ref = refD(firebase, `users/${username}/profile`);
    await set(ref, {
      userName: username,
      address: address,
      aristo: aristoPos,
      phoneNo: phoneNo,
      repScore: 51
    });
    await createWalletSet();
    await startMintingProcess(buffer);

    changeReg();
    onRegisterFinish(user, {
      userName: user.displayName,
      busStop: '',
      firebaseRef: firebase
    });
  }

  const selectAristo = (dir) => {
    if (dir === 'forward') {
      let no = (aristoPos + 1) % 13;
      return no === 0 ? setAristoPos(1) : setAristoPos(no);
    } else {
      let no = aristoPos - 1;
      return no <= 0 ? setAristoPos(12) : setAristoPos(no);
    }
  };

  async function createWalletSet() {
    const walletRef = refD(firebase, `users/${username}/wallet`);
    try {
      const response = await fetch(`${apiUrl}/api/circle/walletSets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        },
        body: JSON.stringify({
          name: 'Areabox Wallet Set'
        })
      });
      const walletSet = await response.json();
      await set(walletRef, { circle: walletSet.data });
      await createWallets(walletSet.data.walletSet.id);
      return walletSet;
    } catch (error) {
      console.log('circle error', { error });
    }
  }

  async function createWallets(walletSetId) {
    const walletRef = refD(firebase, `users/${username}/wallet`);
    try {
      const response = await fetch(`${apiUrl}/api/circle/wallets/create`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          accept: 'application/json',
          Authorization: `Bearer ${process.env.CIRCLE_API_KEY_TEST}`
        },
        body: JSON.stringify({
          walletSetId
        })
      });
      const wallets = await response.json();
      const existingWalletSnapshot = await get(walletRef);
      const existingWalletData = existingWalletSnapshot.val();

      const updatedCircleData = {
        ...existingWalletData.circle,
        wallets: wallets.data.wallets
      };

      await set(walletRef, {
        ...existingWalletData,
        circle: updatedCircleData,
        celo: { celoKey: key }
      });

      return wallets.data.wallets;
    } catch (error) {
      console.log('circle error', { error });
    }
    return wallets;
  }

  return (
    <>
      <div className="sign-up">
        {profileError && <p className="error">{profileError}</p>}
        {!username && (
          <div className="username field">
            <input
              type="text"
              ref={userNameRef}
              className="enter-username"
              placeholder="mad_mellon"
              autoFocus
            />
            <p
              onClick={() => addState(setUsername, userNameRef)}
              className="username-instr"
              style={{
                alignSelf: 'center',
                paddingTop: '.5rem',
                cursor: 'pointer'
              }}>
              Enter a Username
            </p>
            <svg
              className="yellow-arrow"
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg">
              <path
                d="M17.1992 6.76692L10.7143 0.281955C10.5451 0.112782 10.2632 0 9.9812 0C9.41729 0 8.96617 0.451128 8.96617 1.01504V2.76316C8.96617 2.81955 8.90978 2.93233 8.79699 2.93233H1.01504C0.451128 2.93233 0 3.38346 0 3.94737V11.0526C0 11.6165 0.451128 12.0677 1.01504 12.0677H8.79699C8.85338 12.0677 8.96617 12.1241 8.96617 12.2368V13.985C8.96617 14.5489 9.41729 15 9.9812 15C10.2632 15 10.4887 14.8872 10.7143 14.718L17.1992 8.23308C17.3684 8.06391 17.4812 7.78196 17.4812 7.5C17.4812 7.21805 17.3684 6.99248 17.1992 6.76692Z"
                fill="#FFF606"
              />
            </svg>
          </div>
        )}
        {username && !address && (
          <div className="address field">
            <div className="input-cont" style={{ position: 'relative' }}>
              <input
                type="text"
                onInput={(e) => location(e, setSuggestions, suggestionsRef)}
                ref={addressRef}
                placeholder="Badore, Ajah"
                autoFocus
              />
              <div
                style={{
                  position: 'absolute',
                  right: '1rem',
                  top: '.5rem'
                }}>
                <img src="static/img/black-star.svg" />
              </div>
              <div
                className="suggestions"
                ref={suggestionsRef}
                style={{ position: 'absolute', width: '100%' }}>
                {suggestions?.map((plc, i) => {
                  return (
                    <p
                      className="ind-suggest"
                      key={i}
                      onClick={(e) => select(e, suggestions, setAddress)}
                      data-index={i}>
                      {plc.display_name}
                    </p>
                  );
                })}
              </div>
            </div>
            <div className="add-instr">
              <p>Nice, {username}</p>
              <p>Enter your area or neighbourhood</p>
              <p>(E.g Badore, Ajah or oniru Bus Stop)</p>
            </div>
            <svg
              className="yellow-arrow"
              onClick={() => addState(setAddress, addressRef)}
              width="18"
              height="15"
              viewBox="0 0 18 15"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{ right: '8px', bottom: '21px', display: 'none' }}>
              <path
                d="M17.1992 6.76692L10.7143 0.281955C10.5451 0.112782 10.2632 0 9.9812 0C9.41729 0 8.96617 0.451128 8.96617 1.01504V2.76316C8.96617 2.81955 8.90978 2.93233 8.79699 2.93233H1.01504C0.451128 2.93233 0 3.38346 0 3.94737V11.0526C0 11.6165 0.451128 12.0677 1.01504 12.0677H8.79699C8.85338 12.0677 8.96617 12.1241 8.96617 12.2368V13.985C8.96617 14.5489 9.41729 15 9.9812 15C10.2632 15 10.4887 14.8872 10.7143 14.718L17.1992 8.23308C17.3684 8.06391 17.4812 7.78196 17.4812 7.5C17.4812 7.21805 17.3684 6.99248 17.1992 6.76692Z"
                fill="#FFF606"
              />
            </svg>
          </div>
        )}
        {username && address && (
          <div className="black-card field">
            <div className="top edge">
              <h3
                className="username"
                style={{ fontSize: '16px', color: 'white' }}>
                {username}
              </h3>
              <div className="right">
                <img
                  src="static/img/baby_sphinx.png"
                  style={{ height: '40px', width: '40px' }}
                />
                <p>REP: 51%</p>
                <p>ARST: 1.00</p>
              </div>
            </div>
            <div
              className="mid-top edge"
              style={{ display: 'flex', justifyContent: 'space-around' }}>
              <div
                className="left"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  width: '30%',
                  alignItems: 'center'
                }}>
                <h3 style={{ color: 'white', fontSize: '12px' }}>AVATAR</h3>
                <img
                  className="avatar"
                  ref={avatarRef}
                  style={{ height: '40px', width: '33px' }}
                  src={`static/img/ARISTOS/${aristoPos}.png`}
                />
              </div>
              <div
                className="middle"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '35%',
                  justifyContent: 'space-around'
                }}>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}>
                  <svg
                    onClick={() => selectAristo('backward')}
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: 'rotateY(180deg)',
                      fill: 'white',
                      height: '5px',
                      width: '6px'
                    }}>
                    <path d="M1.15815 0.179623C0.835582 -0.107103 0.333811 -0.0354215 0.118766 0.287146C0.0112436 0.50219 -0.0245972 0.717235 0.0470844 0.93228L1.65992 4.94645C1.65992 4.98229 1.65992 4.98229 1.65992 5.01813L0.0470844 9.0323C-0.0245972 9.24734 -0.0245972 9.46239 0.118766 9.67743C0.262129 9.85664 0.477174 10 0.692219 10C0.871423 10 1.01479 9.92832 1.12231 9.8208L6.06834 5.5199C6.2117 5.37654 6.31922 5.19733 6.31922 5.01813C6.31922 4.80308 6.24754 4.62388 6.06834 4.51636L1.15815 0.179623Z" />
                    <path d="M10.871 4.48052L7.60949 1.6491C7.32277 1.39821 6.821 1.46989 6.60595 1.79246C6.46259 1.97166 6.46259 2.22255 6.53427 2.43759L7.53781 4.98229C7.53781 5.01813 7.53781 5.01813 7.53781 5.05397L6.53427 7.59867C6.46259 7.81371 6.46259 8.02876 6.60595 8.2438C6.74932 8.42301 6.96436 8.56637 7.1794 8.56637C7.35861 8.56637 7.50197 8.49469 7.60949 8.38716L10.871 5.55574C11.0144 5.41238 11.1219 5.23317 11.1219 5.05397C11.1219 4.76724 11.0502 4.58804 10.871 4.48052Z" />
                  </svg>

                  <h3
                    style={{
                      color: '#66F6FF',
                      fontSize: '10px',
                      margin: '0px 5px'
                    }}>
                    Aristos
                  </h3>

                  <svg
                    onClick={() => selectAristo('forward')}
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: 'white', width: '6px', height: '5px' }}>
                    <path d="M1.15815 0.179623C0.835582 -0.107103 0.333811 -0.0354215 0.118766 0.287146C0.0112436 0.50219 -0.0245972 0.717235 0.0470844 0.93228L1.65992 4.94645C1.65992 4.98229 1.65992 4.98229 1.65992 5.01813L0.0470844 9.0323C-0.0245972 9.24734 -0.0245972 9.46239 0.118766 9.67743C0.262129 9.85664 0.477174 10 0.692219 10C0.871423 10 1.01479 9.92832 1.12231 9.8208L6.06834 5.5199C6.2117 5.37654 6.31922 5.19733 6.31922 5.01813C6.31922 4.80308 6.24754 4.62388 6.06834 4.51636L1.15815 0.179623Z" />
                    <path d="M10.871 4.48052L7.60949 1.6491C7.32277 1.39821 6.821 1.46989 6.60595 1.79246C6.46259 1.97166 6.46259 2.22255 6.53427 2.43759L7.53781 4.98229C7.53781 5.01813 7.53781 5.01813 7.53781 5.05397L6.53427 7.59867C6.46259 7.81371 6.46259 8.02876 6.60595 8.2438C6.74932 8.42301 6.96436 8.56637 7.1794 8.56637C7.35861 8.56637 7.50197 8.49469 7.60949 8.38716L10.871 5.55574C11.0144 5.41238 11.1219 5.23317 11.1219 5.05397C11.1219 4.76724 11.0502 4.58804 10.871 4.48052Z" />
                  </svg>
                </div>

                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    padding: '0px 3px'
                  }}>
                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{
                      transform: 'rotateY(180deg)',
                      fill: 'white',
                      height: '5px',
                      width: '6px'
                    }}>
                    <path d="M1.15815 0.179623C0.835582 -0.107103 0.333811 -0.0354215 0.118766 0.287146C0.0112436 0.50219 -0.0245972 0.717235 0.0470844 0.93228L1.65992 4.94645C1.65992 4.98229 1.65992 4.98229 1.65992 5.01813L0.0470844 9.0323C-0.0245972 9.24734 -0.0245972 9.46239 0.118766 9.67743C0.262129 9.85664 0.477174 10 0.692219 10C0.871423 10 1.01479 9.92832 1.12231 9.8208L6.06834 5.5199C6.2117 5.37654 6.31922 5.19733 6.31922 5.01813C6.31922 4.80308 6.24754 4.62388 6.06834 4.51636L1.15815 0.179623Z" />
                    <path d="M10.871 4.48052L7.60949 1.6491C7.32277 1.39821 6.821 1.46989 6.60595 1.79246C6.46259 1.97166 6.46259 2.22255 6.53427 2.43759L7.53781 4.98229C7.53781 5.01813 7.53781 5.01813 7.53781 5.05397L6.53427 7.59867C6.46259 7.81371 6.46259 8.02876 6.60595 8.2438C6.74932 8.42301 6.96436 8.56637 7.1794 8.56637C7.35861 8.56637 7.50197 8.49469 7.60949 8.38716L10.871 5.55574C11.0144 5.41238 11.1219 5.23317 11.1219 5.05397C11.1219 4.76724 11.0502 4.58804 10.871 4.48052Z" />
                  </svg>

                  <h3
                    style={{
                      color: '#66F6FF',
                      fontSize: '10px',
                      margin: '0px 3px'
                    }}>
                    Accessories
                  </h3>

                  <svg
                    width="12"
                    height="10"
                    viewBox="0 0 12 10"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: 'white', width: '6px', height: '5px' }}>
                    <path d="M1.15815 0.179623C0.835582 -0.107103 0.333811 -0.0354215 0.118766 0.287146C0.0112436 0.50219 -0.0245972 0.717235 0.0470844 0.93228L1.65992 4.94645C1.65992 4.98229 1.65992 4.98229 1.65992 5.01813L0.0470844 9.0323C-0.0245972 9.24734 -0.0245972 9.46239 0.118766 9.67743C0.262129 9.85664 0.477174 10 0.692219 10C0.871423 10 1.01479 9.92832 1.12231 9.8208L6.06834 5.5199C6.2117 5.37654 6.31922 5.19733 6.31922 5.01813C6.31922 4.80308 6.24754 4.62388 6.06834 4.51636L1.15815 0.179623Z" />
                    <path d="M10.871 4.48052L7.60949 1.6491C7.32277 1.39821 6.821 1.46989 6.60595 1.79246C6.46259 1.97166 6.46259 2.22255 6.53427 2.43759L7.53781 4.98229C7.53781 5.01813 7.53781 5.01813 7.53781 5.05397L6.53427 7.59867C6.46259 7.81371 6.46259 8.02876 6.60595 8.2438C6.74932 8.42301 6.96436 8.56637 7.1794 8.56637C7.35861 8.56637 7.50197 8.49469 7.60949 8.38716L10.871 5.55574C11.0144 5.41238 11.1219 5.23317 11.1219 5.05397C11.1219 4.76724 11.0502 4.58804 10.871 4.48052Z" />
                  </svg>
                </div>
              </div>
              <div
                className="right"
                style={{
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  width: '30%'
                }}>
                <svg
                  width="15"
                  height="15"
                  viewBox="0 0 22 22"
                  fill="currentColor"
                  xmlns="http://www.w3.org/2000/svg">
                  <path
                    d="M18.8779 4.58912L18.8801 0H2.90395C2.15662 0.00148099 1.43849 0.290354 0.898304 0.806788C0.358117 1.32322 0.0372634 2.02764 0.00219996 2.77415L0 11.3386H1.22318V5.27551C1.71367 5.6255 2.3014 5.81321 2.90395 5.8123H20.7765V20.3123H11.0614V21.5354H21.9996V4.58912L18.8779 4.58912ZM17.6547 4.58912H2.90395C2.4576 4.58912 2.02953 4.41181 1.71391 4.09619C1.39829 3.78057 1.22098 3.3525 1.22098 2.90615C1.22098 2.4598 1.39829 2.03173 1.71391 1.71611C2.02953 1.40049 2.4576 1.22318 2.90395 1.22318H17.6547V4.58912Z"
                    fill="currentColor"
                  />
                  <path
                    d="M18.2535 13.8179C18.6978 13.8179 19.0579 13.4577 19.0579 13.0135C19.0579 12.5693 18.6978 12.2091 18.2535 12.2091C17.8093 12.2091 17.4492 12.5693 17.4492 13.0135C17.4492 13.4577 17.8093 13.8179 18.2535 13.8179Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.8024 22C4.6548 22 3.53296 21.6597 2.57876 21.0221C1.62456 20.3846 0.880854 19.4784 0.441684 18.4181C0.00251409 17.3579 -0.112393 16.1912 0.111494 15.0656C0.335381 13.9401 0.888006 12.9062 1.69949 12.0947C2.51097 11.2832 3.54486 10.7306 4.67041 10.5067C5.79597 10.2828 6.96264 10.3977 8.02289 10.8369C9.08314 11.2761 9.98935 12.0198 10.6269 12.974C11.2645 13.9282 11.6048 15.05 11.6048 16.1976C11.603 17.736 10.9912 19.2108 9.90338 20.2986C8.8156 21.3864 7.34076 21.9983 5.8024 22ZM5.8024 11.4952C4.87235 11.4952 3.96319 11.771 3.18988 12.2877C2.41657 12.8044 1.81385 13.5388 1.45793 14.3981C1.10202 15.2573 1.0089 16.2028 1.19034 17.115C1.37178 18.0272 1.81965 18.8651 2.47729 19.5227C3.13494 20.1804 3.97283 20.6282 4.88501 20.8097C5.79719 20.9911 6.74269 20.898 7.60194 20.5421C8.4612 20.1862 9.19562 19.5835 9.71232 18.8101C10.229 18.0368 10.5048 17.1277 10.5048 16.1976C10.5034 14.9509 10.0075 13.7556 9.12595 12.8741C8.24439 11.9925 7.04913 11.4966 5.8024 11.4952Z"
                    fill="currentColor"
                  />
                  <path
                    d="M5.25492 13.3429V14.0565H4.23457V16.7423H6.26954V17.2379L4.23853 17.2401L4.23963 18.3401L5.25492 18.339V19.0522H6.3549V18.3377L7.36952 18.3366V15.6423H5.33455V15.1565H7.37062V14.0565H6.3549V13.3429H5.25492Z"
                    fill="currentColor"
                  />
                </svg>
                <div
                  className="barcode"
                  style={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    marginTop: '5px'
                  }}>
                  <svg
                    width="20"
                    height="20"
                    viewBox="0 0 20 20"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ fill: 'white' }}>
                    <path d="M0 0V5.83325H5.83325V0H0ZM4.16675 4.16675H1.66675V1.66675H4.16675V4.16675Z" />
                    <path d="M0 14.1665V20H5.83325V14.1665H0ZM4.16675 18.3335H1.66675V15.8335H4.16675V18.3335Z" />
                    <path d="M14.1667 0V5.83325H20V0H14.1667ZM18.3332 4.16675H15.8332V1.66675H18.3332V4.16675Z" />
                    <path d="M18.3332 7.5V12.5H14.1667V14.1665H20V7.5H18.3332Z" />
                    <path d="M14.1667 15.8335V20H15.8332V17.5H18.3332V20H20V15.8335H14.1667Z" />
                    <path d="M7.5 0V1.66675H10.8333V5.83325H12.5V0H7.5Z" />
                    <path d="M10.8333 7.5V10.8335H7.5V15.8335H10.8333V20H12.5V14.1665H9.16675V12.5H12.5V9.16675H14.1667V10.8335H15.8333V7.5H10.8333Z" />
                    <path d="M9.16675 17.5H7.5V20H9.16675V17.5Z" />
                    <path d="M5.83325 10.8335H3.33325V12.5H5.83325V10.8335Z" />
                    <path d="M7.5 3.33325V7.5H0V12.5H1.66675V9.16675H9.16675V3.33325H7.5Z" />
                  </svg>
                  <p
                    style={{
                      fontSize: '8px',
                      width: '100px',
                      overflow: 'hidden',
                      textOverflow: 'ellipsis'
                    }}>
                    {cryptoAddress}
                  </p>
                </div>
              </div>
            </div>
            <div className="mid-bottom edge" style={{ height: '80px' }}>
              <svg
                className="green-arrow"
                onClick={() => setConfirm(true)}
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
            <div className="bottom edge">{address.display_name}</div>
          </div>
        )}
        {confirm && !complete && (
          <div className="alert confirm">
            <div className="message">
              <img
                src={`static/img/ARISTOS/${aristoPos}.png`}
                style={{
                  height: '40px',
                  width: '33px',
                  position: 'absolute',
                  left: '-9px',
                  top: '-18px'
                }}
              />
              <div className="message-inner">
                <h3
                  style={{
                    fontWeight: '700',
                    fontSize: '12px',
                    color: '#FF1800'
                  }}>
                  Are you happy with this avatar?
                </h3>
                <div style={{ fontWeight: '400', fontSize: '12px' }}>
                  You may add new wearables to your avatar later, but minted
                  Aristos are not replaceable.
                </div>
              </div>
            </div>
            <div className="round-arrow-btn" onClick={() => signUpComplete()}>
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
        )}

        {complete && (
          <Passport address={address.display_name} name={username} />
        )}
      </div>
      <style jsx>{`
        .confirm{
          font-family:RobotoMono;
          display: flex;
          flex-direction: column;
          align-items: center;
          width: 80%;
        }
        .message{
          border: #FF1800 1px solid;
          color: #FF1800;
          width: 100%;
          height: 90px;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
        }
        .message-inner{
          width: 80%;
          height: 80px;
        }
        .round-arrow-btn{
          width: 60px;
          height: 60px;
          border-radius: 50%;
          background: black;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          margin-top: 22px
        }
        .sign-up{
          display:flex;
          align-items:center;
          width; 100%;
          height:100%;
          flex-direction: column;
          margin-top: 10rem;
        }
        .field{
          background:black;
          width:90%;
          position: relative;
          padding:0px;
          font-family:RobotoMono;
          border:solid 1px black;
          color: white;
          font-size:12px;
        }
        .username {
          height: 90px;
        }
        .add-instr p {
          padding: .5rem;
        }
        .field input{
        width:100%;
        height:50px;
        font-size: 16px;
        padding: 4px;
        color:black;
        }
        .username p{
          height:40px;
          margin:auto;
          color:white;
          text-align: center;
        }
        svg{
          cursor: pointer;
        }
        .yellow-arrow{
          position: absolute;
          right: 10px;
          bottom:10px;
        }
        .black-card{
          width: 80%;
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          padding: 14px 0px;
          margin-bottom: 50px;
        }
        .top{
          display: flex;
          justify-content: space-between;
          align-items: baseline;
        }
        .top .right{
          display: flex;
          flex-direction: column;
          
        }
        .top .right p{
          padding: 0px;
          color: #66F6FF;
          font-size: 8px;
          margin:0px;
        }
        .edge{
          padding: 4px 7px;
        }
        .mid-bottom{
          display: flex;
          flex-direction: column;
          justify-content: space-around;
          align-items: center;
        }
        .bottom{
          border-top: rgba(256, 256, 256, 0.3) 1px solid;
          border-bottom: rgba(256, 256, 256, 0.3) 1px solid;
          text-align: center;
        }
        .suggestions{
          position: absolute;
          top:52px;
          background: white;
          height: max-content;
          min-height: 3.5rem;
          overflow-y: scroll;
          scrollbar-width: 1px;
          display: none;
        }
        .ind-suggest{
          width: 100%; 
          color: black;
          padding: .5rem 1rem;
          border-bottom: 0.5px dotted rgba(0, 0, 0, 0.5);
          marginBottom: "0px";
          padding: "2px";
          cursor: "pointer";
        }
        .ind-suggest:hover {
          background-color: rgba(142, 109, 185, 0.1);
          cursor: pointer;
        }
        .error{
          color: red;
          align-self: flex-end;
          margin-right: 2rem;
        }
      `}</style>
    </>
  );
}

function celo() {
  let web3 = new Web3('https://alfajores-forno.celo-testnet.org');

  let account = web3.eth.accounts.create();

  let privateKey = account.privateKey;
  let cryptoAddress = account.address;

  return [cryptoAddress, privateKey];
}
