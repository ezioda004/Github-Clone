import React, { Component } from "react";
import { connect } from "react-redux";
import { userAction, searchInfo } from "../../actions/index";

import "./Filter.css";

class Filter extends Component {
  state = {
    input: "",
    type: "",
    language: ""
  };

  // this method sends data to the Repo component, data to be filtered
  onChangeHandler = e => {
    this.props.searchInfo({ ...this.state, [e.target.id]: e.target.value });
    this.setState({
      [e.target.id]: e.target.value
    });
  };

  // get meta data about profile to display in the dummy tabs
  getProfileInfo() {
    const { profile } = this.props.user;
    const profileInfo = {
      followers: profile.followers,
      following: profile.following,
      repositories: profile.public_repos,
      stars: 7,
      overview: ""
    };
    return profileInfo;
  }

  render() {
    const profile = this.getProfileInfo();
    //mapping the type options
    const typeOptions = [
      "All",
      "Public",
      "Private",
      "Source",
      "Fork",
      "Archived",
      "Mirrors"
    ].map(type => (
      <option value={type.toLowerCase()} key={type}>
        {type}
      </option>
    ));

    const languages = ["All"];

    //getting all the languages from users repo and pushing it to languages array
    this.props.user.repo.forEach(repo =>
      languages.includes(repo.language)
        ? null
        : repo.language && languages.push(repo.language)
    );

    //map through and dynamically generate option
    const languageOptions = languages.map(language => (
      <option value={language} key={language}>
        {language}
      </option>
    ));

    // generating li's with a
    const dummyTabsList = [
      "Overview",
      "Repositories",
      "Stars",
      "Followers",
      "Following"
    ].map(list => (
      <li key={list}>
        <a href="# ">
          {list} <code>{profile[list.toLowerCase()]}</code>
        </a>
      </li>
    ));
    return (
      <>
        <div className="dummy-tabs">
          <ul>{dummyTabsList}</ul>
        </div>
        <br />
        <form id="filter-repo" onChange={this.onChangeHandler}>
          <label className="search-field">
            <input
              className="input-field"
              type="text"
              id="input"
              placeholder="Find a repository..."
            />
          </label>
          <div className="select">
            <label className="language-type">
              Language:
              <select name="" id="language">
                {languageOptions}
              </select>
            </label>
            <label className="select-type">
              Type:
              <select name="" id="type">
                {typeOptions}
              </select>
            </label>
            <button className="btn" onClick={e => e.preventDefault()}>
              New
            </button>
          </div>
        </form>
      </>
    );
  }
}
const mapStateToProps = userAction;

const mapDispatchToProps = dispatch => ({
  searchInfo(search) {
    return dispatch(searchInfo(search));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Filter);
