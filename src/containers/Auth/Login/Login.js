import React, { useState, useContext } from 'react'
import { useHistory } from 'react-router-dom'

import fbService from 'api/fbService';

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'
import ErrorMessage from 'components/ErrorMassage/ErrorMessage';

import { AppContext } from 'context/AppContext';
import actionTypes from 'context/actionTypes'

import './Login.scss'

const Login = () => {
    const context = useContext(AppContext)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        email: '',
        password: '',
    })

    const [errorState, setErrorState] = useState({
        emailError: '',
        passwordError: '',
    })

    const changeHandler = (name, value) => {
        setErrorState({
            emailError: '',
            passwordError: ''
        })
        setCredentials({
            ...credentials,
            [name]: value
        })
    }

    const loginHandler = async () => {
        try {
            setLoading(true)
            const user = await fbService.userService.login(credentials)
            context.dispatch({ type: actionTypes.SET_USER, payload: { user } })
            localStorage.setItem("user", JSON.stringify(user))

            history.push("/profile")
        } catch (err) {
            setErrorState({
                emailError: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-auth-login">
            <Input
                value={credentials.email}
                onChange={(e) => changeHandler('email', e.target.value)}
                placeholder="Enter email"
                className="app-auth-login__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError} />
            <Input
                value={credentials.password}
                onChange={(e) => changeHandler('password', e.target.value)}
                placeholder="Enter password"
                className="app-auth-login__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.passwordError} />
            <Button
                onClick={loginHandler}
                className="app-auth-login__btn"
                loading={loading}
            >Login
            </Button>
        </div>
    )
}

export default Login
