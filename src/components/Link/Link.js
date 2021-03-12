import React from 'react'
import { Link as RouterLink } from 'react-router-dom'

import './Link.scss'

const Link = ({children, className, to}) => {
    return (
        <RouterLink to={to} className={`app-link ${className}`}>
            {children}
        </RouterLink>
    )
}

export default Link