import actionTypes from "./actionTypes";

const AppReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ...state,
                user: action.payload.user
            }
        case actionTypes.REMOVE_USER:
            return {
                ...state,
                user: null
            }
        case actionTypes.SET_POSTS:
            return {
                ...state,
                posts: action.payload.posts
            }
        case actionTypes.GET_MORE_POSTS:
            return {
                ...state,
                posts: [...state.posts, ...action.payload.posts]
            }
        case actionTypes.UPDATE_POST:
            return {
                ...state,
                posts: state.posts.map(el => {
                    if (el.id === action.payload.post.id) {
                        return action.payload.post
                    }
                    return el;
                })
            }
        case actionTypes.CREATE_POST:
            return {
                ...state,
                posts: [...state.posts, action.payload.post]
            }
        default:
            return state;
    }
}

export default AppReducer