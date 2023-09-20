import {withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const onClickLogOutBtn = () => {
    const {history} = props
    Cookies.remove('jwt_token')
    history.replace('/ebank/login')
  }

  return (
    <div className="header-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/ebank-logo-img.png "
        alt="website logo"
      />
      <div>
        <button
          type="button"
          onClick={onClickLogOutBtn}
          className="log-out-button"
        >
          Logout
        </button>
      </div>
    </div>
  )
}

export default withRouter(Header)
