import React, {Component} from 'react'

import postsMockup from 'data-mockup/postsMockup'

import './HomePage.scss'

export class HomePage extends Component{
    
    // componentDidMount(){
    //     fetch('https://react-learn-a974f-default-rtdb.firebaseio.com/posts.json', {
    //         method: 'PUT',
    //         body: JSON.stringify(postsMockup.map(el => ({ ...el, id: el.id - 1 })))
    //     })
    //     .then(res => res.json())
    //     .then(data => console.log(data))
    // }

    render(){
        return (
            <div className="app-home-page">
                Home Page
            </div>
        )
    }
}

export default HomePage
