/* eslint-disable jsx-a11y/control-has-associated-label */
import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'

import Cookies from 'js-cookie'
import Loader from 'react-loader-spinner'
import {BsSearch} from 'react-icons/bs'

import './index.css'
import Header from '../Header'
import FilterGroup from '../FilterGroup'
import JobItem from '../JobItem'

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
      console.log(modifiedData)
    } else {
      this.setState({jobsFetchStatus: apiStatusConstant.failure})
    }
  }

  onClickRetry = () => {
    window.location.reload()
  }

  changeCategoryValue = value => {
    const {query} = this.state

    if (!query.includes(value)) {
      this.setState(
        prevState => ({query: [...prevState.query, value]}),
        this.getAvailableJobs,
      )
    } else {
      const index = query.indexOf(value)
      query.splice(index, 1)
      this.setState({query}, this.getAvailableJobs)
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
        We cannot seem to find the page you are looking for
      </p>
      <button className="retry-btn" type="button" onClick={this.onClickRetry}>
        Retry
      </button>
    </div>
  )

  renderNoJobsFound = () => (
    <div className="no-jobs-card">
      <img
        src="https://assets.ccbp.in/frontend/react-js/no-jobs-img.png"
        alt="no jobs"
        className="no-jobs-img"
      />
      <h1 className="no-jobs-title">No Jobs Found</h1>
      <p className="failure-view-description">
        We could not find any jobs. Try other filters.
      </p>
    </div>
  )

  renderInput = () => {
    const {searchInput} = this.state

    return (
      <div className="search-input-field">
        <input
          className="jobs-search-input"
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

  renderProfileCard = () => {
    const {userDetails} = this.state
    const {name, profileImageUrl, shortBio} = userDetails

    return (
      <div className="user-profile">
        <img src={profileImageUrl} alt="profile" className="profile-pic" />
        <h2 className="user-profile-name">{name}</h2>
        <p className="user-bio">{shortBio}</p>
      </div>
    )
  }

  renderShowProfile = () => {
    const {profileFetchStatus} = this.state

    switch (profileFetchStatus) {
      case apiStatusConstant.inProgress:
        return this.renderLoader()
      case apiStatusConstant.success:
        return this.renderProfileCard()
      case apiStatusConstant.failure:
        return (
          <div className="retry-card">
            <button
              className="retry-btn"
              type="button"
              onClick={this.onClickRetry}
            >
              Retry
            </button>
          </div>
        )
      default:
        return null
    }
  }

  renderAllJobsSection = () => {
    const {jobsData} = this.state

    return (
      <>
        <ul className="all-jobs-list">
          {jobsData.map(eachJob => (
            <JobItem key={eachJob.id} jobDetails={eachJob} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return (
      <>
        <div className="jobs-container">
          <Header />
          <div className="jobs-section">
            {this.renderInput()}
            {this.renderShowProfile()}
            <hr className="line" />
            <FilterGroup toggleCategory={this.changeCategoryValue} />
            {this.renderAllJobsSection()}
          </div>
        </div>
      </>
    )
  }
}

export default Jobs

/* <div className="right-section"> div className="all-jobs-container" */
