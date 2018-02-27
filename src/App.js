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
      savedJobs: []
    }
  }

  componentDidMount() {
    this.props.loadCurrentUser()
  }



  addToSavedJobs = (selectedJob) => {
    this.props.saveNewJob(selectedJob)
  }


// <Route exact path="/myjobs" component={MyJobsContainer} savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} />
  render() {
    console.log(this.props)
    if (!this.props.savedJobs) {
      return <div>Loading</div>;
    }

    return (
      <Router>
        <div className="App">
          <NavBar />

          <Route exact path="/" render={() => <Profile user={this.props.currentUser} savedJobs={this.props.savedJobs} /> } />

          <Route exact path="/search/companies" component={ExploreCompanyContainer} />

          <Route exact path="/search/jobs" render={() => <JobExploreContainer user={this.props.currentUser} savedJobs={this.props.savedJobs} addToSavedJobs={this.addToSavedJobs} />} />

          <Route path="/jobs/:jobId" render={(props) => <JobDescription jobId={props.match.params.jobId} user={this.props.currentUser} savedJobs={this.props.savedJobs} addToSavedJobs={this.addToSavedJobs} /> } />

          <Route exact path="/myjobs" render={() => <MyJobsContainer savedJobs={this.props.savedJobs} user={this.props.currentUser} addToSavedJobs={this.addToSavedJobs} />} />

          <Route path="/myjobs/:jobId" render={(props) => <MyJobsItemDetail user={this.props.currentUser} jobId={props.match.params.jobId} savedJobs={this.props.savedJobs} /> } />

        </div>
      </Router>
    );
  }
}

function mapStateToProps(state, props) {
  return {
    currentUser: state.user.currentUser,
    savedJobs: state.user.savedJobs
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
