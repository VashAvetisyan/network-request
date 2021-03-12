import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth'
import firebaseConfig from './firebaseConfig';

class FbService {
    constructor() {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig);
        }
    }

    getAllPosts = async () => {
        const res = await firebase.database()
            .ref("posts")
            .get();
        return res.val()
    }

    getPosts = async (startAt = 0, endAt = 8) => {
        const res = await firebase.database()
            .ref('posts')
            .orderByKey()
            .startAt(startAt.toString())
            .endAt(endAt.toString())
            .get()
        const data = res.toJSON()
        return Object.values(data)
    }

    getPost = async (id) => {
        const res = await firebase.database()
            .ref(`posts/${id}`)
            .get()
        return res.val()
    }

    updatePost = async (postData) => {
        const postRef = firebase.database().ref(`posts/${postData.id}`)
        await postRef.update(postData)
        const res = await postRef.get();
        return res.val()
    }

    deletePost = async (id) => {
        const postRef = firebase.database().ref(`posts/${id}`)
        await postRef.remove()

        const posts = await this.getAllPosts()
        const postsRef = firebase.database().ref('posts')
            .set(posts.map((el, index) => {
                return {
                    ...el,
                    id: index
                }
            }))
    }

    createPost = async (postData) => {
        const res = await firebase.database()
            .ref('posts')
            .orderByKey()
            .limitToLast(1)
            .get()
        const lastItemJson = res.toJSON()
        const lastItem = Object.values(lastItemJson)[0];
        const { id } = lastItem;

        const newItem = {
            ...postData,
            id: id + 1
        }

        await firebase.database()
            .ref(`posts/${id + 1}`)
            .set(newItem)
        return newItem;
    }

    fromResToUser = (res) =>  {
        const { uid, email, displayName, photoURL } = res.user
        return { uid, email, displayName, photoURL };
    }

    login = async (creadetials) => {
        const res = await firebase.auth().signInWithEmailAndPassword(creadetials.email, creadetials.password)
        return this.fromResToUser(res)
    }

    signup = async (creadetials) => {
        const res = await firebase.auth().createUserWithEmailAndPassword(creadetials.email, creadetials.password)
        return this.fromResToUser(res)
    }

}
const fbService = new FbService()
export default fbService