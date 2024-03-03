import {Component} from 'react'
import {Link, Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'
import {Loader} from 'react-loader-spinner'

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
    userDetails: {},
    jobsData: [],
    jobsFetchStatus: apiStatusConstant.initial,
    profileFetchStatus: apiStatusConstant.initial,
    query: [],
  }

  componentDidMount() {
    this.getAvailableJobs()
    this.getUserProfile()
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

  render() {
    return (
      <>
        <Header />
        <h1>Testing</h1>
      </>
    )
  }
}

export default Jobs
