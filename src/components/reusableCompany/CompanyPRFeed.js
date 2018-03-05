import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'

class CompanyPRFeed extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      pressReleases: []
    }
  }


  componentDidMount() {
      let searchCompany = this.props.company.name.split(" ").join("+")
      let url = `https://newsapi.org/v2/everything?q=%22${searchCompany}%22&pageSize=100&domains=prnewswire.com,reuters.com&language=en&sortBy=relevancy&apiKey=ad5900690118454582f702c63e4286f8`
      fetch(url)
      .then(response => response.json())
      .then(json => this.setState({
        pressReleases: json.articles.filter((pr) => pr.title.includes(this.props.company.name) || pr.description.includes(this.props.company.name)).sort((a,b) => b.publishedAt.localeCompare(a.publishedAt))
      }),
    );
}

formattedDate = (date) => {
  let pubDate = new Date(date)
  return pubDate.toLocaleDateString()
}

  render() {
    if (!this.props) {
      return<div>Loading!</div>
    }
    console.log(this.state)
    console.log(this.props)
    return (
      <div>
        {this.state.pressReleases.map((press) => {
          return <div style={{display: "block", verticalAlign: "middle", justifyContent: "left", boxShadow:"rgba(0, 0, 0, 0.25) 0px 14px 14px, rgba(0, 0, 0, 0.22) 0px 10px 10px", margin: "0.5em", padding: "0.5em", height: "150px", width: "320px", paddingTop:"2em"}}>

          <div><img src={press.urlToImage} style={{height:"75px", float:"right", display:"inlineBlock", verticalAlign: "top", padding:"0.2em", margin:"0.2em", border:"1px red solid"}} /></div>

          <div style={{marginTop:"1em", padding:"0.5em", fontSize:"14px", fontWeight:"bold", display:"inline",  verticalAlign:"bottom"}}>{press.source.name}</div><br/>

          <p><div className="companyPressCardTitle" style={{margin:"0.25em", padding:"0.25em", display:"inline", verticalAlign:"bottom", textIndent:"0em"}}>{press.title}</div></p>

          <p><div className="companyPressCardTitle">{press.publishedAt}</div></p>

          </div>
        })}}
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanyPRFeed);
