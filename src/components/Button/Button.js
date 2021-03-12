import React from 'react'
import PropTypes from 'prop-types'

import './Button.scss'

const Button = ( {children, onClick, className = '', loading = false}) => {
    return (
        <button onClick={onClick} className={`app-button ${className}`} disabled={loading}>
            {children}
        </button>
    )
}

Button.propType = { 
    onChange: PropTypes.func.isRequired,
    className: PropTypes.string,
    loading: PropTypes.bool,
}

export default Button
