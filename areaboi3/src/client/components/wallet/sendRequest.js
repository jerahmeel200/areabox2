import React, { useEffect, useState } from 'react';
import Web3 from 'web3';
import contractAbi from '../../../build/contracts/RequestMoney.json';

const SendRequest = () => {
  const [recipientAddress, setRecipientAddress] = useState('');
  const [amount, setAmount] = useState(0);

  const handleRecipientChange = (event) => {
    setRecipientAddress(event.target.value);
  };

  const handleAmountChange = (event) => {
    setAmount(Number(event.target.value));
  };

  useEffect(() => {
    const init = async () => {
      if (window.ethereum) {
        const web3 = new Web3(window.ethereum);
        try {
          await window.ethereum.enable();
          const contractAddress = '';
          const contract = new web3.eth.Contract(contractAbi, contractAddress);

          const accounts = await web3.eth.getAccounts();
          const userAddress = accounts[0];

          const durationInMinutes = 5;

          contract.methods
            .requestMoney(recipientAddress, amount, durationInMinutes)
            .send({ from: userAddress })
            .on('transactionHash', (hash) => {
              console.log('Transaction Hash:', hash);
            })
            .on('receipt', (receipt) => {
              console.log('Transaction Receipt:', receipt);
            })
            .on('error', (error) => {
              console.error('Transaction Error:', error);
            });
        } catch (error) {
          console.error('MetaMask enable error:', error);
        }
      } else {
        console.error('MetaMask not detected');
      }
    };

    init();
  }, [recipientAddress, amount]);

  return (
    <>
      <label>
        Recipient Address:
        <input
          type="text"
          value={recipientAddress}
          onChange={handleRecipientChange}
        />
      </label>
      <br />
      <label>
        Amount:
        <input type="number" value={amount} onChange={handleAmountChange} />
      </label>
    </>
  );
};

export default SendRequest;
