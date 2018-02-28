import React from 'react'
import JobDescription from '../jobExplorer/JobDescription'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class MyJobsItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: [],
      company: []
    }
  }

  componentDidMount() {
    console.log(this.props);
    let url = "http://localhost:3000/api/v1/users/1/jobs/" + this.props.jobId
    console.log(url)

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


  render() {

    if (!this.state.job) {
      return <div>Loading</div>;
    }
    console.log(this.state)
    console.log(this.props)

    return (
      <div className="myJobDetail">
        <h2>{this.state.job.title}</h2>
        <h3 className="myJobDetailCompanyName">{this.state.company.name}</h3>
       <div className="myJobDetailDashboard">
         <p><label>Date Saved: <input type="text" value={this.formattedDate()} readOnly />
         </label></p>
       <p><label>Applied?<input type="checkbox" />
       </label></p>
     <p><label>Date Applied: <input type="contentEditable" placeholderText={this.state.job.date_applied}/>
     </label></p>
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
