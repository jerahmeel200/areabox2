import { ref, get } from 'firebase/database';
import FirebaseDatabase from './firebase';

export default async (loggedIn, set) => {
  const accounts = [];
  const usersRef = ref(FirebaseDatabase, 'users');
  try {
    const snapshot = await get(usersRef);
    const users = snapshot.val();
    for (const user of Object.keys(users)) {
      if (users[user].profile && users[user].profile.aristo) {
        accounts.push(users[user]);
      }
    }
    set(accounts.filter((acc) => acc.profile.userName !== loggedIn.userName));
  } catch (error) {
    console.error('Error loading data:', error);
  }
};
