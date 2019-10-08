import React, { Component } from 'react';
import { Link, Route } from 'react-router-dom';
import Dashboard from './dashboard/Dashboard';
import AddRecipe from './Recipes/AddRecipe';
import AllRecipes from './Recipes/AllRecipes';
import MyRecipes from './Recipes/MyRecipes.js';
import Nav from 'react-bootstrap/Nav'
import AllRecipes2 from './Recipes/AllRecipes';


class Home extends Component {

    state = {
        student:{}
    }
    componentDidMount(){
        const loggedInStudent = JSON.parse(localStorage.getItem("loggedInStudent"));
        this.setState(
            {
                student: loggedInStudent
            }
        )
    }
    render() {
        return (

                    // {/* <div className="d-flex justify-content-between flex-wrap flex-md-nowrap align-items-center pt-3 pb-2 mb-3 border-bottom"> */}
                    <div>
                        <h1  className="colorwhite"> Welcome {this.state.student.fName}</h1>
                    
                    <Route path='/home/dashboard' component={Dashboard} />
                    <Route path='/home/addRecipe' component={AddRecipe} />
                    <Route path='/home/allRecipes' component={AllRecipes}/>
                    <Route path='/home/myRecipes' component={MyRecipes}/>

                            
            </div>
      
       
        )
    }
}
export default Home;