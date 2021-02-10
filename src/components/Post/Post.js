import React from 'react'
import PropTypes from 'prop-types';

import './Post.scss'

const Post = ({post, className} ) => {
    return (
        <div className={`app-post ${className}`}>
            <p className="app-post__title">{post.title}</p>
            <p className="app-post__body">{post.body}</p>
        </div>
    )
}

Post.protoType = {
    userId: PropTypes.number,
    title: PropTypes.string,
    body: PropTypes.string,

}

export default Post

