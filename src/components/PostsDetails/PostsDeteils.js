import React, { Component } from 'react'
import { connect } from 'react-redux'

import Post from 'components/Post/Post'

import './PostDetails.scss';
import fbService from 'api/fbService';

import PostModal from 'components/PostModal/PostModal';
import Loading from 'components/Loading/Loading';
import { updatePostInList } from 'actions/postActions'

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
                const { posts } = this.props
                if (posts && posts.find(el => el.id === this.state.post.id)) {
                    this.props.updatePostInList(updatedPost)
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
            return <div>
                <Loading />
            </div>
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

const mapStateToProps = (state) => {
    return {
        posts: state.postsData.posts
    }
}

const mapDispatchToProps = {
    updatePostInList
}

export default connect(mapStateToProps, mapDispatchToProps)(PostsDeteils)