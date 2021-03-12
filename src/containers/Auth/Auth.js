import React, { useState, useContext, useEffect } from 'react'

import Login from './Login/Login'
import Signup from './Signup/Signup'

import './Auth.scss'
import { AppContext } from 'context/AppContext'

const Auth = () => {
    const context = useContext(AppContext)

    const [isLogin, setIsLogin] = useState(true)

    const toggleView = () => {
        setIsLogin(!isLogin)
    }

    return (
        <div className="app-auth">
            <div className="app-auth__main">
                <h1 className="app-auth__main__title">{isLogin ? 'LOGIN' : 'SINGNUP'}</h1>
                {isLogin ? (
                    <Login />
                ) : <Signup />}
                <p 
                    onClick={toggleView} 
                    className="app-auth__main__href">
                    {isLogin ? 'Go To Signup ' : 'Go to Login'}
                </p>
            </div>
        </div>
    )
}

export default Auth
