import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { HashRouter, Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import * as Actions from '../../actions'
import MyCompanyListItem from './MyCompanyListItem'
import MyCompanyDetail from './MyCompanyDetail'


class MyCompanyContainer extends React.Component {

  constructor(props) {
    super(props)

    this.state = {
      displayedCompany: null
    }
  }

  loadCompanyDetail = (event) => {
    let coId = event.target.id
    let selectedCompany = this.props.savedCompanies.find((company) => {
      return company.id == coId
    })
    this.setState({
      displayedCompany: selectedCompany
    })
  }



  render() {
    if (!this.props.savedCompanies) {
      return <div>Loading...</div>
    }
    console.log(this.props)
    return (
      <div>
        <h1>Saved Companies</h1>
        <div className="myCompanyList">
          {this.props.savedCompanies.map((company) => {
            return <div className="myCompanyListItem">  <Link to={`/mycompanies/${company.id}`} key={company.id} onClick={this.loadCompanyDetail}>
              {company.name}</Link>
            </div>
          })}
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

export default connect(mapStateToProps, mapDispatchToProps)(MyCompanyContainer);
