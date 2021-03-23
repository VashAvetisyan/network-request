import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import Button from 'components/Button/Button';

import './Todo.scss'

const Todo = ({
    todo,
    className,
    completedTodo = () => { }
}) => {

    const completedHandler = (e) => {
        e.preventDefault()
        completedTodo()
    }

    return (
        <div className={todo.completed ? `app-todo ${className} completed` : `app-todo ${className} notCompleted`}>
            <p className="app-todo__type">
                {todo.completed ? "completed" : "not completed"}
            </p>
            <p className="app-todo__title">
                {todo.title}
            </p>
            <Button className='app-todo__completed-btn'
                onClick={completedHandler}>
                {todo.completed ? "to do" : "to cancel"}
            </Button>
        </div>
    )
}

Todo.protoType = {
    todo: PropTypes.shape({
        userId: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    })
}

export default Todo

