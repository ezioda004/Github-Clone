import React, { Component } from "react";
import Information from "../Information/Information";

class Profile extends Component {
  render() {
    console.log(this.props, "PROPSSS");
    return (
      <>
        <div>profile</div>
        <Information />
      </>
    );
  }
}



export default Profile;
