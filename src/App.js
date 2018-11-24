import React, { Component } from "react";
import { Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
class App extends Component {
  render() {
    return (
      <div>
        <Route path="/" exact render={() => <div>Hello world</div>} />
        <Route path = "/profile" exact  component = {Profile}/>
        test;
      </div>
    );
  }
}

export default App;
