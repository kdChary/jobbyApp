import {FaStar} from 'react-icons/fa'
import {TiLocation} from 'react-icons/ti'
import {BsBriefcaseFill} from 'react-icons/bs'

import './index.css'

// TODO: add Link to /jobItemDetails
const JobItem = props => {
  const {jobDetails} = props
  const {
    companyLogoUrl,
    employmentType,
    jobDescription,
    location,
    packagePerAnnum,
    rating,
    title,
  } = jobDetails
  return (
    <li className="job-item">
      <div className="job-header-section">
        <div className="job-item-company-details-card">
          <img
            src={companyLogoUrl}
            alt="company logo"
            className="job-item-logo"
          />

          <div className="job-item-title-ratings-card">
            <h5 className="job-title">{title}</h5>
            <div className="job-item-ratings-card">
              <FaStar className="rating-icon" />
              <p className="job-item-rating">{rating}</p>
            </div>
          </div>
        </div>

        <div className="job-item-salary-employment-card">
          <ul className="job-item-employment-details-list">
            <li className="employment-item">
              <TiLocation className="job-item-employment-icon" />
              <p className="job-item-employment-details-text">{location}</p>
            </li>

            <li className="employment-item">
              <BsBriefcaseFill className="job-item-employment-icon" />
              <p className="job-item-employment-details-text">
                {employmentType}
              </p>
            </li>
          </ul>
          <p className="job-item-salary">{packagePerAnnum}</p>
        </div>
      </div>

      <hr className="line" />

      <div className="job-item-footer-section">
        <h5 className="job-item-footer-title">Description</h5>
        <p className="job-item-description">{jobDescription}</p>
      </div>
    </li>
  )
}

export default JobItem
