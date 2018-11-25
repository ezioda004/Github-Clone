import React from "react";
import "./Search.css";

const Search = props => {
  return (
    <div>
      <form id="profile-search" onSubmit={e => props.onSubmitHandler(e)}>
        <label>
          <input
            className="input-field"
            value={props.name}
            onChange={e => props.onChangeHandler(e)}
            placeholder="Search profile.."
          />
        </label>
        <button className="btn" type="submit">
          Search
        </button>
      </form>
    </div>
  );
};

export default Search;
