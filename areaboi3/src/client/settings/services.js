import FirebaseDatabase from './firebase';
import { accountDetails, accountBalance } from './kuda';
import formatDate from './dateFormat';
import { onValue, push, ref as refD, set } from 'firebase/database';

export const getTransactionInfo = async (userName, setTransactions) => {
  let transactionList = [];
  const transaction = refD(FirebaseDatabase, `users/${userName}/transactions`);
  onValue(transaction, (snapshot) => {
    let trans = snapshot.val();
    if (trans && typeof trans === 'object') {
      for (let tran of Object.keys(trans)) {
        transactionList.push(trans[tran]);
      }
    } else {
      console.error('Invalid transaction data:', trans);
    }
    setTransactions(transactionList);
  });
};

export const getUserChannelMemberships = async (userName) => {
  try {
    // Fetch the user's channel memberships
    const response = await fetch(`/api/users/${userName}/channels`);
    if (!response.ok) {
      throw new Error('Failed to fetch user channel memberships');
    }
    const channelMemberships = await response.json();

    return channelMemberships;
  } catch (error) {
    console.error('Error fetching user channel memberships:', error);
    throw error;
  }
};

export const saveTransaction = async (
  username,
  type,
  currency,
  to,
  from,
  amount
) => {
  let time = formatDate();
  let saveTransaction = refD(
    FirebaseDatabase,
    `users/${username}/transactions`
  );
  let newTransactionRef = push(saveTransaction);
  await set(newTransactionRef, {
    time,
    type,
    currency,
    to,
    from,
    amount
  });
};

export const getKudaInfo = async (userName, setKuda, setKudaBalance) => {
  const kudaRef = refD(FirebaseDatabase, `users/${userName}/wallet/kuda`);
  onValue(kudaRef, async (snapshot) => {
    let kudaInfo = snapshot.val();
    await accountDetails(kudaInfo?.trackingReference).then((res) => {
      setKuda([res?.data?.account]);
    });
    await accountBalance(kudaInfo?.trackingReference).then((res) => {
      setKudaBalance(res.data?.availableBalance);
    });
  });
};

export const getAristoInfo = async (userName, setAristoInfo) => {
  let aristo = refD(FirebaseDatabase, `users/${userName}/aristo`);
  onValue(aristo, (snapshot) => {
    let aristoInfo = snapshot.val();
    setAristoInfo(aristoInfo);
  });
};

export const generateOTP = async () => {
  return Math.floor(10000 + Math.random() * 90000).toString();
};

export const sendTokenWithAfricaStalking = async (phoneNo, otp) => {
  try {
    const response = await fetch('api/sms/africastalking/messaging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        phoneNo,
        otp
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending OTP via AfricasTalking', error);
  }
};

export const sendTokenWithMessageBird = async (phoneNo, otp) => {
  try {
    const response = await fetch('api/sms/messagebird/messaging', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      },
      body: JSON.stringify({
        phoneNo,
        otp
      })
    });
    const data = await response.json();
    if (data.recipients.totalSent > 0) {
      console.log('OTP sent via MessageBird');
      return { success: true };
    } else {
      console.error('Failed to send OTP via MessageBird');
      return { success: false, error: 'Failed to send OTP' };
    }
  } catch (error) {
    console.error('Error sending OTP via MessageBird', error);
    return { success: false, error: error.message };
  }
};

export const sendTokenWithTermii = async (phoneNo, phoneCode) => {
  try {
    const response = await fetch('api/sms/termii/sendOTP', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        phoneNo,
        phoneCode
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error sending OTP via Termii', error);
  }
};

export const verifyTokenWithTermii = async (pin, pin_id) => {
  try {
    const response = await fetch('api/sms/termii/verifyOTP', {
      method: 'POST',
      headers: {
        accept: 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        pin,
        pin_id
      })
    });
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Error verifying OTP via Termii', error);
  }
};

export const verifyToken = (generatedOTP, enteredOTP) => {
  if (generatedOTP && enteredOTP) {
    return generatedOTP === enteredOTP;
  }
};

export function format(no) {
  const formatter = new Intl.NumberFormat();
  return formatter.format(no);
}
