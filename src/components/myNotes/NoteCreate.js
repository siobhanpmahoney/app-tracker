import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class NoteCreate extends React.Component {
  render() {
    return (
      <div className="newNoteForm">
      <form>
      <button onClick={this.props.addTestNewNote}>Save</button><textarea className="noteTitle" name="title"  type="contentEditable" onChange={this.props.noteEditListener}>
        </textarea>

      <textarea className="noteContent" name="content"  type="contentEditable" onChange={this.props.noteEditListener}>
      </textarea>

      </form>
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
    savedBookmarks: state.user.savedBookmarks,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(NoteCreate);
