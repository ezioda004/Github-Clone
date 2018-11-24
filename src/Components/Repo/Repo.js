import React, { Component } from "react";
import { connect } from "react-redux";
import { userAction } from "../actions/index";

class Repo extends Component {
  render() {
    console.log(this.props.user.repo);
    const repos = this.props.user.repo.map(repo => (
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
