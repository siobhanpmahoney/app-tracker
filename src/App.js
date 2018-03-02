import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar'
import Profile from './components/Profile'
import ExploreCompanyContainer from './components/companyExplorer/ExploreCompanyContainer'
import JobExploreContainer from './components/jobExplorer/JobExploreContainer'
import JobDescription from './components/jobExplorer/JobDescription'
import MyJobsContainer from './components/myJobs/MyJobsContainer'
import MyJobsItemDetail from './components/myJobs/MyJobsItemDetail'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
      savedJobs: [],
      savedCompanies: [],
      savedNotes: []
    }
  }

  componentDidMount() {
    this.props.loadCurrentUser()
  }

  addToSavedJobs = (selectedJob) => {
    this.props.saveNewJob(selectedJob)

  }

  editJob = (selectedJob) => {
    this.props.editJob(selectedJob)
  }

  deleteJob = (selectedJobId) => {
    this.props.deleteJob(selectedJobId)
  }

  editNote = (event, selectedNote, noteUserId, noteJobId, noteCompanyId) => {
    event.preventDefault()
    this.props.editNote(selectedNote, noteUserId, noteJobId, noteCompanyId)
  }


  render() {
    if (!this.props.savedJobs) {
      return <div>Loading</div>;
    }
    

    return (
      <Router>
        <div className="App">
          <NavBar />

          <Route exact path="/" render={() => <Profile user={this.props.currentUser} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} /> } />

          <Route exact path="/search/companies" component={ExploreCompanyContainer} />

          <Route exact path="/search/jobs" render={() => <JobExploreContainer user={this.props.currentUser} savedJobs={this.props.savedJobs} addToSavedJobs={this.addToSavedJobs} savedCompanies={this.props.savedCompanies} />} />

          <Route path="/search/jobs/:museJobId" render={(props) => <JobDescription museJobId={props.match.params.museJobId} user={this.props.currentUser} savedJobs={this.props.savedJobs} addToSavedJobs={this.addToSavedJobs} savedCompanies={this.props.savedCompanies} /> } />

          <Route exact path="/myjobs" render={() => <MyJobsContainer savedJobs={this.props.savedJobs} user={this.props.currentUser} addToSavedJobs={this.addToSavedJobs} savedCompanies={this.props.savedCompanies} loadSavedJob={this.props.loadSavedJob} savedNotes={this.props.savedNotes} />} />

          <Route path="/myjobs/:jobId" render={(props) => <MyJobsItemDetail user={this.props.currentUser} jobId={props.match.params.jobId} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} editJob={this.props.editJob} addJob={this.props.addJob} loadSavedJob={this.loadJob} editNote={this.editNote} renderedJob={this.props.renderedJob} renderedCompany={this.props.renderedCompany} /> } />

        </div>
      </Router>
    );
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

export default connect(mapStateToProps, mapDispatchToProps)(App);
