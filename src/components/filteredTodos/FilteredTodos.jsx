import React, { Component } from 'react'
import "./FilteredTodos.css"

export default class FilteredTodos extends Component {

  constructor(props){
    super(props)
    this.state = {
      options: "all",
      todos: [...this.props.todos],
      filteredTodos: []
    }
  }

  componentDidMount = () => {
    if(this.props.filteredTodos){
      this.setState({
        filteredTodos: this.props.filteredTodos
      })
    }
  }

  filterTodos = ( e, updateHomeState ) => {
    let options = e.target.value
    if(options === "all"){
      updateHomeState({filteredTodos: []})
      this.setState({filteredTodos: [], todos: this.props.homeState.todos})
    }else{

      let todos = this.props.todos
      todos = todos.filter((todo) => {
        if(options === "completed" && todo.completed === true || options === "incompleted" && todo.completed === false){
          return true
        } 
        return false
      })
      this.setState({filteredTodos: todos, todos: this.props.homeState.todos})
      updateHomeState({...this.props.homeState, filteredTodos: todos})
    }
  }

  render(){

    return (
      <div className="select">
        <select 
          className="filter-todo"
          name="options"
          onChange={(e) => this.filterTodos(e, this.props.updateHomeState)}
        >
          <option value="all">All</option>
          <option value="completed">Completed</option>
          <option value="incompleted">Incompleted</option>
        </select>
      </div>
    )
  }
}
