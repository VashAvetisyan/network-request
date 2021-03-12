import React, { useContext } from 'react'

import NavLink from 'components/NavLink/NavLink'

import './Header.scss'
import {AppContext}  from 'context/AppContext'

const headerLink = [
    {
        title: 'Homepage',
        to: '/'
    },
    {
        title: 'Posts',
        to: '/posts'
    }
]

const Header = () => {
    const context = useContext(AppContext)
    return (
        <div className="app-header">
            <nav>
                <ul>
                    {headerLink.map(el => {
                        return (
                            <li key={el.title} className="app-header__link">
                                <NavLink to={el.to} className='app-header__link'>
                                    {el.title}
                                </NavLink>
                            </li>
                        )
                    })}
                    {
                        !context.state.user ? (
                            <li key='auth' className="app-header__link">
                                <NavLink to='/auth' className='app-header__link'>
                                    Auth
                                </NavLink>
                            </li>
                        ) : (
                            <li key='profile' className="app-header__link">
                                <NavLink to='/profile' className='app-header__link'>
                                    Profile
                                </NavLink>
                            </li>
                        )
                    }
                </ul>
            </nav>
            {context.state.user ? context.state.user.uid : 'No user'}
        </div>
    )
}

export default Header
