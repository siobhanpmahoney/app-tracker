import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'
import MyJobsItem from '../myJobs/MyJobsItem'
import CompanyArticleFeed from '../reusableCompany/CompanyArticleFeed'
import CompanyPRFeed from '../reusableCompany/CompanyPRFeed'
import JobSearchResultList from '../jobExplorer/JobSearchResultList'
import JobSearchResultItem from '../jobExplorer/JobSearchResultList'



class MyCompanyDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state={
      company: null,
      myJobs: [],
      openJobs: []
    }
  }

  componentDidMount() {
    let companyid = this.props.companyId
    // let userid = this.props.currentUser.user.id
    // let url = `http://localhost:3000/api/v1/users/${userid}/companies/${companyid}`
    let url = `http://localhost:3000/api/v1/users/1/companies/${companyid}`
    fetch(url)
    .then(response => response.json())
    .then(json => this.setState({
       company: json.company,
       myJobs: json.company_jobs
    }))
    // .then(() => this.fetchOpenJobs(this.state.company.name))

    .then(() => fetch(`https://api-v2.themuse.com/jobs?company=${this.state.company.name}&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1`))
    .then(res => res.json())
    .then(json => this.setState({
      openJobs: json.results
    }))
    .then(() => console.log(this.state))
  }

  // fetchOpenJobs = (companyName) => {
  //
  //   let openJobState = this.state.openJobs
  //   for(let i=0; i<6; i++) {
  //     let jobUrl = "https://api-v2.themuse.com/jobs?company=" + companyName + "&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=" + i
  //     fetch(jobUrl)
  //     .then(response => response.json())
  //     .then(res => this.setState({
  //       openJobs: [...openJobState, res.results]
  //     }))
  //     .then(() => console.log(this.state))
  //   }
  // }







  render() {
    if (!this.props) {
      return<div>Loading...</div>
    }
    if (!this.props.currentUser) {
      return<div>Loading...</div>
    }
    if (!this.props.currentUser.user) {
      return <div>Loading...</div>
    }
    if (!this.state.company) {
      return <div>Loading...</div>
    }
    if (!this.state.myJobs) {
      return <div>Loading...</div>
    }
    console.log(this.state.myJobs)

    return (
  <div>
      <h1>{this.state.company.name}</h1>
      <h3>{this.state.company.location}</h3>
      <h3>{this.state.company.size}</h3>
      <img src={this.state.company.image_link} />

      <p>{this.state.company.description}</p>

    <div className="myCompanyMyJobs">
      <h2>Bookmarked Jobs</h2>
      {this.state.myJobs.map((job) => {
        return <MyJobsItem job={job} key={job.id} user = {this.props.currentUser} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} user={this.props.currentUser}/>

      })}
    </div>

    <div className="myCompanySocial" style={{clear:"both"}}>
      <h2>Keep Up-to-Date with {this.state.company.name} on Social Media</h2>
    </div>

    <div className="myCompanyPressReleases" style={{clear:"both"}}>
      <h2>Press Releases mentioning {this.state.company.name}</h2>
      <CompanyPRFeed addBookmark = {this.props.addBookmark} user = {this.props.user} company={this.state.company}/>
    </div>

    <div className="myCompanyNews" style={{clear:"both"}}>
      <h2>{this.state.company.name} in the News</h2>
      <CompanyArticleFeed company={this.state.company} addBookmark = {this.props.addBookmark} user = {this.props.user} company={this.state.company}/>
    </div>

    <div className="myCompanyFindJobs" style={{clear:"both"}}>
      <h2>Explore Open Positions at {this.state.company.name}</h2>
      <JobSearchResultList jobSearchResults = {this.state.openJobs} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.saveNewJob} />
    </div>

  </div>

    )
  }
}


function mapStateToProps(state, props) {
  return {
    currentUser: state.user.currentUser,
    savedJobs: state.user.savedJobs,
    savedCompanies: state.user.savedCompanies,
    savedNotes: state.user.savedNotes,
    savedBookmarks: state.user.savedBookmarks,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyCompanyDetail);
