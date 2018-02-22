import React from 'react'
import MyJobsList from './MyJobsList'

class MyJobsContainer extends React.Component {
  constructor(props) {
    super(props)


  }

  render() {
    console.log(this.props.savedJobs)
    return(
      <div className="mySavedJobList">
        <MyJobsList savedJobs={this.props.savedJobs}/>
      </div>
    )
  }
}

export default MyJobsContainer
