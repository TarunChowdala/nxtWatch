import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import ReactContext from '../../ReactContext'

import './index.css'

class Login extends Component {
  state = {
    username: '',
    password: '',
    showErrorMsg: false,
    errorMsg: '',
    showPassword: false,
  }

  onSubmitDetails = async event => {
    event.preventDefault()

    const {username, password} = this.state
    const userDetails = {username, password}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const fetchedData = await response.json()

    if (response.ok === true) {
      this.setState({showErrorMsg: false})
      const {history} = this.props
      Cookies.set('jwt_token', fetchedData.jwt_token, {expires: 30})
      history.replace('/')
    } else {
      this.setState({showErrorMsg: true, errorMsg: fetchedData.error_msg})
    }
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onClickShowPassword = () => {
    this.setState(prevState => ({showPassword: !prevState.showPassword}))
  }

  render() {
    const {
      errorMsg,
      showErrorMsg,
      showPassword,
      username,
      password,
    } = this.state

    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <ReactContext.Consumer>
        {value => {
          const {isLightTheme} = value
          const bgColor = isLightTheme ? '' : 'dark-container'
          const headerBgColor = isLightTheme ? '' : 'bgHeaderDarkTheme'
          const textColor = isLightTheme ? '' : 'dark-theme-text'
          return (
            <div className={`login-container ${bgColor}`}>
              <div className={`form-container ${headerBgColor}`}>
                <img
                  src="https://assets.ccbp.in/frontend/react-js/nxt-watch-logo-light-theme-img.png"
                  alt="website logo"
                  className="app-logo"
                />
                <form className="form" onSubmit={this.onSubmitDetails}>
                  <label htmlFor="input1" className={`label-text ${textColor}`}>
                    USERNAME
                  </label>
                  <input
                    value={username}
                    id="input1"
                    type="text"
                    className="input"
                    placeholder="Username"
                    onChange={this.onChangeUsername}
                  />
                  <label htmlFor="input2" className={`label-text ${textColor}`}>
                    PASSWORD
                  </label>
                  <input
                    value={password}
                    type={showPassword ? 'text' : 'password'}
                    className="input-password"
                    placeholder="Password"
                    onChange={this.onChangePassword}
                  />
                  <br />
                  <div className="checkbox-container">
                    <input
                      type="checkbox"
                      id="checkBox"
                      onClick={this.onClickShowPassword}
                    />
                    <label
                      htmlFor="checkBox"
                      className={`${textColor} checkbox-label`}
                    >
                      {showPassword ? 'Hide Password' : 'Show Password'}
                    </label>
                  </div>
                  {showErrorMsg && <p className="error-msg">*{errorMsg}</p>}
                  <button type="submit" className="login-button">
                    Login
                  </button>
                </form>
              </div>
            </div>
          )
        }}
      </ReactContext.Consumer>
    )
  }
}

export default Login
