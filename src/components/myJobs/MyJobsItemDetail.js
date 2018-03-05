import React from 'react'
import { HashRouter } from 'react-router-dom'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class MyJobsItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: null,
      company: [],
      notes: [],
      displayNote: {}
    }
  }

  componentDidMount() {
    console.log("mounting my job item details")
    let url = "http://localhost:3000/api/v1/users/1/jobs/" + this.props.jobId
     fetch(url)
    .then(response => response.json())
    .then(json => {
      this.setState({
        job: json,
        company: json.company,
        notes: json.notes.sort((a,b) => b.id - a.id),
        // displayNote: json.notes[json.notes.length -1]
      });
    //   fetch(`https://api-v2.themuse.com/companies/${json.company.id}`)
    //     .then(r => r.json())
    //     .then(thisJson => this.setState({
    //       company: thisJson
    //     }));
    });
    // let notes = json.notes.filter((note) => note.job_id === json.id)

  }

  contents = () => {
    return {
      __html: this.state.job.contents
    };
  }



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

dashboardListener = (event) => {
  let value = event.target.type === 'checkbox' ? event.target.checked : event.target.value
  let name = event.target.name
  let currentJobState = Object.assign({}, this.state.job)
  currentJobState[name] = value
  this.setState({
    job: currentJobState
  })
}

dashboardEditSubmit = (event) => {
  event.preventDefault()
  window.location = `/myjobs/${this.props.jobId}`
  this.props.editJob(this.state.job)
}


displayNote = (event) => {
  let selectedNote = this.state.notes.find((note) => note.id == event.target.id)
  this.setState({
    displayNote: selectedNote
  })
}

noteEditListener = (event) => {
  let value = event.target.value
  let name = event.target.name
  let currentNoteState = Object.assign({}, this.state.displayNote)
  currentNoteState[name] = value
  this.setState({
    displayNote: currentNoteState
  })
}

// (selectedNote, noteUserId, noteJobId, noteCompanyId)

noteEditSubmit = (event) => {
  event.preventDefault()
  window.location = `/myjobs/${this.props.jobId}`
  this.props.editNote(this.state.displayNote, this.props.currentUser.user.id, this.state.job.id, this.state.company.id)
}

  render() {
    console.log('rerendering')
    console.log(this.state)
    if (!this.state.job) {
      return <div>Loading</div>;
    }
    // console.log(this.state)

    return (
      <div className="myJobDetail">
        <h2>{this.state.job.title}</h2>
        <h3 className="myJobDetailCompanyName">{this.state.company.name}</h3>

       <div className="myJobDetailDashboard">
         <p><label>Date Saved: <input type="text" value={this.formattedDate()} readOnly /></label></p>

         <p><label>Applied?<input type="checkbox" name="applied_status" checked={this.state.job.applied_status} onChange={this.dashboardListener} /></label></p>

         <p><label>Date Applied: <input type="contentEditable" name="date_applied" onChange={this.dashboardListener} value={this.state.job.date_applied}/></label></p>

        <button onClick={this.dashboardEditSubmit}>Save Updates</button>

        <button onClick={this.deleteJob}> Delete</button>

       </div>

       <div className="myJobInfoAndNotes">

          <div className="myJobDetailSavedInfo">

          <details>
            <summary>Job Description</summary>
             <div dangerouslySetInnerHTML={this.contents()}></div>
          </details>





          <div className = "notes">
            <h2>Notes</h2>
              {this.state.notes.map((note) => {
                return <div className="noteTitleList" id={note.id} onClick={this.displayNote}>
                  {note.title}

                  <button className="openButton"><i className="material-icons" style={{fontSize:"15px"}}>launch</i></button>
              </div>
              })}
          </div>

          </div>

          <div className="myJobDetailNote">
          <form>
          <button onClick={this.noteEditSubmit}>Save</button><textarea className="noteTitle" name="title" value={this.state.displayNote.title} type="contentEditable" onChange={this.noteEditListener}>
            </textarea>

          <textarea className="noteContent" name="content" value={this.state.displayNote.content} type="contentEditable" onChange={this.noteEditListener}>
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
    savedNotes: state.user.savedNotes
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsItemDetail);
