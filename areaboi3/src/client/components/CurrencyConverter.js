import { useEffect, useState } from 'react';

const CurrencyConverter = ({ onAmountChange, fundsError }) => {
  const [amount, setAmount] = useState('');
  const [convertedAmount, setConvertedAmount] = useState('');
  let [exchangeRate, setExchangeRate] = useState('');

  useEffect(() => {
    onAmountChange(amount, exchangeRate);
  }, [convertedAmount, onAmountChange]);

  const handleAmountChange = async (e) => {
    const inputValue = e.target.value;
    setAmount(inputValue);

    try {
      const response = await fetch(`/api/exchange-rates?base=USD&target=NGN`);
      const data = await response.json();
      const exchangeRate = data.exchangeRate;
      setExchangeRate(exchangeRate);

      if (inputValue !== '') {
        const converted = parseFloat(inputValue) * exchangeRate;
        setConvertedAmount(converted.toFixed(2));
      } else {
        setConvertedAmount('0.00');
      }
    } catch (error) {
      console.error('Error fetching exchange rates:', error);
    }
  };

  return (
    <div
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        margin: '1rem 0'
      }}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          fontSize: '1.5rem'
        }}>
        <input
          style={{
            backgroundColor: 'black',
            color: 'white',
            width: '5rem',
            height: '2rem',
            border: 'none',
            alignSelf: 'center',
            outline: 'none',
            textAlign: 'right'
          }}
          onChange={handleAmountChange}
          value={amount}
          placeholder="0"
          autoFocus
        />
        <span
          style={{
            color: '#66F6FF'
          }}>
          |
        </span>
        <span>USD</span>
      </div>
      <small
        style={{
          color: '#8e8e8e'
        }}>
        NAIRA PRICE ₦ {convertedAmount ? convertedAmount : '0.00'}
      </small>
      <small
        style={{
          color: 'red'
        }}>
        {fundsError}
      </small>
    </div>
  );
};

export default CurrencyConverter;
