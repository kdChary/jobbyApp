import './index.css'

const employmentTypesList = [
  {
    label: 'Full Time',
    employmentTypeId: 'FULLTIME',
  },
  {
    label: 'Part Time',
    employmentTypeId: 'PARTTIME',
  },
  {
    label: 'Freelance',
    employmentTypeId: 'FREELANCE',
  },
  {
    label: 'Internship',
    employmentTypeId: 'INTERNSHIP',
  },
]

const salaryRangesList = [
  {
    salaryRangeId: '1000000',
    label: '10 LPA and above',
  },
  {
    salaryRangeId: '2000000',
    label: '20 LPA and above',
  },
  {
    salaryRangeId: '3000000',
    label: '30 LPA and above',
  },
  {
    salaryRangeId: '4000000',
    label: '40 LPA and above',
  },
]

const FilterGroup = props => {
  const {toggleCategory} = props

  const changeVal = () => {
    toggleCategory()
  }

  return (
    <div className="filters-group-container">
      <h5 className="filters-group-title">Type of Employment</h5>

      <ul className="filters-group-list">
        {employmentTypesList.map(eachType => (
          <li className="filter-group-item" key={eachType.employmentTypeId}>
            <input
              type="checkbox"
              id={eachType.employmentTypeId}
              onChange={changeVal}
            />

            <label className="label" htmlFor={eachType.employmentTypeId}>
              {eachType.label}
            </label>
          </li>
        ))}
      </ul>

      <hr className="line" />

      <h5 className="filters-group-title">Salary Range</h5>

      <ul className="filters-group-list">
        {salaryRangesList.map(salaryRange => (
          <li className="filter-group-item" key={salaryRange.salaryRangeId}>
            <input
              type="radio"
              id={salaryRange.salaryRangeId}
              onChange={changeVal}
            />

            <label className="label" htmlFor={salaryRange.salaryRangeId}>
              {salaryRange.label}
            </label>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default FilterGroup
