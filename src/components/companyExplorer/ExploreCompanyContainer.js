import React from 'react'
import CompanyFilter from './CompanyFilter'
import CompanySearchResultList from './CompanySearchResultList'
import { HashRouter } from 'react-router-dom'

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class ExploreCompanyContainer extends React.Component{
  constructor() {
    super()

    this.state = {
      industrySelection: [],
      locationSelection: [],
      sizeSelection: [],
      companySearchResults: [],
      jobSearchVal: "",
    }
  }

  industrySelectListener = (event) => {
    let industryPicks = this.state.industrySelection.slice()
    let industry=event.target.value
    if (event.target.checked) {
      industryPicks.push(industry)
    } else {
      industryPicks.splice(industryPicks.indexOf(industry), 1)
    }

    this.setState({
      industrySelection: industryPicks
    })

  }

  locationSelectListener = (event) => {

    let locationPicks = this.state.locationSelection.slice()
    let location=event.target.value
    if (event.target.checked) {
      locationPicks.push(location)
    } else {
      locationPicks.splice(locationPicks.indexOf(location), 1)
    }
    this.setState({
      locationSelection: locationPicks
    })
  }

  sizeSelectListener = (event) => {
    let sizePicks = this.state.sizeSelection.slice()
    let size=event.target.value
    if (event.target.checked) {
      sizePicks.push(size)
    } else {
      sizePicks.splice(sizePicks.indexOf(size), 1)
    }

    this.setState({
      sizeSelection: sizePicks
    })

  }

   handleCompanySearchSubmit = (event) => {
     event.preventDefault()

     let industrySearch=""
     let locationSearch=""
     let sizeSearch =""
     let searchUrl=""


    if (this.state.industrySelection.length > 0) {
      industrySearch="&industry=" + this.state.industrySelection.join("&industry=")
    }

    if (this.state.locationSelection.length > 0) {
      locationSearch="&location=" + this.state.locationSelection.join("&location=")
    }

    if (this.state.sizeSelection.length > 0) {
      sizeSearch="&size=" + this.state.sizeSelection.join("&size=")
    }


    searchUrl = "https://api-v2.themuse.com/companies?" + industrySearch +  locationSearch + sizeSearch + "&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1"

     fetch(searchUrl)
     .then(results => results.json())
     .then(json => this.setState({
       companySearchResults: json.results
     }));

   }



   render() {
     console.log(this.state)
     return (
       <div>
       <h2>Search for a Company!</h2>
       <div>
         <CompanyFilter industrySelectListener={this.industrySelectListener}
          handleCompanySearchSubmit={this.handleCompanySearchSubmit}
          industrySelection={this.state.industrySelection} locationSelectListener={this.locationSelectListener} sizeSelectListener={this.sizeSelectListener}/>
        </div>

        <div className="companySearchResults" >
          <CompanySearchResultList companySearchResults={this.state.companySearchResults} />
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

export default connect(mapStateToProps, mapDispatchToProps)(ExploreCompanyContainer);
