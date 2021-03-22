// import React, { Component } from 'react'

// import Post from 'components/Post/Post'

// import fbService from 'api/fbService';
// import { AppContext } from 'context/AppContext';

// import actionTypes from "context/actionTypes";
// import PostModal from 'components/PostModal/PostModal';
// import Loading from 'components/Loading/Loading';
// import Todo from 'components/Todo/Todo';

// import './TodoDetails.scss';

// export class TodoDeteils extends Component {

//     constructor(props) {
//         super(props)
//         this.state = {
//             todo: null,
//             isEditPopupOpen: false,
//             titleValue: '',
//             bodyValue: '',
//         }
//     }

//     static contextType = AppContext

//     componentDidMount() {
//         fbService.todoService.getTodo(this.props.match.params.postId)
//             .then((data) => {
//                 console.log(data)
//                 this.setState({
//                     todo: data,
//                     titleValue: data.title,
//                     bodyValue: data.body
//                 })
//             })
//     }

//     toggleEditPopup = () => {
//         this.setState(prevState => ({
//             isEditPopupOpen: !prevState.isEditPopupOpen
//         }))
//     }

//     saveTodo = () => {
//         fbService.todoService.updateTodo({
//             ...this.state.todo,
//             title: this.state.titleValue,
//             body: this.state.bodyValue
//         })
//             .then(res => {
//                 const updatedTodo = {
//                     ...this.state.todo,
//                     title: this.state.titleValue,
//                     body: this.state.bodyValue
//                 }
//                 this.setState({
//                     todo: updatedTodo,
//                     isEditPopupOpen: false
//                 })
//                 const { state: { todo } } = this.context
//                 if (todo && todo.find(el => el.id === this.state.post.id)) {
//                     this.context.dispatch({ type: actionTypes.UPDATE_POST, payload: { todo: updatedTodo } })
//                 }
//             })
//     }

//     changeValue = (e) => {
//         const { name, value } = e.target
//         this.setState({
//             [name]: value
//         })
//     }

//     render() {
//         const { todo, isEditPopupOpen, titleValue, bodyValue } = this.state

//         if (!todo) {
//             return <div>
//                 <Loading />
//             </div>
//         }

//         return (
//             <div className="app-post-details">
//                 <Todo
//                     post={this.state.todo}
//                     edit={this.toggleEditPopup}
//                     onClick={() => { }}
//                 />
//                 <PostModal
//                     action={this.saveTodo}
//                     bodyValue={bodyValue}
//                     titleValue={titleValue}
//                     changeValue={this.changeValue}
//                     isOpen={isEditPopupOpen}
//                     onClose={this.toggleEditPopup}
//                     buttonTitle="Save"
//                 />
//             </div>
//         )
//     }
// }

// export default TodoDeteils