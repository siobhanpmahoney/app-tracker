import React from 'react';
import { NavLink } from 'react-router-dom';

const link = {
  width: '100px',
  padding: '1em',
  margin: '0 6px 6px',
  background: '#ff2348',
  color: 'white',
}

const NavBar = () => {
  return (
    <div className="navbar">
      <NavLink
        to="/"
        exact
        style={link}
        activeStyle={{
          background: '#FF5370'
        }}>Home</NavLink>
      <NavLink
        to="/search/companies"
        exact
        style={link}
        activeStyle={{
          background: '#FF5370'
        }}>Explore Companies</NavLink>
      <NavLink
        to="/search/jobs"
        exact
        style={link}
        activeStyle={{
          background: '#FF5370'
        }}>Search Jobs</NavLink>
      <NavLink
        to="/myjobs"
        exact
        style={link}
        activeStyle={{
          background: '#FF5370'
        }}>My Jobs</NavLink>
    </div>
  );
};

export default NavBar;
