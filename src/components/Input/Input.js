import React from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

const Input = ({
    name = '',
    type = 'text',
    value,
    onChange,
    className = '',
    loading = false,
    placeholder = '',
    inputRef,
}) => {
    return (
        <input
            name={name}
            type={type}
            value={value}
            onChange={onChange}
            className={`app-input ${className}`}
            disabled={loading}
            placeholder={placeholder}
            ref={inputRef}
        />
    )
}

Input.propType = {
    name: PropTypes.string,
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string
}

export default Input
