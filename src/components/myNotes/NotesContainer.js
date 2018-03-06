// import React from 'react'
// import { bindActionCreators } from 'redux';
// import { connect } from 'react-redux';
// import * as Actions from '../../actions'
// import NotesList from './NotesList'
//
// //  "all notes route"
// //  will pass all notes to noteList as prop
// //  noteList will have relevantCompanies, relevantJobs, relevantNotes
//
// class NotesContainer extends React.Component {
//   constructor(props) {
//     super(props)
//
//     this.state = {
//       displayedNote: {}
//     }
//   }
//
// displayNote = (event) => {
//   let selectedNote = this.props.relevantNotes.find((note) => note.id == event.target.id)
//   this.setState({
//     displayNote: selectedNote
//   })
// }
//
// noteEditListener = (event) => {
//   let value = event.target.value
//   let name = event.target.name
//   let currentNoteState = Object.assign({}, this.state.displayNote)
//   currentNoteState[name] = value
//   this.setState({
//     displayNote: currentNoteState
//   })
// }
//
// noteEditSubmit = (event) => {
//   event.preventDefault()
//   window.location = `/myjobs/${this.props.jobId}`
//   this.props.editNote(this.state.displayNote, this.props.currentUser.user.id, this.state.job.id, this.state.company.id)
// }
//
//   render() {
//     console.log(this.props)
//     return (
//       <div>
//       </div>
//     )
//   }
// }
//
//
// function mapStateToProps(state, props) {
//   return {
//     currentUser: state.user.currentUser,
//     savedJobs: state.user.savedJobs,
//     savedCompanies: state.user.savedCompanies,
//     savedNotes: state.user.savedNotes
//   }
// }
//
// function mapDispatchToProps(dispatch) {
//   return bindActionCreators(Actions, dispatch);
// }
//
// export default connect(mapStateToProps, mapDispatchToProps)(NotesContainer);
