import React from 'react'
import JobDescription from '../jobExplorer/JobDescription'

class MyJobsItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: [],
      company: []
    }
  }

  componentDidMount() {
    fetch(`https://api-v2.themuse.com/jobs/${this.props.jobId}`)
    .then(response => response.json())
    .then(json => {
      this.setState({
        job: json
      });
      fetch(`https://api-v2.themuse.com/companies/${json.company.id}`)
        .then(r => r.json())
        .then(thisJson => this.setState({
          company: thisJson
        }));
    });
  }

twitterhandle = () => {
  return "https://twitter.com/" + this.state.company.twitter
}

twitter = () => {
   return `<a href={this.twitterhandle()}
    className="twitter-follow-button"
    data-show-count="false"
    data-show-screen-name="false"
  >
  </a>`
};

  render() {
    console.log(this.props)
    let th = "https://twitter.com/" + this.state.company.twitter + "?ref_src=twsrc%5Etfw"


    if (!this.state.job) {
      return <div>Loading</div>;
    }
    return (
      <div className="myJobDetail">

       <div className="myJobDetailDashboard">

       </div>

       <div className="myJobInfoAndNotes">

          <div className="myJobDetailSavedInfo">
          <details>
            <summary>Job Description</summary>
            <JobDescription jobId={this.props.jobId} job={this.state.job} savedJobs={this.props.savedJobs}/>
          </details>
          <details>
            <summary>Company Details</summary>
            {this.twitter}
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

export default MyJobsItemDetail
