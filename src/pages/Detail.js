import React from 'react';
import ajax from 'superagent';

class Detail extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      commits: [],
      forks: [],
      pulls: [],
      currentActive: "commits"
    };

  }

  fetchFeed(type) {
    ajax.get(`https://api.github.com/repos/facebook/react/${type}`)
        .end((error, response) => {
            if (!error && response) {
                this.setState({ [type]: response.body });
            } else {
                console.log(`Error fetching ${type}`, error);
            }
        }
    );
  }

  componentWillMount() {
    this.fetchFeed('commits');
    this.fetchFeed('forks');
    this.fetchFeed('pulls');
  }

  selectMode(mode) {
    this.setState({ currentActive: mode });
  }

  renderCommits() {
    return this.state.commits.map((commit, index) => {
        const author = commit.author ? commit.author.login : 'Anonymous';

        return (<p key={index}>
            <strong>{author}</strong>:
            <a href={commit.html_url}>{commit.commit.message}</a>.
        </p>);
    });
  }

  renderForks() {
    return this.state.forks.map((fork, index) => {
        const owner = fork.owner ? fork.owner.login : 'Anonymous';

        return (<p key={index}>
            <strong>{owner}</strong>: forked to
            <a href={fork.html_url}>{fork.html_url}</a> at {fork.created_at}.
        </p>);
    });
  }

  renderPulls() {
    return this.state.pulls.map((pull, index) => {
        const user = pull.user ? pull.user.login : 'Anonymous';

        return (<p key={index}>
            <strong>{user}</strong>:
            <a href={pull.html_url}>{pull.body}</a>.
        </p>);
    });
  }

  render() {
    let content;

    if(this.state.currentActive === "commits") {
      content = this.renderCommits();
    } else if (this.state.currentActive === "forks") {
      content = this.renderForks();
    } else {
      content = this.renderPulls();
    }

    return (<div>
            <button onClick={this.selectMode.bind(this, "commits")} disabled={this.state.currentActive==="commits"}>Show Commits</button>
            <button onClick={this.selectMode.bind(this, "forks")} disabled={this.state.currentActive==="forks"}>Show Forks</button>
            <button onClick={this.selectMode.bind(this, "pulls")} disabled={this.state.currentActive==="pulls"}>Show Pulls</button>
            {content}
        </div>);
  }
}

export default Detail;
