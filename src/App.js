import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, withRouter} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions'

import Login from './components/Login'
import Logout from './components/Login'
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
      auth: {
        currentUser: null,
        loggingIn: true
      },
      savedJobs: [],
      savedCompanies: [],
      savedNotes: []
    }
  }

  setLoggedInUser = (user) => {
     localStorage.setItem('token', user.token)
     this.setState({
       auth: {
         currentUser: {
           username: user.username,
           id: user.id
         },
         loggingIn: false
       }
     })
     this.props.loadCurrentUser(this.state.auth.currentUser)
     this.props.history.push('/profile')
   }

   logOutUser = () => {
     localStorage.removeItem('token')
     this.setState({
       auth: { currentUser: null, loggingIn: false }
     })
     window.location = `/login`
   }

  componentDidMount() {
    const token=localStorage.getItem('token')
    if (token) {
      return fetch("http://localhost:3000/api/v1/current_user", {
        headers:  {
          'Content-Type': 'application/json',
          Accepts: 'application/json',
          Authorization: token
        }})
        .then(response => response.json())
        .then(user => {
          if(user) {
            this.setState({
              auth: {
                currentUser: user
              },
              loggingIn: false
            }); this.props.loadCurrentUser(this.state.auth.currentUser)
          }

          else {
            this.setState({
              auth: {
                currentUser: null,
                loggingIn: false
              }
            })
          }
        })
      }
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
    console.log(this.props)
    // if (!this.props.savedJobs) {
    //   return <div>Loading</div>;
    // }


    return (
      <Router>
        <div className="App">
          <NavBar loggedIn = {this.state.auth.currentUser} logOutUser = {this.logOutUser} />

          <Route exact path="/login" render={() => <Login setLoggedInUser={this.setLoggedInUser} /> } />

          <Route exact path="/logout" render={() => <Logout /> } />

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
