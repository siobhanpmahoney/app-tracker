import React from 'react'
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import MyJobsItemDetail from './MyJobsItemDetail'

class MyJobsItem extends React.Component {
  constructor(props) {
    super(props)

  }

  formattedSavedDate = () => {
    let dateSaved = new Date(this.props.job.date_saved)
    return dateSaved.toLocaleDateString()
  }



  render() {

    return(
      <div className="mySavedJob">
        <Link to={`/myjobs/${this.props.job.museId}`} job={this.props.job}><h3>{this.props.job.title}</h3></Link>

        <div className="dateSaved">Date saved: {this.formattedSavedDate()}</div>
      </div>
    )
  }
}

export default MyJobsItem
