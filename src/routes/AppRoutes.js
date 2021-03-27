import React from 'react'
import { Route, Switch } from 'react-router-dom'

import Layout from 'components/Layout/Layout'
import Posts from 'containers/Posts/Posts'
import HomePage from 'containers/HomePage/HomePage'
import PostsDeteils from 'components/PostsDetails/PostsDeteils'
import Auth from 'containers/Auth/Auth'
import Profile from 'components/Profile/Profile'
import Todos from 'containers/Todos/Todos'

const AppRoutes = () => {
    return (
        <Layout >
            <Switch>
                <Route exact path="/" component={HomePage} />
                <Route exact path="/posts" component={Posts} />
                <Route exact path="/posts/:postId" component={PostsDeteils}/>
                <Route exact path="/auth" component={Auth}></Route>
                <Route exact path="/profile" component={Profile}></Route>
                <Route exact path="/todo" component={Todos}></Route>
                <Route exact path="*"> 
                    404
                </Route >
            </Switch>
        </Layout>
    )
}

export default AppRoutes
