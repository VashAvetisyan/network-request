import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getReduxTodos, setReduxTodos, setTodosHasMore, updateToDoInList } from 'actions/todoActions'

import Button from 'components/Button/Button';

import Loading from 'components/Loading/Loading';
import Todo from 'components/Todo/Todo'

import './Todos.scss'
import fbService from 'api/fbService';

const limit = 8

const Todos = ({
    updateToDoInList,
    todos,
    getReduxTodos,
    setReduxTodos,
    todoHasMore
}) => {
    const [state, setState] = useState({
        startAt: todos ? todos.length : 0,
        loading: false,
        isCreatePopupOpen: false,
        titleValue: '',
        bodyValue: ''
    })

    useEffect(() => {
        if (!todos) {
            setReduxTodos(state.startAt, limit)
        }
    }, [])


    const getMore = () => {
        const newStartAt = state.startAt + limit + 1
        setState({
            ...state,
            startAt: newStartAt,
            loading: true
        })
        getReduxTodos(newStartAt, newStartAt + limit)
            .then(() => {
                setState({
                    ...state,
                    startAt: newStartAt,
                    loading: false
                })
            })
    }

    const { loading } = state

    if (!todos) {
        return <div className="app-loding">
            <Loading />
        </div>
    }
    const completedToggle = (id, completed) => {
        fbService.todoService.updateTodo({
            completed: !completed,
            id: id,
        })
            .then(data => {
                console.log(data)
                const updatedTodo = {
                    ...data,
                    completed: data.completed
                }
                if (todos && todos.find(el => el.id === data.id)) {
                    updateToDoInList(updatedTodo)
                }
            })
    }

    return (
        <div className="app-todos">
            {todos.length > 0 ? (
                <>
                    <div className="app-todos__container">
                        {
                            todos.map(todo => {
                                return <Todo
                                    key={todo.id}
                                    todo={todo}
                                    className="app-todos__container__todos"
                                    completed={todo.completed}
                                    completedTodo={() => completedToggle(todo.id, todo.completed)}
                                />
                            })
                        }
                    </div>
                    <div className="app-todos__main-btn">
                        {todoHasMore && <Button
                            onClick={getMore}
                            disabled={loading}
                            className="app-todos__main-btn__btn"
                        >{loading ? 'Loading...' : 'Get More'}</Button>}
                    </div>
                </>
            ) : (
                <div>Ro result</div>
            )}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        todos: state.todosData.todos,
        todoHasMore: state.todosData.todoHasMore
    }
}

const mapDispatchToProps = {
    getReduxTodos,
    setReduxTodos,
    setTodosHasMore,
    updateToDoInList
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
