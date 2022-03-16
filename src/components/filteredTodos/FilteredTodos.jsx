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

  handleChange = ( e, homeSetState ) => {
    e.preventDefault()
    homeSetState({
      ...this.state,
      options: e.target.value
    })

  }

  filterTodos = ( e, updateHomeState ) => {
    let options = e.target.value
    if(options === "all"){
      updateHomeState({filteredTodos: []})
      this.setState({filteredTodos: [], todos: this.props.homeState.todos})
    }else{

      let todos = this.props.todos
      todos = todos.filter((todo,i) => {
        if(options === "completed" && todo.completed === true){
          return todo
        } 
        if(options === "uncompleted" && todo.completed === false){
          return todo
        }

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
          <option value="all">all</option>
          <option value="completed">completed</option>
          <option value="uncompleted">uncompleted</option>
        </select>
      </div>
    )
  }
}
