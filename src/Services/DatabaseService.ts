import { set, ref as dbref, push, getDatabase } from 'firebase/database';
import firebaseApp from './FirebaseService';

const realtimeDb = getDatabase(firebaseApp.get());

export const uploadMessages = (id: string, msg: string, groupId: string) => {
  const messagesDBRef = dbref(
    realtimeDb,
    `groups/${groupId && groupId}/messages`,
  );
  const dbRef = push(messagesDBRef);
  set(dbRef, {
    fromUser: id,
    message: msg,
    timestamp: new Date().getTime(),
  });
};

export default realtimeDb;
