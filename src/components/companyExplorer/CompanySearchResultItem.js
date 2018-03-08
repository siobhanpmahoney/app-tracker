import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import {BrowserRouter as Router, Link, Route, Switch} from 'react-router-dom';
import * as Actions from '../../actions'
import CompanyDetail from './CompanyDetail'


class CompanySearchResultItem extends React.Component {
  constructor(props) {
    super(props)
  }

  renderIndustryList = () => {
    let industries = this.props.company.industries.map((i) => {
      return i.name
    })
    return industries.join(" | ")
  }

  renderLocationList = () => {
    let locations = this.props.company.locations.map((i) => {
      return i.name
    })
    return locations.join(" | ")
  }

  render() {
    console.log(this.props)
    return (
      <div>

      <div className="companySearchResultCard">


        {this.props.company.refs &&
          <img src={this.props.company.refs.f1_image} style={{width:"350px"}} />
        }
          <h4>{this.props.company.name}</h4>
        <div className="location">{this.renderIndustryList()}</div>
        <div className="industryList">{this.renderLocationList()}</div>
        <Link to={`/search/companies/${this.props.company.id}`} company={this.props.company} museCompanyId={this.props.company.id}>Read More</Link>


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
    savedBookmarks: state.user.savedBookmarks,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(CompanySearchResultItem);
