
import reduxActionTypes from 'reducers/reduxActionTypes';
import fbService from 'api/fbService';

// export const setReduxPosts = (posts) => ({
//     type: reduxActionTypes.SET_POSTS,
//     payload: {
//         posts: posts
//     }
// })

export const setReduxPosts = (startAt, limit) => (dispatch) => {
    fbService.postService.getPosts(startAt, limit)
        .then(data => {
            //this.context.dispatch({ type: actionTypes.SET_POSTS, payload: { posts: data } })
            dispatch({
                type: reduxActionTypes.SET_POSTS,
                payload: {
                    posts: data
                }
            })
        })
}

// export const getReduxPosts = (posts) => ({
//     type: reduxActionTypes.GET_MORE_POSTS,
//     payload: {
//         posts
//     }
// })

export const getReduxPosts = (startAt, limit) => (dispatch) => {
    
    return fbService.postService.getPosts(startAt, limit)
        .then((data) => {
            //this.context.dispatch({ type: actionTypes.GET_MORE_POSTS, payload: { posts: data } })
            setPostsHasMore(data.length < limit ? false : true)
            dispatch({
                type: reduxActionTypes.GET_MORE_POSTS,
                payload: {
                    posts: data
                }
            })
        })
}

// export const setPostsHasMore = (hasMore) => ({
//     type: reduxActionTypes.SET_POSTS_HAS_MORE,
//     payload: {
//         hasMore
//     }
// })

export const setPostsHasMore = (hasMore) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.SET_POSTS_HAS_MORE,
        payload: {
            hasMore
        }
    })
}
