import React from 'react'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'

class Profile extends React.Component {

  render() {

    return (
      <div>
        <h1>Welcome back</h1>
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

export default connect(mapStateToProps, mapDispatchToProps)(Profile);
