import React, {useEffect, useState } from 'react'
import { connect } from 'react-redux'

import { getReduxTodos, setReduxTodos, setTodosHasMore } from 'actions/todoActions'

import fbService from 'api/fbService';

import PostModal from 'components/PostModal/PostModal';
import Button from 'components/Button/Button';

import Loading from 'components/Loading/Loading';
import Todo from 'components/Todo/Todo'

import './Todos.scss'
 
const limit = 8

const Todos = ({
    todos,
    getReduxTodos,
    setReduxTodos,
    setTodosHasMore,
    todoHasMore,
    history
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

    const createPost = () => {
        const newTodo = {
            title: state.titleValue,
            body: state.bodyValue,
            userId: 1
        }
        fbService.todoService.createPost(newTodo)
            .then(data => {
                toggleCreateModal()
                history.push(`/todo/${data.id}`)
            })
    }

    const deletePost = (id) => {
        const { startAt } = state
        console.log(id)
        fbService.todoService.deleteTodo(id)
            .then(() => {
                setReduxTodos(0, startAt !== 0 ? startAt + limit : limit)
            })
            .catch(err => {
                console.log(err)
            })
    }

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
                    loading: false
                })
            })
    }

    const toggleCreateModal = () => {
        setState(prev => ({
            ...state,
            isCreatePopupOpen: !prev.isCreatePopupOpen
        }))
    }

    const changeValue = (e) => {
        const { name, value } = e.target
        setState({
            ...state,
            [name]: value
        })
    }

    const { loading, isCreatePopupOpen, titleValue, bodyValue } = state

    if (!todos) {
        return <div className="app-loding">
            <Loading />
        </div>
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
                                    link={true}
                                    remove={() => deletePost(todo.id)}
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
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={toggleCreateModal}
                            className="app-todos__main-btn__btn"
                        >Create Post</Button>
                    </div>
                </>
            ) : (
                <div>Ro result</div>
            )}
            <PostModal
                action={createPost}
                bodyValue={bodyValue}
                titleValue={titleValue}
                changeValue={changeValue}
                isOpen={isCreatePopupOpen}
                onClose={toggleCreateModal}
                buttonTitle="Save"
            />
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
    setTodosHasMore
}

export default connect(mapStateToProps, mapDispatchToProps)(Todos)
