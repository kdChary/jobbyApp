/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import Header from '../Header'

const apiStatusConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class Jobs extends Component {
  state = {
    searchInput: '',
    userDetails: [],
    jobsData: [],
    jobsFetchStatus: apiStatusConstant.initial,
    profileFetchStatus: apiStatusConstant.initial,
    query: [],
  }

  componentDidMount() {
    this.getAvailableJobs()
    this.getUserProfile()
  }

  onChangeSearch = event => {
    this.setState({searchInput: event.target.value})
  }

  modifyJobData = data => ({
    companyLogoUrl: data.company_logo_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    title: data.title,
  })

  modifyProfileData = data => ({
    name: data.name,
    profileImageUrl: data.profile_image_url,
    shortBio: data.short_bio,
  })

  onProfileFetchSuccess = userData => {
    this.setState({userDetails: userData})
  }

  getUserProfile = async () => {
    this.setState({profileFetchStatus: apiStatusConstant.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const url = 'https://apis.ccbp.in/profile'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const modifiedProfile = this.modifyProfileData(data.profile_details)
      this.onProfileFetchSuccess(modifiedProfile)

      this.setState({profileFetchStatus: apiStatusConstant.success})
      console.log(modifiedProfile)
    } else {
      this.setState({profileFetchStatus: apiStatusConstant.failure})
    }
  }

  onJobsFetchSuccess = jobsData => {
    this.setState({jobsData})
  }

  getAvailableJobs = async () => {
    this.setState({jobsFetchStatus: apiStatusConstant.inProgress})

    const {query} = this.state
    const url = `https://apis.ccbp.in/jobs?${query}`
    const jwtToken = Cookies.get('jwt_token')

    const options = {
      method: 'GET',
      headers: {Authorization: `Bearer ${jwtToken}`},
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      const modifiedData = data.jobs.map(eachJob => this.modifyJobData(eachJob))
      this.onJobsFetchSuccess(modifiedData)
      this.setState({jobsFetchStatus: apiStatusConstant.success})
    } else {
      this.setState({jobsFetchStatus: apiStatusConstant.failure})
    }
  }

  renderLoader = () => (
    <div className="loader-container" data-testid="loader">
      <Loader type="ThreeDots" color="#ffffff" height="50" width="50" />
    </div>
  )

  renderFailureView = () => (
    <div className="failure-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/failure-img.png"
        alt="failure view"
        className="jobs-failure-img"
      />
      <h2 className="failure-view-title">Oops! Something Went Wrong</h2>
      <p className="failure-view-description">
        We cannot seem to find the page you are lookgin for
      </p>
      <button className="retry-btn" type="button" onClick={this.onRetryClicked}>
        Retry
      </button>
    </div>
  )

  renderNoJobsFound = () => {
    const {jobsData} = this.state
    if (!jobsData.length) {
      return (
        <div className="no-jobs-card">
          <img
            src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
            alt="no jobs"
            className="no-jobs-img"
          />
          <h3 className="no-jobs-title">No Jobs Found</h3>
          <p className="failure-view-description">
            We could not find any jobs. Try other filters.
          </p>
        </div>
      )
    }
    return null
  }

  renderInput = () => {
    const {searchInput} = this.state

    return (
      <div className="input-field">
        <input
          className="input"
          type="search"
          onChange={this.onChangeSearch}
          value={searchInput}
          placeholder="Search"
        />
        <button type="button" data-testid="searchButton" className="search-btn">
          <BsSearch className="search-icon" />
        </button>
      </div>
    )
  }

  render() {
    return (
      <>
        <div className="jobs-container">
          <Header />
          <div className="jobs-section">
            <div className="right-section">{this.renderInput()}</div>
          </div>
        </div>
      </>
    )
  }
}

export default Jobs
