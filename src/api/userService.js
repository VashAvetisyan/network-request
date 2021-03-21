
import firebase from "firebase/app";
import 'firebase/auth'

class userService {

    login = async (credentials) => {
        const res = await firebase
            .auth()
            .signInWithEmailAndPassword(credentials.email, credentials.password);
        const { uid, photoURL, email, displayName } = res.user;
        return { uid, photoURL, email, displayName };
    };

    signup = async (credentials) => {
        const res = await firebase
            .auth()
            .createUserWithEmailAndPassword(credentials.email, credentials.password);
        const user = firebase.auth().currentUser;
        await user.updateProfile({
            displayName: credentials.name,
        });
        const { uid, photoURL, email, displayName } = res.user;
        return { uid, photoURL, email, displayName };
    };

    logout = async () => {
        firebase.auth().signOut();
    };
}

export default new userService()