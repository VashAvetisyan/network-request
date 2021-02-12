import React, { Component } from 'react'

import Post from 'components/Post/Post'
import service, { getAllPosts } from 'api/service'


import './Posts.scss'

const limit = 9;

export class Posts extends Component {
    state = {
        posts: null,
        start: 0,
        hasMore: true,
        loading: false
    }
    
    componentDidMount() {
        service.getPosts(this.state.start, limit)
            .then(data => {
                this.setState({
                    posts: data,
                })
            })
    }

    updataPost = () => {
        service.updataPost(1, {title: "Another Title"})
            .then(data => {
                const newPosts = this.state.posts.map(el => {
                    if(el.id === data.id){
                        return data;
                    }
                    return el
                })

                this.setState({
                    posts: newPosts
                })
            })
    }

    createPost = () => { 
        service.createPost({
            title: 'Awesome Ttitle',
            body: 'Awesome Body',
            userId: 1
        })
            .then(data => {
                this.setState({
                    posts: [...this.state.posts, data]
                })
            })
    }

    deletePost = (id) => {
        service.deletePost(id)
            .then(data => {
                this.setState({
                    posts: this.state.posts.filter((el) => {
                        return el.id !== id
                    })
                })
            })
    }

    getMore = () => {
        const newStart = this.state.start + limit
        this.setState({
            start: newStart,
            loading: true
        })
        service.getPosts(newStart, limit)
            .then(data => {
                this.setState({
                    posts: [...this.state.posts, ...data],
                    hasMore: data.length < limit ? false : true,
                    loading: false
                })
            })
    }

    render() {
        const {loading, hasMore, posts} = this.state
        return (
            <div className="app-posts">
                {posts ? (
                    <>
                        <div className="app-posts__container">
                        {
                            posts.map(post => {
                                return <Post
                                    key={post.id}
                                    post={post}
                                    className="app-posts__container__post"
                                />
                            })
                        }
                        </div>
                        <div className="app-posts__buttons">
                            {hasMore &&  <button onClick={this.getMore} disabled={loading}>{loading ? 'Loading...' : 'Get More'}</button>}
                            <button onClick={this.updataPost}>Update Post</button>
                            <button onClick={this.createPost}>Create Post</button>
                            <button onClick={() => this.deletePost(5)}>Delete Post</button>
                        </div>
                </>
                ) : (
                    <div>Loagind...</div>
                )}
            </div>
        )
    }
}

export default Posts
