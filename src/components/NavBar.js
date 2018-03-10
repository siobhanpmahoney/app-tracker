import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import * as Actions from '../actions'
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '1em',
  margin: '1em',
  backgroundColor: '#ff2348',
  color: 'white',
}

class NavBar extends React.Component {

  renderHTML = () => {
    if (!!this.props.currentUser) {
      return (
        <div style={{backgroundColor:"white"}}>
        <NavLink to="/" exact style={link} activeStyle={{background: '#FF5370'}}>Profile</NavLink>

        <NavLink to="/search/companies" exact style={link} activeStyle={{background: '#FF5370'}}>Explore Companies</NavLink>

        <NavLink to="/search/jobs" exact style={link} activeStyle={{background:'#FF5370'}}>Search Jobs</NavLink>

      <NavLink to="/mycompanies" exact style={link} activeStyle={{background:'#FF5370'}}>My Companies</NavLink>

      <NavLink to="/myjobs" exact style={link} activeStyle={{background:'#FF5370'}}>My Jobs</NavLink>

    <NavLink onClick={this.props.logOutUser} to="/logout" exact style={link} activeStyle={{background: '#FF5370'}}> Log Out </NavLink>
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
