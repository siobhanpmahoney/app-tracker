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
    let filterName = event.target.name
    let filterValue = event.target.type === 'checkbox' ? event.target.checked : event.target.value
    let currentState = Object.assign({},
      this.state.filterSelection
    );
    if (event.target.value != '') {
      currentState[filterName] = filterValue
    } else {
      delete currentState[filterName];
    }
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
      })
      console.log(jobs)
      return jobs
    }
  }


  render() {
    console.log("in render")
    console.log(this.state)
    const displayJobs = this.showJobs()
    console.log(displayJobs)
    return(
      <div className="mySavedJobList">
        <h2>Saved Jobs</h2>

        <div className="filters" style={{float:"left", padding:"1em"}}>

          <h4>Filter by... </h4>
          <span className="industryFilter" style={{padding:"1em"}}>
          <label style={{paddingRight:"1em"}}>Industry: <select name="company_industry" onChange={this.filterSelect}>
              <option value=''>All</option>
            {this.props.savedIndustries.map((industry) => {
              return <option value={industry.name} name="company_industry">{industry.name}</option>
            })}
            </select>

          </label>
          </span>

          <span className="appliedStatus">
            <label style={{paddingRight:"1em"}}>Applied? <input type="checkbox" name="applied_status" onChange={this.filterSelect} /></label>

          </span>
        </div>

        <div style={{clear:"both"}}>
        <MyJobsList user = {this.props.user} savedJobs={displayJobs} savedCompanies={this.props.savedCompanies} savedNotes={this.props.savedNotes} loadSavedJob={this.props.loadSavedJob} />
        </div>
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
