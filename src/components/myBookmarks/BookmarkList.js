import React from 'react'
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../../actions'

class BookmarkList extends React.Component {

  render() {
    console.log("in bookmark")
    console.log(this.props.bookmarks)
    return (
      <div>

        {this.props.bookmarks.map((bookmark) => {
          return <div style={{padding:"0.5em", margin:"1.25em", borderColor:"#ABDEE8", borderStyle:"solid"}}><details>
            <summary style={{background:"#ABDEE8", padding:"0.5em", fontFamily:"calibri", color:"white"}}>
              <a href={bookmark.url} target="_blank">{bookmark.title}</a>
            </summary>
            <div style={{background:"white", fontSize:"14px", padding:"0.5em", fontFamily:"calibri"}}>
              <b>{bookmark.source_name}</b><br />
              {bookmark.summary}

            </div>
        </details></div>
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
    savedIndustries: state.user.savedIndustries
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators(Actions, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(BookmarkList);
