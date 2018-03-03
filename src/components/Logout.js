import React from 'react'
import Login from './Login'

class Logout extends React.Component {
  render() {
    return (
      <div>
      <h3>You have been signed out.</h3>
      <h4>If you would like to return to your profile, please sign back in.</h4>
      <Login />
      </div>
    )
  }
}

export default Logout
