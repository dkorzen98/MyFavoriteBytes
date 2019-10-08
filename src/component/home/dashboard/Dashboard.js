import React, { Component } from 'react';
import axios from 'axios';

class Dashboard extends Component {

    state = {
        student: {}
    }
    componentDidMount() {
        const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent"));
        const email = loggedInStudent.email;
        axios.get("http://localhost:8080/findStudentById", {
            params: {
                email: email
            }
        }).then(response => {
            this.setState(
                {
                    student:response.data
                }
            )
        })            
    }
    render() {

        return (
            <div className="card text-white bg-primary mb-3" style={{maxWidth: '18rem'}}>
            <div className="card-header">Name: {this.state.student.firstName} {this.state.student.lastName}</div>
            <div claclassName="card-body">
                <h5 className="card-title">Email: {this.state.student.email}</h5>
                <p className="card-text">Telephone: {this.state.student.telephone}</p>
            </div>
        </div>
        );
    }
}

export default Dashboard;