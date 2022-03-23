import React, { Component } from 'react'
import './App.css';
import Home from './components/home/Home';
import Login from './components/login/Login';
import { Route, Routes } from 'react-router-dom'


export default class App extends Component {

  constructor(props){
    super(props)
    this.state = {
      loggedIn: false
    }
  }

  handleLoggedIn = () => {
    this.setState({
      loggedIn: !this.state.loggedIn
    })
  }

  handleLogOut = () => {
    localStorage.removeItem("currentUser")
    this.setState({
      loggedIn: false
    })
  }

  render = () => {
      return (
        <Routes>
           <Route exact path="/" element={ !this.state.loggedIn && !localStorage.getItem("currentUser") ? 
             <Login handleLoggedIn={this.handleLoggedIn} /> 
             : 
             <Home handleLogOut={this.handleLogOut} setState={this.setState} state={this.state} /> } >
           </Route>
         </Routes>
    ) 
    // }   
  }
}