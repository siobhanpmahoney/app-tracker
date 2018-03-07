import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import JobDescription from './JobDescription'


class JobSearchResultItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderCategoryList = () => {
    let categories = this.props.job.categories.map((i) => {
      return i.name
    })
    return categories.join(" | ")
  }

  renderLocationList = () => {
    let locations = this.props.job.locations.map((i) => {
      return i.name
    })
    return locations.join(" | ")
  }

  saveJob = (event) => {

    event.preventDefault()
    this.props.addToSavedJobs(this.props.job)

  }

  dynamicIcon = () => {
  

    if (this.props.savedJobs.length < 1) {
      return (<i className="material-icons" onClick={this.saveJob} style={{color:"blue"}}>bookmark_border</i>)
    } else {
      if (this.props.savedJobs.find((job) => {
        return job.museId == this.props.job.id
      })) {
        return (<i className="material-icons" style={{color:"blue", fontSize:"100%"}}>bookmark</i>)
      }
      else {
        return (<i className="material-icons" onClick={this.saveJob} style={{color:"blue"}}>bookmark_border</i>)
      }}
    }

  render() {

    return (
      <div className="jobSearchResultItem">
        {this.dynamicIcon()}
        <h4>{this.props.job.name}</h4>
        <div className="jobSearchResultCompany">{this.props.job.company.name}</div>
        <div className="jobSearchResultLocation">{this.renderCategoryList()}</div>
        <div className="jobSearchResultLevel">{this.renderLocationList()}</div>

        <Link to={`/search/jobs/${this.props.museJobId}`} props={this.props}>Read More</Link>
      </div>
    )
  }
}

export default JobSearchResultItem
