import {Link, withRouter} from 'react-router-dom'
import Cookies from 'js-cookie'

import {TiHome} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'
import {FiLogOut} from 'react-icons/fi'

import './index.css'

const Header = props => {
  const onClickLogOut = () => {
    Cookies.remove('jwt_token')

    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="header-container">
      <Link to="/" className="link-item">
        <img
          src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
          alt="website logo"
          className="nav-app-logo"
        />
      </Link>
      <ul className="small-devices-option-list">
        <li className="nav-item">
          <Link to="/" className="link-item">
            <TiHome className="nav-icon" />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/jobs" className="link-item">
            <BsBriefcaseFill className="nav-icon" />
          </Link>
        </li>

        <li className="nav-item">
          <Link to="/login" className="link-item">
            <FiLogOut className="nav-icon" onClick={onClickLogOut} />
          </Link>
        </li>
      </ul>

      <div className="large-devices-option-list">
        <div className="large-nav-options">
          <Link to="/" className="link-item">
            <p className="nav-option-text">Home</p>
          </Link>

          <Link to="/jobs" className="link-item">
            <p className="nav-option-text">Jobs</p>
          </Link>
        </div>

        <button type="button" onClick={onClickLogOut} className="logout-btn">
          Logout
        </button>
      </div>
    </nav>
  )
}
export default withRouter(Header)
