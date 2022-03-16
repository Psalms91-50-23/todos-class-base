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
      loggedIn: !this.state.loggedIn
    })
    window.location.reload()
  }

  render = () => {
    if(localStorage.getItem("currentUser") !== null ){
      return (
        <Routes>
          <Route exact path="/" element={<Home handleLogOut={this.handleLogOut} />} ></Route>
        </Routes>
      )
    }
    else{
      return (
        <Routes>
           <Route exact path="/" element={ !this.state.loggedIn ? 
             <Login handleLoggedIn={this.handleLoggedIn} /> 
             : 
             <Home handleLogOut={this.handleLogOut} setState={this.setState} state={this.state} /> } >
           </Route>
         </Routes>
    ) 
    }   
  }
}