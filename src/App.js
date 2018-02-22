import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import {BrowserRouter as Router, Route} from 'react-router-dom';
import NavBar from './components/NavBar'
import ExploreCompanyContainer from './components/companyExplorer/ExploreCompanyContainer'
import JobExploreContainer from './components/jobExplorer/JobExploreContainer'
import JobDescription from './components/jobExplorer/JobDescription'
import MyJobsContainer from './components/myJobs/MyJobsContainer'
import MyJobsItemDetail from './components/myJobs/MyJobsItemDetail'


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      savedJobs: []
    }
  }

  addToSavedJobs = (selectedJob) => {
    let currentSavedJobs = this.state.savedJobs
    let stateCheck = this.state.savedJobs.find((j) => {
      return j.id == selectedJob.id
    })
    {stateCheck == undefined &&
      this.setState({
        savedJobs: [...currentSavedJobs, selectedJob]
      })
    }


  }


// <Route exact path="/myjobs" component={MyJobsContainer} savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} />
  render() {

    return (
      <Router>
        <div className="App">
          <NavBar />
          <Route exact path="/search/companies" component={ExploreCompanyContainer} />
          <Route exact path="/search/jobs" render={() => <JobExploreContainer savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} />} />
          <Route path="/jobs/:jobId" render={(props) => <JobDescription jobId={props.match.params.jobId} savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} /> } />
          <Route exact path="/myjobs" render={() => <MyJobsContainer savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} />} />
          <Route path="/myjobs/:jobId" render={(props) => <MyJobsItemDetail jobId={props.match.params.jobId} savedJobs={this.state.savedJobs} /> } />
        </div>
      </Router>
    );
  }
}

export default App;
