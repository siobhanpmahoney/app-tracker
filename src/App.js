import React, { Component } from 'react';
import './App.css';
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter} from 'react-router-dom';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from './actions'

import Login from './components/Login'
import Logout from './components/Login'
import NavBar from './components/NavBar'
import Profile from './components/Profile'

import ExploreCompanyContainer from './components/companyExplorer/ExploreCompanyContainer'
import CompanyDetail from './components/companyExplorer/CompanyDetail'
import MyCompanyContainer from './components/myCompanies/MyCompanyContainer'
import MyCompanyDetail from './components/myCompanies/MyCompanyDetail'
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

  addNewNote = (event, noteUserId, noteJobId, noteCompanyId) => {
    event.preventDefault()
    this.props.addNewNote(noteUserId, noteJobId, noteCompanyId)
  }

  editNote = (event, selectedNote, noteUserId, noteJobId, noteCompanyId) => {
    event.preventDefault()
    this.props.editNote(selectedNote, noteUserId, noteJobId, noteCompanyId)
  }

  addBookmark = (bookmarkTitle, bookmarkUrl, bookmarkUserId, bookmarkCompanyId) => {
    console.log(bookmarkTitle, bookmarkUrl, bookmarkUserId, bookmarkCompanyId)
    this.props.addNewBookmark(bookmarkTitle, bookmarkUrl, bookmarkUserId, bookmarkCompanyId)
  }

  relevantNotes = (company) => {

    this.props.savedNotes.filter((note) => {
      return note.company_id == company.id
    })
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

          <Route exact path="/" render={() => <Profile user={this.props.currentUser} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} addToSavedJobs={this.addToSavedJobs} /> } />

    <Route exact path="/search/companies" render={() => <ExploreCompanyContainer /> } />

    <Route path="/search/companies/:museCompanyId" render={(props) => <CompanyDetail user={this.props.currentUser} museCompanyId={props.match.params.museCompanyId} currentUser={this.props.currentUser} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} editJob={this.props.editJob} addJob={this.props.addJob} editNote={this.editNote} addBookmark={this.addBookmark} />} />

      <Route exact path="/search/jobs" render={() => <JobExploreContainer user={this.props.currentUser} savedJobs={this.props.savedJobs} addToSavedJobs={this.addToSavedJobs} savedCompanies={this.props.savedCompanies} />} />

      <Route path="/search/jobs/:museJobId" render={(props) => <JobDescription museJobId={props.match.params.museJobId} user={this.props.currentUser} savedJobs={this.props.savedJobs} addToSavedJobs={this.addToSavedJobs} savedCompanies={this.props.savedCompanies} /> } />

      <Route exact path="/mycompanies" render={() => <MyCompanyContainer /> } />

      <Route path="/mycompanies/:companyId" render={(props) => <MyCompanyDetail
          user={this.props.currentUser}
          companyId={props.match.params.companyId} currentUser={this.props.currentUser} savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} editJob={this.props.editJob} addJob={this.props.addJob} editNote={this.editNote} addBookmark={this.addBookmark} />} />

      <Route exact path="/myjobs" render={() => <MyJobsContainer savedJobs={this.props.savedJobs} user={this.props.currentUser} addToSavedJobs={this.addToSavedJobs} savedCompanies={this.props.savedCompanies} loadSavedJob={this.props.loadSavedJob} savedNotes={this.props.savedNotes} />} />

      <Route path="/myjobs/:jobId" render={(props) => <MyJobsItemDetail
          user={this.props.currentUser} jobId={props.match.params.jobId} addBookmark = {this.addBookmark}
           job={this.props.savedJobs.find((job) => job.id == props.match.params.jobId)}

           company = {this.props.savedCompanies.find((company) => company.id == this.props.savedJobs.find((job) => job.id == props.match.params.jobId).company_id)}

           savedJobs={this.props.savedJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} relevantNotes={this.relevantNotes} editJob={this.props.editJob} addJob={this.props.addJob}  addNewNote={this.props.addNewNote} editNote={this.editNote} renderedJob={this.props.renderedJob} renderedCompany={this.props.renderedCompany} /> } />

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
    savedNotes: state.user.savedNotes,
    savedBookmarks: state.user.savedBookmarks,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
