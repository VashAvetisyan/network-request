import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Modal from '@material-ui/core/Modal';
import Button from 'components/Button/Button'

import './PostModal.scss'
import PostModalInput from 'components/PostModalInput/PostModalInput';

const PostModal = ({
    isOpen,
    titleValue,
    bodyValue,
    changeValue,
    action,
    onClose,
    buttonTitle
}) => {
    return (
        <Modal
            className="post-modal"
            open={isOpen}
            onClose={onClose}
        >
            <div className="post-modal__block">
                <h1 className="post-modal__block__title">Title</h1>
                <PostModalInput
                    name="titleValue"
                    value={titleValue}
                    type="text"
                    className="post-modal__block__input"
                    placeholder="Change Title"
                    onChange={changeValue}
                />
                <h1 className="post-modal__block__title">Body</h1>
                <PostModalInput
                    name="bodyValue"
                    value={bodyValue}
                    placeholder="Change Body"
                    className="post-modal__block__input"
                    onChange={changeValue}
                />
                <Button
                    onClick={action}
                >{buttonTitle}</Button>
            </div>
        </Modal>
    )
}

PostModal.propTypes = {
    isOpen: PropTypes.bool.isRequired,
    titleValue: PropTypes.string.isRequired,
    bodyValue: PropTypes.string.isRequired,
    changeValue: PropTypes.func.isRequired,
    action: PropTypes.func.isRequired,
    onClose: PropTypes.func.isRequired,
    buttonTitle: PropTypes.string.isRequired
}

export default PostModal
