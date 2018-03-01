import React from 'react'
import { HashRouter } from 'react-router-dom'
import JobDescription from '../jobExplorer/JobDescription'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class MyJobsItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: null,
      company: [],

    }
  }

  componentDidMount() {
    let url = "http://localhost:3000/api/v1/users/1/jobs/" + this.props.jobId
     fetch(url)
    .then(response => response.json())
    .then(json => {
      this.setState({
        job: json,
        company: json.company
      });
    //   fetch(`https://api-v2.themuse.com/companies/${json.company.id}`)
    //     .then(r => r.json())
    //     .then(thisJson => this.setState({
    //       company: thisJson
    //     }));
    });
  }

  contents = () => {
    return {
      __html: this.state.job.contents
    };
  }


// twitterhandle = () => {
//   return "https://twitter.com/" + this.props.company.twitter
// }
//
// twitter = () => {
//    return `<a href={this.twitterhandle()}
//     className="twitter-follow-button"
//     data-show-count="false"
//     data-show-screen-name="false"
//   >
//   </a>`
// };
formattedDate = () => {
  let pubDate = new Date(this.state.job.date_saved)
  return pubDate.toLocaleDateString()
}

deleteJob = () => {
  this.setState({
    saved: false
  })
  window.location = '/myjobs'
  this.props.deleteJob(this.props.jobId)
}

handleEditsSubmit = (event) => {
  event.preventDefault()
  this.props.editJob(this.state.job)
}

editListener = (event) => {
  let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
  let name = event.target.name
  let currentJobState = Object.assign({}, this.state.job)
  console.log(currentJobState)
  currentJobState[name] = value
  console.log(currentJobState)

  this.setState({
    job: currentJobState
  })
}

  render() {

    if (!this.state.job) {
      return <div>Loading</div>;
    }
    console.log(this.state)

    return (
      <div className="myJobDetail">
        <h2>{this.state.job.title}</h2>
        <h3 className="myJobDetailCompanyName">{this.state.company.name}</h3>

       <div className="myJobDetailDashboard">
         <p><label>Date Saved: <input type="text" value={this.formattedDate()} readOnly /></label></p>

         <p><label>Applied?<input type="checkbox" name="applied_status" checked={this.state.job.applied_status} onChange={this.editListener} /></label></p>

         <p><label>Date Applied: <input type="contentEditable" name="date_applied" onChange={this.editListener} value={this.state.job.date_applied}/></label></p>

        <button onClick={this.handleEditsSubmit}>Save Updates</button>

        <button onClick={this.deleteJob}  > Delete</button>

       </div>

       <div className="myJobInfoAndNotes">

          <div className="myJobDetailSavedInfo">

          <details>
            <summary>Job Description</summary>
             <div dangerouslySetInnerHTML={this.contents()}></div>
          </details>

          <details>
            <summary>Company Details</summary>
          </details>
          </div>

          <div className="myJobDetailNote">
          <form>
              <textarea className="noteTitle">
              </textarea>

            <textarea className="noteContent">
            </textarea>
          </form>
          </div>

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
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsItemDetail);
