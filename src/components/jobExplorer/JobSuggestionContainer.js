import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import JobSearchResultList from './JobSearchResultList'

class JobSuggestionContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestedJobs: []
    }
  }

  componentDidMount() {
    fetch(`https://api-v2.themuse.com/jobs?category=${this.props.categoryUrl}&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1`)
      .then(response=>response.json())
      .then(json => this.setState({
        suggestedJobs: json.results
      }))
  }

  industries = () => {
    let industries = this.props.savedIndustries.map((i) => {
       i.name.split(' ').join('%20')
    })
    console.log(industries)
    return industries.join("&industry=")
  }

  categories = () => {
    return this.props.savedCategories.map((c) => {
      return c.name
    })
  }

  render() {
    console.log(`https://api-v2.themuse.com/jobs?category=${this.props.categoryUrl}&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1`)


    if (this.state.suggestedJobs == []) {
      return <div>Loading...</div>
    }
    return (
      <div>
        <h2>Check out these Jobs!</h2>

        <JobSearchResultList jobSearchResults = {this.state.suggestedJobs} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} />

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

export default connect(mapStateToProps, mapDispatchToProps)(JobSuggestionContainer);
