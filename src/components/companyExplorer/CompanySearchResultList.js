import React from 'react'
import CompanySearchResultItem from './CompanySearchResultItem'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'


const CompanySearchResultList = ({companySearchResults}) => {
  return(
    <div className="companySearchResults">
      {companySearchResults.map((company) => {
        return <CompanySearchResultItem company={company} key={company.id} />
      })}
    </div>
  )
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

export default connect(mapStateToProps, mapDispatchToProps)(CompanySearchResultList);
