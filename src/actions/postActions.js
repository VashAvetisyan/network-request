
import reduxActionTypes from 'reducers/reduxActionTypes';
import fbService from 'api/fbService';

export const setReduxPosts = (startAt, limit) => (dispatch) => {
    fbService.postService.getPosts(startAt, limit)
        .then(data => {
            dispatch({
                type: reduxActionTypes.SET_POSTS,
                payload: {
                    posts: data,
                }
            })
        })
}

export const getReduxPosts = (startAt, limit) => (dispatch) => {
    return fbService.postService.getPosts(startAt, limit)
        .then((data) => {
            dispatch({
                type: reduxActionTypes.SET_POSTS_HAS_MORE,
                payload: {
                    hasMore: data.length < 9 ? false : true
                }
            })
            dispatch({
                type: reduxActionTypes.GET_MORE_POSTS,
                payload: {
                    posts: data
                }
            })
        })
}

export const setPostsHasMore = (hasMore) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.SET_POSTS_HAS_MORE,
        payload: {
            hasMore
        }
    })
}

export const updatePostInList = (updatePost) => (dispatch) => {
    dispatch({
        type: reduxActionTypes.UPDATE_POST,
        payload: {
            post: updatePost
        }
    })
}