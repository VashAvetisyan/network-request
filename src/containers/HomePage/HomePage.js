import React, {useEffect } from 'react'
import postsMockup from 'data-mockup/postsMockup'

import './HomePage.scss'

const HomePage = () => {

    // useEffect(() => {
    //     fetch('https://react-learn-a974f-default-rtdb.firebaseio.com/todo.json', {
    //         method: 'PUT',
    //         body: JSON.stringify(postsMockup.map((el, index) => {
    //             return {
    //                 ...el,
    //                 id: index,
    //             };
    //         }))
    //     })
    // }, [])

    return (
        <div className="app-home-page">
            Home Page
        </div>
    )
}

export default HomePage