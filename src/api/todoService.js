import firebase from "firebase/app";
import 'firebase/database';
import 'firebase/auth'

class todoService {
    getAllTodo = async () => {
        const res = await firebase.database()
            .ref('todo')
            .get();
        const data = res.toJSON();
        return Object.values(data);
    }

    getTodos = async (startAt, endAt) => {
        const res = await firebase.database()
            .ref('todo')
            .orderByKey()
            .startAt(startAt.toString())
            .endAt(endAt.toString())
            .get()
        const data = res.toJSON()
        return Object.values(data)
    }

    updateTodo = async (todoData) => {
        const todoRef = firebase.database().ref(`todo/${todoData.id}`)
        await todoRef.update(todoData)
        const res = await todoRef.get();
        return res.val()
    }
}
export default new todoService()