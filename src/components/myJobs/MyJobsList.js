import React from 'react'
import MyJobsItem from './MyJobsItem'
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


export default MyJobsList;
