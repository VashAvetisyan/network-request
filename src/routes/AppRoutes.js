import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from 'components/Layout/Layout'
import Posts from 'containers/Posts/Posts'
import HomePage from 'containers/HomePage/HomePage'
import PostsDeteils from 'components/PostsDetails/PostsDeteils'
import Auth from 'containers/Auth/Auth'

const AppRoutes = () => {
    return (
        <Layout >
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/posts/:postId" component={PostsDeteils}/>
                <Route exact path="/auth" component={Auth}></Route>
                <Route exact path="*"> 
                    404
                </Route >
            </Switch>
        </Layout>
    )
}

export default AppRoutes
