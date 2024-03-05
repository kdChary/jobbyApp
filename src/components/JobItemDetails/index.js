import {Component} from 'react'
import {Redirect} from 'react-router-dom'
import Cookies from 'js-cookie'

import './index.css'

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
      this.onRequestSuccess(modifiedData)

      console.log(modifiedData)
    } else {
      this.setState({fetchStatus: apiConstant.failure})
    }
  }

  render() {
    return <h1>Test</h1>
  }
}

export default JobItemDetails
