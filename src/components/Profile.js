import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import JobSuggestionContainer from './jobExplorer/JobSuggestionContainer'
import CompanySuggestionContainer from './companyExplorer/CompanySuggestionContainer'
import MyJobsResourceFeedInterviews from './myJobs/MyJobsResourceFeedInterviews'


class Profile extends React.Component {

  industryUrl = () => {
    let iUrl = this.props.savedIndustries.map((i) => {
      console.log(i.name)
       return i.name.split(' ').join('%20')
    })
    return iUrl.join('&industry=')
  }

  categoryUrl = () => {
    let cUrl = this.props.savedCategories.map((c) => {
      return c.name.split(' ').join('%20')
    })
    return cUrl.join('&category=')
  }

  render() {

    return (
      <div className = "profile">
        <div className="welcome"><h1>Welcome back</h1></div>


        <div className="jobSuggestions" >
          <h2>Suggested Jobs</h2>
          <JobSuggestionContainer currentUser={this.props.currentUser} savedJobs={this.props.savedJobs} savedCategories={this.props.savedCategories} savedIndustries={this.props.savedIndustries} addToSavedJobs={this.props.addToSavedJobs}  categoryUrl={this.categoryUrl()}/>
        </div>

        <div className="companySuggestionContainer">

        <CompanySuggestionContainer industryUrl={this.industryUrl()} />
        </div>

        <div className="resources">
          <h2>Get Advice!</h2>
          <MyJobsResourceFeedInterviews />
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
