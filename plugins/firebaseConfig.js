import firebase from 'firebase/app'
import 'firebase/firestore'
import 'firebase/auth'

// Initialize Cloud Firestore through Firebase
if (!firebase.apps.length) {
  const firebaseConfig = {
    apiKey: 'AIzaSyBB-S_2zb3kXPuzsRiZg9bUBJT-kMWh_xU',
    authDomain: 'lyn-hotel.firebaseapp.com',
    databaseURL: 'https://lyn-hotel.firebaseio.com',
    projectId: 'lyn-hotel',
    storageBucket: 'lyn-hotel.appspot.com',
    messagingSenderId: '601758377292',
    appId: '1:601758377292:web:326a5986ae6653d2d3dbe9',
    measurementId: 'G-NXS34FWQ1F',
  }
  firebase.initializeApp(firebaseConfig)
}

export const db = firebase.firestore()
