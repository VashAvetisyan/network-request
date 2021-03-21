import React, { Component, useEffect, useState } from 'react'
import { connect } from 'react-redux'

import Post from 'components/Post/Post'

import './Posts.scss'
import fbService from 'api/fbService';
import PostModal from 'components/PostModal/PostModal';

import { getReduxPosts, setPostsHasMore, setReduxPosts } from 'actions/postActions'

const limit = 8;

const Posts = ({
    posts,
    setReduxPosts,
    setPostsHasMore,
    getReduxPosts,
    hasMore,
    history
}) => {
    const [state, setState] = useState({
        startAt: posts ? posts.length : 0,
        loading: false,
        isCreatePopupOpen: false,
        titleValue: '',
        bodyValue: ''
    })

    useEffect(() => {
        if (!posts) {
            setReduxPosts(state.startAt, limit)
        }
    }, [])

    const createPost = () => {
        const newPost = {
            title: state.titleValue,
            body: state.bodyValue,
            userId: 1
        }
        fbService.PostService.createPost(newPost)
            .then(data => {
                toggleCreateModal()
                history.push(`/posts/${data.id}`)
            })
    }

    const deletePost = (id) => {
        const { startAt } = state
        fbService.postService.deletePost(id)
            .then(() => {
                fbService.PostService.getPosts(0, startAt !== 0 ? startAt + limit : limit)
                    .then(res => {
                        setReduxPosts(res)
                    })
            })
            .catch(err => {
                console.log(err)
            })
    }

    const getMore = () => {
        const newStartAt = state.startAt + limit + 1
        setState({
            ...state,
            startAt: newStartAt,
            loading: true
        })
        getReduxPosts(newStartAt, newStartAt + limit)
            .then(data => {
                setState({
                    ...state,
                    loading: false
                })
            })
    }

    const toggleCreateModal = () => {
        setState(prev => ({
            ...state,
            isCreatePopupOpen: !prev.isCreatePopupOpen
        }))
    }

    const changeValue = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    const { loading, isCreatePopupOpen, titleValue, bodyValue } = state
    //const { state: { posts } } = this.context

    if (!posts) {
        return <div className="app-loding">Loagind...</div>
    }

    return (
        <div className="app-posts">
            {posts.length > 0 ? (
                <>
                    <div className="app-posts__container">
                        {
                            posts.map(post => {
                                return <Post
                                    key={post.id}
                                    post={post}
                                    className="app-posts__container__post"
                                    link={true}
                                    remove={() => deletePost(post.id)}
                                />
                            })
                        }
                    </div>
                    <div className="app-posts__buttons">
                        {hasMore && <button onClick={getMore} disabled={loading}>
                            {loading ? 'Loading...' : 'Get More'}
                        </button>}
                        <button onClick={toggleCreateModal}>Create Post</button>
                    </div>
                </>
            ) : (
                <div>Ro result</div>
            )}
            <PostModal
                action={createPost}
                bodyValue={bodyValue}
                titleValue={titleValue}
                changeValue={changeValue}
                isOpen={isCreatePopupOpen}
                onClose={toggleCreateModal}
                buttonTitle="Save"
            />
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        posts: state.postsData.posts,
        hasMore: state.postsData.hasMore
    }
}

const mapDispatchToProps = {
    getReduxPosts,
    setReduxPosts,
    setPostsHasMore
}

export default connect(mapStateToProps, mapDispatchToProps)(Posts)
