import {createContext} from 'react'

export const initialState = {
    user: null,
}

export const AppContext = createContext(initialState)