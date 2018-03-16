import React from 'react'
import MyJobsItem from './MyJobsItem'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter, HashRouter} from 'react-router-dom';




const MyJobsList = ({user, savedJobs, savedCompanies, savedNotes, loadSavedJob}) => {
  console.log(savedJobs)
  return (

    <div className="myJobList">

{savedJobs.map((j) => {
  return <div><MyJobsItem job={j} key={j.id} user = {user} savedJobs={savedJobs} savedCompanies={savedCompanies} savedNotes={savedNotes} /></div>
})}

    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsList);
