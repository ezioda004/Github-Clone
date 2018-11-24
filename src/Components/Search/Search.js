import React from "react";

const Search = props => {
  return (
    <div>
      <h1>Github Profile Viewer</h1>
      <form id="profile-search" onSubmit={e => props.onSubmitHandler(e)}>
        <input value={props.name} onChange={e => props.onChangeHandler(e)} />
        <button type="submit"> Submit </button>
      </form>
    </div>
  );
};

export default Search;