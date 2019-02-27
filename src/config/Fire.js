//Code taken from https://www.youtube.com/watch?v=r4EsP6rovwk
import firebase from 'firebase';

// Initialize Firebase
const config = {
    apiKey: "AIzaSyAA-Jro1LcWCkJNkLZbfD_xRramXtRn-PY",
    authDomain: "couchpotato-ca085.firebaseapp.com",
    databaseURL: "https://couchpotato-ca085.firebaseio.com",
    projectId: "couchpotato-ca085",
    storageBucket: "couchpotato-ca085.appspot.com",
    messagingSenderId: "774182574194"
};
const fire = firebase.initializeApp(config);
export default fire;