import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MyJobsItemDetail from './MyJobsItemDetail'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'


class MyJobsItem extends React.Component {
  constructor(props) {
    super(props)

  }

  jobCompany = () => {
    let company = this.props.user.companies.find((c) => {
      return c.museId == this.props.job.company_museId
    })
    return company.name
  }

  formattedSavedDate = () => {
    let dateSaved = new Date(this.props.job.date_saved)
    return dateSaved.toLocaleDateString()
  }

  render() {
    console.log(this.props)
    return(
      <div className="mySavedJob" style={{backgroundColor:"white"}}>
        <Link to={`/myjobs/${this.props.job.id}`}
          job={this.props.job} loadSavedJob={this.props.loadSavedJob}  ><h3>{this.props.job.title}</h3></Link>

        <h4>{this.props.job.company_name}</h4>
        <div className="dateSaved">Date saved: {this.formattedSavedDate()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsItem)
