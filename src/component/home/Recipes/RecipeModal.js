import React, { Component } from 'react';
import MyRecipes from './MyRecipes';
import Modal from 'react-bootstrap/Modal';

class RecipeModal extends Component {
  state = {
    show: false,
    recipes: [],
    selectedRecipe: undefined
  }

  componentDidMount(){
    document.getElementById('modalIngredient').innerHTML = this.props.image.ingredients
    document.getElementById('modalInstruction').innerHTML = this.props.image.instructions
  }

  render() {
    console.log("Props ::> ", this.props)
    return (
      <div className="modal fade show bd-example-modal-lg" id="centralModalFluidSuccessDemo" tabindex="-1" role="dialog" aria-labelledby="myLargeModalLabel" aria-hidden="true">  
      <div className="modal-wrapper" role="document">
        <div >
          <div className="modal-content">
            <div className="modal-header">
              <button type="button" className="close" data-dismiss="modal" aria-label="Close">
                <span aria-hidden="true" onClick={this.props.close} >&times;</span>
              </button>
            </div>

            <div class="modal-body">
              <div class="container-fluid">
                <div class="col-sm-8">Recipe Name: <b>{this.props.image.recipeName}</b></div>

              </div>
              <div class="row">
                <div class="col-sm col-md">
                  <h2>Image</h2>
                  <img src={'data:image/jpeg;base64,' + this.props.image.pictureName}     width="100%;" />
                </div>
                <div class="col-sm col-md text-center">
                  <h2>Ingredients</h2>
                  <div className="text-md-left" id="modalIngredient"></div>
                </div>
                <div class="col-sm col-md text-center">
                  <h2>Instructions</h2>
                  <div  className="text-md-left" id="modalInstruction"></div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
      </div>
    );
  }
}

export default RecipeModal;