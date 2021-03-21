import { createStore, combineReducers, applyMiddleware } from 'redux'
import reduxThunk from 'redux-thunk'
import postReducer from './postReducer'

const reducers = combineReducers({
    postsData: postReducer,
})

const initialState = {
    postsData: {
        posts: null,
        hasMore: true
    },
}

export const store = createStore(reducers, initialState, applyMiddleware(reduxThunk))
