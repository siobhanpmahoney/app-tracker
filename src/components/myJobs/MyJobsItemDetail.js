import React from 'react'
import { HashRouter } from 'react-router-dom'
import { withRouter } from 'react-router'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import NotesContainer from '../myNotes/NotesContainer'
import NoteCreate from '../myNotes/NoteCreate'
import BookmarkList from '../myBookmarks/BookmarkList'

class MyJobsItemDetail extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      job: null,
      company: [],
      notes: [],
      bookmarks: [],
      displayNote: {},
      noteStatusNew: false
    }
  }

  componentDidMount() {
    console.log("mounting my job item details")
    let url = "http://localhost:3000/api/v1/users/1/jobs/" + this.props.jobId
     fetch(url)
    .then(response => response.json())
    .then(json => {
      this.setState({
        job: this.props.savedJobs.find((job) => job.id == this.props.jobId),
        // company: this.props.savedCompanies.find((company) => company.id == this.props.job.company_id),
        company: json.company,
        notes: this.props.savedNotes.filter((note) =>  note.company_id == json.company.id),
        // notes: json.notes.sort((a,b) => b.id - a.id),
        bookmarks: json.bookmarks,
        displayNote: json.notes[json.notes.length -1]
      });
    //   fetch(`https://api-v2.themuse.com/companies/${json.company.id}`)
    //     .then(r => r.json())
    //     .then(thisJson => this.setState({
    //       company: thisJson
    //     }));
    })
    ;
    // let notes = json.notes.filter((note) => note.job_id === json.id)

  }

  contents = () => {
    return {
      __html: this.props.job.contents
    };
  }

// };
formattedDate = () => {
  let pubDate = new Date(this.props.job.date_saved)
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

  let currentJobState = this.props.job
  currentJobState[name] = value
  this.setState({
    job: currentJobState
  })
}

dashboardEditSubmit = (event) => {
  event.preventDefault()
  window.location = `/myjobs/${this.props.jobId}`
  this.props.editJob(this.props.job)
}

renderNewNoteForm = (event) => {
  event.preventDefault()
  console.log("made it to renderNewNoteForm")
  let clearDisplayNote = {}
  this.setState({
    displayNote: clearDisplayNote,
    noteStatusNew: true
  })
}

noteTypeRender = () => {
  console.log("in noteType Render")
  if (this.state.noteStatusNew) {
    return (
      <div className="newNoteForm">
        <NoteCreate noteEditSubmit={this.noteEditSubmit} noteEditListener={this.noteEditListener} addTestNewNote={this.addTestNewNote}/>
      </div>
    )
  } else {
    return (
      <div>
      <form>
      <button onClick={this.noteEditSubmit}>Save</button><textarea className="noteTitle" name="title" value={this.state.displayNote.title} type="contentEditable" onChange={this.noteEditListener}>
        </textarea>

      <textarea className="noteContent" name="content" value={this.state.displayNote.content} type="contentEditable" onChange={this.noteEditListener}>
      </textarea>

      </form>
      </div>
    )
  }
}

addTestNewNote = (event) => {
  event.preventDefault()

  console.log("adding new?")
  console.log(this.state.displayNote, this.props.currentUser.id, this.state.company.id, this.props.job.id)
  this.props.addNewNote(this.state.displayNote, this.props.currentUser.user.id, this.state.company.id, this.props.job.id)
}


displayNote = (event) => {

  event.preventDefault()
  let selectedNote = this.relevantNotes().find((note) => note.id == event.target.id)
  this.setState({
    displayNote: selectedNote,
    noteStatusNew: false
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
  this.props.editNote(this.state.displayNote, this.props.currentUser.user.id, this.props.job.id, this.state.company.id)
}

relevantNotes = () => {
  return this.props.savedNotes.filter((note) => {
    return note.company_id == this.props.company.id
  })
}

relevantBookmarks = () => {
  return this.props.savedBookmarks.filter((bookmark) => {
    return bookmark.company_id == this.props.company.id
  })
}

  render() {

    if (!this.props.job) {
      return <div>Loading</div>;
    }
    const relevantNotes = this.relevantNotes()
    const relevantBookmarks = this.relevantBookmarks()
    return (
      <div className="myJobDetail">
        <h2>{this.props.job.title}</h2>
        <h3 className="myJobDetailCompanyName">{this.state.company.name}</h3>

       <div className="myJobDetailDashboard">
         <p><label>Date Saved: <input type="text" value={this.formattedDate()} readOnly /></label></p>

         <p><label>Applied?<input type="checkbox" name="applied_status" checked={this.props.job.applied_status} onChange={this.dashboardListener} /></label></p>

         <p><label>Date Applied: <input type="contentEditable" name="date_applied" onChange={this.dashboardListener} value={this.props.job.date_applied}/></label></p>

         <p><label>Response Date:<input type="contentEditable" name="response_date" onChange={this.dashboardListener} value={this.props.job.date_applied}/></label></p>

         <p><label>Interview Invite?<input type="checkbox" name="interview_invite" checked={this.props.job.applied_status} onChange={this.dashboardListener} /></label></p>

         <h4>Interviews</h4>
         <p><b>First Round:</b></p>
         <label>Interview Date:<input type="contentEditable" name="interview_1_date" onChange={this.dashboardListener} value={this.props.job.date_applied}/></label><br />
         <label>Interview Type:<input type="contentEditable" name="interview_1_type" onChange={this.dashboardListener} value={this.props.job.date_applied}/></label>

        <p><b>Second Round:</b></p>
        <label>Interview Date:<input type="contentEditable" name="interview_2_date" onChange={this.dashboardListener} value={this.props.job.date_applied}/></label><br />
        <label>Interview Type:<input type="contentEditable" name="interview_2_type" onChange={this.dashboardListener} value={this.props.job.date_applied}/></label>





        <button onClick={this.dashboardEditSubmit}>Save Updates</button>

        <button onClick={this.deleteJob}> Delete</button>

       </div>

       <div className="myJobInfoAndNotes">

          <div className="myJobDetailSavedInfo">
          <details>
            <summary>Job Description</summary>
             <div dangerouslySetInnerHTML={this.contents()}></div>
          </details>

          <div classname="bookmarks">
            <h2>Bookmarks</h2>
            <BookmarkList bookmarks={relevantBookmarks}/>

          </div>


          <div className = "notes">
            <h2>Notes <button onClick={this.renderNewNoteForm}>+</button></h2>

              {relevantNotes.map((note) => {
                return <div className="noteTitleList" id={note.id} onClick={this.displayNote}>
                  {note.title}

                  <button className="openButton"><i className="material-icons" style={{fontSize:"15px"}}>launch</i></button>
              </div>
              })}

          </div>

          </div>

          <div className="myJobDetailNote">
            {this.noteTypeRender()}
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
    savedNotes: state.user.savedNotes,
    savedBookmarks: state.user.savedBookmarks
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsItemDetail);
