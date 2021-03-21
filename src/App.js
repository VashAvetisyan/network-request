import React, { Component, createContext, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from 'components/Header/Header'
import AppRoutes from 'routes/AppRoutes'

import AppContextProvaider from 'context/AppContextProvaider'
import { Provider } from 'react-redux'
import { store } from 'reducers'


function App() {
    return (
        <div className="App">
            <Provider store={store}>
                <AppContextProvaider>
                    <BrowserRouter>
                        <Header />
                        <AppRoutes />
                    </BrowserRouter>
                </AppContextProvaider>
            </Provider>
        </div>
    );
}

export default App;