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


class App extends Component {
  constructor(props) {
    super(props)

    this.state = {
      currentUser: {},
      savedJobs: []
    }
  }

  componentDidMount() {
    fetch("http://localhost:3000/api/v1/users/1")
    .then(response => response.json())
    .then(json => this.setState({
      currentUser: json,
      savedJobs: json.jobs
    }))
  }


  addToSavedJobs = (selectedJob) => {
    let currentSavedJobs = this.state.savedJobs.slice(0)
    let stateCheck = this.state.savedJobs.find((j) => {
      return j.museId === selectedJob.id
    })
    const url = "http://localhost:3000/api/v1/users/1/jobs"

    {stateCheck == undefined &&
      fetch(url,
        {
          method: 'post',
          headers: {
            'Content-Type': 'application/json',
            'Accepts': 'application/json'
          },
          body: JSON.stringify({
            jobs: {
              title: selectedJob.name,
              date_published: selectedJob.publication_date,
              contents: selectedJob.contents,
              museId: selectedJob.id,
              location: selectedJob.locations[0].name,
              level: selectedJob.levels[0].name,
              date_saved: Date.now(),
              applied_status: false
            }
          })
        })
        .then(response => response.json())
        .then(json => {
          this.setState({
            savedJobs: [...currentSavedJobs, selectedJob]
          })
        })
      }
    }






// <Route exact path="/myjobs" component={MyJobsContainer} savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} />
  render() {
    if (!this.state.savedJobs) {
      return <div>Loading</div>;
    }

    return (
      <Router>
        <div className="App">
          <NavBar />

          <Route exact path="/" render={() => <Profile user={this.state.currentUser} savedJobs={this.state.savedJobs} /> } />

          <Route exact path="/search/companies" component={ExploreCompanyContainer} />

          <Route exact path="/search/jobs" render={() => <JobExploreContainer user={this.state.currentUser} savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} />} />

          <Route path="/jobs/:jobId" render={(props) => <JobDescription jobId={props.match.params.jobId} user={this.state.currentUser} savedJobs={this.state.savedJobs} addToSavedJobs={this.addToSavedJobs} /> } />

          <Route exact path="/myjobs" render={() => <MyJobsContainer savedJobs={this.state.savedJobs} user={this.state.currentUser} addToSavedJobs={this.addToSavedJobs} />} />

          <Route path="/myjobs/:jobId" render={(props) => <MyJobsItemDetail user={this.state.currentUser} jobId={props.match.params.jobId} savedJobs={this.state.savedJobs} /> } />

        </div>
      </Router>
    );
  }
}

export default App;
