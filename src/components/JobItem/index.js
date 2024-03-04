import './index.css'

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
        <img
          src={companyLogoUrl}
          alt="company logo"
          className="job-item-logo"
        />
        <div className="job-item-title-ratings-card">
          <h5 className="job-title">{title}</h5>
          <div className="job-item-ratings-card">
            <p className="job-item-rating">{rating}</p>
          </div>
        </div>
      </div>
    </li>
  )
}

export default JobItem
