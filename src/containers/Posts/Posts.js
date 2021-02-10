import React, { Component } from 'react'

import Post from 'components/Post/Post'
import service, { getAllPosts } from 'api/service'


import './Posts.scss'

export class Posts extends Component {
    state = {
        posts: []
    }
    
    componentDidMount() {
        service.getAllPosts()
            .then(data => {
                this.setState({
                    posts: data
                })
            })
            .catch(err => {
                throw new Error(`Error ${err}`)
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

    render() {
        return (
            <div className="app-posts">
                {
                    this.state.posts.map(post => {
                        return <Post
                            key={post.id}
                            post={post}
                            className="app-posts__post"
                        />
                    })
                }
                <button onClick={this.updataPost}>Update Post</button>
                <button onClick={this.createPost}>Create Post</button>
            </div>
        )
    }
}

export default Posts
