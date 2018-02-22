import React from 'react'
import JobFilter from './JobFilter'
import JobSearchResultList from './JobSearchResultList'

class JobExploreContainer extends React.Component {
    constructor(props) {
      super(props)

      this.state = {
        categorySelection: [],
        levelSelection: [],
        locationSelection: [],
        jobSearchResults: []
      }
    }

    categorySelectListener = (event) => {
      let categoryPicks = this.state.categorySelection.slice()
      let category=event.target.value
      if (event.target.checked) {
        categoryPicks.push(category)
      } else {
        categoryPicks.splice(categoryPicks.indexOf(category), 1)
      }

      this.setState({
        categorySelection: categoryPicks
      })

    }

    levelSelectListener = (event) => {
      let levelPicks = this.state.levelSelection.slice()
      let level=event.target.value
      if (event.target.checked) {
        levelPicks.push(level)
      } else {
        levelPicks.splice(levelPicks.indexOf(level), 1)
      }

      this.setState({
        levelSelection: levelPicks
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

    handleJobSearchSubmit = (event) => {
      event.preventDefault()
      let categories = ""
      let levels = ""
      let locations = ""
      if (this.state.categorySelection.length > 0) {
        categories = "&category=" + this.state.categorySelection.join("&category=")
      }
      if (this.state.levelSelection.length > 0) {
        levels = "&level=" + this.state.levelSelection.join("&level=")
      }
      if (this.state.locationSelection.length > 0) {
        locations = "&location=" + this.state.locationSelection.join("&location=")
      }

      let currentResults = this.state.jobSearchResults.slice()

      for(let i=0; i<6; i++) {

        
        let jobUrl = "https://api-v2.themuse.com/jobs?" + categories + levels + locations + "&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=" + i
        fetch(jobUrl)
        .then(response => response.json())
        .then(json => json.results.map((res) => currentResults.push(res)))
      }
      this.setState({
        jobSearchResults: currentResults
      })

    }

    render() {
      console.log(this.props)
      return (
      <div>
      <h2>Search for a Job!</h2>

      <JobFilter categorySelectListener={this.categorySelectListener} levelSelectListener = {this.levelSelectListener} locationSelectListener={this.locationSelectListener} handleJobSearchSubmit={this.handleJobSearchSubmit} />

      <JobSearchResultList jobSearchResults = {this.state.jobSearchResults} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} />
      </div>
    )}

}

export default JobExploreContainer
