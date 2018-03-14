import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'
import JobSearchResultList from './JobSearchResultList'
import JobSearchResultItem from './JobSearchResultItem'

class JobSuggestionContainer extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      suggestedJobs: []
    }
  }

  componentDidMount() {
    let url = `https://api-v2.themuse.com/jobs?category=${this.props.categoryUrl}&api-key=82b2d1f745512b99a70044e6c6b316d86739a97719d5e88caf67a3f7fd788a00&page=1`
    fetch(url)
      .then(response=>response.json())
      .then(json => this.setState({
        suggestedJobs: json.results
       })
    )


  }

  industries = () => {
    let industries = this.props.savedIndustries.map((i) => {
       i.name.split(' ').join('%20')
    })
    return industries.join("&industry=")
  }

  categories = () => {
    return this.props.savedCategories.map((c) => {
      return c.name
    })
  }

  render() {



    if (this.state.suggestedJobs == []) {
      return <div>Loading...</div>
    }
    console.log(this.state.suggestedJobs)
    return (
      <div>

        <div style={{background:"blue"}}>
          <h2>Suggested Jobs</h2>
        {this.state.suggestedJobs.map((j) => {
          return <JobSearchResultItem job={j} key={j.id} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} museJobId={j.id}/>
        })}

xxxx
</div>
<div>
        <JobSearchResultList currentUser={this.props.currentUser} jobSearchResults = {this.state.suggestedJobs} savedJobs={this.props.savedJobs} addToSavedJobs={this.props.addToSavedJobs} />

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

export default connect(mapStateToProps, mapDispatchToProps)(JobSuggestionContainer);
