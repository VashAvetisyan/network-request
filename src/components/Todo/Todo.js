import React, { useContext } from 'react'
import PropTypes from 'prop-types';

import Link from 'components/Link/Link';

import Button from 'components/Button/Button';
import EditIcon from '@material-ui/icons/Edit';

import { AppContext } from 'context/AppContext';

import './Todo.scss'

const Todo = ({
    todo,
    className,
    link = false,
    edit = () => { },
    remove = () => { }
}) => {

    const context = useContext(AppContext)

    const todoClassName = `app-todo ${className}`

    const removeHandler = (e) => {
        e.preventDefault()
        remove()
    }

    const Wrapper = ({ children }) => {
        return link ? (

            <Link className={todoClassName} to={`/todo/${todo.id}`}>
                {context.state.user && (
                    <Button className='app-todo__remove-btn' onClick={removeHandler} >
                        <span>Remove</span>
                    </Button>
                )}
                {children}
            </Link>
        ) : (
            <div className={todoClassName}>
                <Button onClick={edit} className='app-todo__edit-btn'>
                    <EditIcon />
                    <span>Edit</span>
                </Button>
                {children}
            </div>
        )
    }

    return (
        <Wrapper>
            {console.log(todo)}
            <p className="app-todo__title">{todo.title}</p>
            <p className="app-todo__body">{todo.body}</p>
        </Wrapper>
    )
}

Todo.protoType = {
    todo: PropTypes.shape({
        userId: PropTypes.number,
        title: PropTypes.string,
        body: PropTypes.string,
    }),
    isLink: PropTypes.bool,
    edit: PropTypes.func,
    remove: PropTypes.func,
}

export default Todo

