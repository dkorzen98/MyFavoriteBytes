import React, { Component } from 'react';
import axios from 'axios';
import AllRecipes from './AllRecipes';
import {markdown} from 'markdown';

class AddRecipe extends Component {
  state = {
    file:null,
    fileName:null,
    recipe: {
        recipeName: '',
        ingredients: '',
        instructions: '',
    }
  }
  recipeSubmitHandler = (event) => {
    event.preventDefault();
    const loggedInStudent = JSON.parse( localStorage.getItem("loggedInStudent"));
    console.log(loggedInStudent);
    const email= loggedInStudent.email;
    axios.post(`http://localhost:8080/recipe/create?email=${email}`, this.state.recipe)
    .then(response => {
      console.log(response);
        this.props.history.push("/home")
    }).catch(error => {
        console.log(error);
    })
}

imageSubmitHandler = (event) =>  {
  event.preventDefault()
  const formData = new FormData();
     formData.append('file',this.state.file, this.state.fileName);
     formData.append('pictureName',this.state.fileName);
     formData.append('recipeName',this.state.recipe.recipeName);
     formData.append('ingredients',this.state.recipe.ingredients);
     formData.append('instructions',this.state.recipe.instructions);
     const student =  JSON.parse(localStorage.getItem("loggedInStudent"));
     formData.append('email', student.email);
    console.log("Form data ::> ", formData)
    axios.post("http://localhost:8080/recipe/submitImage", formData, {headers: {'Content-Type': 'multipart/form-data'}})
    .then(response => {
      this.setState({
        file:null,
        fileName:null,
        unformattedIngredients: '',
        unformattedInstructions: '',
        recipe: {
          recipeName:'',
          ingredients:'',
          instructions:''
        }
      })
      console.log(this.state);
    }).catch(error => {
      // display error message
      window.alert('error submitting image', error);
    });
  }

  ingredientHandler = (event) => {
    const key = event.target.name;
    const value = event.target.value;
    const tempRecipe = {...this.state.recipe}
    console.log(value);
    tempRecipe.ingredients = markdown.toHTML(value);
    this.setState({ unformattedIngredients: value, recipe: tempRecipe })
 }

 instructionsHandler = (event) => {
  const key = event.target.name;
  const value = event.target.value;
  const tempRecipe = {...this.state.recipe}
  console.log(value);
  tempRecipe.instructions = markdown.toHTML(value);
  this.setState({ unformattedInstructions: value, recipe: tempRecipe })
}

recipeChangeHolder = (event) => {
  const key = event.target.name;
  const value = event.target.value;
  const tempRecipe = {...this.state.recipe};
  tempRecipe[key] = value;
  this.setState(
      {
          recipe: tempRecipe
      }
  )
};

filesHandler = (event) =>{
  const file = event.target.files[0];
  this.setState({file: file, fileName: file.name});
}


render(){
    return( 
    <header className = "add">
      <body className="signup-form">
              
              <form className = "signup-form">
              <h1 className="h3 mb-3 font-weight-normal text-center">Add a Recipe</h1>
             
      <div className ="form-group">
      <div className ="text-center">Add Image</div>
      <input type="file" className="form-control" name="pictureName" onChange={this.filesHandler} accept="image/png, image/jpeg"/>
      </div>


      <div className="form-group">
        <div className ="text-center">Recipe Name</div>
        <input type="text" className="form-control" name="recipeName" value={this.state.recipe.recipeName} onChange={this.recipeChangeHolder} id="exampleFormControlInput1"/>
      </div>

      <div className="form-group">
      <div className ="text-center">Ingredients</div>
        <textarea className="form-control" name="ingredients" id="exampleFormControlTextarea1" onChange={this.ingredientHandler} value={this.state.unformattedIngredients} rows="3"></textarea>
      </div>

      <div className="form-group">
      <div className ="text-center">Instructions</div>
        <textarea className="form-control" name="instructions" value={this.state.unformattedInstructions} onChange={this.instructionsHandler} id="exampleFormControlTextarea1" rows="3"></textarea>
      </div>
      <div className="text-center">
      <button className="btn btn-primary" onClick={this.imageSubmitHandler}  type="submit">Submit</button>
      </div>
      </form>
      </body>
    </header>
   
        
 

      
          

    ); 
}
}
export default AddRecipe;