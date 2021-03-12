import React, { Component } from 'react'

import Post from 'components/Post/Post'

import './Posts.scss'
import fbService from 'api/fbService';

const limit = 9;

export class Posts extends Component {
    state = {
        posts: null,
        startAt: 0,
        hasMore: true,
        loading: false
    }
    
    // componentDidMount() {
    //     service.getPosts(this.state.start, limit)
    //         .then(data => {
    //             this.setState({
    //                 posts: data,
    //             })
    //         })
    // }
    
    componentDidMount() {
        fbService.getPosts(this.state.startAt, limit)
            .then(data => {
                this.setState({
                    posts: data,
                })
            })
    }

   
    createPost = () => { 
        fbService.createPost({
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
        fbService.deletePost(id)
            .then(data => {
                this.setState({
                    posts: this.state.posts.filter((el) => {
                        return el.id !== id
                    })
                })
            })
    }

    getMore = () => {
        const newStartAt = this.state.startAt + limit + 1
        this.setState({
            startAt: newStartAt,
            loading: true
        })
        fbService.getPosts(newStartAt, newStartAt + limit)
            .then(data => {
                console.log('data', data)
                this.setState({
                    posts: [...this.state.posts, ...data],
                    hasMore: data.length < limit ? false : true,
                    loading: false
                })
            })
    }

    render() {
        const {loading, hasMore, posts} = this.state
    
        if(!posts){
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
                                    remove={() => this.deletePost(post.id)}
                                />
                            })
                        }
                        </div>
                        <div className="app-posts__buttons">
                            {hasMore &&  <button onClick={this.getMore} disabled={loading}>
                                {loading ? 'Loading...' : 'Get More'}
                            </button>}
                            <button onClick={this.createPost}>Create Post</button>
                        </div>
                    </>
                ) : (
                    <div>Ro result</div>
                )}
            </div>
        )
    }
}

export default Posts
