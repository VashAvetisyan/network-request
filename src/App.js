import React, { Component, createContext, useContext } from 'react'
import { BrowserRouter } from 'react-router-dom'

import Header from 'components/Header/Header'
import AppRoutes from 'routes/AppRoutes'
import AppContextProvaider from 'context/AppContextProvaider'

function App() {
    return (
        <div className="App">
            <AppContextProvaider>
                <BrowserRouter>
                    <Header />
                    <AppRoutes />
                </BrowserRouter>
            </AppContextProvaider>
        </div>
    );
}

export default App;