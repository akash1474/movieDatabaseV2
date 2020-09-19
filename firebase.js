const firebase = require("firebase");

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDhm6bwkA0T6ehlf9RAuJKK64fPBOhI440",
  authDomain: "moviedatabase-172e6.firebaseapp.com",
  databaseURL: "https://moviedatabase-172e6.firebaseio.com",
  projectId: "moviedatabase-172e6",
  storageBucket: "moviedatabase-172e6.appspot.com",
  messagingSenderId: "420763602460",
  appId: "1:420763602460:web:dc0212eafeb2f2c77619d9",
  measurementId: "G-3PCND39SPN",
};

const firebaseApp = firebase.initalizeApp(firebaseConfig);
const auth = firebase.auth();
const provider = new firebase.auth.googleAuthProvider();

module.exports = function () {
  auth
    .signInWithPopup(provider)
    .then((msg) => {
      console.log(msg);
    })
    .catch((err) => {
      console.log(err);
    });
};
