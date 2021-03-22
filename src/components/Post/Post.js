import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import Link from 'components/Link/Link';

import Button from 'components/Button/Button';
import EditIcon from '@material-ui/icons/Edit';

import './Post.scss'
import { AppContext } from 'context/AppContext';

const Post = ({
    post,
    className,
    link = false,
    edit = () => { },
    remove = () => { }
}) => {
    const context = useContext(AppContext)

    const postClassName = `app-post ${className}`

    const removeHandler = (e) => {
        e.preventDefault()
        remove()
    }

    const Wrapper = ({ children }) => {
        return link ? (
            <Link className={postClassName} to={`/posts/${post.id}`}>
                {context.state.user && (
                    <Button className='app-post__remove-btn'  onClick={removeHandler} >
                        <span>Remove</span>
                    </Button>
                )}
                {children}
            </Link>
        ) : (
            <div className={postClassName}>
                <Button onClick={edit} className='app-post__edit-btn'>
                    <EditIcon />
                    <span>Edit</span>
                </Button>
                {children}
            </div>
        )
    }

    return (
        <Wrapper>
            <p className="app-post__title">{post.title}</p>
            <p className="app-post__body">{post.body}</p>
        </Wrapper>
    )
}

Post.protoType = {
    post: PropTypes.shape({
        userId: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
    isLink: PropTypes.bool,
    edit: PropTypes.func,
    remove: PropTypes.func,
}

export default Post

