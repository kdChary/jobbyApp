import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'
import Header from '../Header'

const Home = props => {
  const token = Cookies.get('jwt_token')
  if (token === undefined) {
    const {history} = props
    history.replace('/login')

    return <Redirect to="/login" />
  }

  const onFindJobsClicked = () => {
    const {history} = props
    history.push('/jobs')
  }

  return (
    <>
      <div className="home-container">
        <Header />
        <div className="home-details-card">
          <h1 className="home-title">Find The Job That Fits Your Life</h1>
          <p className="home-description">
            Millions of people are searching for jobs, salary information,
            company reviews. Find the job that fits your abilities and
            potential.
          </p>
          <button
            className="find-jobs-btn"
            type="button"
            onClick={onFindJobsClicked}
          >
            Find Jobs
          </button>
        </div>
      </div>
    </>
  )
}

export default Home
