import React, { Component } from 'react';
import Header from './../header/Header';
import SignUp from './../signUp/SignUp';
import AboutUs from './../aboutUs/AboutUs';
import ThankYou from './../thankYou/ThankYou';
import Home from './../home/Home';
import { Route, withRouter } from 'react-router-dom'
import AddRecipe from './../home/Recipes/AddRecipe';

class Layout extends Component {
  render() {
    let routes = (
      <React.Fragment>
        <Route exact path="/" component={SignUp} />
        <Route path="/signUp" component={SignUp} />
      </React.Fragment>
    );
    if (localStorage.getItem("loggedInStudent")) {
      routes = (
        <React.Fragment>
          <Route exact path="/" component={Home} />
          <Route path="/home" component={Home} />
        </React.Fragment>
      )
    }
    return (
      <div>
        <Header {...this.props} />
        <Route path="/aboutUs" component={AboutUs} />
        {routes}
        <Route path="/thankYou" component={ThankYou} />
      </div>
    );
  }
}

export default withRouter(Layout);