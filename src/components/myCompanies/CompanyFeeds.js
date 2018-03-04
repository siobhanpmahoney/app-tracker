import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'

class CompanyFeeds extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pressReleases: [],
      articleDisplay: []
    }
  }




  componentDidMount() {
      let searchCompany = this.props.company.name.split(" ").join("+")
      let prUrl = `https://newsapi.org/v2/everything?q=%22${searchCompany}%22&pageSize=100&domains=prnewswire.com,reuters.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
      let articleUrl = `https://newsapi.org/v2/everything?q=%22${searchCompany}%22&pageSize=100&domains=alleywatch.com,bloomberg.com,businessinsider.com,cnbc.com,dealabs.com,digiday.com,engadget.com,entrepreneur.com,inc.com,mashable.com,nytimes.com,recode.com,seekingalpha.com,techcrunch.com,techdirt.com,techradar.com,thenextweb.com,theverge.com,wsj.com,wired.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
      let pressReleases = null
      let articles = null
      fetch(prUrl)
      .then(response => response.json())
      .then(json => this.setState({
        pressReleases: json.articles.filter((pr) => pr.title.includes(this.props.company.name) || pr.description.includes(this.props.company.name)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
      }),
    );
    fetch(articleUrl)
    .then(response => response.json())
    .then(json => this.setState({
      articleDisplay: json.articles.filter((article) => article.title.includes(this.props.company.name) || article.description.includes(this.props.company.name)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
    }),
  );
}

  render() {
    if (!this.props) {
      return<div>Loading!</div>
    }
    console.log(this.state)
    return (
      <div>
      </div>
    )
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.user.currentUser,
    savedJobs: state.user.savedJobs,
    savedCompanies: state.user.savedCompanies,
    savedNotes: state.user.savedNotes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanyFeeds);
