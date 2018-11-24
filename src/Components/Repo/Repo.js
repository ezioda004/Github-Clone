import React, { Component } from "react";
import { connect } from "react-redux";
import { userAction } from "../actions/index";

class Repo extends Component {
  render() {
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
            repo.name.toLowerCase().includes(this.props.user.search.input) &&
            languageFilter &&
            typeFilter
          );
        }
        return true;
      })
      .map(repo => (
        <div className="repo-container" key={repo.node_id}>
          <a href={repo.html_url} className="repo-name">
            {repo.name}
          </a>
          <div className="repo-description">{repo.description}</div>
          <div className="repo-meta">
            <div className="repo-language">{repo.language}</div>
            <div className="repo-forks">{repo.forks}</div>
            <div className="repo-updated">{repo.updated_at}</div>
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
