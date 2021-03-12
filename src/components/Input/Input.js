import React from 'react'
import PropTypes from 'prop-types'

import './Input.scss'

const Input = ({
    type = 'text',
    value,
    onChange,
    className = '',
    loading = false,
    placeholder = ''
}) => {
    return (
        <input
            type={type}
            value={value}
            onChange={onChange}
            className={`app-input ${className}`}
            disabled={loading}
            placeholder={placeholder}
        />
    )
}

Input.propType = {
    type: PropTypes.string,
    value: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool,
    placeholder: PropTypes.string
}

export default Input
