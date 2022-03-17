import React, { Component } from 'react'
import Signup from "../signup/Signup"
import "./Login.css"
import { loginUser } from "../../func/functions"

export default class Login extends Component {

    constructor(props){
        super(props)
        this.state = {
            username: "",
            email:"",
            password: "",
            todos: [],
            emailError: false,
            slideDown: false,
            slideUp: false,
            showFold: false,
            passwordMatchError: false
        }
    }

    toggleSlideDown = () => {
        this.setState({
            slideDown: true,
            slideUp: false,
            showFold: false
        })
        //set state back to default, so the signup is out of screen
        setTimeout(() => {
            this.setState({
                slideDown: false,
                slideUp: false,
                showFold: false
            })
        },[1000])
    }

    toggleSlideUp = () => {
        this.setState({
            slideUp: !this.state.slideUp,
        }) 
        //after 850 millisecond show the fold on in the Signup component
        setTimeout(() => {
            this.setState({
                showFold: true,
            })
        },[850])
    }

    updateValue = (value) => {
        this.setState(value)
    }

    handleChange = (e) => {
        e.preventDefault()
        if([e.target.name] === "password"){
            this.setState({
                passwordMatchError: false
            })
            this.setState({
                [e.target.name] : e.target.value
            }) 
        }else{
            this.setState({
                [e.target.name] : e.target.value
            }) 
        }
    }
 
    login = (e, handleLoggedIn ) => {
        e.preventDefault()
        loginUser( this.state, handleLoggedIn, this.updateValue )
    }
    
    render() {
        return (
            <div className='login-container'>
                <div className="login">
                    <div className="login-signup-container">
                        <div className="login-title">
                            <h1>Login</h1>
                        </div>
                        <div className="form-container">
                            <form className="login-form" onSubmit={e => this.login(e, this.props.handleLoggedIn)}>
                                <div className="login-username">
                                    <h3>UserName</h3>
                                    <input 
                                        className="input margin-top-bottom font-big"
                                        type="text" 
                                        name="username" 
                                        required 
                                        value={this.state.username} 
                                        onChange={ e => this.handleChange(e)}
                                    />
                                </div>
                                <div className="login-email">
                                    <h3>Email</h3>
                                    <input 
                                        className="input margin-top-bottom font-big"
                                        type="text" 
                                        name="email" 
                                        required 
                                        value={this.state.email} 
                                        onChange={ e => this.handleChange(e)}
                                    />
                                    { this.state.emailError &&
                                        <span className='login-emailError'>
                                            Email already Exists
                                        </span>
                                    }
                                </div>
                                <div className="login-password">
                                    <h3>Password</h3>
                                    <input 
                                        className="input margin-top-bottom font-big"
                                        type="password" 
                                        required 
                                        name="password" 
                                        onChange={ e => this.handleChange(e)} 
                                        value={this.state.password} 
                                        autoComplete='on'
                                    />
                                    { this.state.passwordMatchError &&
                                        <span className='signin-passwordError'>
                                            Password did not match 
                                        </span>
                                    }
                                </div>
                                <div className="button-container margin">
                                    <button 
                                        className="login-submitButton"
                                        type="submit"
                                    >
                                        Sign-In
                                    </button>
                                    <button 
                                        type="button" 
                                        onClick={() => this.toggleSlideUp()} 
                                    >
                                        Not Registered?
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className={"popup"+ (!this.state.slideDown && !this.state.slideUp ? " bottom" 
                    :  
                    !this.state.slideDown && this.state.slideUp ? " slide-up" : " slide-down") }>
                        <Signup toggleSlideDown={this.toggleSlideDown}  toggleSlideUp={this.toggleSlideUp} state={this.state} handleLoggedIn={this.props.handleLoggedIn}
                        />
                    </div>
                </div>
            </div>
        )
    }
}
