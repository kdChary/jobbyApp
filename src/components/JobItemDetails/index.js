import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import {FaStar} from 'react-icons/fa'
import {TiLocation} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'
import Header from '../Header'

const apiConstant = {
  initial: 'INITIAL',
  inProgress: 'IN_PROGRESS',
  success: 'SUCCESS',
  failure: 'FAILURE',
}
class JobItemDetails extends Component {
  state = {jobItemData: {}, fetchStatus: apiConstant.initial}

  componentDidMount() {
    this.getJobItemData()
  }

  modifySkills = skill => ({
    imageUrl: skill.image_url,
    name: skill.name,
  })

  modifyLifeAtCompany = life => ({
    description: life.description,
    image_url: life.image_url,
  })

  modifyJobDetails = data => ({
    title: data.title,
    companyLogoUrl: data.company_logo_url,
    companyWebsiteUrl: data.company_website_url,
    employmentType: data.employment_type,
    id: data.id,
    jobDescription: data.job_description,
    location: data.location,
    packagePerAnnum: data.package_per_annum,
    rating: data.rating,
    skills: data.skills.map(skill => this.modifySkills(skill)),
    lifeAtCompany: this.modifyLifeAtCompany(data.life_at_company),
  })

  modifySimilarJobs = job => ({
    companyLogoUrl: job.company_logo_url,
    employmentType: job.employment_type,
    id: job.id,
    jobDescription: job.job_description,
    location: job.location,
    rating: job.rating,
    title: job.title,
  })

  modifyData = data => ({
    jobDetails: this.modifyJobDetails(data.job_details),
    similarJobs: data.similar_jobs.map(job => this.modifySimilarJobs(job)),
  })

  onRequestSuccess = jobDetails => {
    this.setState({jobItemData: jobDetails})
  }

  getJobItemData = async () => {
    this.setState({fetchStatus: apiConstant.inProgress})

    const {match} = this.props
    const {params} = match
    const {id} = params

    const url = `https://apis.ccbp.in/jobs/${id}`
    const jwtToken = Cookies.get('jwt_token')
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }

    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.setState({fetchStatus: apiConstant.success})

      const modifiedData = this.modifyData(data)
      this.onRequestSuccess(modifiedData.jobDetails)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
    }
  }

  renderJobItemDetail = () => {
    const {jobItemData} = this.state

    const {
      title,
      companyLogoUrl,
      employmentType,
      companyWebsiteUrl,
      jobDescription,
      location,
      packagePerAnnum,
      rating,
      skills,
      lifeAtCompany,
    } = jobItemData

    return (
      <>
        <div className="selected-job-details-header">
          <div className="selected-job-company-info">
            <img
              src={companyLogoUrl}
              alt="company logo"
              className="selected-job-logo"
            />

            <div className="selected-job-title-rating-info">
              <h5 className="selected-job-title">{title}</h5>

              <div className="selected-job-rating-card">
                <FaStar className="star-icon" />

                <p className="selected-job-rating">{rating}</p>
              </div>
            </div>
          </div>

          <div className="selected-job-location-package-card">
            <ul className="selected-job-location-list">
              <li className="selected-job-list-item">
                <TiLocation className="selected-job-details-icon" />
                <p className="selected-job-details-location-text">{location}</p>
              </li>

              <li className="selected-job-list-item">
                <BsBriefcaseFill className="selected-job-details-icon" />
                <p className="selected-job-details-location-text">
                  {employmentType}
                </p>
              </li>
            </ul>

            <p className="selected-job-package">{packagePerAnnum}</p>
          </div>
        </div>
        <hr className="line" />

        <div className="selected-job-details-footer ">
          <h4 className="selected-job-description-title">Description</h4>
          <p className="selected-job-description">{jobDescription}</p>
        </div>
      </>
    )
  }

  render() {
    const token = Cookies.get('jwt_token')

    if (token === undefined) {
      return <Redirect to="/login" />
    }

    return (
      <div className="selected-job-bg">
        <Header />
        <div className="selected-job-details-container">
          {this.renderJobItemDetail()}
        </div>
      </div>
    )
  }
}

export default JobItemDetails
