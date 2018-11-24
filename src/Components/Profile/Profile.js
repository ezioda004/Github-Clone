import React, { Component } from "react";
import Information from "../Information/Information";
import Repo from "../Repo/Repo";
import "./Profile.css";


class Profile extends Component {
  render() {
    console.log(this.props, "PROPSSS");
    return (
        <div id="profile">
          <Information />
          <Repo />
        </div>
    );
  }
}

export default Profile;
