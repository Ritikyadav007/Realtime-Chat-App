import 'firebase/compat/auth';
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
} from 'firebase/auth';
import firebaseApp from './FirebaseService';

const auth = firebaseApp.get().auth();

export function signUp(email: string, password: string) {
  return createUserWithEmailAndPassword(auth, email, password);
}
export function LogIn(email: string, password: string) {
  return signInWithEmailAndPassword(auth, email, password);
}

export function LogOut() {
  return signOut(auth);
}

export function ResetPassword(email: string) {
  return sendPasswordResetEmail(auth, email);
}

export default auth;
