import { createContext } from 'react'

export const initialState = {
    user: JSON.parse(localStorage.getItem('user')) || null,
    posts: null,
    todo:null
}

export const AppContext = createContext(initialState)