import React from 'react'
import MyJobsList from './MyJobsList'

class MyJobsContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      savedJobs: []
    }
  }

  render() {

    return(
      <div className="mySavedJobList">
        <MyJobsList user = {this.props.user} savedJobs={this.props.savedJobs}/>
      </div>
    )
  }
}

export default MyJobsContainer
