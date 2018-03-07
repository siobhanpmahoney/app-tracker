import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class MyJobsDetailDashboard extends React.Component {

  render() {
    return (
      <div className="myJobDetailDashboard">
      <p><label>Date Saved: <input type="text" value={this.props.formattedDate} readOnly /></label></p>

      <p><label>Applied?<input type="checkbox" name="applied_status" checked={this.props.job.applied_status} onChange={this.props.dashboardListener} /></label></p>

      <p><label>Date Applied: <input type="text" name="date_applied" onChange={this.props.dashboardListener} value={this.props.job.date_applied}/></label></p>

      <p><label>Interview Invite?<input type="checkbox" name="interview_invite" checked={this.props.job.interview_invite} onChange={this.props.dashboardListener} /></label></p>

      <h4>Interviews</h4>
      <p><b>First Round:</b></p>
      <label>Interview Date:<input type="text" name="interview_1_date" onChange={this.dashboardListener} value={this.props.job.interview_1_date}/></label><br />
      <label>Interview Type:<input type="text" name="interview_1_type" onChange={this.dashboardListener} value={this.props.interview_1_type}/></label>

      <p><b>Second Round:</b></p>
      <label>Interview Date:<input type="text" name="interview_2_date" onChange={this.dashboardListener} value={this.props.job.interview_2_date}/></label><br />
      <label>Interview Type:<input type="text" name="interview_2_type" onChange={this.dashboardListener} value={this.props.job.interview_2_type}/></label>

      <button onClick={this.props.dashboardEditSubmit}>Save Updates</button>



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

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsDetailDashboard);
