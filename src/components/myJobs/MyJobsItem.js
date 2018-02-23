import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MyJobsItemDetail from './MyJobsItemDetail'

class MyJobsItem extends React.Component {
  constructor(props) {
    super(props)

  }



  render() {
    console.log(this.props.job)
    return(
      <div className="mySavedJob">
        <Link to={`/myjobs/${this.props.job.museId}`} job={this.props.job}>{this.props.job.title}</Link>
      </div>
    )
  }
}

export default MyJobsItem
