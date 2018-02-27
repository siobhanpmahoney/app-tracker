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

  // addOrUpdateCompany = (selectedJob) => {
  //   let companyCheck = this.state.find((c) => {
  //     return c.museId == selectedJob.company.id
  //   })
  //   if (companyCheck == undefined) {
  //     let newCompany;
  //     let currentCompanyState = this.state.savedCompanies.slice()
  //     fetch("https://api-v2.themuse.com/companies/" + selectedJob.company.id )
  //     .then(response => response.json())
  //     .then(json => this.setState({
  //       savedCompanies: [...currentCompanyState, newCompany]
  //     }))
  //   }
  // }

  addOrUpdateCompany = (selectedJob) => {
    let companyCheck = this.state.find((c) => {
      return c.museId == selectedJob.company.id
    })
    if (companyCheck == undefined) {
      let newCompany;
      return fetch("https://api-v2.themuse.com/companies/" + selectedJob.company.id )
        .then(response => response.json())
        .then(json => newCompany = json)
      } else {
        return companyCheck
      }
    }

  addToSavedJobs = (selectedJob) => {
    let currentSavedJobs = this.props.savedJobs.slice(0)
    let stateCheck = this.props.savedJobs.find((j) => {
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
              // ,
              // company: {
              //   this.addOrUpdateCompany(selectedJob)
              // }
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
