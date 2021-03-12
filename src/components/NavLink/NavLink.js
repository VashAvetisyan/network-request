import React, { Children } from 'react'
import { NavLink as RouterNavLink } from 'react-router-dom'

import './NavLink.scss'

const NavLink = ({ children, to, className}) => {
    return (
        <RouterNavLink exact activeClassName="app-nav-link--active" className={`app-nav-link ${className}`} to={to}>
            {children}
        </RouterNavLink>
    )
}

export default NavLink
