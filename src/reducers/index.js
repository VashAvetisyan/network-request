import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import postReducer from './postReducer'
import todoReducer from './todoReducer'

const reducers = combineReducers({
    postsData: postReducer,
    todosData: todoReducer
})

const initialState = {
    postsData: {
        posts: null,
        hasMore: true
    },
    todosData: {
        todos:null,
        todoHasMore: true
    }
}

export const store = createStore(reducers, initialState, applyMiddleware(reduxThunk))
