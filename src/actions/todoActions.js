
import reduxActionTypes from 'reducers/reduxActionTypes';
import fbService from 'api/fbService';

export const setReduxTodos = (startAt, limit) => (dispatch) => {
    fbService.todoService.getTodos(startAt, limit)
        .then(data => {
            console.log(data)
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
            setTodosHasMore(data.length < limit ? false : true)
            dispatch({
                type: reduxActionTypes.GET_MORE_TODOS,
                payload: {
                    todos: data
                }
            })
        })
}

export const setTodosHasMore = (hasMore) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.SET_TODOS_HAS_MORE,
        payload: {
            hasMore
        }
    })
}
