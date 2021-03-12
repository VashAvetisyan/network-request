import actionTypes from "./contextTypes";

const AppReducer = (state, action) => {
    switch (action.type) {
        case actionTypes.SET_USER:
            return {
                ... state,
                user: action.payload.user
            }
        default:
            return state;
    }
}

export default AppReducer