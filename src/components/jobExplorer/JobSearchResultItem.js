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
    console.log("in saveJob")
    event.preventDefault()
    this.props.addToSavedJobs(this.props.job)
    console.log(this.props)
  }

  dynamicIcon = () => {
    console.log("in dynamicicon")
    if (this.props.savedJobs.includes(this.props.job)) {
       return (<i className="material-icons" style={{color:"blue"}}>bookmark</i>)
    } else {
       return (<i class="material-icons" onClick={this.saveJob} style={{color:"blue"}}>bookmark_border</i>)
    }
  }

  render() {

    // console.log(this.props.savedJobs.includes(this.props.job))
    return (
      <div className="jobSearchResultItem">
        {this.dynamicIcon()}
        <h4>{this.props.job.name}</h4>
        <div className="jobSearchResultCompany">{this.props.job.company.name}</div>
        <div className="jobSearchResultLocation">{this.renderCategoryList()}</div>
        <div className="jobSearchResultLevel">{this.renderLocationList()}</div>
        <button className="learnMore">Learn More</button>
        <Link to={`/jobs/${this.props.job.id}`} props={this.props}>Read More</Link>
      </div>
    )
  }
}

export default JobSearchResultItem
