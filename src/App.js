import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "./Components/Header/Header";
import Profile from "./Components/Profile/Profile";
import Search from "./Components/Search/Search";
import Error from "./Components/Error/Error";
import Footer from "./Components/Footer/Footer";
import { repoInformation, profileData } from "./actions/index";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    profileFound: false,
    userDoesntExist: false
  };

  //on submit handler, which fetches data from API
  onSubmitHandler = e => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${this.state.name}`)
      .then(response => {
        if (response.ok) {
          return response.json();
        }
      })
      .then(profile => {
        if (profile.message !== "Not Found") {
          fetch(`https://api.github.com/users/${this.state.name}/repos`)
            .then(data => data.json())
            .then(data => {
              // storing the data in the redux store if the profile exists
              this.props.repoInfo(data);
              this.props.profileInfo(profile);

              this.setState({
                profileFound: true,
                userDoesntExist: false
              });
            });
        }
      })
      .catch(err => {
        console.log("Not found");
        this.setState({ userDoesntExist: true });
      });
  };

  // onchange handler, which updates the local state
  onChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };

  // method to revert the state so browser's "back" can work
  onProfileMount = bool => {
    this.setState({
      profileFound: bool
    });
  };
  render() {
    return (
      <>
        <div id="App">
          <Header
            onSubmitHandler={this.onSubmitHandler}
            onChangeHandler={this.onChangeHandler}
            name={this.state.name}
          />
          {/*
          Redirecting to Profile route if the user is found
        */}
          <Route
            path="/"
            exact
            render={() =>
              this.state.profileFound ? (
                <Redirect from="/" push to="/profile" />
              ) : (
                <>
                  <h1 id="heading">Github Profile Viewer</h1>
                  <Search
                    onSubmitHandler={this.onSubmitHandler}
                    onChangeHandler={this.onChangeHandler}
                    name={this.state.name}
                  />
                  {/* Showing Error if the user doesnt exist  */}
                  {this.state.userDoesntExist && <Error />}
                </>
              )
            }
          />
          <Route
            path="/profile"
            exact
            render={() => (
              <Profile
                userDoesntExist={this.state.userDoesntExist}
                onProfileMount={this.onProfileMount}
              />
            )}
          />
        </div>
        <Footer />
      </>
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
