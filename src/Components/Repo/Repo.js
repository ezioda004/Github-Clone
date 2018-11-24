import React, { Component } from "react";
import { connect } from "react-redux";
import { userAction } from "../../actions/index";

import "./Repo.css";

class Repo extends Component {
  render() {
    //getting all the repos, also filtering from the queries sent by Search component
    const repos = this.props.user.repo
      .filter(repo => {
        if (this.props.user.search) {
          const languageFilter =
            this.props.user.search.language === "All" ||
            this.props.user.search.language === ""
              ? true
              : this.props.user.search.language === repo.language;
          const typeFilter =
            typeof repo[this.props.user.search.type] === "undefined"
              ? true
              : repo[this.props.user.search.type];
          return (
            repo.name.toLowerCase().includes(this.props.user.search.input.toLowerCase()) &&
            languageFilter &&
            typeFilter
          );
        }
        return true;
      })
      .map(repo => (
        <div className="repo-container" key={repo.node_id}>
          <h2>
            <a href={repo.html_url} className="repo-name">
              {repo.name}
            </a>
          </h2>
          <div className="repo-description">{repo.description}</div>
          <div className="repo-meta">
            <div className="repo-language">Language: {repo.language}</div>
            <div className="repo-forks">Forks: {repo.forks}</div>
            <div className="repo-updated">Updated At: {repo.updated_at}</div>
          </div>
        </div>
      ));

    return <div>{repos}</div>;
  }
}
const mapStateToProps = userAction;

export default connect(
  mapStateToProps,
  null
)(Repo);
