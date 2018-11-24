import React, { Component } from "react";
import { connect } from "react-redux";
import { userAction } from "../actions/index";

class Search extends Component {
  state = {
      search: {
          input: "",
          type: "",
          language: ""
      }
  }
    onChangeHandler = e => {
        console.log(e.target.value);
        console.log(this.props.searchInfo({input: e.target.value.toLowerCase()}));
  };
  render() {
    return (
      <form onChange={this.onChangeHandler}>
        <label>
          <input type="text"  />
        </label>
        <select name="" id="">
        Type:
          <option value="">test1</option>
          <option value="">test2</option>
        </select>
        <select name="" id="">
        Languages
          <option value="">test2</option>
          <option value="">test3</option>
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
