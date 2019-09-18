import React, { Fragment, useEffect } from "react";
import { Link } from "react-router-dom";
import Spinner from "../layout/Spinner";
import Repos from "../repos/Repos";
import PropTypes from "prop-types";

const User = ({ user, getUser, getUserRepos, match, loading, repos }) => {
  useEffect(() => {
    getUser(match.params.login);
    getUserRepos(match.params.login);
    // eslint-disable-next-line
  }, []);

  const {
    name,
    company,
    avatar_url,
    location,
    bio,
    blog,
    login,
    html_url,
    followers,
    following,
    public_repos,
    public_gists,
    hireable
  } = user;

  if (loading) return <Spinner />;
  return (
    <Fragment>
      <Link to="/" className="btn btn-light" data-test-btn-back>
        Back to Search
      </Link>
      Hireable:{" "}
      {hireable ? 
        (<i className="fas fa-check text-success" />) : 
        (<i className="fas fa-times-circle text-danger" />)}
      <div className="card grid-2">
        <div data-test-usercard className="all-center">
          <img
            src={avatar_url}
            alt={login}
            className="round-img"
            style={{ width: "150px" }}
          />
          <h2>{name || login}</h2>
          <p>{location || "unknown"}</p>
        </div>
        <div data-test-bio>
          {bio && (
            <Fragment>
              <h3>Bio</h3>
              <p>{bio}</p>
            </Fragment>
          )}
          <a
            href={html_url}
            className="btn btn-dark my-1"
            target="_blank"
            rel="noopener noreferrer"
          >
            Visit Github Bio
          </a>
          <ul>
            <li>
              <strong>Username: </strong>
              {login}
            </li>
            <li>
              <strong>Company: </strong>
              {company}
            </li>
            <li>
              <strong>Website: </strong>
              {blog}
            </li>
          </ul>
        </div>
      </div>
      <div className="card text-center" data-test-badges>
        <div className="badge badge-primary">Followers: {followers}</div>
        <div className="badge badge-success">Following: {following}</div>
        <div className="badge badge-light">Public Repos: {public_repos}</div>
        <div className="badge badge-dark">Public Gists: {public_gists}</div>
      </div>
      <Repos repos={repos} />
    </Fragment>
  );
};

User.propTypes = {
  getUser: PropTypes.func.isRequired,
  getUserRepos: PropTypes.func.isRequired,
  loading: PropTypes.bool.isRequired,
  user: PropTypes.object.isRequired
};

export default User;
