import React, { Component } from 'react'

import Post from 'components/Post/Post'

import Modal from '@material-ui/core/Modal';

import './PostDetails.scss';
import { Button } from '@material-ui/core';
import fbService from 'api/fbService';

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

    componentDidMount() {
        fbService.getPost(this.props.match.params.postId)
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
        fbService.updatePost({
            ...this.state.post,
            title: this.state.titleValue,
            body: this.state.bodyValue
        }).then(res => {
            this.setState({
                post: {...this.state.post, title:this.state.titleValue,  body:this.state.bodyValue},
                isEditPopupOpen: false
            })
        })
    }

    changeValue = (name, value) => {
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
                    onClick={() => {}}
                />
                <Modal
                    open={isEditPopupOpen}
                    onClose={this.toggleEditPopup}
                    className="app-post-details__edit-modal"
                >
                    <div className="app-post-details__edit-modal__inner">
                        <h1>Tiele</h1>
                        <input 
                            value={titleValue} 
                            className="app-post-details__edit-modal__inner__input"
                            onChange={(e) => this.changeValue('titleValue', e.target.value)}
                        />
                        <h1>Body</h1>
                        <input 
                            value={bodyValue} 
                            className="app-post-details__edit-modal__inner__input"
                            onChange={(e) => this.changeValue('bodyValue', e.target.value)}
                        />
                        <Button variant="contained" color="primary" onClick={this.savePost}>
                            Save
                        </Button>
                    </div>
                </Modal>
            </div>
        )
    }
}

export default PostsDeteils