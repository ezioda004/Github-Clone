import React, { Component } from "react";
import { Route } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
class App extends Component {
  state = {
    name: "",
    found: false
  }
  onSubmitHandler = e => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${this.state.name}`)
      .then(data => data.json())
      .then(data => {
        console.log(data)
        if (data.message !== "Not Found"){
          window.location.href = "/profile"
        }
      });
  }
  onChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  }
  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            <div>
              <form onSubmit = {this.onSubmitHandler}>
                <input  value = {this.state.name} onChange = {this.onChangeHandler}/>
                <button type = "submit"> Submit </button>
              </form>
            </div>
          )}
        />
        <Route path="/profile" exact component={Profile} />
      </div>
    );
  }
}

export default App;
