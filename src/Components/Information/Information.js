import React, { Component } from "react";
import { connect } from "react-redux";
class Information extends Component {
  render() {
    console.log(this.props.user);
    const { profile } = this.props.user;
    console.log(profile);
    return (
      <div>
        <img src={profile.avatar_url} alt={profile.avatar_url} />
        <div className="name">{profile.name}</div>
        <div className="username">{profile.login}</div>
        <br />
        <div className="bio">{profile.bio}</div>
        <button>Edit Bio</button>
        <div className="company">{profile.company}</div>
        <div className="location">{profile.location}</div>
        <div className="blog">{profile.blog}</div>
        <div className="email">{profile.email}</div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user: state
});

export default connect(
  mapStateToProps,
  null
)(Information);
