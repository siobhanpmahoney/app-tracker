import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  paddingTop: '1em',
  paddingBottom: '1em',
  paddingLeft: '0.75em',
  paddingRight: '0.75em',
  marginTop: '1em',
  marginBottom: '1em',
  marginLeft: '0.75em',
  marginRight: '0.75em',
  color: '#718CA1',
  fontSize: '13px',
  alignText: "right",
  textDecoration: "none",
  borderRadius: "6px"
}

class NavBar extends React.Component {

  renderHTML = () => {
    if (!!this.props.currentUser) {
      return (
        <div style={{backgroundColor:"white", padding:"1em"}}>
          <span style={{color:"#30c9e8", fontSize:"42px", fontWeight:"800", fontFamily:"Montserrat", style:"inline", marginTop:"0.75em", padding:"0.75em"}}>Capture</span>
          <span style={{float:"right", style:"inline"}}>
        <NavLink to="/" exact style={link} activeStyle={{backgroundColor:'#7FE6E1', color:"white", textDecoration:"none"}}>Profile</NavLink>

        <NavLink to="/search/companies" exact style={link} activeStyle={{color:'#EBBF83', fontWeight:"800"}}>Explore Companies</NavLink>

        <NavLink to="/search/jobs" exact style={link} activeStyle={{backgroundColor:'#7FE6E1', color:"white", textDecoration:"none"}}>Search Jobs</NavLink>

      <NavLink to="/mycompanies" exact style={link} activeStyle={{backgroundColor:'#7FE6E1', color:"white", textDecoration:"none"}}>My Companies</NavLink>

      <NavLink to="/myjobs" exact style={link} activeStyle={{backgroundColor:'#7FE6E1', color:"white", textDecoration:"none"}}>My Jobs</NavLink>

    <NavLink onClick={this.props.logOutUser} to="/logout" exact style={link} activeStyle={{backgroundColor:'#7FE6E1', color:"white", textDecoration:"none"}}> Log Out </NavLink>
    </span>
    </div>
  )

      } else {
        return (
          <div>
          <NavLink
            to="/login"
            exact
            style={link}
            activeStyle={{
              background: '#FF5370'
            }}>Log In</NavLink>
            </div>
        )
      }
    }

  render() {
    return (
      <div className="navbar">
        {this.renderHTML()}
      </div>)
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

export default connect(mapStateToProps, mapDispatchToProps)(NavBar);
