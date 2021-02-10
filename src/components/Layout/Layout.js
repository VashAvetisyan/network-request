import React from 'react'

import './Layout.scss'

const Layout = ({ children }) => {
    return (
        <div id="app-layout">
            <main id='app-layout__main'>
                {children}
            </main>
        </div>
    )
}

export default Layout