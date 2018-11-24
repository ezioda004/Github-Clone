import React, { Component } from "react";
import { connect } from "react-redux";
import { userAction } from "../actions/index";

class Search extends Component {
  state = {
      input: "",
      type: "",
      language: ""
  };

  // this method sends data to the Repo component, data to be filtered
  onChangeHandler = e => {
    console.log(e.target.id);
    this.props.searchInfo({...this.state, [e.target.id]: e.target.value});
    this.setState({
        [e.target.id]: e.target.value
    });
};
  render() {
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
    this.props.user.repo.forEach(repo =>
      languages.includes(repo.language)
        ? null
        : repo.language && languages.push(repo.language)
    );
    const languageOptions = languages.map(language => (
      <option value={language} key={language}>
        {language}
      </option>
    ));

    return (
      <form onChange={this.onChangeHandler}>
        <label>
          <input type="text" id = "input"/>
        </label>
        <select name="" id="type">
          Type: {typeOptions}
        </select>
        <select name="" id="language">
          Languages: {languageOptions}
        </select>
        <button>New</button>
      </form>
    );
  }
}
const mapStateToProps = userAction;

const searchInfo = search => ({
  type: "SEARCH",
  search
});
const mapDispatchToProps = dispatch => ({
  searchInfo(search) {
    return dispatch(searchInfo(search));
  }
});
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Search);
