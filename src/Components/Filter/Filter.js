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
  render() {

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

    return (
      <form id="filter-repo" onChange={this.onChangeHandler}>
        <label className="search-field">
          <input type="text" id="input" placeholder = "Find a repository..."/>
        </label>
        <label className="select-type">
          Type:
          <select name="" id="type">
            {typeOptions}
          </select>
        </label>

        <label className="language-type">
          Language:
          <select name="" id="language">
            {languageOptions}
          </select>
        </label>

        <button>New</button>
      </form>
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
