import React, { useState } from "react";
import PropTypes from "prop-types";

const Search = ({ clearUsers, showClear, setAlert, searchUsers }) => {
  const [text, setText] = useState("");

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a search term", "light");
    } else {
      searchUsers(text);
    }
  };

  return (
    <div>
      <form className="form" onSubmit={onSubmit}>
        <input
          type="text"
          name="text"
          data-test-id="searchBox"
          placeholder="Enter username..."
          value={text}
          onChange={onChange}
        />
        <button type="submit" className="btn btn-dark btn-block">
          Search
        </button>
      </form>
      {showClear && (
        <button
          onClick={clearUsers}
          className="btn btn-light btn-block"
          data-test-id="clearButton"
        >
          Clear
        </button>
      )}
    </div>
  );
};

Search.propTypes = {
  searchUsers: PropTypes.func.isRequired,
  clearUsers: PropTypes.func.isRequired,
  showClear: PropTypes.bool.isRequired,
  setAlert: PropTypes.func.isRequired
};

export default Search;
