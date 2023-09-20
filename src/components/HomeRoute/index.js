import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import Header from '../Header'
import './index.css'

const HomeRoute = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/ebank/login" />
  }

  return (
    <div className="home-page-container">
      <Header />
      <div className="home-content-container">
        <h1 className="home-card-heading">Your Flexibility, Our Excellences</h1>
        <img
          src="https://assets.ccbp.in/frontend/react-js/ebank-digital-card-img.png "
          alt="digital card"
          className="digital-card"
        />
      </div>
    </div>
  )
}
export default HomeRoute
