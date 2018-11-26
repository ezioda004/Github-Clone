import React, { Component } from "react";
import { Route, Redirect, Switch, withRouter } from "react-router-dom";
import { connect } from "react-redux";
import Header from "../Header/Header";
import Profile from "../Profile/Profile";
import Search from "../Search/Search";
import Error from "../Error/Error";
import Footer from "../Footer/Footer";
import { repoInformation, profileData } from "../../actions/index";
import "./App.css";

class App extends Component {
  state = {
    name: "",
    profileFound: false,
    userDoesntExist: false,
    username: ""
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
                userDoesntExist: false,
                username: profile.login
              });
            });
        }
      })
      .catch(err => {
        //If proflle not found then updating state and render Error component
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
          Redirecting to Profile route if the user is found and making sure the path isnt homepage and not redirecting to same path
        */}
          {this.props.location.pathname !== "/" &&
          this.state.profileFound &&
          this.props.location.pathname.split("/").slice(-1)[0] !==
            this.state.username ? (
            <Redirect push to={`/profile/${this.state.username}`} />
          ) : null}
          <Switch>
            {/* Redirecting from homepage to prifle route */}
            <Route
              path="/"
              exact
              render={() =>
                this.state.profileFound ? (
                  <Redirect push to={`/profile/${this.state.username}`} />
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

            {/* The profile/username route */}
            <Route
              path={`/profile/${this.state.username}`}
              exact
              render={() => (
                <Profile
                  userDoesntExist={this.state.userDoesntExist}
                  onProfileMount={this.onProfileMount}
                />
              )}
            />
          </Switch>
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
