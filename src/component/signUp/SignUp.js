import React, { Component } from 'react';
import axios from 'axios';
import ThankYou from './../thankYou/ThankYou';
import { Link } from 'react-router-dom';


class signUp extends Component {

    state = {
        student: {
            fName: '',
            lName: '',
            email: '',
            age: '',
            telephone: '',
            password: ''
        }
    }
    signUpSubmitHandler = (event) => {
        event.preventDefault();
        axios.post("http://localhost:8080/submitStudentDetails", this.state.student)
        .then(response => {
          const logInStudent = response.data;
          localStorage.setItem("loggedInStudent", JSON.stringify(this.state.student));
            this.props.history.push("/home")
        }).catch(error => {
            //Display error message to the user
        })
    }
    signUpChangeHolder = (event) => {
        const key = event.target.name;
        const value = event.target.value;
        const tempStudent = {...this.state.student};
        tempStudent[key] = value;
        this.setState(
            {
                student: tempStudent
            }
        )
    }
    handleChange = (event) => {
        this.setState(
            {
                [event.target.name]: event.target.value
            }
        )
    }
    render() {
        return (
        <div className="signuppic">
            <header>
                <body className="signup-form">
                        
                        <form className = "signup-form">
                        <h1 className="h3 mb-3 font-weight-normal text-center">Please sign up</h1>
                        <input type="text" id="fName" className="form-control" name="fName" value={this.state.student.fName} onChange={this.signUpChangeHolder} placeholder="First Name" required="required" autofocus="" /><br></br>
                        <input type="text" id="lName" className="form-control" name="lName" value={this.state.student.lName} onChange={this.signUpChangeHolder} placeholder="Last Name" required="required" autofocus="" /><br></br>
                        <input type="email" id="email" className="form-control" name="email" value={this.state.student.email} onChange={this.signUpChangeHolder} placeholder="Email Address" required="required" autofocus="" /><br></br>
                        <input type="password" id="password" className="form-control" name="password" value={this.state.student.password} onChange={this.signUpChangeHolder} placeholder="Password" required="required" />
                        <div className="checkbox mb-3">
                        </div>
                        <button className="btn btn-lg btn-primary btn-block" type="submit" onClick={this.signUpSubmitHandler}>Register</button>
                        <h5 className="text-center"> If you already have an account please login in the top right corner
                        </h5>
                   </form>
                </body>
            </header>
          </div>
        );
    }
}

export default signUp;