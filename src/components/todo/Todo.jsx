import React, { Component } from 'react'
import { deleteTodo } from "../../func/functions"
import "./Todo.css"
export default class Todo extends Component {

    constructor(props){
        super(props)
        this.state = {
            todo: "",
            idKey: "",
            completed: false,
            fall: false
        }
    }

    componentDidMount = () => {
        this.setState({
            todo: this.props.todo,
            idKey: this.props.idKey,
            completed: this.props.todo.completed
        })
    }

    updateValue = () => {
        let tempTodo = {...this.props.todo, completed: !this.state.completed}
        this.props.todos.splice(this.props.idKey, 1, tempTodo)
        this.setState({
            todo: tempTodo, 
            completed: !this.state.completed
        })
        this.props.updateHomeState({todos: [...this.props.todos]})
    }

    todoDeleted = () => {
        /* this below adds the fall state to class, and the delay in the setTimeout
        should be higher than the animation time in css */
        this.setState({
            fall: true,
            idKey: this.props.idKey
        })
        /* this is like onTransitionedEnd, wait for a certain time, time of the animation
        then delete */
        setTimeout(() => {
            deleteTodo( this.props.todos, this.props.idKey, this.props.updateHomeState )
        },600)
    }

    render(){
        return (
        <tr
            className={"todo-tableRow" +(this.props.todo.completed && !this.state.fall ? " fade" 
            : !this.props.todo.completed && this.state.fall ? " fall" 
            : this.props.todo.completed && this.state.fall ? " fall": "")}>
            <td className={"todo-task"+(this.props.todo.completed? " completed":"")}>
            {
                this.props.todo.task
            }
            </td>
            <td className="todo-buttonContainer">
                <button className={"button-check"+(this.props.todo.completed? " fade-check" : "")} 
                onClick={() => this.updateValue()}>
                    <i className={"fas fa-check fa-2x"}></i>
                </button>
                <button 
                    className={"button-trash"+(this.props.todo.completed? " fade-trash":"")} 
                    onClick={() => this.todoDeleted()} 
                >
                    <i className={"fas fa-trash fa-2x"}></i>
                </button>
            </td>
        </tr>
        )
    }
}
    
