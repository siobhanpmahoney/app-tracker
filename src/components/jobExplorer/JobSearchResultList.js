import React from 'react'
import JobSearchResultItem from './JobSearchResultItem'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

const JobSearchResultList = ({jobSearchResults, savedJobs, addToSavedJobs}) => {

  return(
    <div className="jobSearchResultList">
      {jobSearchResults.map((j) => {
        return <JobSearchResultItem job={j} key={j.id} savedJobs={savedJobs} addToSavedJobs={addToSavedJobs} museJobId={j.id} />
      })}
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(JobSearchResultList);
