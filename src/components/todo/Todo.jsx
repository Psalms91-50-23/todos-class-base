import React, { Component } from 'react'
import "./Todo.css"

export default class Todo extends Component {

    constructor(props){
        super(props)
        this.state = {
            todo: "",
            todos: [],
            todoIdKey: "",
            completed: false
        }
    }

    updateValue = (updateHomeState) => {
      
        let tempTodo = {...this.props.todo, completed: !this.state.completed}
        this.props.todos.splice(this.props.idKey,1,tempTodo)
        this.setState({todo: tempTodo, todos: this.props.todos, todoIdKey: this.props.idKey, completed: !this.state.completed})
        updateHomeState({todos: this.props.todos})
    }

    render(){

        return (
        <tr 
            className={"todo-tableRow" +(this.props.todo.completed? " fade": "")}>
            <td className={"todo-task"+(this.props.todo.completed? "    completed":"")}>
            {
                this.props.todo.task
            }
            </td>
            <td className="todo-buttonContainer">
                <button className={"button-check"+(this.props.todo.completed? " fade-check":"")} 
                onClick={() => this.updateValue(this.props.updateHomeState)
                }>
                    <i className={"fas fa-check fa-2x"}></i>
                </button>
                <button 
                    className={"button-trash"+(this.props.todo.completed? " fade-trash":"")} 
                    onClick={() => this.props.todoDeleted(this.props.idKey)} 
                >
                    <i className={"fas fa-trash fa-2x"}></i>
                </button>
            </td>
        </tr>
        )
    }
}
    
