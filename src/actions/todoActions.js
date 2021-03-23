
import reduxActionTypes from 'reducers/reduxActionTypes';
import fbService from 'api/fbService';

export const setReduxTodos = (startAt, limit) => (dispatch) => {
    fbService.todoService.getTodos(startAt, limit)
        .then(data => {
            dispatch({
                type: reduxActionTypes.SET_TODOS,
                payload: {
                    todos: data
                }
            })
        })
}

export const getReduxTodos = (startAt, limit) => (dispatch) => {
    return fbService.todoService.getTodos(startAt, limit)
        .then((data) => {
            dispatch({
                type: reduxActionTypes.SET_TODO_HAS_MORE,
                payload: {
                    todoHasMore: data.length < 9 ? false : true
                }
            })
            dispatch({
                type: reduxActionTypes.GET_MORE_TODOS,
                payload: {
                    todos: data
                }
            })
        })
}

export const setTodosHasMore = (todoHasMore) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.SET_TODOS_HAS_MORE,
        payload: {
            todoHasMore
        }
    })
}


export const updateToDoInList = (updateTodo) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.UPDATE_TODO,
        payload:{
            todo: updateTodo
        }
    })
}