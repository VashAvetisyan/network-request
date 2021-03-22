import React, { useContext, useEffect } from 'react'

import NavLink from 'components/NavLink/NavLink'

import './Header.scss'
import { AppContext } from 'context/AppContext'
import postsMockup from 'data-mockup/postsMockup'


const headerLink = [
    {
        title: 'Homepage',
        to: '/'
    },
    {
        title: 'Posts',
        to: '/posts'
    },
    {
        title: 'Todo',
        to: '/todo'
    }
]

const Header = () => {

    useEffect(() => {
        fetch('https://react-learn-a974f-default-rtdb.firebaseio.com/todo.json', {
            method: 'PUT',
            body: JSON.stringify(postsMockup)
        })
    }, [])

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
            {context.state.user ? context.state.user.uid :  <p className="app-header__user">No user</p>}
        </div>
    )
}

export default Header
