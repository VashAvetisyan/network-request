import React, { useState, useContext, useRef, useEffect } from 'react'
import { useHistory } from 'react-router-dom'

import fbService from 'api/fbService';

import Input from 'components/Input/Input'
import Button from 'components/Button/Button'

import ErrorMessage from 'components/ErrorMassage/ErrorMessage';
import { AppContext } from 'context/AppContext';
import actionTypes from 'context/actionTypes'


import './Signup.scss'

const Signup = () => {
    const nameInputRef = useRef()
    const context = useContext(AppContext)
    const history = useHistory()
    const [loading, setLoading] = useState(false)
    const [credentials, setCredentials] = useState({
        name: '',
        email: '',
        password: '',
    })
    const [errorState, setErrorState] = useState({
        emailError: '',
        passwordError: '',
    })

    useEffect(() => {
        nameInputRef.current.focus()
    }, [])

    const changeHandler = (e) => {
        setErrorState({
            emailError: '',
            passwordError: ''
        })
        setCredentials({
            ...credentials,
            [e.target.name]: e.target.value
        })
    }

    const handelSignup = async () => {
        try {
            setLoading(true)
            const user = await fbService.userService.signup(credentials)
            context.dispatch({ type: actionTypes.SET_USER, payload: { user } })
            localStorage.setItem("user", JSON.stringify(user))
            setLoading(false)
            history.push("/profile")
        } catch (err) {
            setErrorState({
                emailError: err.message
            })
            setLoading(false)
        }
    }

    return (
        <div className="app-auth-signup">
            <Input
                name="name"
                value={credentials.name}
                onChange={changeHandler}
                placeholder="Enter name"
                className="app-auth-signup__input"
                loading={loading}
                inputRef={nameInputRef}
            />
            <ErrorMessage text={errorState.nameError} />
            <Input
                name="email"
                value={credentials.email}
                onChange={changeHandler}
                placeholder="Enter email"
                className="app-auth-signup__input"
                loading={loading}
            />
            <ErrorMessage text={errorState.emailError} />
            <Input
                name="password"
                value={credentials.password}
                onChange={changeHandler}
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
