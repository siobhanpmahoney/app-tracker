import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import { withRouter } from 'react-router'
import * as Actions from '../../actions'

class MyJobsResourceFeedInterviews extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
    interviewAdvice: [],
  }
}

  componentDidMount() {
    fetch("https://api-v2.themuse.com/posts?tag=First%20Interview&tag=Impressing%20in%20an%20Interview&tag=Informational%20Interviews&tag=Interview%20Basics&tag=Interview%20Etiquette&tag=Interviewing%20for%20a%20Job&tag=Interview%20Mistakes&tag=Interview%20Questions&tag=Interview%20Rounds&tag=Interviews&page=1")
    .then(response => response.json())
    .then(json => this.setState({
      interviewAdvice: json.results
    }))
  }

addBookmark = (article) => {
  console.log("in PR component")
  this.props.addBookmark(article.name, article.refs.landing_page, this.props.user.id, this.props.company.id)
}

dynamicBookmarkIcon = (info) => {
  if (this.props.savedBookmarks.find((bookmark) => {
    return bookmark.url == info.refs.landing_page
  })) {
    return (<i className="material-icons" name={info.name} id={info.refs.landing_page} style={{color:"blue", fontSize:"100%"}}>bookmark</i>)
  } else {
    return (<i className="material-icons" value={info.name} id={info.refs.landing_page} onClick={()=>this.addBookmark(info)} style={{color:"blue"}}>bookmark_border</i>)
  }
}

  render() {
debugger
console.log(this.props)

    return (
      <div className="postList">
        {this.state.interviewAdvice.map((post) => {
          return <div className="advicePost">
          <span><a href={post.refs.landing_page} target="_blank"><i className="material-icons" style={{fontSize:"18px"}}>launch</i></a>{this.dynamicBookmarkIcon(post)}</span>
          <h4>{post.name}</h4>
          <p>{post.description}</p>
          </div>
        })}
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
    savedIndustries: state.user.savedIndustries,
    savedCategories: state.user.savedCategories,
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(MyJobsResourceFeedInterviews);
