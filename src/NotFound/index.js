import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

const NotFound = () => {
  const token = Cookies.get('jwt_token')

  if (token === undefined) {
    return <Redirect to="/login" />
  }

  return (
    <div className="not-found-route">
      <img
        src="https://assets.ccbp.in/frontend/react-js/jobby-app-not-found-img.png"
        alt="not found"
        className="not-found-image"
      />
      <h3 className="not-found-title">Page Not Found</h3>
      <p className="not-found-msg">
        We are sorry, the page you requested for could not be found
      </p>
    </div>
  )
}

export default NotFound
