import React, { useEffect, useRef } from 'react'
import PropTypes from 'prop-types'

import Modal from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';

import './PostModal.scss'

const PostModal = ({
    isOpen,
    titleValue,
    bodyValue,
    changeValue,
    action,
    onClose,
    buttonTitle
}) => {
    const inputRef = useRef()

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus()
        }
    }, [inputRef])

    return (
        <Modal
            className="post-modal"
            open={isOpen}
            onClose={onClose}
        >
            <div className="post-modal__block">
                <h1>Tiele</h1>
                <input
                    name="titleValue"
                    value={titleValue}
                    type="text"
                    className="post-modal__block__input"
                    onChange={changeValue}
                    ref={inputRef}
                />
                <h1>Body</h1>
                <input
                    name="bodyValue"
                    value={bodyValue}
                    className="post-modal__block__input"
                    onChange={changeValue}
                />
                <Button
                    variant="contained"
                    color="primary"
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
