import React, { Component } from "react";
import Information from "../Information/Information";
import Repo from "../Repo/Repo";
import Search from "../Search/Search";
import "./Profile.css";

class Profile extends Component {
  render() {
    console.log(this.props, "PROPSSS");
    return (
      <div id="profile">
        <Information />
        <div className="search-repo">
          <Search />
          <Repo />
        </div>
      </div>
    );
  }
}

export default Profile;
