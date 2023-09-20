import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

class LoginRoute extends Component {
  state = {
    userId: '',
    pin: '',
    showErrorMsg: false,
    errorMsg: '',
  }

  onChangeUserId = event => {
    this.setState({userId: event.target.value})
  }

  onChangePin = event => {
    this.setState({pin: event.target.value})
  }

  loginSuccessful = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
    })
    history.replace('/')
  }

  loginFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitFormData = async event => {
    event.preventDefault()
    const {userId, pin} = this.state
    const apiUrl = 'https://apis.ccbp.in/ebank/login'

    const userDetails = {user_id: userId, pin}
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(apiUrl, options)
    const data = await response.json()
    if (response.ok === true) {
      this.loginSuccessful(data.jwt_token)
    } else {
      this.loginFailure(data.error_msg)
    }
  }

  render() {
    const {userId, pin, showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="login-container">
        <div className="content-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/ebank-login-img.png "
            alt="website login"
            className="login-log"
          />
          <form onSubmit={this.onSubmitFormData} className="form-card">
            <h1 className="heading">Welcome Back</h1>
            <label className="label" htmlFor="User ID">
              User ID
            </label>
            <input
              id="User ID"
              type="text"
              onChange={this.onChangeUserId}
              value={userId}
              className="input"
            />
            <label className="label" htmlFor="PIN">
              PIN
            </label>
            <input
              id="PIN"
              type="password"
              onChange={this.onChangePin}
              value={pin}
              className="input"
            />
            <button type="submit" className="button">
              Login
            </button>
            {showErrorMsg && <p>{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}

export default LoginRoute
