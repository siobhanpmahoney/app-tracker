import React from 'react'
import CompanyFilter from './CompanyFilter'
import CompanySearchResultList from './CompanySearchResultList'

class ExploreCompanyContainer extends React.Component{
  constructor() {
    super()

    this.state = {
      industrySelection: [],
      locationSelection: [],
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

   handleCompanySearchSubmit = (event) => {
     event.preventDefault()
     let industrySearch=this.state.industrySelection.join("&industry=")
     let locationSearch=this.state.locationSelection.join("&location=")
     let searchUrl = "https://api-v2.themuse.com/companies?industry=" + industrySearch + "&location=" + locationSearch + "&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1"
     fetch(searchUrl)
     .then(results => results.json())
     .then(json => this.setState({
       companySearchResults: json.results
     }))
   }



   render() {
     console.log(this.state)
     return (
       <div>
       <h2>Search for a Company!</h2>
         <CompanyFilter industrySelectListener={this.industrySelectListener}
          handleCompanySearchSubmit={this.handleCompanySearchSubmit}
          industrySelection={this.state.industrySelection} locationSelectListener={this.locationSelectListener} />

        <CompanySearchResultList companySearchResults={this.state.companySearchResults} />
       </div>
     )
   }


}

export default ExploreCompanyContainer
