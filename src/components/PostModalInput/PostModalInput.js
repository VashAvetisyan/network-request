import React from 'react'
import PropTypes from 'prop-types'

import './PostModalInput.scss'

const PostModalInput = ({
    name = '',
    type = 'text',
    value,
    onChange,
    className = '',
    placeholder = '',
}) => {
    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`app-modal-input ${className}`}
            placeholder={placeholder}
        />
    )
}

PostModalInput.propType = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    placeholder: PropTypes.string,
}


export default PostModalInput
