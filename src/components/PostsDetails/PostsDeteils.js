import React, { Component } from 'react'

import Post from 'components/Post/Post'

import './PostDetails.scss';
import fbService from 'api/fbService';
import { AppContext } from 'context/AppContext';

import actionTypes from "context/actionTypes";
import PostModal from 'components/PostModal/PostModal';

export class PostsDeteils extends Component {

    constructor(props) {
        super(props)
        this.state = {
            post: null,
            isEditPopupOpen: false,
            titleValue: '',
            bodyValue: '',
        }
    }

    static contextType = AppContext

    componentDidMount() {
        fbService.postService.getPost(this.props.match.params.postId)
            .then((data) => {
                this.setState({
                    post: data,
                    titleValue: data.title,
                    bodyValue: data.body
                })
            })
    }

    toggleEditPopup = () => {
        this.setState(prevState => ({
            isEditPopupOpen: !prevState.isEditPopupOpen
        }))
    }

    savePost = () => {
        fbService.postService.updatePost({
            ...this.state.post,
            title: this.state.titleValue,
            body: this.state.bodyValue
        })
            .then(res => {
                const updatedPost = {
                    ...this.state.post,
                    title: this.state.titleValue,
                    body: this.state.bodyValue
                }
                this.setState({
                    post: updatedPost,
                    isEditPopupOpen: false
                })
                const { state: { posts } } = this.context
                if (posts && posts.find(el => el.id === this.state.post.id)) {
                    this.context.dispatch({ type: actionTypes.UPDATE_POST, payload: { post: updatedPost } })
                }
            })
    }

    changeValue = (e) => {
        const { name, value } = e.target
        this.setState({
            [name]: value
        })
    }

    render() {
        const { post, isEditPopupOpen, titleValue, bodyValue } = this.state

        if (!post) {
            return <div>Loagind...</div>
        }

        return (
            <div className="app-post-details">
                <Post
                    post={this.state.post}
                    edit={this.toggleEditPopup}
                    onClick={() => { }}
                />
                <PostModal
                    action={this.savePost}
                    bodyValue={bodyValue}
                    titleValue={titleValue}
                    changeValue={this.changeValue}
                    isOpen={isEditPopupOpen}
                    onClose={this.toggleEditPopup}
                    buttonTitle="Save"
                />
            </div>
        )
    }
}

export default PostsDeteils