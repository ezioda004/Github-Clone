import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Search from "./Components/Search/Search";

import { repoInformation, profileData } from "./actions/index";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    profileFound: false
  };

  //on submit handler, which fetches data from API
  onSubmitHandler = e => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${this.state.name}`)
      .then(data => data.json())
      .then(profile => {
        if (profile.message !== "Not Found") {
          fetch(`https://api.github.com/users/${this.state.name}/repos`)
            .then(data => data.json())
            .then(data => {
              // storing the data in the store if the profile exists
              this.props.repoInfo(data);
              this.props.profileInfo(profile);

              this.setState({
                profileFound: true
              });
            });
        }
      });
  };

  // onchange handler, which updates the local state
  onChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };
  onProfileMount = bool => {
    this.setState({
      profileFound: bool
    });
  };
  render() {
    return (
      <div id="App">
        <Header />
        <Route
          path="/"
          exact
          render={() =>
            this.state.profileFound ? (
              <Redirect from="/" push to="/profile" />
            ) : (
              <>
                <h1>Github Profile Viewer</h1>
                <Search
                  onSubmitHandler={this.onSubmitHandler}
                  onChangeHandler={this.onChangeHandler}
                  name={this.state.name}
                />
              </>
            )
          }
        />
        <Route
          path="/profile"
          exact
          render={() => <Profile onProfileMount={this.onProfileMount} />}
        />
      </div>
    );
  }
}

//dispatching actions to the app as props
const mapDispatchToProps = dispatch => ({
  repoInfo(repo) {
    return dispatch(repoInformation(repo));
  },
  profileInfo(profile) {
    return dispatch(profileData(profile));
  }
});

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(App)
);
