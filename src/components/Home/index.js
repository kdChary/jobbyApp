import Cookies from 'js-cookie'
import {Link, Redirect} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    const {history} = props
    history.replace('/login')

    return <Redirect to="/login" />
  }

  return (
    <div className="home-route">
      <Header />
      <div className="home-container">
        <h1 className="home-title">Find The Job That Fits Your Life</h1>
        <p className="home-description">
          Millions of people are searching for jobs, salary information, company
          reviews. Find the job that fits your abilities and potential.
        </p>
        <Link to="/header" className="link-item">
          <button className="find-jobs-btn" type="button">
            Find Jobs
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
