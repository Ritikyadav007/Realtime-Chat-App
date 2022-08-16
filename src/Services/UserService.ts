import { getFirestore, setDoc, doc } from '@firebase/firestore';
import firebaseApp from './FirebaseService';

const db = getFirestore(firebaseApp.get());

export const addUserToStore = async (
  userName: string,
  userEmail: string,
  userId: string,
) => {
  const dbRef = doc(db, 'users', userId);
  try {
    await setDoc(dbRef, {
      name: userName,
      email: userEmail,
      uid: userId,
    });
  } catch (e) {
    console.log(e);
  }
};

export default db;
