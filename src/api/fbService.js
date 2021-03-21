import firebase from "firebase/app";
import userService from './userService'
import postService from './postService'
import firebaseConfig from './firebaseConfig';

if (firebase.apps.length === 0) {
    firebase.initializeApp(firebaseConfig);
}

const fbService = {
    userService,
    postService,
}

export default fbService