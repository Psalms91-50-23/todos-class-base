import React, { Component } from 'react'
import "./Signup.css"
import { matchPassword, registerUser, minEmailLength, minPasswordCharReqReached } from "../../func/functions"

export default class Signup extends Component {

    constructor(props) {
        super(props)
        this.state = {
            username: "",
            email: "",
            password: "",
            confirmPassword: "",
            passwordMisMatchError: false,
            userExists: false,
            minEmailLengthError: false,
            minPasswordCharError: false
      }
    }

    handleChange = (e) => {
        e.preventDefault()
        //reseting state to remove errors as user types in new values
        this.setState({
            passwordMisMatchError: false,
            userExists: false,
            minEmailLengthError: false,
            minPasswordCharError: false
        })
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    updateState = (signupState) => {
        this.setState(signupState)
    }

    register = ( e, userState, slideDown, updateState ) => {
        e.preventDefault()
        if(!minEmailLength(this.state.email)){
            this.setState({
                minEmailLengthError: true
            })
            return
        }

        if(!minPasswordCharReqReached(this.state.password)){
            this.setState({
                minPasswordCharError: true
            })
            return
        }

        if (!matchPassword(this.state.password, this.state.confirmPassword)) {
            this.setState({
                passwordMisMatchError: true
            })
            return   
        }
        registerUser( userState, slideDown, updateState )
    }

    render() {
        return (
            <div className='signup '>
                <div className="signup-titleContainer">
                    <h1>Sign-Up</h1>
                </div>
                <div className="top-right-fold" style={{ display: this.props.state.showFold ? "block" : "none"}}></div>
                <div className="register-container">
                    <form className="signup-form" onSubmit={e => this.register(e, this.state, this.props.toggleSlideDown, this.updateState )}>
                        <div className="signup-username">
                            <h3>UserName</h3>
                            <input
                                className="input big-font"
                                type="text"
                                name="username"
                                required
                                value={this.state.username}
                                onChange={e => this.handleChange(e)}
                            />
                        </div>
                        <div className="signup-email">
                            <h3>Email</h3>
                            <input
                                className="input big-font"
                                type="text"
                                name="email"
                                required
                                value={this.state.email}
                                onChange={e => this.handleChange(e)}
                            />
                            {this.state.minEmailLengthError && 
                                <span className="error-msg">
                                    Length of email has to be 3 min before "@"
                                </span>
                            }
                            {this.state.userExists &&
                                <span className="error-msg">
                                    Email already exists!
                                </span>
                            }
                        </div>
                        <div className="signup-password">
                            <h3>Password</h3>
                            <input
                                className="input big-font"
                                type="password"
                                required
                                name="password"
                                onChange={e => this.handleChange(e)}
                                value={this.state.password}
                                autoComplete='on'
                            />
                            {this.state.minPasswordCharError &&
                            <span className="error-msg">
                                Min requirement for password must have 1 special character "!@#$%^&", 1 Lower and Upper character,
                                1 number "0-9" and password length 6 or greater
                            </span>
                            }                           
                        </div>
                        <div className="signup-confirmPassword">
                            <h3>Confirm Password</h3>
                            <input
                                className="input big-font"
                                type="password"
                                required
                                name="confirmPassword"
                                onChange={e => this.handleChange(e)}
                                value={this.state.confirmPassword}
                                autoComplete='on'
                            />   
                            { this.state.passwordMisMatchError &&
                                <span className="error-msg">
                                    Password did not match!
                                </span>
                            }
                        </div>
                        <div className='button-div'>
                            <button className='signup-submitButton' type="submit">
                                Register
                            </button>
                            <button type="button" onClick={() => this.props.toggleSlideDown()}>
                                Already Registered?
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        ) 
    }
}
