import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Home from './../home/Home';
import pic2 from '../../images/pic2.jpg';
import Dropdown from 'react-bootstrap/Dropdown';


class Header extends Component {
  

  state = {
    email: '',
    password: ''
  }
  signInChangeHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    this.setState(
      {
        [key]: value
      }
    )
  }
  signInSubmitHandler = (event) => {
    event.preventDefault();
    const student = {
      email: this.state.email,
      password: this.state.password
    }
    axios.post('http://localhost:8080/login', student).then(response => {
      //Storing the user's data inside the browser for future use
      const logInStudent = response.data;
      localStorage.setItem("loggedInStudent", JSON.stringify(logInStudent));
      //Navigate to home page
      this.props.history.push("/");
    })
      .catch(error => {
      });
  }
  signOut = () => {
    localStorage.removeItem("loggedInStudent");
    this.props.history.push("/");
  }
  render() {
    let defaultSignInSignOut = (
      <form onSubmit={this.signInSubmitHandler} className="form-inline mt-2 md-0">
        <input className="form-control mr-sm-2" name="email" value={this.state.email} onChange={this.signInChangeHandler} type="email" placeholder="Email" aria-label="Email" />
        <input className="form-control mr-sm-2" name="password" value={this.state.password} onChange={this.signInChangeHandler} type="password" placeholder="Password" aria-label="Password" />
        <button className="btn btn-primary btn-sm my-2 my-sm-0" type="submit">Sign In</button>
      </form>
    )
    if (localStorage.getItem("loggedInStudent")) {
      defaultSignInSignOut = <button onClick={this.signOut} className="btn btn-outline-success my-2 my-sm-0" type="submit">Sign Out</button>
    }
    return (
      <header className="header-margin-bottom" >
        
        <nav className="navbar navbar-expand-md navbar-dark fixed-top bg-dark">
        <img src={pic2} alt={pic2} height="60" width="50"/>
          <Link className="navbar-brand" to="/home">My Favorite Bytes</Link>
          <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarCollapse" aria-controls="navbarCollapse" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>
          <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
   Recipe Options
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="/home/addRecipe">Add a Recipe</Dropdown.Item>
    <Dropdown.Item href="/home/myRecipes">My Recipes</Dropdown.Item>
    <Dropdown.Item href="/home/allRecipes">Browse recipes</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
          <div className="collapse navbar-collapse" id="navbarCollapse">
          <ul className="navbar-nav mr-auto">
          </ul>
           
            {defaultSignInSignOut}
          </div>
        </nav>
        

      </header>
    );
  }
}

export default Header