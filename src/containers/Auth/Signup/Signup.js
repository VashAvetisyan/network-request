
import React, { useState, useContext } from 'react'

import fbService from 'api/fbService';

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import ErrorMessage from 'components/ErrorMassage/ErrorMessage';
import { AppContext } from 'context/AppContext';
import actionTypes from 'context/contextTypes'


import './Signup.scss'

const Signup = () => {
    const context = useContext(AppContext)
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

    const handelSignup = async () => {
        try {
            setLoading(true)
            const user = await fbService.signup(credentials)
            console.log('user', user)
            context.dispatch({ type: actionTypes.SET_USER, payload: { user } })
        } catch (err) {
            setErrorState({
                emailError: err.message
            })
        } finally {
            setLoading(false)
        }
    }

    return (
        <div className="app-auth-signup">
            <Input
                value={credentials.email}
                onChange={(e) => changeHandler('email', e.target.value)}
                placeholder="Enter email"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError} />
            <Input
                value={credentials.password}
                onChange={(e) => changeHandler('password', e.target.value)}
                placeholder="Enter password"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.passwordError} />
            <Button
                onClick={handelSignup}
                className="app-auth-signup__btn"
                loading={loading}
            >Signup
            </Button>
        </div>
    )
}

export default Signup
