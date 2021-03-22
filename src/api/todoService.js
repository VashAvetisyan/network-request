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
        console.log('asf')
        const res = await firebase.database()
            .ref('todo')
            .orderByKey()
            .startAt(startAt.toString())
            .endAt(endAt.toString())
            .get()
        const data = res.toJSON()
        console.log(data)
        return Object.values(data)
    }

    getTodo = async (id) => {
        console.log(id)
        const res = await firebase.database()
            .ref(`todo/${id}`)
            .get()
        return res.val()
    }

    updateTodo= async (todoData) => {
        const todoRef = firebase.database().ref(`todo/${todoData.id}`)
        await todoRef.update(todoData)
        const res = await todoRef.get();
        return res.val()
    }

    deleteTodo = async (id) => {
        const todoRef = firebase.database().ref(`todo/${id}`)
        await todoRef.remove()

        const todos = await this.getAllTodo()
        await firebase
            .database()
            .ref("todo")
            .set(
                todos.map((el, index) => {
                    return {
                        ...el,
                        id: index,
                    };
                })
            );
    }

    createTodo = async (todoData) => {
        const res = await firebase.database()
            .ref("todo")
            .orderByKey()
            .limitToLast(1)
            .get();
        const lastItemJson = res.toJSON();
        const lastItem = Object.values(lastItemJson)[0];
        const { id } = lastItem;
        const newItem = {
            ...todoData,
            id: id + 1
        }

        await firebase.database()
            .ref(`todo/${id + 1}`)
            .set(newItem)
        return newItem;
    }
}
export default new todoService()