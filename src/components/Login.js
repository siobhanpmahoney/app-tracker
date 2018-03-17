import React from 'react'
import PropTypes from 'prop-types';

class Login extends React.Component {
  static propTypes = {
    setLoggedInUser: PropTypes.func.isRequired,
  };
  constructor(props) {
    super(props)

    this.state = {
      credentials: {
        username: "",
        password: ""
      }
    }
  }

  formListener = (event) => {
    let value = event.target.value
    let name = event.target.name
    let currentCredState = Object.assign({},this.state.credentials)
    currentCredState[name] = value
    this.setState({
      credentials: currentCredState
    })
    console.log(this.state)
  }

  loginUser = (event) => {
    const token = localStorage.getItem('token')
    event.preventDefault()
    return fetch("http://localhost:3000/api/v1/login", {
      method: 'POST',
      headers:  {
        'Content-Type': 'application/json',
        Accepts: 'application/json',
        Authorization: token
      },
      body: JSON.stringify(this.state.credentials)
    })
    .then(response => response.json())
    .then(res => {
      if (res.error) {
        alert(res.error)
      }
      else {
        window.location = `/`
        this.props.setLoggedInUser(res)
      }
    })
  }

  render() {
    console.log(this.props)
    return (
      <div className="login">

      <form>
      <input type="text" name="username" onChange={this.formListener} />
      <input type="password" name="password" onChange={this.formListener} />
      <button className="buttons" onClick={this.loginUser}>Login</button>
      </form>
      </div>
    )
  }
}




export default Login;
