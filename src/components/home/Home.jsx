import React, { Component } from 'react'
import Todo from '../todo/Todo';
// import LogoutIcon from '@mui/icons-material/Logout';
import './Home.css'
import { getTodos, saveTodo, deleteTodo, saveTodoToLocalStorage } from "../../func/functions"
import FilteredTodos from '../filteredTodos/FilteredTodos'

export default class Home extends Component {

  constructor(props){
      super(props)
      this.state = {
        username: "",
        todos: [],
        newTodo: "",
        filteredTodos: [],
        mouseOver: false,
        options: "",
        showText: false,
        updated: false
      }
    }
      //useEffect version of class base component with empty []
      //not recommended to use componentWillMount for sideEffects, it is used once before component is removed from the DOM, destroying any side effects set up in componentDidMount
  componentDidMount = () => {
      let todos = getTodos();
      this.setState({todos});
      let currentUserDetails = JSON.parse(localStorage.getItem("currentUser"));
      this.setState({
        username: Object.values(currentUserDetails)[0].username
      });
      let currentUserKey = Object.keys(currentUserDetails)[0];
      let allUserDetails = JSON.parse(localStorage.getItem("users"));
      let allUserkeys = [];

      allUserDetails = allUserDetails.map((user, i) => {
        //values of the user email
        let userValues = Object.values(user)[0];
        //key is the users email
        let key = Object.keys(user)[0];
        allUserkeys = allUserkeys.concat(Object.keys(user));
        if(key === currentUserKey){
          let newUpdatedUserDetails = { [key]: { ...userValues, todos: this.state.todos}};
          //at index i remove 1, that current users details and values and put in the new values which includes updated todos
          // allUserDetails.splice(i, 1 , newUpdatedUserDetails);
          return newUpdatedUserDetails
        }
        else{
          return user
        }
      })
      localStorage.setItem("users", JSON.stringify(allUserDetails))
    }

  componentDidUpdate = () => {
    saveTodoToLocalStorage(this.state.todos);
  }

  toggleDone = (todo) =>
      this.setState({
          todos: this.state.todos.map((todoItem) =>
              todoItem.task === todo.task ? { ...todoItem, completed: !todoItem.completed } : todoItem
          ),
    })

  updateState = (state) => {
    this.setState(state)
  }

  updateTodoValue = (e) => {
    this.setState({newTodo: e.target.value})
  }

  newTodo = (e) => {
    e.preventDefault()
    saveTodo({task: this.state.newTodo, completed: false})
    this.setState({
      todos: [{task: this.state.newTodo, completed: false},...this.state.todos],
      newTodo: ""
    })
  }
    
  todoDeleted = (idKey) => {
    this.setState({todos: deleteTodo(this.state.todos,idKey)})
  }

  handleMouseEnter = () => {
    this.setState({
      mouseOver: true
    })
  }

  handleMouseLeave = () => {
    this.setState({
      mouseOver: false
    })
  }
  
  render(){
    return (
      <div className="home">
        <div className="home-container">
          <div className="header-container">
            <div className='username'>
                <h2>{this.state.username}'s Todo List</h2>
              <div className="logout">
                  <button 
                    className="logout-button" 
                    onClick={() => this.props.handleLogOut()}
                    onMouseEnter={this.showText}
                    onMouseLeave={this.hideText}
                  >
                    <span className="logout-icon">
                      <i className='fa fa-sign-out fa-3x'></i> 
                      {/* <LogoutIcon fontSize="large" /> */}
                    </span>
                  </button>
              </div>
            </div>
            <div className="userInput">
              <form className="home-form" onSubmit={e => this.newTodo(e)}>
                <input 
                  className="todo-input"
                  type="text" 
                  onChange={e => this.updateTodoValue(e)} 
                  required
                  value={this.state.newTodo}
                />
                <button 
                  className="add-button" 
                  type="submit"
                  onMouseEnter={() => this.setState({mouseOver: true})}
                  onMouseLeave={() => this.setState({mouseOver: false})}
                >
                    <span 
                      className={"add-plus"+(this.state.mouseOver ? " add-plus-hover" : "")}
                      >
                      <i className={"fa fa-plus fa-3x"+(this.state.mouseOver ? " fa-plus-hover" : "")}></i>
                    </span>
                </button>
              </form>
              <div className="filtered-todos">
                <FilteredTodos
                  todos={this.state.todos}
                  filteredTodos={this.state.filteredTodos}
                  updateHomeState={this.updateState}
                  homeState={this.state}
                />
              </div>
          </div>
        </div>
        <div className="table">
            <table>
              <thead className="todo-title">
                <tr>
                  <th >Todo</th>
                </tr>
              </thead>
              <tbody>
                {
                  this.state.filteredTodos.length? 
                  this.state.filteredTodos?.map((todo,i) => {
                    return (
                      <Todo 
                        key={i} 
                        filteredIdKey={i} 
                        todo={todo} 
                        todoDeleted={this.todoDeleted}
                        todos={this.state.todos} 
                        updateHomeState={this.updateState}
                        filteredTodos={this.state.filteredTodos}
                        toggleDone={this.toggleDone}
                      />  
                    ) 
                  })
                  :
                  this.state.todos?.map((todo,i) => {
                    return (
                      <Todo 
                        key={i} 
                        idKey={i} 
                        todo={todo} 
                        todoDeleted={this.todoDeleted}
                        todos={this.state.todos}
                        updateHomeState={this.updateState}
                        toggleDone={this.toggleDone}
                      />  
                    )
                  })
                }
            </tbody>
          </table>
        </div>
      </div>
    </div>
    )
  }
}