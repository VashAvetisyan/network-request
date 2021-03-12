import React from 'react'
import PropTypes from 'prop-types'

import './ErrorMassage.scss'

const ErrorMessage = ({ text }) => {
    return (
        <p className="app-error-message">
            {text}
        </p>
    )
}

ErrorMessage.propTypes = {
    text: PropTypes.string
}

export default ErrorMessage
