import React from 'react'
import MyJobsList from './MyJobsList'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import {BrowserRouter as Router, Route, Switch, Redirect, NavLink, Link, withRouter, HashRouter} from 'react-router-dom';


class MyJobsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      filterSelection: {},
      sortSelection: null
    }
  }



  filterSelect = (event) => {
    event.preventDefault()
    let filterName = event.target.name
    let filterValue = event.target.value
    let currentState = this.state.filterSelection
    currentState[filterName] = filterValue
    this.setState({
      filterSelection: currentState
    })
  }

  showJobs = () => {
    if (this.state.filterSelection == {}) {
      return this.props.savedJobs
    } else {
      let filters = Object.keys(this.state.filterSelection)
      let jobs = this.props.savedJobs.slice(0)
      filters.forEach((f) => {
        jobs = jobs.filter((job) => job[f] == this.state.filterSelection[f])
        return jobs
      })
      console.log(jobs)
      return jobs
    }
  }


  render() {
    console.log(this.state)
    const displayJobs = this.showJobs()
    console.log(displayJobs)
    return(
      <div className="mySavedJobList">
        <h2>Saved Jobs</h2>

        <div className="industryFilter">
          <h4>Filter by... </h4>
          <label>Industry
            <select name="company_industry" onChange={this.filterSelect}>
              <option value=''>Select...</option>
            {this.props.savedIndustries.map((industry) => {
              return <option value={industry.name} name="company_industry">{industry.name}</option>
            })}
            </select>
            <input type="submit" onClick={this.showJobs} value="filter" />
          </label>
        </div>


        <MyJobsList user = {this.props.user} savedJobs={displayJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} loadSavedJob={this.props.loadSavedJob} />
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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsContainer);
