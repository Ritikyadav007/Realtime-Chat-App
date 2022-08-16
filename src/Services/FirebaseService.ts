import firebase from 'firebase/compat/app';

const firebaseConfig = {
  apiKey: 'AIzaSyAih8oXNGUo1VpOLXrP9w5y6AIT-JsjIBI',
  authDomain: 'chat-app-e3bb9.firebaseapp.com',
  projectId: 'chat-app-e3bb9',
  storageBucket: 'chat-app-e3bb9.appspot.com',
  messagingSenderId: '123130287849',
  appId: '1:123130287849:web:591d4f05b73cb33604c278',
  databaseURL: 'https://chat-app-e3bb9-default-rtdb.firebaseio.com',
};

class FirebaseService {
  private instance: any;

  constructor(config: Object) {
    if (!this.instance) {
      this.instance = firebase.initializeApp(config);
    }
  }

  get() {
    return this.instance;
  }
}

const firebaseApp = new FirebaseService(firebaseConfig);

export default firebaseApp;
// const app = firebase.initializeApp(firebaseConfig);

// export default app;
