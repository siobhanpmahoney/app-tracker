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
      <div className="mySavedJob" style={{background:"white", color:"#3A4A4D", fontSize:"13.5px", style:"inlineBlock", margin:"1em"}}>
        <div style={{background:"#333F4A", margin:"-.25em"}}>
        <span style={{fontSize:"14px", fontWeight: "600", display:"block", padding:"0.5em", color:"white", fontFamily:"Avenir"}}>{this.props.job.company_name}</span>
        </div>
        <div style={{paddingTop:"0.5em"}}>
        <Link to={`/myjobs/${this.props.job.id}`}
          job={this.props.job} loadSavedJob={this.props.loadSavedJob}  >  <span className="jobSearchResultCompany" style={{fontWeight:"500"}}>{this.props.job.title}</span> </Link>

        <div className="dateSaved">Date saved: {this.formattedSavedDate()}</div>
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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsItem)
