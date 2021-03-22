import fbService from 'api/fbService'

import React, { useContext } from 'react'
import { AppContext } from 'context/AppContext'
import actionTypes from 'context/actionTypes'
import { useHistory } from 'react-router'
import Button from 'components/Button/Button'

import './Profile.scss'

const Profile = () => {
    const history = useHistory()
    const context = useContext(AppContext)
    const logoutHandler = async () => {
        await fbService.userService.logout()
        localStorage.removeItem('user');
        context.dispatch({ type: actionTypes.REMOVE_USER })
        history.push('/auth')
    }

    return (
        <div className="app-profile">
            <Button onClick={logoutHandler} className="app-profile__logout-btn">Logout</Button>
        </div>
    )
}

export default Profile