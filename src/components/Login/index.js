import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {expires: 30, path: '/'})

    history.replace('/')
  }

  onSubmitFailed = msg => {
    this.setState({
      errorMsg: msg,
      showError: true,
    })
  }

  onSubmit = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const url = 'https://apis.ccbp.in/login'
    const userDetails = {username, password}

    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailed(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="label">
          USERNAME
        </label>
        <input
          type="text"
          id="username"
          value={username}
          className="input"
          onChange={this.onChangeUsername}
          placeholder="Username"
        />
      </>
    )
  }

  renderPasswordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          type="password"
          id="password"
          value={password}
          className="input"
          onChange={this.onChangePassword}
          placeholder="Password"
        />
      </>
    )
  }

  renderLoginForm = () => {
    const {showError, errorMsg} = this.state

    return (
      <>
        <form name="loginForm" className="login-form" onSubmit={this.onSubmit}>
          <div className="input-field">{this.renderUserNameField()}</div>

          <div className="input-field">{this.renderPasswordField()}</div>

          <button className="submit-btn" type="submit">
            Login
          </button>
          {showError && <p className="error-msg">*{errorMsg}</p>}
        </form>
      </>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')

    if (token) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-container">
        <div className="login-section">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="app-login-logo"
          />
          {this.renderLoginForm()}
        </div>
      </div>
    )
  }
}

export default Login
