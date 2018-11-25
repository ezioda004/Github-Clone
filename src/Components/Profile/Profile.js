import React, { Component } from "react";
import { withRouter, Redirect } from "react-router-dom";
import { connect } from "react-redux";
import { userAction } from "../../actions/index";
import Information from "../Information/Information";
import Repo from "../Repo/Repo";
import Filter from "../Filter/Filter";
import "./Profile.css";

// Profile component
class Profile extends Component {
  componentDidMount() {
    this.props.onProfileMount(false);
  }
  render() {
    //Redirecting to the homepage if the user object is empty
    return Object.keys(this.props.user).length === 0 ? (
      <Redirect to="/" />
    ) : (
      <div id="profile">
        <Information />
        <div className="search-repo">
          <Filter />
          <Repo />
        </div>
      </div>
    );
  }
}

const mapStateToProps = userAction;
export default withRouter(
  connect(
    mapStateToProps,
    null
  )(Profile)
);
