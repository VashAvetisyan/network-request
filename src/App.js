import React from 'react'

import Layout from 'components/Layout/Layout'
import Header from 'components/Header/Header'
import Posts from 'containers/Posts/Posts'


function App() {
    return (
        <div className="App">
            <Header />
            <Layout >
                <Posts />
            </Layout>
        </div>
    );
}

export default App;
