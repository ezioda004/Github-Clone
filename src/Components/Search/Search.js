import React from "react";
import "./Search.css";


const Search = props => {
  return (
    <div>
      <h1>Github Profile Viewer</h1>
      <form id="profile-search" onSubmit={e => props.onSubmitHandler(e)}>
        <input value={props.name} onChange={e => props.onChangeHandler(e)} placeholder = "Search profile.."/>
        <button type="submit"> Search </button>
      </form>
    </div>
  );
};

export default Search;
