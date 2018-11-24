import React, { Component } from "react";
import { Route, Redirect, withRouter } from "react-router-dom";
import Profile from "./Components/Profile/Profile";
import { connect } from "react-redux";
class App extends Component {
  state = {
    name: "",
    found: false
  };
  onSubmitHandler = e => {
    e.preventDefault();
    fetch(`https://api.github.com/users/${this.state.name}`)
      .then(data => data.json())
      .then(profile => {
        console.log(profile);
        if (profile.message !== "Not Found") {
          fetch(`https://api.github.com/users/${this.state.name}/repos`)
            .then(data => data.json())
            .then(data => {
              this.props.repoInfo(data);
              this.props.profileInfo(profile);
              console.log(this.props);
              this.setState({
                found: true
              })
              this.renderRedirect();
            });
        }
      });
  };
  onChangeHandler = e => {
    this.setState({
      name: e.target.value
    });
  };
  renderRedirect = () => {
    return <Redirect to="/profile" />;
  };
  render() {
    return (
      <div>
        <Route
          path="/"
          exact
          render={() => (
            this.state.found ?   <Redirect to="/profile" /> :
            <div>
              <form onSubmit={this.onSubmitHandler}>
                <input
                  value={this.state.name}
                  onChange={this.onChangeHandler}
                />
                <button type="submit"> Submit </button>
              </form>
            </div>
          )}
        />
        <Route path="/profile" exact component={Profile} />
      </div>
    );
  }
}

const repoInformation = repo => ({
  type: "REPO",
  repo
});
const profileData = profile => ({
  type: "PROFILE",
  profile
})
const mapDispatchToProps = dispatch => ({
  repoInfo(repo) {
    return dispatch(repoInformation(repo));
  },
  profileInfo(profile){
    return dispatch(profileData(profile));
  }
});

export default withRouter(connect(
  null,
  mapDispatchToProps
)(App));
