import React, { useState, useContext } from "react";
import GithubContext from "../../context/github/githubContext";
import PropTypes from "prop-types";

const Search = ({ setAlert }) => {
  const [text, setText] = useState("");
  const githubContext = useContext(GithubContext);

  const onChange = e => {
    setText(e.target.value);
  };

  const onSubmit = e => {
    e.preventDefault();
    if (text === "") {
      setAlert("Please enter a search term", "light");
    } else {
      githubContext.searchUsers(text);
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
      {githubContext.users.length > 0 && (
        <button
          onClick={githubContext.clearUsers}
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
  setAlert: PropTypes.func.isRequired
};

export default Search;
